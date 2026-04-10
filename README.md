# TransiQo

TransiQo is a MERN ride-sharing starter project with:

- React frontend with protected routes
- Express and MongoDB backend
- JWT-based login and registration
- Map-based pickup and destination selection with Leaflet and OpenStreetMap
- Ride fare estimation and booking history

## Project structure

```text
transiqo/
  backend/
  frontend/
```

## Backend setup

1. Copy `backend/.env.example` to `backend/.env`
2. Update `MONGODB_URI` and `JWT_SECRET`
3. Install dependencies:

```bash
cd backend
npm install
```

4. Start the backend:

```bash
npm run dev
```

## Frontend setup

1. Copy `frontend/.env.example` to `frontend/.env`
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Start the frontend:

```bash
npm run dev
```

## API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/rides/estimate`
- `POST /api/rides/book`
- `GET /api/rides/my-rides`

## Suggested next upgrades

- Reverse geocoding for readable addresses
- Real route calculation with Mapbox Directions or Google Directions API
- Driver-side app and live ride status updates
- Payment integration and admin dashboard
