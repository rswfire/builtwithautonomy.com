// app/admin/signals/new/page.tsx
import { DynamicModelForm } from '@/components/admin/DynamicModelForm'
import { signalFormConfig } from '@/lib/admin/form-config'

export const dynamic = 'force-dynamic'

export default function CreateSignalPage() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-6">
            <DynamicModelForm
                config={signalFormConfig}
                mode="create"
            />
        </div>
    )
}
