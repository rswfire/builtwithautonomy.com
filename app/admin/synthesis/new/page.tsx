// app/admin/synthesis/new/page.tsx
import { DynamicModelForm } from '@/components/admin/DynamicModelForm'
import { synthesisFormConfig } from '@/lib/admin/form-config'

export const dynamic = 'force-dynamic'

export default function CreateSynthesisPage() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-6">
            <DynamicModelForm
                config={synthesisFormConfig}
                mode="create"
            />
        </div>
    )
}
