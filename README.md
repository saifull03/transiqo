# 🚗 RideBuzz (RideX) - Full-Stack MERN Ride-Sharing Platform

**RideBuzz** is a full-stack ride-sharing application built with MongoDB, Express, React, and Node.js. It combines real-time Socket.IO messaging, Leaflet map routing, dynamic fare calculation, cash payment flow, and separate passenger/driver dashboards.

---

## ✨ Key Features

### 👤 Passenger Experience

- Interactive pickup/dropoff selection on a Leaflet-powered map.
- Automatic OSRM routing with distance and time estimates.
- Live driver assignment and trip status updates.
- Cash payment confirmation and ride review submission.

### 🚕 Driver Experience

- Online/offline availability toggle.
- Real-time ride requests delivered instantly.
- Full trip lifecycle control: accept, start, complete, and confirm payment.
- Driver earnings and completed ride tracking.

### ⚡ Platform Highlights

- Real-time communication via Socket.IO.
- JWT-based authentication and MongoDB persistence.
- Responsive React frontend with Vite and Tailwind CSS.
- Receipt-friendly trip summaries for printing or download.

---

## 🛠️ Tech Stack

- Frontend: React, Vite, Tailwind CSS, React-Leaflet, Leaflet, Axios, Socket.IO Client.
- Backend: Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT, Bcrypt.
- APIs: OpenStreetMap / Nominatim geocoding, OSRM routing.

---

## 📂 Project Structure

```text
rideBuzz/
├── backend/
│   ├── config/           # Database connection and environment config
│   ├── controllers/      # Auth, ride, and review business logic
│   ├── middleware/       # JWT auth and rider authorization
│   ├── models/           # Mongoose schemas for User, Rider, Ride, Review
│   ├── routes/           # Express API routes
│   ├── utils/            # Helper utilities
│   ├── package.json      # Backend dependencies
│   └── server.js         # Express + Socket.IO server entrypoint
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI and dashboard components
    │   ├── context/      # Global auth and session state
    │   ├── pages/        # App views: Home, Dashboard, Login, Register, History
    │   ├── App.jsx       # Root component and router setup
    │   └── main.jsx      # React DOM entry point
    ├── package.json      # Frontend dependencies
    └── vite.config.js    # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or newer
- MongoDB (local or Atlas)

### Backend Setup

1. Create a `.env` file inside `backend/`.
2. Add the required values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ridex
JWT_SECRET=supersecret_jwt_key_ridex
```

3. Install dependencies and start the server:

```bash
cd backend
npm install
node server.js
```

By default, the backend will run on `http://localhost:5000` unless `PORT` is changed in `.env`.

### Frontend Setup

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend is served by Vite, typically at `http://localhost:5173`.

---

## 📡 API Overview

### Authentication

- `POST /api/auth/register/user` — Register a passenger.
- `POST /api/auth/register/rider` — Register a driver.
- `POST /api/auth/login` — Login and receive a JWT.
- `GET /api/auth/profile` — Get authenticated user profile.
- `PUT /api/auth/rider/status` — Update driver availability.
- `PUT /api/auth/profile/picture` — Update profile image.
- `PUT /api/auth/profile/update` — Update account details.

### Rides

- `POST /api/rides/request` — Request a new ride.
- `GET /api/rides/history` — Retrieve ride history.
- `GET /api/rides/:id/receipt` — Fetch trip receipt data.
- `PUT /api/rides/:id/status` — Update ride status.
- `PUT /api/rides/:id/payment` — Confirm cash payment.

### Reviews

- `POST /api/reviews` — Submit a ride review.
- `GET /api/reviews/my` — Get review history.

---

## 🔌 Socket.IO Events

| Event               | Direction       | Purpose                                                    |
| ------------------- | --------------- | ---------------------------------------------------------- |
| `join`              | Client ➔ Server | Subscribe to a user/rider room or the general riders room. |
| `rideRequest`       | Client ➔ Server | Send a new ride request to online drivers.                 |
| `newRideRequest`    | Server ➔ Client | Broadcast a ride opportunity to available drivers.         |
| `rideAccepted`      | Client/Server   | Notify passenger that a driver accepted the ride.          |
| `removeRideRequest` | Server ➔ Client | Remove the ride from other drivers' queues.                |
| `rideStarted`       | Client/Server   | Notify passenger that the ride has started.                |
| `rideCompleted`     | Client/Server   | Notify passenger that the ride is complete.                |
| `paymentConfirmed`  | Client/Server   | Confirm cash payment and finish the ride.                  |

---

## 📝 Notes

- Backend depends on `.env` values for `PORT`, `MONGO_URI`, and `JWT_SECRET`.
- Frontend uses Vite and communicates with the backend over Axios + Socket.IO.

---

## 🛡️ License

This project is licensed under the ISC License.
