// lib/utils/polymorphic.ts
import type { PolymorphicType } from '../constants'
import { prisma } from '../db'

/**
 * Get polymorphic target (Signal or Cluster)
 */
export async function getPolymorphicTarget(
    polymorphic_id: string,
    polymorphic_type: PolymorphicType
): Promise<any | null> {
    if (polymorphic_type === 'Signal') {
        return await prisma.signal.findUnique({
            where: { signal_id: polymorphic_id },
        })
    } else if (polymorphic_type === 'Cluster') {
        return await prisma.cluster.findUnique({
            where: { cluster_id: polymorphic_id },
        })
    }

    return null
}

/**
 * Validate polymorphic relationship exists
 */
export async function validatePolymorphicTarget(
    polymorphic_id: string,
    polymorphic_type: PolymorphicType
): Promise<boolean> {
    const target = await getPolymorphicTarget(polymorphic_id, polymorphic_type)
    return target !== null
}

/**
 * Build polymorphic query conditions
 */
export function buildPolymorphicWhere(
    polymorphic_id: string,
    polymorphic_type: PolymorphicType
): {
    polymorphic_id: string
    polymorphic_type: PolymorphicType
} {
    return {
        polymorphic_id,
        polymorphic_type,
    }
}

/**
 * Get all synthesis for a polymorphic target
 */
export async function getSynthesisForTarget(
    polymorphic_id: string,
    polymorphic_type: PolymorphicType,
    options?: {
        synthesis_type?: string
        synthesis_subtype?: string
    }
) {
    const where: any = {
        polymorphic_id,
        polymorphic_type,
    }

    if (options?.synthesis_type) {
        where.synthesis_type = options.synthesis_type
    }

    if (options?.synthesis_subtype) {
        where.synthesis_subtype = options.synthesis_subtype
    }

    return await prisma.synthesis.findMany({
        where,
        orderBy: { stamp_created: 'desc' },
    })
}

/**
 * Delete all synthesis for a polymorphic target
 */
export async function deleteSynthesisForTarget(
    polymorphic_id: string,
    polymorphic_type: PolymorphicType
): Promise<{ count: number }> {
    return await prisma.synthesis.deleteMany({
        where: {
            polymorphic_id,
            polymorphic_type,
        },
    })
}

/**
 * Count synthesis for a polymorphic target
 */
export async function countSynthesisForTarget(
    polymorphic_id: string,
    polymorphic_type: PolymorphicType
): Promise<number> {
    return await prisma.synthesis.count({
        where: {
            polymorphic_id,
            polymorphic_type,
        },
    })
}

/**
 * Get synthesis grouped by type for a target
 */
export async function getSynthesisGroupedByType(
    polymorphic_id: string,
    polymorphic_type: PolymorphicType
): Promise<Record<string, any[]>> {
    const synthesis = await prisma.synthesis.findMany({
        where: {
            polymorphic_id,
            polymorphic_type,
        },
        orderBy: { stamp_created: 'desc' },
    })

    return synthesis.reduce((acc, item) => {
        const key = `${item.synthesis_type}:${item.synthesis_subtype}`
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(item)
        return acc
    }, {} as Record<string, any[]>)
}

/**
 * Check if target has synthesis of specific type
 */
export async function hasTargetSynthesis(
    polymorphic_id: string,
    polymorphic_type: PolymorphicType,
    synthesis_type: string,
    synthesis_subtype?: string
): Promise<boolean> {
    const where: any = {
        polymorphic_id,
        polymorphic_type,
        synthesis_type,
    }

    if (synthesis_subtype) {
        where.synthesis_subtype = synthesis_subtype
    }

    const count = await prisma.synthesis.count({ where })
    return count > 0
}
