const Ride = require("../models/Ride");
const Driver = require("../models/Driver");
const { estimateFare } = require("../utils/fare");
const { notifyNearbyDrivers, notifyUser } = require("../sockets");

const requestRide = async (req, res, next) => {
  try {
    const { pickup, destination } = req.body;
    if (!pickup || !destination) {
      return res
        .status(400)
        .json({ message: "Pickup and destination are required" });
    }

    const fare = estimateFare(pickup, destination);
    const ride = await Ride.create({
      userId: req.user.id,
      pickup,
      destination,
      fare,
      status: "pending",
    });

    const nearbyDrivers = await Driver.find({
      isAvailable: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [pickup.lng, pickup.lat],
          },
          $maxDistance: Number(process.env.NEARBY_RADIUS_METERS || 5000),
        },
      },
    }).limit(10);

    if (nearbyDrivers.length) {
      notifyNearbyDrivers(nearbyDrivers, ride);
    }

    return res.status(201).json({ ride, nearbyDrivers: nearbyDrivers.length });
  } catch (err) {
    next(err);
  }
};

const acceptRide = async (req, res, next) => {
  try {
    const { rideId, driverId } = req.body;
    if (!rideId || !driverId) {
      return res
        .status(400)
        .json({ message: "rideId and driverId are required" });
    }

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    if (ride.status !== "pending") {
      return res.status(400).json({ message: "Ride is no longer available" });
    }

    ride.status = "accepted";
    ride.driverId = driverId;
    await ride.save();

    notifyUser(ride.userId.toString(), "ride-accepted", {
      rideId: ride._id,
      driverId,
      status: ride.status,
    });

    return res.json({ ride });
  } catch (err) {
    next(err);
  }
};

const getRides = async (req, res, next) => {
  try {
    const query = {};
    if (req.user.role === "user") {
      query.userId = req.user.id;
    }
    if (req.user.role === "driver") {
      query.driverId = req.user.id;
    }

    const rides = await Ride.find(query).sort({ createdAt: -1 });
    return res.json({ rides });
  } catch (err) {
    next(err);
  }
};

module.exports = { requestRide, acceptRide, getRides };
