/**
 * Fare calculation utility
 * Calculates fare based on distance using a pricing model
 */

export interface FareDetails {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  totalFare: number;
  distance: number;
  estimatedTime: number;
}

// Pricing configuration
const PRICING = {
  baseFare: 2.5, // Base fare in dollars
  pricePerKm: 1.5, // Price per kilometer
  pricePerMinute: 0.25, // Price per minute
  minimumFare: 3.5, // Minimum fare
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

/**
 * Estimate travel time based on distance (average speed assumption)
 */
export function estimateTravelTime(distanceKm: number): number {
  // Assuming average speed of 30 km/h in city
  const avgSpeed = 30;
  return Math.ceil((distanceKm / avgSpeed) * 60); // in minutes
}

/**
 * Calculate fare based on pickup and dropoff coordinates
 */
export function calculateFare(
  pickupLat: number,
  pickupLon: number,
  dropoffLat: number,
  dropoffLon: number,
): FareDetails {
  const distance = calculateDistance(
    pickupLat,
    pickupLon,
    dropoffLat,
    dropoffLon,
  );
  const estimatedTime = estimateTravelTime(distance);

  const baseFare = PRICING.baseFare;
  const distanceFare = distance * PRICING.pricePerKm;
  const timeFare = estimatedTime * PRICING.pricePerMinute;

  let totalFare = baseFare + distanceFare + timeFare;
  totalFare = Math.max(totalFare, PRICING.minimumFare); // Apply minimum fare

  return {
    baseFare,
    distanceFare,
    timeFare,
    totalFare: Math.round(totalFare * 100) / 100, // Round to 2 decimal places
    distance: Math.round(distance * 10) / 10,
    estimatedTime,
  };
}

/**
 * Format fare for display
 */
export function formatFare(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
