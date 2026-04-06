const mongoose = require("mongoose");

const geometrySchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false },
);

const rideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pickup: { type: geometrySchema, required: true },
    destination: { type: geometrySchema, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed"],
      default: "pending",
    },
    fare: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Ride", rideSchema);
