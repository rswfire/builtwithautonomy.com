// app/admin/users/page.tsx
import Link from 'next/link'
import { requireAuth } from '@/lib/utils/auth'
import { listUsers } from '@/lib/queries/user'
import { Button } from '@/components/admin/ui/Button'
import { Badge } from '@/components/admin/ui/Badge'
import Icon from '@/components/Icon'

export const dynamic = 'force-dynamic'

export default async function UsersListPage() {
    const user = await requireAuth()
    const users = await listUsers({ limit: 100, offset: 0 })

    const getRoleVariant = (role: string) => {
        switch (role) {
            case 'OWNER': return 'error'
            case 'SANCTUM': return 'warning'
            case 'GUEST': return 'default'
            default: return 'default'
        }
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage user accounts and permissions
                    </p>
                </div>
                <Link href="/admin/users/new">
                    <Button>
                        <Icon name="Plus" size={16} className="mr-2" />
                        Create User
                    </Button>
                </Link>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Owner
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                                <div className="text-gray-500">
                                    <p className="text-sm">No users found.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        users.map((u) => (
                            <tr key={u.user_id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {u.user_email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {u.user_name || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={getRoleVariant(u.user_role)}>
                                        {u.user_role}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {u.is_owner ? 'Yes' : 'No'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                    {new Date(u.stamp_created).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <Link
                                        href={`/admin/users/${u.user_id}`}
                                        className="text-teal-600 hover:text-teal-700 font-medium"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
