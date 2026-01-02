// lib/queries/signal.ts
import { Prisma } from '@prisma/client'
import { prisma } from '../db'
import type {
    Signal,
    SignalWithSynthesis,
    SignalWithClusters,
    SignalComplete,
} from '../types'
import type {
    CreateSignalInput,
    UpdateSignalInput,
    SignalFilter,
} from '../validation/signal'
import { isPostgres } from '../types'

/**
 * Create a new signal
 */
export async function createSignal(data: CreateSignalInput): Promise<Signal> {
    const { coordinates, signal_metadata, signal_payload, signal_tags, ...rest } = data

    // Handle geospatial data based on DB type
    const geoData = coordinates
        ? isPostgres
            ? {
                signal_location: {
                    type: 'Point',
                    coordinates: [coordinates.longitude, coordinates.latitude],
                } as Prisma.InputJsonValue,
            }
            : {
                signal_latitude: coordinates.latitude,
                signal_longitude: coordinates.longitude,
            }
        : {}

    return await prisma.signal.create({
        data: {
            ...rest,
            ...geoData,
            ...(signal_metadata && { signal_metadata: signal_metadata as Prisma.InputJsonValue }),
            ...(signal_payload && { signal_payload: signal_payload as Prisma.InputJsonValue }),
            ...(signal_tags && { signal_tags: signal_tags as Prisma.InputJsonValue }),
        },
    })
}

/**
 * Get signal by ID
 */
export async function getSignalById(
    signal_id: string,
    options?: {
        include_synthesis?: boolean
        include_clusters?: boolean
    }
): Promise<Signal | SignalWithSynthesis | SignalWithClusters | SignalComplete | null> {
    const include = {
        synthesis: options?.include_synthesis ?? false,
        clusters: options?.include_clusters
            ? {
                include: {
                    cluster: true,
                },
            }
            : false,
    }

    return await prisma.signal.findUnique({
        where: { signal_id },
        include,
    })
}

/**
 * Update signal
 */
export async function updateSignal(data: UpdateSignalInput): Promise<Signal> {
    const {
        signal_id,
        coordinates,
        signal_metadata,
        signal_payload,
        signal_tags,
        signal_embedding,
        ...rest
    } = data

    const geoData = coordinates
        ? isPostgres
            ? {
                signal_location: {
                    type: 'Point',
                    coordinates: [coordinates.longitude, coordinates.latitude],
                } as Prisma.InputJsonValue,
            }
            : {
                signal_latitude: coordinates.latitude,
                signal_longitude: coordinates.longitude,
            }
        : {}

    return await prisma.signal.update({
        where: { signal_id },
        data: {
            ...rest,
            ...geoData,
            ...(signal_metadata !== undefined && { signal_metadata: signal_metadata as Prisma.InputJsonValue }),
            ...(signal_payload !== undefined && { signal_payload: signal_payload as Prisma.InputJsonValue }),
            ...(signal_tags !== undefined && { signal_tags: signal_tags as Prisma.InputJsonValue }),
            ...(signal_embedding !== undefined && { signal_embedding: signal_embedding as Prisma.InputJsonValue }),
        },
    })
}

/**
 * Delete signal
 */
export async function deleteSignal(signal_id: string): Promise<Signal> {
    return await prisma.signal.delete({
        where: { signal_id },
    })
}

/**
 * Query signals with filters
 */
export async function querySignals(filter: SignalFilter): Promise<{
    signals: Signal[]
    total: number
}> {
    const {
        signal_type,
        signal_author,
        signal_status,
        signal_visibility,
        created_after,
        created_before,
        imported_after,
        imported_before,
        tags,
        tags_match,
        search,
        limit,
        offset,
        sort_by,
        sort_order,
        near, // Geospatial query handled separately
    } = filter

    // Build where clause
    const where: any = {}

    if (signal_type) where.signal_type = signal_type
    if (signal_author) where.signal_author = signal_author
    if (signal_status) where.signal_status = signal_status
    if (signal_visibility) where.signal_visibility = signal_visibility

    // Date filters
    if (created_after || created_before) {
        where.stamp_created = {}
        if (created_after) where.stamp_created.gte = created_after
        if (created_before) where.stamp_created.lte = created_before
    }

    if (imported_after || imported_before) {
        where.stamp_imported = {}
        if (imported_after) where.stamp_imported.gte = imported_after
        if (imported_before) where.stamp_imported.lte = imported_before
    }

    // Tag filtering
    if (tags && tags.length > 0) {
        if (tags_match === 'all') {
            where.signal_tags = {
                path: '$',
                array_contains: tags,
            }
        } else {
            // 'any' or default
            where.OR = tags.map((tag) => ({
                signal_tags: {
                    path: '$',
                    array_contains: [tag],
                },
            }))
        }
    }

    // Text search (basic implementation - searches title and description)
    if (search) {
        where.OR = [
            { signal_title: { contains: search, mode: 'insensitive' } },
            { signal_description: { contains: search, mode: 'insensitive' } },
        ]
    }

    // Geospatial query (requires custom implementation per DB)
    // This is a placeholder - actual implementation depends on PostGIS vs MySQL spatial
    if (near) {
        // TODO: Implement geospatial filtering
        // Postgres: ST_DWithin(signal_location, ST_MakePoint(lng, lat)::geography, radius)
        // MySQL: ST_Distance_Sphere(point(lng, lat), point(signal_longitude, signal_latitude)) <= radius
        console.warn('Geospatial filtering not yet implemented')
    }

    // Build orderBy
    const orderBy: any = {}
    if (sort_by) {
        orderBy[sort_by] = sort_order
    } else {
        orderBy.stamp_created = sort_order
    }

    // Execute query with pagination
    const [signals, total] = await Promise.all([
        prisma.signal.findMany({
            where,
            orderBy,
            skip: offset,
            take: limit,
        }),
        prisma.signal.count({ where }),
    ])

    return { signals, total }
}

/**
 * Get signals by author
 */
export async function getSignalsByAuthor(
    signal_author: string,
    options?: {
        limit?: number
        offset?: number
    }
): Promise<Signal[]> {
    return await prisma.signal.findMany({
        where: { signal_author },
        orderBy: { stamp_created: 'desc' },
        take: options?.limit ?? 10,
        skip: options?.offset ?? 0,
    })
}

/**
 * Get signals by type
 */
export async function getSignalsByType(
    signal_type: string,
    options?: {
        limit?: number
        offset?: number
    }
): Promise<Signal[]> {
    return await prisma.signal.findMany({
        where: { signal_type },
        orderBy: { stamp_created: 'desc' },
        take: options?.limit ?? 10,
        skip: options?.offset ?? 0,
    })
}

/**
 * Get signals by visibility
 */
export async function getSignalsByVisibility(
    signal_visibility: string,
    options?: {
        limit?: number
        offset?: number
    }
): Promise<Signal[]> {
    return await prisma.signal.findMany({
        where: { signal_visibility },
        orderBy: { stamp_created: 'desc' },
        take: options?.limit ?? 10,
        skip: options?.offset ?? 0,
    })
}

/**
 * Get recent signals
 */
export async function getRecentSignals(limit: number = 10): Promise<Signal[]> {
    return await prisma.signal.findMany({
        orderBy: { stamp_created: 'desc' },
        take: limit,
    })
}

/**
 * Count signals by status
 */
export async function countSignalsByStatus(): Promise<Record<string, number>> {
    const results = await prisma.signal.groupBy({
        by: ['signal_status'],
        _count: true,
    })

    return results.reduce((acc, item) => {
        acc[item.signal_status] = item._count
        return acc
    }, {} as Record<string, number>)
}

/**
 * Get signal with full relations
 */
export async function getSignalComplete(signal_id: string): Promise<SignalComplete | null> {
    return await prisma.signal.findUnique({
        where: { signal_id },
        include: {
            synthesis: true,
            clusters: {
                include: {
                    cluster: true,
                },
            },
        },
    })
}
