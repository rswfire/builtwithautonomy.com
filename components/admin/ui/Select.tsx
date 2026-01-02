// components/admin/ui/Select.tsx
import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ error, className = '', children, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={`
          w-full px-3 py-2
          bg-white border rounded-lg
          text-sm text-gray-900
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
                {...props}
            >
                {children}
            </select>
        )
    }
)

Select.displayName = 'Select'
