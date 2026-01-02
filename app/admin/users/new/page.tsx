// app/admin/users/new/page.tsx
import { DynamicModelForm } from '@/components/admin/DynamicModelForm'
import { userFormConfig } from '@/lib/admin/form-config'

export const dynamic = 'force-dynamic'

export default function CreateUserPage() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-6">
            <DynamicModelForm
                config={userFormConfig}
                mode="create"
            />
        </div>
    )
}
