// app/admin/clusters/new/page.tsx
import { DynamicModelForm } from '@/components/admin/DynamicModelForm'
import { clusterFormConfig } from '@/lib/admin/form-config'

export const dynamic = 'force-dynamic'

export default function CreateClusterPage() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-6">
            <DynamicModelForm
                config={clusterFormConfig}
                mode="create"
            />
        </div>
    )
}
