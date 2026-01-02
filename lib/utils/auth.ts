// lib/utils/auth.ts
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import type { UserRole } from '../types'

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

interface JWTPayload {
    userId: string
    email: string
    role: UserRole
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('admin_token')?.value

        if (!token) {
            return null
        }

        const { payload } = await jwtVerify(token, secret)

        return {
            userId: payload.userId as string,
            email: payload.email as string,
            role: payload.role as UserRole,
        }
    } catch (error) {
        console.error('JWT verification failed:', error)
        return null
    }
}

export async function requireAuth(): Promise<JWTPayload> {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    return user
}
