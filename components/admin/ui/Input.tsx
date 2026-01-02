// components/admin/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ error, className = '', ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`
          w-full px-3 py-2
          bg-white border rounded-lg
          text-sm text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
                {...props}
            />
        )
    }
)

Input.displayName = 'Input'
