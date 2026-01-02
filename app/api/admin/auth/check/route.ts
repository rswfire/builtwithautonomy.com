// app/api/admin/auth/check/route.ts
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/utils/auth'

export async function GET() {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json({ authenticated: false, role: null })
        }

        return NextResponse.json({
            authenticated: true,
            role: user.role,
            email: user.email
        })
    } catch (error) {
        return NextResponse.json({ authenticated: false, role: null })
    }
}
