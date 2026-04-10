import Ride from "../models/Ride.js";
import { buildRideOptions, calculateDistanceKm } from "../utils/calculateFare.js";

const parseLocation = (location) => ({
  label: location.label?.trim() || "Pinned location",
  lat: Number(location.lat),
  lng: Number(location.lng)
});

const validateLocation = (location) =>
  Number.isFinite(location.lat) && Number.isFinite(location.lng);

const resolveDistanceKm = (pickup, destination, requestedDistanceKm) => {
  const parsedDistanceKm = Number(requestedDistanceKm);

  if (Number.isFinite(parsedDistanceKm) && parsedDistanceKm > 0) {
    return Number(parsedDistanceKm.toFixed(2));
  }

  return calculateDistanceKm(pickup, destination);
};

export const getRideEstimate = async (req, res) => {
  try {
    const pickup = parseLocation(req.body.pickup ?? {});
    const destination = parseLocation(req.body.destination ?? {});

    if (!validateLocation(pickup) || !validateLocation(destination)) {
      return res.status(400).json({ message: "Valid pickup and destination are required" });
    }

    const distanceKm = resolveDistanceKm(pickup, destination, req.body.distanceKm);
    const rideOptions = buildRideOptions(distanceKm);

    return res.json({
      distanceKm,
      rideOptions
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to calculate ride estimates" });
  }
};

export const createRideBooking = async (req, res) => {
  try {
    const pickup = parseLocation(req.body.pickup ?? {});
    const destination = parseLocation(req.body.destination ?? {});
    const selectedRideType = req.body.rideType;

    if (!validateLocation(pickup) || !validateLocation(destination) || !selectedRideType) {
      return res.status(400).json({ message: "Ride details are incomplete" });
    }

    const distanceKm = resolveDistanceKm(pickup, destination, req.body.distanceKm);
    const rideOption = buildRideOptions(distanceKm).find(
      (option) => option.id === selectedRideType
    );

    if (!rideOption) {
      return res.status(400).json({ message: "Invalid ride type selected" });
    }

    const ride = await Ride.create({
      user: req.user._id,
      pickup,
      destination,
      rideType: rideOption.name,
      distanceKm,
      fare: rideOption.fare
    });

    return res.status(201).json({
      message: "Ride booked successfully",
      ride
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to book ride" });
  }
};

export const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ rides });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load rides" });
  }
};
