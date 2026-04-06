const toRad = (value) => (value * Math.PI) / 180;

const calculateDistance = (pickup, destination) => {
  const R = 6371;
  const dLat = toRad(destination.lat - pickup.lat);
  const dLng = toRad(destination.lng - pickup.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(pickup.lat)) *
      Math.cos(toRad(destination.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const estimateFare = (pickup, destination) => {
  const distanceKm = calculateDistance(pickup, destination);
  const baseFare = 3.5;
  const perKm = 1.8;
  return Math.max(8, Math.round((baseFare + distanceKm * perKm) * 100) / 100);
};

module.exports = { calculateDistance, estimateFare };
