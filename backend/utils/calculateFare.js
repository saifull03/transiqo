const EARTH_RADIUS_KM = 6371;

const toRadians = (value) => (value * Math.PI) / 180;

export const calculateDistanceKm = (pickup, destination) => {
  const latDistance = toRadians(destination.lat - pickup.lat);
  const lngDistance = toRadians(destination.lng - pickup.lng);

  const a =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(toRadians(pickup.lat)) *
      Math.cos(toRadians(destination.lat)) *
      Math.sin(lngDistance / 2) *
      Math.sin(lngDistance / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((EARTH_RADIUS_KM * c).toFixed(2));
};

const rideTypes = [
  {
    id: "moto",
    name: "Moto",
    description: "Fast solo ride for short city trips",
    baseFare: 40,
    perKm: 12,
    etaMinutes: 4
  },
  {
    id: "economy",
    name: "Economy",
    description: "Affordable everyday car ride",
    baseFare: 70,
    perKm: 18,
    etaMinutes: 6
  },
  {
    id: "premium",
    name: "Premium",
    description: "Comfort ride with higher-rated drivers",
    baseFare: 120,
    perKm: 28,
    etaMinutes: 8
  }
];

export const buildRideOptions = (distanceKm) =>
  rideTypes.map((ride) => ({
    ...ride,
    fare: Number((ride.baseFare + distanceKm * ride.perKm).toFixed(2))
  }));
