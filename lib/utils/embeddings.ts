// lib/utils/embeddings.ts
import type { EmbeddingVector } from '../types'
import { LIMITS } from '../constants'

/**
 * Validate embedding vector
 */
export function validateEmbedding(embedding: number[]): boolean {
    if (embedding.length !== LIMITS.EMBEDDING_DIMENSIONS) {
        return false
    }

    return embedding.every((n) => typeof n === 'number' && !isNaN(n))
}

/**
 * Calculate cosine similarity between two embeddings
 * Returns value between -1 and 1 (1 = identical, 0 = orthogonal, -1 = opposite)
 */
export function cosineSimilarity(
    embedding1: EmbeddingVector,
    embedding2: EmbeddingVector
): number {
    if (embedding1.length !== embedding2.length) {
        throw new Error('Embeddings must have the same dimensions')
    }

    let dotProduct = 0
    let magnitude1 = 0
    let magnitude2 = 0

    for (let i = 0; i < embedding1.length; i++) {
        dotProduct += embedding1[i] * embedding2[i]
        magnitude1 += embedding1[i] * embedding1[i]
        magnitude2 += embedding2[i] * embedding2[i]
    }

    magnitude1 = Math.sqrt(magnitude1)
    magnitude2 = Math.sqrt(magnitude2)

    if (magnitude1 === 0 || magnitude2 === 0) {
        return 0
    }

    return dotProduct / (magnitude1 * magnitude2)
}

/**
 * Calculate Euclidean distance between two embeddings
 * Lower distance = more similar
 */
export function euclideanDistance(
    embedding1: EmbeddingVector,
    embedding2: EmbeddingVector
): number {
    if (embedding1.length !== embedding2.length) {
        throw new Error('Embeddings must have the same dimensions')
    }

    let sum = 0
    for (let i = 0; i < embedding1.length; i++) {
        const diff = embedding1[i] - embedding2[i]
        sum += diff * diff
    }

    return Math.sqrt(sum)
}

/**
 * Normalize embedding vector to unit length
 */
export function normalizeEmbedding(embedding: EmbeddingVector): EmbeddingVector {
    const magnitude = Math.sqrt(
        embedding.reduce((sum, val) => sum + val * val, 0)
    )

    if (magnitude === 0) {
        return embedding
    }

    return embedding.map((val) => val / magnitude)
}

/**
 * Find most similar embeddings from a list
 * Returns array of { index, similarity } sorted by similarity (descending)
 */
export function findMostSimilar(
    targetEmbedding: EmbeddingVector,
    candidateEmbeddings: EmbeddingVector[],
    topK: number = 5
): Array<{ index: number; similarity: number }> {
    const similarities = candidateEmbeddings.map((embedding, index) => ({
        index,
        similarity: cosineSimilarity(targetEmbedding, embedding),
    }))

    return similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK)
}

/**
 * Average multiple embeddings
 * Useful for creating cluster embeddings from signal embeddings
 */
export function averageEmbeddings(
    embeddings: EmbeddingVector[]
): EmbeddingVector | null {
    if (embeddings.length === 0) return null

    const dimensions = embeddings[0].length
    const sum = new Array(dimensions).fill(0)

    for (const embedding of embeddings) {
        if (embedding.length !== dimensions) {
            throw new Error('All embeddings must have the same dimensions')
        }

        for (let i = 0; i < dimensions; i++) {
            sum[i] += embedding[i]
        }
    }

    return sum.map((val) => val / embeddings.length)
}

/**
 * Weighted average of embeddings
 * Weights array must have same length as embeddings array
 */
export function weightedAverageEmbeddings(
    embeddings: EmbeddingVector[],
    weights: number[]
): EmbeddingVector | null {
    if (embeddings.length === 0) return null
    if (embeddings.length !== weights.length) {
        throw new Error('Embeddings and weights arrays must have same length')
    }

    const dimensions = embeddings[0].length
    const sum = new Array(dimensions).fill(0)
    const totalWeight = weights.reduce((acc, w) => acc + w, 0)

    if (totalWeight === 0) {
        throw new Error('Total weight cannot be zero')
    }

    for (let i = 0; i < embeddings.length; i++) {
        const embedding = embeddings[i]
        const weight = weights[i]

        if (embedding.length !== dimensions) {
            throw new Error('All embeddings must have the same dimensions')
        }

        for (let j = 0; j < dimensions; j++) {
            sum[j] += embedding[j] * weight
        }
    }

    return sum.map((val) => val / totalWeight)
}

/**
 * Convert embedding to base64 string for storage
 */
export function embeddingToBase64(embedding: EmbeddingVector): string {
    const buffer = Buffer.from(new Float32Array(embedding).buffer)
    return buffer.toString('base64')
}

/**
 * Convert base64 string back to embedding vector
 */
export function base64ToEmbedding(base64: string): EmbeddingVector {
    const buffer = Buffer.from(base64, 'base64')
    const float32Array = new Float32Array(buffer.buffer)
    return Array.from(float32Array)
}

/**
 * Create a zero embedding (useful for initialization)
 */
export function createZeroEmbedding(): EmbeddingVector {
    return new Array(LIMITS.EMBEDDING_DIMENSIONS).fill(0)
}

/**
 * Create a random embedding (useful for testing)
 */
export function createRandomEmbedding(): EmbeddingVector {
    const embedding = new Array(LIMITS.EMBEDDING_DIMENSIONS)
        .fill(0)
        .map(() => Math.random() * 2 - 1) // Random values between -1 and 1

    return normalizeEmbedding(embedding)
}
