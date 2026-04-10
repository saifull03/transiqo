import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    pickup: {
      type: locationSchema,
      required: true
    },
    destination: {
      type: locationSchema,
      required: true
    },
    rideType: {
      type: String,
      required: true
    },
    distanceKm: {
      type: Number,
      required: true
    },
    fare: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "confirmed"
    }
  },
  {
    timestamps: true
  }
);

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;
