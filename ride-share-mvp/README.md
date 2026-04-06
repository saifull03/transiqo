# Ride Share MVP (MERN)

This repository contains a complete MERN stack ride-sharing MVP with real-time features.

## Project structure

- `backend/` - Express API, MongoDB models, JWT auth, Socket.IO events.
- `frontend/` - Vite + React interface with Google Maps integration.

## Local setup

### Backend

```bash
cd ride-share-mvp/backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd ride-share-mvp/frontend
cp .env.example .env
npm install
npm run dev
```

## Notes

- The backend uses JWT authentication and role-based access for riders and drivers.
- Drivers are tracked using geospatial indexing and nearby drivers are notified in real time.
- The frontend includes a rider dashboard for map-based pickup/destination selection and a driver dashboard for accepting requests.
