import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
let socket;

export const initializeSocket = (token) => {
  if (socket?.connected) {
    return socket;
  }
  socket = io(API_URL, {
    auth: { token },
  });
  return socket;
};

export const registerUserSocket = (userId) => {
  if (!socket) return;
  socket.emit("register-user", { userId });
};

export const driverOnline = (driverId) => {
  if (!socket) return;
  socket.emit("driver-online", { driverId });
};

export const updateDriverLocation = (driverId, lat, lng) => {
  if (!socket) return;
  socket.emit("update-location", { driverId, lat, lng });
};

export const acceptRide = (driverId, rideId) => {
  if (!socket) return;
  socket.emit("accept-ride", { driverId, rideId });
};

export const onEvent = (event, callback) => {
  if (!socket) return;
  socket.on(event, callback);
};

export const offEvent = (event) => {
  if (!socket) return;
  socket.off(event);
};
