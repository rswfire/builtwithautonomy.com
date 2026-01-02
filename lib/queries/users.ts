// lib/queries/user.ts
import { prisma } from '../db'
import type { User } from '../types'

/**
 * Create a new user
 */
export async function createUser(data: {
    user_email: string
    user_name?: string
}): Promise<User> {
    return await prisma.user.create({
        data,
    })
}

/**
 * Get user by ID
 */
export async function getUserById(user_id: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { user_id },
    })
}

/**
 * Get user by email
 */
export async function getUserByEmail(user_email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { user_email },
    })
}

/**
 * Update user
 */
export async function updateUser(
    user_id: string,
    data: {
        user_email?: string
        user_name?: string
    }
): Promise<User> {
    return await prisma.user.update({
        where: { user_id },
        data,
    })
}

/**
 * Delete user
 */
export async function deleteUser(user_id: string): Promise<User> {
    return await prisma.user.delete({
        where: { user_id },
    })
}

/**
 * List all users
 */
export async function listUsers(options?: {
    limit?: number
    offset?: number
}): Promise<User[]> {
    return await prisma.user.findMany({
        orderBy: { stamp_created: 'desc' },
        take: options?.limit ?? 10,
        skip: options?.offset ?? 0,
    })
}

/**
 * Count total users
 */
export async function countUsers(): Promise<number> {
    return await prisma.user.count()
}
