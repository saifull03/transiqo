import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const registerUser = (payload) =>
  api.post("/auth/register", payload).then((res) => res.data);
export const loginUser = (payload) =>
  api.post("/auth/login", payload).then((res) => res.data);
export const requestRide = (payload) =>
  api.post("/ride/request", payload).then((res) => res.data);
export const acceptRide = (payload) =>
  api.post("/ride/accept", payload).then((res) => res.data);
export const getRides = () => api.get("/ride").then((res) => res.data);
export const setDriverAvailability = (payload) =>
  api.post("/driver/availability", payload).then((res) => res.data);
export const updateDriverLocation = (payload) =>
  api.post("/driver/location", payload).then((res) => res.data);
