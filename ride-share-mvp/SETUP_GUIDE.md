# Ride Share MVP - Complete MERN Stack Implementation

## Overview

This is a production-ready ride-sharing MVP built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes real-time features using Socket.IO, JWT authentication, geospatial driver tracking, and Google Maps integration.

## Features

- **Authentication**: JWT-based login/register for users and drivers
- **Real-time Communication**: Socket.IO for instant ride requests and notifications
- **Geospatial Tracking**: MongoDB 2dsphere indexing for nearby driver queries
- **Map Integration**: Google Maps for pickup/destination selection
- **Role-based Access**: Separate dashboards for riders and drivers
- **Fare Estimation**: Distance-based pricing with Haversine formula

## Project Structure

```
ride-share-mvp/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── driverController.js
│   │   └── rideController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── role.js
│   ├── models/
│   │   ├── Driver.js
│   │   ├── Ride.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── driver.js
│   │   └── ride.js
│   ├── sockets/index.js
│   ├── utils/fare.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── api/api.js
│   │   ├── components/
│   │   │   ├── DriverDashboard.js
│   │   │   ├── MapPicker.js
│   │   │   └── UserDashboard.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   └── RegisterPage.js
│   │   ├── services/socket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- Google Maps JavaScript API key

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd ride-share-mvp/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values:

   ```
   MONGO_URI=mongodb://127.0.0.1:27017/rideshare
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NEARBY_RADIUS_METERS=5000
   ```

4. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd ride-share-mvp/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values:

   ```
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Ride Management

#### Request Ride (User only)

```http
POST /ride/request
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "pickup": { "lat": 37.7749, "lng": -122.4194 },
  "destination": { "lat": 37.7849, "lng": -122.4094 }
}
```

#### Accept Ride (Driver only)

```http
POST /ride/accept
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "rideId": "60d5ecb74b24c72b8c8b4567",
  "driverId": "60d5ecb74b24c72b8c8b4568"
}
```

#### Get Rides

```http
GET /ride
Authorization: Bearer <jwt_token>
```

### Driver Management

#### Set Availability (Driver only)

```http
POST /driver/availability
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "isAvailable": true
}
```

#### Update Location (Driver only)

```http
POST /driver/location
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "lat": 37.7749,
  "lng": -122.4194
}
```

## Socket.IO Events

### Client to Server

- `register-user`: Register user socket (payload: `{ userId }`)
- `driver-online`: Mark driver as online (payload: `{ driverId }`)
- `update-location`: Update driver location (payload: `{ driverId, lat, lng }`)
- `accept-ride`: Accept a ride request (payload: `{ rideId, driverId }`)

### Server to Client

- `new-ride`: New ride request for driver (payload: `{ ride }`)
- `ride-accepted`: Ride accepted notification for user (payload: `{ rideId, driverId, status }`)
- `ride-error`: Error accepting ride (payload: `{ message }`)

## Usage Flow

1. **User Registration/Login**: Create account or login
2. **User Dashboard**: Select pickup and destination on map, request ride
3. **Driver Dashboard**: Go online, receive real-time ride requests, accept rides
4. **Real-time Updates**: Users get instant notifications when rides are accepted

## Database Models

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'driver'
}
```

### Driver

```javascript
{
  userId: ObjectId (ref: User),
  location: {
    type: 'Point',
    coordinates: [lng, lat]
  },
  isAvailable: Boolean,
  socketId: String
}
```

### Ride

```javascript
{
  userId: ObjectId (ref: User),
  driverId: ObjectId (ref: User),
  pickup: { lat: Number, lng: Number },
  destination: { lat: Number, lng: Number },
  status: 'pending' | 'accepted' | 'completed',
  fare: Number
}
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Socket authentication with JWT
- CORS configuration
- Input validation

## Development Notes

- Backend uses MVC architecture with separate controllers, models, and routes
- Frontend uses functional components with React hooks
- Real-time features powered by Socket.IO
- Geospatial queries use MongoDB's $near operator
- Fare calculation uses Haversine distance formula

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in backend `.env`
2. Use a production MongoDB instance
3. Configure proper CORS origins
4. Set up SSL certificates
5. Use environment variables for all secrets
6. Consider using PM2 for process management

## Troubleshooting

- **MongoDB Connection**: Ensure MongoDB is running and URI is correct
- **Google Maps**: Verify API key has Maps JavaScript API enabled
- **Socket Connection**: Check CORS settings and JWT authentication
- **Geolocation**: Ensure browser has location permissions for drivers

This implementation provides a solid foundation for a ride-sharing application with all core features working end-to-end.
