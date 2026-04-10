import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "TransiQo API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);

app.use((err, _req, res, _next) => {
  return res.status(500).json({
    message: err.message || "Server error"
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error.message);
    process.exit(1);
  }
};

startServer();
