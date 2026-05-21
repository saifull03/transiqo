# ⚡ transiQo — Full-Stack MERN Ride-Sharing Platform

**transiQo** is a modern, full-stack ride-sharing application built with the MERN stack (MongoDB, Express, React, Node.js). It features real-time Socket.IO communication, Leaflet-powered map routing, dynamic fare calculation, a cash payment flow, and separate dashboards for passengers, drivers, and admins.

---

## ✨ Key Features

### 👤 Passenger Experience

- Interactive pickup/dropoff selection on a Leaflet-powered map.
- Automatic OSRM routing with live distance and time estimates.
- Real-time driver assignment and trip status updates via Socket.IO.
- Cash payment confirmation and post-ride review submission.
- Ride history with printable/downloadable PDF receipts.

### 🚕 Driver Experience

- Online/offline availability toggle with persistence.
- Real-time ride request notifications delivered instantly.
- Full trip lifecycle control: accept → start → complete → confirm payment.
- Earnings dashboard with completed ride tracking.
- Profile management including profile picture uploads.

### 🛡️ Admin Experience

- Admin dashboard with platform-wide statistics.
- User and rider management.
- Ride oversight and monitoring.
- Auto-seeded admin account on first startup.

### ⚡ Platform Highlights

- Real-time bi-directional communication via Socket.IO.
- JWT-based authentication with bcrypt password hashing.
- Responsive React frontend built with Vite and Tailwind CSS.
- Glassmorphism-styled dark UI with micro-animations.
- Receipt-friendly trip summaries (print or download as PDF).

---

## 🛠️ Tech Stack

| Layer       | Technology                                              |
|-------------|--------------------------------------------------------|
| **Frontend**  | React 18, Vite, Tailwind CSS, React-Leaflet, Axios, Socket.IO Client |
| **Backend**   | Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT, Bcrypt |
| **Database**  | MongoDB (local or Atlas)                              |
| **APIs**      | OpenStreetMap / Nominatim geocoding, OSRM routing     |

---

## 📂 Project Structure

```text
transiQo/
├── backend/
│   ├── config/           # Database connection (db.js)
│   ├── controllers/      # Auth, ride, review, and admin logic
│   ├── middleware/       # JWT auth and rider authorization
│   ├── models/           # Mongoose schemas: User, Rider, Ride, Review
│   ├── routes/           # Express API route definitions
│   ├── utils/            # Helper utilities (seedAdmin.js)
│   ├── .env              # Environment variables (not committed)
│   ├── package.json      # Backend dependencies
│   └── server.js         # Express + Socket.IO server entrypoint
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI: Navbar, ReceiptModal, dashboard panels
    │   ├── context/      # Global AuthContext for session state
    │   ├── pages/        # App views: Home, Dashboard, Admin, Login, Register, History
    │   ├── App.jsx       # Root component and router setup
    │   └── main.jsx      # React DOM entry point
    ├── index.html        # HTML shell with transiQo title
    ├── package.json      # Frontend dependencies
    └── vite.config.js    # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or newer
- MongoDB (local instance or MongoDB Atlas)

---

### 1. Clone the Repository

```bash
git clone https://github.com/saifull03/transiQo.git
cd transiQo
```

---

### 2. Backend Setup

Navigate to the `backend` folder and create a `.env` file:

```bash
cd backend
```

Create `.env` with the following values:

```env
PORT=5003
MONGO_URI=mongodb://127.0.0.1:27017/transiqo
JWT_SECRET=your_strong_jwt_secret_here
```

Install dependencies and start the server:

```bash
npm install
node server.js
```

The backend runs on `http://localhost:5003` by default.

> 🔑 **Auto-seeded Admin Account** — On first startup, an admin account is automatically created:
> - **Email:** `admin@transiqo.com`
> - **Password:** `admin123`

---

### 3. Frontend Setup

Open a new terminal, navigate to the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend is served by Vite at `http://localhost:5173`.

---

## 📡 API Overview

### Authentication (`/api/auth`)

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| POST   | `/register/user`            | Register a new passenger           |
| POST   | `/register/rider`           | Register a new driver              |
| POST   | `/login`                    | Login and receive a JWT token      |
| GET    | `/profile`                  | Get authenticated user profile     |
| PUT    | `/rider/status`             | Toggle driver online/offline       |
| PUT    | `/profile/picture`          | Upload/update profile picture      |
| PUT    | `/profile/update`           | Update account details             |

### Rides (`/api/rides`)

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| POST   | `/request`           | Request a new ride                 |
| GET    | `/history`           | Get ride history for current user  |
| GET    | `/:id/receipt`       | Fetch receipt data for a trip      |
| PUT    | `/:id/status`        | Update ride status                 |
| PUT    | `/:id/payment`       | Confirm cash payment               |

### Reviews (`/api/reviews`)

| Method | Endpoint  | Description                  |
|--------|-----------|------------------------------|
| POST   | `/`       | Submit a review for a ride   |
| GET    | `/my`     | Get current user's reviews   |

### Admin (`/api/admin`)

| Method | Endpoint    | Description                        |
|--------|-------------|------------------------------------|
| GET    | `/stats`    | Platform-wide statistics           |
| GET    | `/users`    | List all users                     |
| GET    | `/riders`   | List all drivers                   |
| GET    | `/rides`    | List all rides                     |

---

## 🔌 Socket.IO Events

| Event               | Direction       | Purpose                                                     |
|---------------------|-----------------|-------------------------------------------------------------|
| `join`              | Client → Server | Subscribe to a user/rider room or the shared riders room.   |
| `rideRequest`       | Client → Server | Send a new ride request to all online drivers.              |
| `newRideRequest`    | Server → Client | Broadcast a ride opportunity to available drivers.          |
| `rideAccepted`      | Bidirectional   | Notify passenger that a driver has accepted.                |
| `removeRideRequest` | Server → Client | Remove the ride from other drivers' active queues.          |
| `rideStarted`       | Bidirectional   | Notify passenger that the ride has begun.                   |
| `rideCompleted`     | Bidirectional   | Notify passenger that the trip is complete.                 |
| `paymentConfirmed`  | Bidirectional   | Confirm cash payment and close the ride lifecycle.          |
| `rideCancelled`     | Bidirectional   | Handle ride cancellation by passenger or driver.            |
| `updateLocation`    | Client → Server | Stream driver's live GPS location to the ride room.         |
| `riderLocationUpdated` | Server → Client | Push live driver location to the passenger's map.        |

---

## 🔐 Environment Variables

| Variable     | Description                                | Example                                      |
|--------------|--------------------------------------------|----------------------------------------------|
| `PORT`       | Port the backend server listens on         | `5003`                                       |
| `MONGO_URI`  | MongoDB connection string                  | `mongodb://127.0.0.1:27017/transiqo`         |
| `JWT_SECRET` | Secret key used to sign JWT tokens         | `your_strong_jwt_secret_here`                |

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

---

## 📝 Notes

- The `transiQo_user` key in `localStorage` stores the authenticated session on the frontend.
- The backend auto-seeds an admin user on first run if one does not already exist.
- All passwords are hashed using bcrypt before being stored in MongoDB.
- The frontend communicates with the backend via Axios (REST) and Socket.IO (real-time).

---

## 🛡️ License

This project is licensed under the ISC License.

---

<div align="center">
  <strong>Built with ⚡ by the transiQo team</strong>
</div>
