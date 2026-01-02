// components/admin/ui/Textarea.tsx
import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ error, className = '', ...props }, ref) => {
        return (
            <textarea
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

Textarea.displayName = 'Textarea'
