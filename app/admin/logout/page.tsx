// app/admin/logout/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        async function logout() {
            try {
                await fetch('/api/admin/auth/logout', {
                    method: 'POST',
                })
                router.push('/admin/login')
            } catch (error) {
                console.error('Logout failed:', error)
                router.push('/admin/login')
            }
        }

        logout()
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="text-gray-600">Logging out...</div>
            </div>
        </div>
    )
}
