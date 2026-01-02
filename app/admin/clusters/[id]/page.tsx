// app/admin/clusters/[id]/page.tsx
import { DynamicModelForm } from '@/components/admin/DynamicModelForm'
import { clusterFormConfig } from '@/lib/admin/form-config'
import { getClusterById } from '@/lib/queries/cluster'
import { requireAuth } from '@/lib/utils/auth'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditClusterPage({
                                                  params
                                              }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = await requireAuth()
    const cluster = await getClusterById(id)

    if (!cluster) {
        notFound()
    }

    return (
        <div className="max-w-5xl mx-auto py-8 px-6">
            <DynamicModelForm
                config={clusterFormConfig}
                mode="edit"
                defaultValues={cluster}
            />
        </div>
    )
}
