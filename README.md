# Basha Travels (Taxi Redesign)

A modern, full-stack ride-booking web application featuring a sleek Customer booking flow, a real-time Driver interface, and a comprehensive Admin dashboard. Built with React (Vite) and Node.js/Express.

## Features

* **Customer Portal**: 
  * Premium, animated UI with an Ola/Uber-style booking experience.
  * Real-time ride pricing based on distance and car type.
  * Advance booking (schedule rides for later dates/times).
  * Interactive "Waiting for Driver / Radar" animations and live trip tracking with a receipt upon completion.
  * Choose pickup and dropoff from major Karnataka locations (e.g. Majestic East, Hubballi Junction, Belagavi Fort, etc).
* **Driver Portal**:
  * Clean, mobile-first interface.
  * Toggle "Online/Offline" availability.
  * Real-time visual alerts for incoming ride requests (Accept / Reject).
  * Manage active ride state (Start / Complete Trip).
* **Admin Dashboard**:
  * Real-time overview of active trips, free drivers, and daily revenue statistics.
  * Dynamic Revenue by Car Type chart based on completed fares.
  * Manage Car Types (Min Fare, Base Fare, Rate Per Km).
  * Manage Drivers (Add new drivers with specific vehicles and car types).

## Tech Stack

* **Frontend**: React 18, React Router, Vite, custom vanilla CSS styling (dark mode).
* **Backend**: Node.js, Express, mock JSON file-based database (`store.js`).

## Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/wasi-ahmedd/Basha-travels.git
   cd Basha-travels
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application (starts both frontend Vite dev server and backend Express server concurrently):
   ```bash
   npm run dev
   ```

The application will be available at: `http://localhost:5173`
The backend API runs on: `http://localhost:3000`

## Demo Credentials

The database is seeded with mock users upon the first run. You can use these credentials to test the portals:

**Customer**
* Username: `customer`
* Password: `password`

**Driver**
* Username: `driver2` (or `driver1`, `driver3`, etc.)
* Password: `password`

**Admin**
* Username: `admin`
* Password: `password`
