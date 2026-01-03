// components/admin/forms/TagInput.tsx
'use client'

import { useState, KeyboardEvent } from 'react'
import Icon from '@/components/Icon'

interface TagInputProps {
    value: string[]
    onChange: (tags: string[]) => void
    placeholder?: string
}

export function TagInput({ value = [], onChange, placeholder = 'Add tag...' }: TagInputProps) {
    const [input, setInput] = useState('')

    const addTag = () => {
        const trimmed = input.trim()
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed])
            setInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            addTag()
        } else if (e.key === 'Backspace' && !input && value.length > 0) {
            removeTag(value[value.length - 1])
        }
    }

    return (
        <div className="space-y-2">
            <p className="text-xs text-gray-500">Press enter or space to add tags.</p>
            <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border border-gray-300 rounded-md bg-white">
                {value.map(tag => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-blue-900"
                        >
                            <Icon name="X" size={14} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={value.length === 0 ? placeholder : ''}
                    className="flex-1 min-w-[120px] outline-none text-sm"
                />
            </div>
        </div>
    )
}
