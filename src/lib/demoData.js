// ─────────────────────────────────────────────────────────────────────────────
// Offline Demo Data & Mock API – mirrors the real server responses exactly
// ─────────────────────────────────────────────────────────────────────────────

// ── Locations (from server/pg-store/math.js) ─────────────────────────────────
const locations = [
  { id: "kempegowda-airport", name: "Kempegowda Airport (Bangalore)", x: 14, y: 22 },
  { id: "majestic-east", name: "Majestic East (Bangalore)", x: 78, y: 34 },
  { id: "hubli", name: "Hubballi Junction (Hubli)", x: 71, y: 61 },
  { id: "sdm-college", name: "SDM College (Dharwad)", x: 23, y: 70 },
  { id: "belgaum-fort", name: "Belagavi Fort (Belgaum)", x: 36, y: 31 },
  { id: "gulbarga-uni", name: "Gulbarga University (Kalaburagi)", x: 52, y: 48 },
  { id: "gol-gumbaz", name: "Gol Gumbaz (Vijayapura)", x: 62, y: 79 },
  { id: "bidar-fort", name: "Bidar Fort (Bidar)", x: 34, y: 56 }
];

// ── Car Types (from server/data/store.json) ──────────────────────────────────
let carTypes = [
  { id: "mini", name: "Hatchback (Swift, i10)", ratePerKm: 14, baseFare: 60, minFare: 120, seats: 4, theme: "#9bb8ff" },
  { id: "sedan", name: "Sedan (Dzire, Aura)", ratePerKm: 18, baseFare: 90, minFare: 160, seats: 4, theme: "#d5b784" },
  { id: "suv", name: "SUV (Innova, Ertiga)", ratePerKm: 24, baseFare: 120, minFare: 220, seats: 6, theme: "#7dd0b8" },
  { id: "executive", name: "Luxury (Camry, Superb)", ratePerKm: 30, baseFare: 180, minFare: 320, seats: 4, theme: "#b3a0ff" }
];

// ── Drivers (from server/data/store.json) ────────────────────────────────────
let drivers = [
  { id: "driver-1", userId: "user-driver-1", name: "Ramesh Kumar", username: "driver1", status: "free", carTypeId: "mini", vehicleNumber: "MH 01 AB 1234 • Maruti Swift", rating: 4.88, locationId: "kempegowda-airport", lifetimeEarnings: 12840, currentTripId: null, contact: "+91 98765 43210" },
  { id: "driver-2", userId: "user-driver-2", name: "Suresh Yadav", username: "driver2", status: "free", carTypeId: "sedan", vehicleNumber: "DL 02 CD 5678 • Maruti Dzire", rating: 4.95, locationId: "majestic-east", lifetimeEarnings: 15560, currentTripId: null, contact: "+91 98765 43211" },
  { id: "driver-3", userId: "user-driver-3", name: "Abdul Khan", username: "driver3", status: "free", carTypeId: "suv", vehicleNumber: "KA 03 EF 9012 • Toyota Innova", rating: 4.92, locationId: "hubli", lifetimeEarnings: 17620, currentTripId: null, contact: "+91 98765 43212" },
  { id: "driver-4", userId: "user-driver-4", name: "Balraj Singh", username: "driver4", status: "free", carTypeId: "executive", vehicleNumber: "PB 04 GH 3456 • Skoda Superb", rating: 4.97, locationId: "sdm-college", lifetimeEarnings: 20840, currentTripId: null, contact: "+91 98765 43213" },
  { id: "driver-5", userId: "user-driver-5", name: "Amit Sharma", username: "driver5", status: "free", carTypeId: "mini", vehicleNumber: "UP 14 XY 7788 • Hyundai i10", rating: 4.75, locationId: "belgaum-fort", lifetimeEarnings: 9400, currentTripId: null, contact: "+91 98765 43214" },
  { id: "driver-6", userId: "user-driver-6", name: "Pramod Patel", username: "driver6", status: "free", carTypeId: "sedan", vehicleNumber: "GJ 05 ZZ 1122 • Hyundai Aura", rating: 4.81, locationId: "gulbarga-uni", lifetimeEarnings: 11050, currentTripId: null, contact: "+91 98765 43215" },
  { id: "driver-7", userId: "user-driver-7", name: "Vikram Reddy", username: "driver7", status: "free", carTypeId: "suv", vehicleNumber: "TS 07 PQ 5544 • Maruti Ertiga", rating: 4.89, locationId: "gol-gumbaz", lifetimeEarnings: 16200, currentTripId: null, contact: "+91 98765 43216" },
  { id: "driver-8", userId: "user-driver-8", name: "Arjun Nair", username: "driver8", status: "free", carTypeId: "mini", vehicleNumber: "KL 01 RT 3344 • Tata Tiago", rating: 4.9, locationId: "bidar-fort", lifetimeEarnings: 14500, currentTripId: null, contact: "+91 98765 43217" },
  { id: "driver-9", userId: "user-driver-9", name: "Manoj Tiwari", username: "driver9", status: "free", carTypeId: "sedan", vehicleNumber: "BR 01 MN 9988 • Honda Amaze", rating: 4.82, locationId: "kempegowda-airport", lifetimeEarnings: 13400, currentTripId: null, contact: "+91 98765 43218" },
  { id: "driver-10", userId: "user-driver-10", name: "Dinesh Gowda", username: "driver10", status: "free", carTypeId: "suv", vehicleNumber: "KA 05 KL 6767 • Mahindra XUV700", rating: 4.96, locationId: "majestic-east", lifetimeEarnings: 19800, currentTripId: null, contact: "+91 98765 43219" },
  { id: "driver-11", userId: "user-driver-11", name: "Rajesh Pillai", username: "driver11", status: "free", carTypeId: "executive", vehicleNumber: "TN 02 BB 1111 • Toyota Camry", rating: 5.0, locationId: "hubli", lifetimeEarnings: 28000, currentTripId: null, contact: "+91 98765 43220" },
  { id: "driver-12", userId: "user-driver-12", name: "Kiran Chetri", username: "driver12", status: "free", carTypeId: "sedan", vehicleNumber: "AS 01 CC 2233 • Maruti Dzire", rating: 4.85, locationId: "sdm-college", lifetimeEarnings: 12500, currentTripId: null, contact: "+91 98765 43221" }
];

// ── In-memory trip store ─────────────────────────────────────────────────────
let trips = [
  {
    id: "trip-live-1", customerUserId: "user-customer-demo", driverId: "driver-2", carTypeId: "sedan",
    pickupId: "kempegowda-airport", dropoffId: "majestic-east", status: "completed",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    assignedAt: new Date(Date.now() - 3400000).toISOString(),
    startedAt: new Date(Date.now() - 3000000).toISOString(),
    completedAt: new Date(Date.now() - 1800000).toISOString(),
    distanceKm: 31.3, durationMin: 119, fare: 814, driverPayout: 602, platformRevenue: 212
  },
  {
    id: "trip-complete-1", customerUserId: "user-customer-demo", driverId: "driver-3", carTypeId: "suv",
    pickupId: "hubli", dropoffId: "belgaum-fort", status: "completed",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    assignedAt: new Date(Date.now() - 85000000).toISOString(),
    startedAt: new Date(Date.now() - 84000000).toISOString(),
    completedAt: new Date(Date.now() - 82000000).toISOString(),
    distanceKm: 22.1, durationMin: 84, fare: 764, driverPayout: 565, platformRevenue: 199
  },
  {
    id: "trip-complete-2", customerUserId: "user-customer-demo", driverId: "driver-6", carTypeId: "sedan",
    pickupId: "gol-gumbaz", dropoffId: "bidar-fort", status: "completed",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    assignedAt: new Date(Date.now() - 171000000).toISOString(),
    startedAt: new Date(Date.now() - 170000000).toISOString(),
    completedAt: new Date(Date.now() - 168000000).toISOString(),
    distanceKm: 17.4, durationMin: 66, fare: 492, driverPayout: 364, platformRevenue: 128
  }
];

// ── Math helpers (ported from server/pg-store/math.js) ───────────────────────
function getLocation(id) {
  return locations.find(l => l.id === id);
}

function calculateDistanceKm(pickupId, dropoffId) {
  const pickup = getLocation(pickupId);
  const dropoff = getLocation(dropoffId);
  if (!pickup || !dropoff) return 10;
  const dx = dropoff.x - pickup.x;
  const dy = dropoff.y - pickup.y;
  return Number(Math.max(2.8, Math.sqrt(dx * dx + dy * dy) * 0.48).toFixed(1));
}

function createRoutePoints(pickupId, dropoffId) {
  const pickup = getLocation(pickupId);
  const dropoff = getLocation(dropoffId);
  if (!pickup || !dropoff) return [];
  const midX = Number(((pickup.x + dropoff.x) / 2).toFixed(1));
  const midY = Number(((pickup.y + dropoff.y) / 2).toFixed(1));
  const curve = ((pickup.x + dropoff.y) % 2 === 0 ? 6 : -6);
  return [
    { x: pickup.x, y: pickup.y },
    { x: Number((midX - curve).toFixed(1)), y: Number((midY - 4).toFixed(1)) },
    { x: Number((midX + curve).toFixed(1)), y: Number((midY + 6).toFixed(1)) },
    { x: dropoff.x, y: dropoff.y }
  ];
}

function calculateEta(driverLocationId, pickupId) {
  return Math.max(3, Math.round(calculateDistanceKm(driverLocationId, pickupId) * 1.6));
}

function calculateTripMetrics(carType, pickupId, dropoffId) {
  const distanceKm = calculateDistanceKm(pickupId, dropoffId);
  const durationMin = Math.max(10, Math.round(distanceKm * 3.8));
  const rawFare = carType.baseFare + distanceKm * carType.ratePerKm + durationMin * 1.35;
  const fare = Math.max(carType.minFare, Math.round(rawFare));
  const driverPayout = Math.round(fare * 0.74);
  return {
    distanceKm, durationMin, fare, driverPayout,
    platformRevenue: fare - driverPayout,
    routePoints: createRoutePoints(pickupId, dropoffId)
  };
}

// ── User session data ────────────────────────────────────────────────────────
const DEMO_USERS = {
  customer: { id: "user-customer-demo", role: "customer", displayName: "Riya Sen", email: "riya@example.com" },
  admin: { id: "user-admin", role: "admin", displayName: "Admin", username: "admin" },
  driver1: { id: "user-driver-1", role: "driver", displayName: "Ramesh Kumar", username: "driver1" }
};

let tripIdCounter = 100;

// ── Helper: enrich a trip with location/car/driver details ───────────────────
function enrichTrip(trip) {
  const pickup = getLocation(trip.pickupId);
  const dropoff = getLocation(trip.dropoffId);
  const carType = carTypes.find(c => c.id === trip.carTypeId);
  const driver = drivers.find(d => d.id === trip.driverId);
  const routePoints = createRoutePoints(trip.pickupId, trip.dropoffId);
  return {
    ...trip,
    pickup, dropoff, carType: carType ? { name: carType.name } : null,
    routePoints,
    driver: driver ? { name: driver.name, rating: driver.rating, vehicleNumber: driver.vehicleNumber } : null,
    etaMin: driver ? calculateEta(driver.locationId, trip.pickupId) : 5
  };
}

// ── Mock endpoint handlers ───────────────────────────────────────────────────
const handlers = {
  // ── Auth ─────────────────────────────────────
  "POST /api/auth/customer/login": () => ({
    token: "demo-customer-token",
    user: { ...DEMO_USERS.customer }
  }),

  "POST /api/auth/customer/signup": () => ({
    token: "demo-customer-token",
    user: { ...DEMO_USERS.customer }
  }),

  "POST /api/auth/admin/login": () => ({
    token: "demo-admin-token",
    user: { ...DEMO_USERS.admin }
  }),

  "POST /api/auth/driver/login": () => ({
    token: "demo-driver-token",
    user: { ...DEMO_USERS.driver1 }
  }),

  "POST /api/auth/google": () => ({
    token: "demo-customer-token",
    user: { ...DEMO_USERS.customer }
  }),

  // ── Bootstrap ────────────────────────────────
  "GET /api/bootstrap": () => ({ locations }),

  "GET /api/me": (_body, _params, token) => {
    if (token?.includes("admin")) return { user: DEMO_USERS.admin };
    if (token?.includes("driver")) return { user: DEMO_USERS.driver1 };
    return { user: DEMO_USERS.customer };
  },

  // ── Customer Dashboard ───────────────────────
  "GET /api/customer/dashboard": () => {
    const customerTrips = trips.filter(t => t.customerUserId === "user-customer-demo");
    const activeTrip = customerTrips.find(t => t.status !== "completed" && t.status !== "cancelled");
    const tripHistory = customerTrips
      .filter(t => t.status === "completed" || t.status === "cancelled")
      .slice(0, 10)
      .map(t => ({
        id: t.id, fare: t.fare, status: t.status, carTypeId: t.carTypeId,
        createdAt: t.createdAt, completedAt: t.completedAt,
        pickup: getLocation(t.pickupId), dropoff: getLocation(t.dropoffId),
        driver: drivers.find(d => d.id === t.driverId) ? { name: drivers.find(d => d.id === t.driverId).name } : null
      }));

    return {
      activeTrip: activeTrip ? enrichTrip(activeTrip) : null,
      tripHistory,
      locations,
      carTypes
    };
  },

  // ── Customer Availability ────────────────────
  "GET /api/customer/availability": () => {
    // Return all car type IDs (in demo, all are always available)
    return carTypes.map(ct => ct.id);
  },

  // ── Customer Quote ───────────────────────────
  "POST /api/customer/quote": (body) => {
    const carType = carTypes.find(c => c.id === body.carTypeId);
    if (!carType) throw new Error("Invalid car type.");
    const distanceKm = calculateDistanceKm(body.pickupId, body.dropoffId);
    const durationMin = Math.max(10, Math.round(distanceKm * 3.8));
    const rawFare = carType.baseFare + distanceKm * carType.ratePerKm + durationMin * 1.35;
    const fare = Math.max(carType.minFare, Math.round(rawFare));
    return { fare, durationMin, distanceKm, routePoints: createRoutePoints(body.pickupId, body.dropoffId) };
  },

  // ── Customer Book Trip ───────────────────────
  "POST /api/customer/trips": (body) => {
    const carType = carTypes.find(c => c.id === body.carTypeId);
    if (!carType) throw new Error("Invalid car type.");
    const metrics = calculateTripMetrics(carType, body.pickupId, body.dropoffId);
    const tripId = `trip-demo-${tripIdCounter++}`;
    const newTrip = {
      id: tripId, customerUserId: "user-customer-demo", driverId: null,
      carTypeId: body.carTypeId, pickupId: body.pickupId, dropoffId: body.dropoffId,
      status: "pending_acceptance", createdAt: new Date().toISOString(),
      assignedAt: null, startedAt: null, completedAt: null,
      ...metrics
    };
    trips.unshift(newTrip);
    return newTrip;
  },

  // ── Customer Demo-Advance Trip ───────────────
  "POST /api/customer/trips/:tripId/demo-advance": (_body, params) => {
    const trip = trips.find(t => t.id === params.tripId);
    if (!trip) throw new Error("Trip not found.");
    // Find a free driver
    const freeDriver = drivers.find(d => d.status === "free") || drivers[0];
    trip.status = "in_progress";
    trip.driverId = freeDriver.id;
    trip.assignedAt = new Date().toISOString();
    trip.startedAt = new Date().toISOString();
    freeDriver.status = "on_trip";
    freeDriver.currentTripId = trip.id;
    return enrichTrip(trip);
  },

  // ── Customer Complete Trip ───────────────────
  "POST /api/customer/trips/:tripId/complete": (_body, params) => {
    const trip = trips.find(t => t.id === params.tripId);
    if (!trip) throw new Error("Trip not found.");
    trip.status = "completed";
    trip.completedAt = new Date().toISOString();
    // Free the driver
    if (trip.driverId) {
      const driver = drivers.find(d => d.id === trip.driverId);
      if (driver) {
        driver.status = "free";
        driver.currentTripId = null;
        driver.lifetimeEarnings += trip.driverPayout;
      }
    }
    return trip;
  },

  // ── Admin Dashboard ──────────────────────────
  "GET /api/admin/dashboard": () => {
    const allTrips = [...trips];
    const activeTrips = allTrips.filter(t => t.status === "assigned" || t.status === "in_progress");
    const completedTrips = allTrips.filter(t => t.status === "completed");
    const freeDriversList = drivers.filter(d => d.status === "free");

    // Base historical revenue (impressive demo numbers in lakhs)
    const baseGrossRevenue = 847000;
    const baseDriverPayouts = 627000;
    const baseTotalTrips = 1284;

    const grossRevenue = baseGrossRevenue + completedTrips.reduce((sum, t) => sum + t.fare, 0);
    const driverPayouts = baseDriverPayouts + completedTrips.reduce((sum, t) => sum + t.driverPayout, 0);
    const platformEarnings = grossRevenue - driverPayouts;

    const revenueByCarType = carTypes.map(ct => {
      // Base revenue spread across car types
      const baseRevenues = { mini: 185000, sedan: 276000, suv: 248000, executive: 138000 };
      return {
        id: ct.id, name: ct.name,
        total: (baseRevenues[ct.id] || 50000) + completedTrips.filter(t => t.carTypeId === ct.id).reduce((s, t) => s + t.fare, 0)
      };
    });

    const enrichedDrivers = drivers.map(d => ({
      ...d,
      carType: carTypes.find(c => c.id === d.carTypeId),
      location: getLocation(d.locationId),
      auth: { username: d.username, passwordHash: "••••••••" }
    }));

    const recentTrips = allTrips.slice(0, 10).map(t => ({
      ...t,
      pickup: getLocation(t.pickupId), dropoff: getLocation(t.dropoffId),
      carType: carTypes.find(c => c.id === t.carTypeId),
      customer: { name: "Riya Sen", phone: "+91 90000 00001" },
      driver: drivers.find(d => d.id === t.driverId) ? { name: drivers.find(d => d.id === t.driverId).name, rating: drivers.find(d => d.id === t.driverId).rating } : null
    }));

    return {
      metrics: {
        grossRevenue, platformEarnings, driverPayouts,
        activeTrips: activeTrips.length,
        freeDrivers: freeDriversList.length,
        totalTrips: baseTotalTrips + allTrips.length,
        revenueByCarType
      },
      activeTrips: activeTrips.map(t => ({
        ...t,
        pickup: getLocation(t.pickupId), dropoff: getLocation(t.dropoffId),
        carType: carTypes.find(c => c.id === t.carTypeId),
        customer: { name: "Riya Sen" },
        driver: drivers.find(d => d.id === t.driverId) ? { name: drivers.find(d => d.id === t.driverId).name, rating: drivers.find(d => d.id === t.driverId).rating } : null
      })),
      freeDrivers: freeDriversList,
      drivers: enrichedDrivers,
      recentTrips,
      carTypes
    };
  },

  // ── Admin Add Car Type ───────────────────────
  "POST /api/admin/car-types": (body) => {
    const newCt = { id: `ct-${Date.now()}`, ...body };
    carTypes.push(newCt);
    return newCt;
  },

  // ── Admin Add Driver ─────────────────────────
  "POST /api/admin/drivers": (body) => {
    const newDriver = {
      id: `driver-${Date.now()}`, userId: `user-driver-${Date.now()}`,
      name: body.name, username: body.username, status: "free",
      carTypeId: body.carTypeId, vehicleNumber: body.vehicleNumber,
      rating: 5.0, locationId: "kempegowda-airport",
      lifetimeEarnings: 0, currentTripId: null, contact: body.contact
    };
    drivers.push(newDriver);
    return newDriver;
  },

  // ── Driver Dashboard ─────────────────────────
  "GET /api/driver/dashboard": () => {
    const d = drivers[0]; // Demo uses driver-1
    const driverTrips = trips.filter(t => t.driverId === d.id);
    const activeTrip = driverTrips.find(t =>
      t.status === "pending_acceptance" || t.status === "assigned" || t.status === "in_progress"
    );
    const tripHistory = driverTrips.filter(t => t.status === "completed").map(t => ({
      ...t,
      pickup: getLocation(t.pickupId), dropoff: getLocation(t.dropoffId),
      customer: { name: "Riya Sen", phone: "+91 90000 00001" }
    }));
    return {
      profile: {
        ...d,
        carType: carTypes.find(c => c.id === d.carTypeId),
        earningsToday: driverTrips.filter(t => t.status === "completed").reduce((s, t) => s + t.driverPayout, 0)
      },
      activeTrip: activeTrip ? {
        ...enrichTrip(activeTrip),
        customer: { name: "Riya Sen", phone: "+91 90000 00001" }
      } : null,
      tripHistory
    };
  },

  // ── Driver Availability ──────────────────────
  "POST /api/driver/availability": (body) => {
    const d = drivers[0];
    d.status = body.available ? "free" : "offline";
    return { status: d.status };
  },

  // ── Driver Trip Actions ──────────────────────
  "POST /api/driver/trips/:tripId/accept": (_body, params) => {
    const trip = trips.find(t => t.id === params.tripId);
    if (trip) { trip.status = "assigned"; trip.assignedAt = new Date().toISOString(); }
    return trip || {};
  },

  "POST /api/driver/trips/:tripId/reject": (_body, params) => {
    const trip = trips.find(t => t.id === params.tripId);
    if (trip) { trip.status = "cancelled"; }
    return trip || {};
  },

  "POST /api/driver/trips/:tripId/start": (_body, params) => {
    const trip = trips.find(t => t.id === params.tripId);
    if (trip) { trip.status = "in_progress"; trip.startedAt = new Date().toISOString(); }
    return trip || {};
  },

  "POST /api/driver/trips/:tripId/complete": (_body, params) => {
    const trip = trips.find(t => t.id === params.tripId);
    if (trip) {
      trip.status = "completed";
      trip.completedAt = new Date().toISOString();
      const d = drivers[0];
      d.status = "free";
      d.currentTripId = null;
      d.lifetimeEarnings += trip.driverPayout;
    }
    return trip || {};
  }
};

// ── Route matcher ────────────────────────────────────────────────────────────
function matchRoute(method, path) {
  const key = `${method} ${path}`;
  // Direct match
  if (handlers[key]) return { handler: handlers[key], params: {} };
  // Pattern match (for :tripId etc.)
  for (const pattern of Object.keys(handlers)) {
    const [pMethod, pPath] = pattern.split(" ");
    if (pMethod !== method) continue;
    const patternParts = pPath.split("/");
    const pathParts = path.split("?")[0].split("/");
    if (patternParts.length !== pathParts.length) continue;
    const params = {};
    let match = true;
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(":")) {
        params[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        match = false; break;
      }
    }
    if (match) return { handler: handlers[pattern], params };
  }
  return null;
}

// ── Main export: mock apiFetch ───────────────────────────────────────────────
export async function demoApiFetch(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const body = options.body || {};
  const token = options.token || "";

  // Small delay to feel realistic
  await new Promise(r => setTimeout(r, 150 + Math.random() * 200));

  const cleanPath = path.split("?")[0];
  const result = matchRoute(method, cleanPath);

  if (!result) {
    console.warn(`[DemoAPI] No handler for ${method} ${path}`);
    return {};
  }

  try {
    const data = result.handler(body, result.params, token);
    return data;
  } catch (err) {
    throw new Error(err.message || "Demo API error");
  }
}
