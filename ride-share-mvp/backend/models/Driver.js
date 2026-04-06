const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    isAvailable: { type: Boolean, default: false },
    socketId: { type: String, default: null },
  },
  { timestamps: true },
);

driverSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Driver", driverSchema);
