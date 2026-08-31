import { describe, expect, it } from 'vitest'
import { distanceInMeters, validateGeofence } from '../lib/geofence'

describe('geofence', () => {
  it('returns zero for identical points', () => {
    expect(distanceInMeters({ latitude: 19, longitude: 72 }, { latitude: 19, longitude: 72 })).toBe(0)
  })

  it('accepts a point inside the radius with good accuracy', () => {
    const result = validateGeofence({ latitude: 19, longitude: 72 }, { latitude: 19, longitude: 72 }, 150, 10)
    expect(result.valid).toBe(true)
  })

  it('rejects a point with poor GPS accuracy', () => {
    const result = validateGeofence({ latitude: 19, longitude: 72 }, { latitude: 19, longitude: 72 }, 150, 500)
    expect(result.valid).toBe(false)
    expect(result.acceptableAccuracy).toBe(false)
  })
})
