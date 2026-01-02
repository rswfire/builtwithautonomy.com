// app/admin/users/[id]/page.tsx
import { DynamicModelForm } from '@/components/admin/DynamicModelForm'
import { userFormConfig } from '@/lib/admin/form-config'
import { getUserById } from '@/lib/queries/user'
import { requireAuth } from '@/lib/utils/auth'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditUserPage({
                                               params
                                           }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const currentUser = await requireAuth()
    const user = await getUserById(id)

    if (!user) {
        notFound()
    }

    // Strip password from defaultValues
    const { user_password, ...userWithoutPassword } = user

    return (
        <div className="max-w-5xl mx-auto py-8 px-6">
            <DynamicModelForm
                config={userFormConfig}
                mode="edit"
                defaultValues={userWithoutPassword}
            />
        </div>
    )
}
