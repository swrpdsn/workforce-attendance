export type GeoPoint = { latitude: number; longitude: number }

const EARTH_RADIUS_METERS = 6_371_000

export function distanceInMeters(a: GeoPoint, b: GeoPoint): number {
  const toRad = (value: number) => (value * Math.PI) / 180
  const dLat = toRad(b.latitude - a.latitude)
  const dLon = toRad(b.longitude - a.longitude)
  const lat1 = toRad(a.latitude)
  const lat2 = toRad(b.latitude)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h))
}

export function validateGeofence(point: GeoPoint, center: GeoPoint, radiusMeters: number, accuracyMeters?: number) {
  const distanceMeters = distanceInMeters(point, center)
  const accuracy = accuracyMeters ?? 0
  return {
    distanceMeters,
    inside: distanceMeters <= radiusMeters,
    acceptableAccuracy: accuracy <= 100,
    valid: distanceMeters <= radiusMeters && accuracy <= 100,
  }
}
