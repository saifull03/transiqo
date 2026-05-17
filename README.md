# 🚗 RideBuzz (RideX) - Full-Stack MERN Ride-Sharing Platform

**RideBuzz** is a modern, production-ready ride-sharing web application built on the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time Socket.IO bi-directional communication, interactive Leaflet maps with OSRM routing, dynamic fare calculations, professional PDF receipt generation, and dedicated role-based dashboards for passengers and drivers.

---

## ✨ Key Features

### 👤 Passenger Workflow
- **Interactive Route Selection**: Click anywhere on the OpenStreetMap/Leaflet map to set Pickup and Dropoff locations.
- **Automatic OSRM Routing**: Instantly calculates driving polyline, distance (km), and estimated travel time (min).
- **Dynamic Fare Calculation**: Transparent pricing model based on base fare, per-kilometer rate, and per-minute duration.
- **Real-Time Driver Tracking**: View driver details (name, phone, star rating, vehicle make/model, license plate) the moment a ride is accepted.
- **Live Trip Timer**: Displays active trip elapsed time during the journey.
- **Cash Payment & Rating System**: Complete cash payments and submit comprehensive 1-to-5 star reviews with comments.

### 🚕 Driver (Rider) Workflow
- **Persistent Online Status**: Toggle availability status ("Go Online" / "Go Offline") with automatic MongoDB persistence and local storage session synchronization across page refreshes.
- **Instant Ride Requests**: Receive real-time broadcasted ride opportunities with passenger details and pickup/dropoff addresses.
- **Full Trip Lifecycle Management**: Seamlessly transition rides through `accepted` ➔ `started` ➔ `completed` ➔ `cash collected`.
- **Earnings & Rating Dashboard**: Track total completed rides, accumulated cash earnings, and passenger review history.

### ⚡ Core Infrastructure
- **Real-Time Socket.IO Engine**: Instantaneous event-driven updates for ride requests, acceptance, trip initiation, completion, and payment confirmation.
- **Professional Receipt Export**: Dedicated receipt viewing modal with automated dynamic `document.title` synchronization (`Transiqo-invoice-[id]`) for professional PDF printing and downloading.
- **Robust State Synchronization**: Advanced React lifecycle management ensuring flawless map resets and clean dashboard transitions between active and completed rides.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React-Leaflet, Leaflet, Axios, Socket.IO-Client.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Socket.IO, JSON Web Tokens (JWT), Bcrypt.
- **APIs & Geocoding**: OpenStreetMap (Nominatim Reverse Geocoding), OSRM (Open Source Routing Machine API).

---

## 📂 Project Structure

```text
rideBuzz/
├── backend/
│   ├── controllers/      # Business logic (authController, rideController, reviewController)
│   ├── middleware/       # JWT authentication & role authorization guards (protect, rider)
│   ├── models/           # Mongoose schemas (User, Rider, Ride, Review)
│   ├── routes/           # Express API endpoints (authRoutes, rideRoutes, reviewRoutes)
│   ├── utils/            # Helper utilities (generateToken)
│   ├── package.json      # Backend dependencies
│   └── server.js         # Express server & Socket.IO real-time engine setup
│
└── frontend/
    ├── src/
    │   ├── components/   # Modular UI components (UserPanel, RiderPanel, RideMap, ReceiptModal)
    │   ├── context/      # Global state management (AuthContext with localStorage sync)
    │   ├── pages/        # Application views (Dashboard, Login, Register, Landing)
    │   ├── App.jsx       # Root component & React Router configuration
    │   └── main.jsx      # React DOM entry point
    ├── package.json      # Frontend dependencies
    └── vite.config.js    # Vite bundler configuration
```

---

## 🚀 Installation & Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas connection string)

### 2. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=5003
MONGO_URI=mongodb://127.0.0.1:27017/ridex
JWT_SECRET=supersecret_jwt_key_ridex
```

### 3. Start the Backend Server
```bash
cd backend
npm install
node server.js
```
*The backend server will start on `http://localhost:5003`.*

### 4. Start the Frontend Development Server
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The application will be accessible at `http://localhost:5173`.*

---

## 📡 REST API Endpoints

### 🔐 Authentication & Profiles (`/api/auth`)
- `POST /register/user` - Register a new passenger
- `POST /register/rider` - Register a new driver with vehicle details
- `POST /login` - Authenticate user/driver and return JWT token
- `GET /profile` - Get authenticated user profile
- `PUT /rider/status` - Update driver online/offline availability
- `PUT /profile/picture` - Update profile picture (Base64 data URI)
- `PUT /profile/update` - Update account details (name, phone)

### 🚗 Rides (`/api/rides`)
- `POST /request` - Create a new ride request
- `GET /history` - Get ride history for the authenticated user/driver
- `GET /:id/receipt` - Fetch detailed fare breakdown and receipt metadata
- `PUT /:id/status` - Update active ride status (`accepted`, `started`, `completed`)
- `PUT /:id/payment` - Confirm cash payment collection

### ⭐ Reviews (`/api/reviews`)
- `POST /` - Submit a trip rating and comment
- `GET /my` - Fetch review history for the authenticated driver/user

---

## 🔌 Socket.IO Event Reference

| Event Name | Direction | Description |
| :--- | :--- | :--- |
| `join` | Client ➔ Server | Subscribes client to personal user room or general `"riders"` broadcast room. |
| `rideRequest` | Client ➔ Server | Passenger broadcasts new ride details and coordinates to all online drivers. |
| `newRideRequest` | Server ➔ Client | Server broadcasts incoming ride opportunity to available drivers. |
| `rideAccepted` | Bi-directional | Driver accepts ride; server routes driver/vehicle profile directly to passenger. |
| `removeRideRequest` | Server ➔ Client | Instructs all other online drivers to remove a newly claimed ride request. |
| `rideStarted` | Bi-directional | Driver initiates trip; passenger dashboard starts live elapsed timer. |
| `rideCompleted`| Bi-directional | Driver completes trip; passenger dashboard displays cash collection prompt. |
| `paymentConfirmed`| Bi-directional | Driver confirms cash receipt; passenger dashboard transitions to review modal. |

---

## 🛡️ License
This project is licensed under the ISC License.
