// components/admin/ui/Label.tsx
import { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean
}

export function Label({ required, children, className = '', ...props }: LabelProps) {
    return (
        <label
            className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
            {...props}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    )
}
