# Ride Share Backend

A Node.js + Express backend for the Ride Share MVP.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI` to your MongoDB connection string.
3. Set `JWT_SECRET` to a strong secret.
4. Install dependencies:

```bash
npm install
```

## Run

```bash
npm run dev
```

The backend listens on http://localhost:5000 by default.

## Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `POST /ride/request`
- `POST /ride/accept`
- `GET /ride`
- `POST /driver/availability`
- `POST /driver/location`
