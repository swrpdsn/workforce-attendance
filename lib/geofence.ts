export type GeoPoint = { latitude: number; longitude: number };

const EARTH_RADIUS_METERS = 6_371_000;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export function distanceInMeters(a: GeoPoint, b: GeoPoint): number {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h));
}

export function validateGeofence(point: GeoPoint, center: GeoPoint, radiusMeters: number, accuracyMeters?: number, maxAccuracyMeters = 100) {
  const distanceMeters = distanceInMeters(point, center);
  const accuracy = accuracyMeters ?? 0;
  const acceptableAccuracy = accuracy <= maxAccuracyMeters;
  return {
    distanceMeters,
    inside: distanceMeters <= radiusMeters,
    acceptableAccuracy,
    valid: distanceMeters <= radiusMeters && acceptableAccuracy,
  };
}
