import crypto from "crypto";
import { query } from "../db.js";
import { locations, calculateDistanceKm, calculateTripMetrics, calculateEta } from "./math.js";

export async function quoteTrip(_data, payload) {
  const { rows } = await query("SELECT * FROM car_types WHERE id = $1", [payload.carTypeId]);
  const carType = rows[0];
  if (!carType) throw new Error("Invalid car type.");
  
  const distanceKm = calculateDistanceKm(payload.pickupId, payload.dropoffId);
  const durationMin = Math.max(10, Math.round(distanceKm * 3.8));
  
  const ratePerKm = parseFloat(carType.rate_per_km);
  const baseFare = parseFloat(carType.base_fare);
  const minFare = parseFloat(carType.min_fare);

  const rawFare = baseFare + distanceKm * ratePerKm + durationMin * 1.35;
  const fare = Math.max(minFare, Math.round(rawFare));

  return { fare, durationMin, distanceKm };
}

export async function createTrip(_data, customerUserId, payload) {
  const tripId = `trip-${crypto.randomUUID().slice(0, 8)}`;
  
  const { rows } = await query("SELECT * FROM car_types WHERE id = $1", [payload.carTypeId]);
  const carType = rows[0];
  if (!carType) throw new Error("Invalid car type.");

  const metrics = calculateTripMetrics(carType, payload.pickupId, payload.dropoffId);
  
  const now = new Date().toISOString();
  
  await query(`
    INSERT INTO trips (id, customer_user_id, car_type_id, pickup_id, dropoff_id, status, scheduled_at, fare, driver_payout, distance_km, duration_min, created_at)
    VALUES ($1, $2, $3, $4, $5, 'pending_acceptance', $6, $7, $8, $9, $10, $11)
  `, [
    tripId, customerUserId, payload.carTypeId, payload.pickupId, payload.dropoffId,
    payload.scheduledAt || null, metrics.fare, metrics.driverPayout, metrics.distanceKm, metrics.durationMin, now
  ]);

  const res = await query("SELECT * FROM trips WHERE id = $1", [tripId]);
  return res.rows[0];
}

export async function getCustomerAvailability(_data, pickupId) {
  const { rows } = await query("SELECT * FROM drivers WHERE status = 'free'");
  const availableCarTypes = new Set();
  
  for (const driver of rows) {
    if (calculateEta(driver.location_id, pickupId) <= 15) {
      availableCarTypes.add(driver.car_type_id);
    }
  }
  return Array.from(availableCarTypes);
}

export async function getCustomerDashboard(_data, userId) {
  const { rows: trips } = await query(`
    SELECT t.*, d.name as driver_name, d.rating as driver_rating, d.vehicle_number, d.location_id as driver_location_id, c.name as car_type_name
    FROM trips t
    LEFT JOIN drivers d ON t.driver_id = d.id
    LEFT JOIN car_types c ON t.car_type_id = c.id
    WHERE t.customer_user_id = $1
    ORDER BY t.created_at DESC
  `, [userId]);

  const activeTripObj = trips.find(t => t.status !== 'completed' && t.status !== 'cancelled');
  let activeTrip = null;

  if (activeTripObj) {
    const pickup = locations.find(l => l.id === activeTripObj.pickup_id);
    const dropoff = locations.find(l => l.id === activeTripObj.dropoff_id);
    const carTypeRow = await query("SELECT * FROM car_types WHERE id = $1", [activeTripObj.car_type_id]);
    const metrics = calculateTripMetrics(carTypeRow.rows[0], activeTripObj.pickup_id, activeTripObj.dropoff_id);
    
    activeTrip = {
      id: activeTripObj.id,
      status: activeTripObj.status,
      scheduledAt: activeTripObj.scheduled_at,
      pickup,
      dropoff,
      carType: { name: activeTripObj.car_type_name },
      fare: parseFloat(activeTripObj.fare),
      distanceKm: parseFloat(activeTripObj.distance_km),
      durationMin: activeTripObj.duration_min,
      routePoints: metrics.routePoints,
      driver: activeTripObj.driver_id ? {
        name: activeTripObj.driver_name,
        rating: parseFloat(activeTripObj.driver_rating),
        vehicleNumber: activeTripObj.vehicle_number
      } : null,
      etaMin: activeTripObj.driver_location_id ? calculateEta(activeTripObj.driver_location_id, activeTripObj.pickup_id) : 5
    };
  }

  const tripHistory = trips.filter(t => t.status === 'completed' || t.status === 'cancelled').slice(0, 10).map(t => ({
    id: t.id,
    fare: parseFloat(t.fare),
    status: t.status,
    createdAt: t.created_at,
    pickup: locations.find(l => l.id === t.pickup_id),
    dropoff: locations.find(l => l.id === t.dropoff_id),
    driver: t.driver_id ? { name: t.driver_name } : null
  }));

  const { rows: carTypesRow } = await query("SELECT * FROM car_types");
  const carTypes = carTypesRow.map(c => ({
    ...c,
    ratePerKm: parseFloat(c.rate_per_km),
    baseFare: parseFloat(c.base_fare),
    minFare: parseFloat(c.min_fare)
  }));

  return { activeTrip, tripHistory, locations, carTypes };
}

// Demo-only: auto-assign a driver and advance trip to in_progress
export async function demoAdvanceTrip(_data, userId, tripId) {
  const { rows: trips } = await query("SELECT * FROM trips WHERE id = $1 AND customer_user_id = $2", [tripId, userId]);
  const trip = trips[0];
  if (!trip) throw new Error("Trip not found.");
  if (trip.status !== 'pending_acceptance') throw new Error("Trip is already advanced.");

  // Find any driver (prefer free, but fallback to any)
  let { rows: drivers } = await query("SELECT * FROM drivers WHERE status = 'free' LIMIT 1");
  if (!drivers.length) {
    ({ rows: drivers } = await query("SELECT * FROM drivers LIMIT 1"));
  }
  if (!drivers.length) throw new Error("No drivers in system.");

  const driver = drivers[0];
  const now = new Date().toISOString();

  // Assign driver and advance to in_progress in one go
  await query(
    "UPDATE trips SET status = 'in_progress', assigned_at = $1, started_at = $1, driver_id = $2 WHERE id = $3",
    [now, driver.id, tripId]
  );
  await query(
    "UPDATE drivers SET status = 'on_trip', current_trip_id = $1 WHERE id = $2",
    [tripId, driver.id]
  );

  // Return the updated trip with driver info
  const { rows } = await query(`
    SELECT t.*, d.name as driver_name, d.rating as driver_rating, d.vehicle_number, d.location_id as driver_location_id
    FROM trips t
    LEFT JOIN drivers d ON t.driver_id = d.id
    WHERE t.id = $1
  `, [tripId]);
  
  const t = rows[0];
  return {
    id: t.id,
    status: t.status,
    fare: parseFloat(t.fare),
    distanceKm: parseFloat(t.distance_km),
    durationMin: t.duration_min,
    pickupId: t.pickup_id,
    dropoffId: t.dropoff_id,
    carTypeId: t.car_type_id,
    driver: {
      name: t.driver_name,
      rating: parseFloat(t.driver_rating),
      vehicleNumber: t.vehicle_number
    }
  };
}

// Demo-only: let customer complete their own trip
export async function demoCompleteTrip(_data, customerUserId, tripId) {
  const { rows: trips } = await query("SELECT * FROM trips WHERE id = $1 AND customer_user_id = $2", [tripId, customerUserId]);
  const trip = trips[0];
  if (!trip) throw new Error("Trip not found.");
  if (trip.status === 'completed') throw new Error("Trip already completed.");

  const now = new Date().toISOString();
  await query("UPDATE trips SET status = 'completed', completed_at = $1 WHERE id = $2", [now, tripId]);

  // Free the driver if one was assigned
  if (trip.driver_id) {
    const payout = parseFloat(trip.driver_payout);
    await query("UPDATE drivers SET status = 'free', current_trip_id = NULL, lifetime_earnings = lifetime_earnings + $1 WHERE id = $2", [payout, trip.driver_id]);
  }

  const { rows } = await query("SELECT * FROM trips WHERE id = $1", [tripId]);
  return rows[0];
}
