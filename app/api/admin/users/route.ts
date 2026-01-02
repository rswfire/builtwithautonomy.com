// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/utils/auth'
import { listUsers, createUser } from '@/lib/queries/user'
import { createUserSchema } from '@/lib/validation/user'

export async function GET(request: NextRequest) {
    try {
        const user = await requireAuth()
        const users = await listUsers({ limit: 100, offset: 0 })
        return NextResponse.json({ users })
    } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const currentUser = await requireAuth()
        const body = await request.json()
        const validated = createUserSchema.parse(body)
        const user = await createUser(validated)

        // Strip password from response
        const { user_password, ...userWithoutPassword } = user
        return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
    } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation failed', details: error }, { status: 400 })
        }
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}
