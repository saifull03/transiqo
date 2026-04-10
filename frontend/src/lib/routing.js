const OSRM_BASE_URL = "https://router.project-osrm.org";

export async function getDrivingRoute(pickup, destination) {
  const coordinates = `${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}`;
  const url =
    `${OSRM_BASE_URL}/route/v1/driving/${coordinates}` +
    "?overview=full&geometries=geojson&steps=false";

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.code !== "Ok" || !data.routes?.length) {
    throw new Error("Could not find a road route for this trip.");
  }

  const [route] = data.routes;

  return {
    distanceKm: Number((route.distance / 1000).toFixed(2)),
    durationMinutes: Math.max(1, Math.round(route.duration / 60)),
    coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng])
  };
}
