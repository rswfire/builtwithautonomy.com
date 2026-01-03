// app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuthAPI  } from '@/lib/utils/auth'
import { getUserById, updateUser, deleteUser } from '@/lib/queries/user'
import { updateUserSchema } from '@/lib/validation/user'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const params = await context.params
    try {
        const currentUser = await requireAuthAPI ()
        const user = await getUserById(params.id)

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Strip password
        const { user_password, ...userWithoutPassword } = user
        return NextResponse.json({ user: userWithoutPassword })
    } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const params = await context.params
    try {
        const currentUser = await requireAuthAPI ()
        const body = await request.json()
        const validated = updateUserSchema.parse({ user_id: params.id, ...body })
        const user = await updateUser(validated)

        // Strip password
        const { user_password, ...userWithoutPassword } = user
        return NextResponse.json({ user: userWithoutPassword })
    } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation failed', details: error }, { status: 400 })
        }
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const params = await context.params
    try {
        const currentUser = await requireAuthAPI ()
        await deleteUser(params.id)
        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}
