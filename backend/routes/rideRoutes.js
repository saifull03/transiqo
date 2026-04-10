import express from "express";
import {
  createRideBooking,
  getMyRides,
  getRideEstimate
} from "../controllers/rideController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/estimate", getRideEstimate);
router.post("/book", protect, createRideBooking);
router.get("/my-rides", protect, getMyRides);

export default router;
