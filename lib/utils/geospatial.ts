// lib/utils/geospatial.ts
import type { Coordinates, GeographyPoint } from '../types'
import { GEO } from '../constants'
import { isPostgres } from '../types'

/**
 * Convert coordinates to geography point (GeoJSON format)
 */
export function coordinatesToGeography(coords: Coordinates): GeographyPoint {
    return {
        type: 'Point',
        coordinates: [coords.longitude, coords.latitude], // GeoJSON uses [lng, lat]
    }
}

/**
 * Convert geography point to coordinates
 */
export function geographyToCoordinates(geography: GeographyPoint): Coordinates {
    return {
        longitude: geography.coordinates[0],
        latitude: geography.coordinates[1],
    }
}

/**
 * Validate coordinates
 */
export function validateCoordinates(coords: Coordinates): boolean {
    return (
        coords.latitude >= GEO.LATITUDE_MIN &&
        coords.latitude <= GEO.LATITUDE_MAX &&
        coords.longitude >= GEO.LONGITUDE_MIN &&
        coords.longitude <= GEO.LONGITUDE_MAX
    )
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in meters
 */
export function calculateDistance(
    point1: Coordinates,
    point2: Coordinates
): number {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (point1.latitude * Math.PI) / 180
    const φ2 = (point2.latitude * Math.PI) / 180
    const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180
    const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
}

/**
 * Check if a point is within a given radius of a center point
 */
export function isWithinRadius(
    point: Coordinates,
    center: Coordinates,
    radiusMeters: number
): boolean {
    return calculateDistance(point, center) <= radiusMeters
}

/**
 * Format coordinates for display
 */
export function formatCoordinates(
    coords: Coordinates,
    precision: number = 6
): string {
    return `${coords.latitude.toFixed(precision)}, ${coords.longitude.toFixed(precision)}`
}

/**
 * Build geospatial filter for Prisma query
 * Returns raw SQL fragment for database-specific spatial queries
 */
export function buildGeospatialFilter(
    center: Coordinates,
    radiusMeters: number
): { sql: string; params: any[] } {
    if (isPostgres) {
        // PostGIS spatial query
        return {
            sql: `ST_DWithin(
        signal_location::geography,
        ST_SetSRID(ST_MakePoint($1, $2), ${GEO.SRID})::geography,
        $3
      )`,
            params: [center.longitude, center.latitude, radiusMeters],
        }
    } else {
        // MySQL spatial query using ST_Distance_Sphere
        return {
            sql: `ST_Distance_Sphere(
        POINT(signal_longitude, signal_latitude),
        POINT(?, ?)
      ) <= ?`,
            params: [center.longitude, center.latitude, radiusMeters],
        }
    }
}

/**
 * Parse location string to coordinates
 * Supports formats: "lat,lng" or "lat, lng"
 */
export function parseLocationString(location: string): Coordinates | null {
    const parts = location.split(',').map((s) => s.trim())
    if (parts.length !== 2) return null

    const latitude = parseFloat(parts[0])
    const longitude = parseFloat(parts[1])

    if (isNaN(latitude) || isNaN(longitude)) return null

    const coords = { latitude, longitude }
    return validateCoordinates(coords) ? coords : null
}

/**
 * Calculate bounding box for a point and radius
 * Returns { minLat, maxLat, minLng, maxLng }
 */
export function calculateBoundingBox(
    center: Coordinates,
    radiusMeters: number
): {
    minLat: number
    maxLat: number
    minLng: number
    maxLng: number
} {
    const R = 6371e3 // Earth's radius in meters
    const lat = (center.latitude * Math.PI) / 180
    const lng = (center.longitude * Math.PI) / 180

    const angularRadius = radiusMeters / R

    const minLat = lat - angularRadius
    const maxLat = lat + angularRadius

    const deltaLng = Math.asin(Math.sin(angularRadius) / Math.cos(lat))
    const minLng = lng - deltaLng
    const maxLng = lng + deltaLng

    return {
        minLat: (minLat * 180) / Math.PI,
        maxLat: (maxLat * 180) / Math.PI,
        minLng: (minLng * 180) / Math.PI,
        maxLng: (maxLng * 180) / Math.PI,
    }
}

/**
 * Get center point from an array of coordinates
 */
export function getCenterPoint(points: Coordinates[]): Coordinates | null {
    if (points.length === 0) return null

    const sum = points.reduce(
        (acc, point) => ({
            latitude: acc.latitude + point.latitude,
            longitude: acc.longitude + point.longitude,
        }),
        { latitude: 0, longitude: 0 }
    )

    return {
        latitude: sum.latitude / points.length,
        longitude: sum.longitude / points.length,
    }
}
