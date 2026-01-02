// components/admin/forms/FormSection.tsx
import { ReactNode } from 'react'

interface FormSectionProps {
    title: string
    description?: string
    children: ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
    return (
        <div className="mb-8">
            <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}
