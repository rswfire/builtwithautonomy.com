// components/admin/FieldRenderer.tsx
'use client'

import { FieldConfig } from '@/lib/admin/form-config'
import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Select } from './ui/Select'
import { JsonEditor } from './forms/JsonEditor'
import { FormField } from './forms/FormField'

interface FieldRendererProps {
    field: FieldConfig
    register: UseFormRegister<any>
    control: Control<any>  // ← Add this
    errors: FieldErrors
    defaultValue?: any
}

export function FieldRenderer({
                                  field,
                                  register,
                                  control,  // ← Add this
                                  errors,
                                  defaultValue
                              }: FieldRendererProps) {
    const error = errors[field.name]?.message as string | undefined

    const renderInput = () => {
        switch (field.type) {
            case 'text':
                return (
                    <Input
                        {...register(field.name, { required: field.required })}
                        placeholder={field.placeholder}
                        defaultValue={defaultValue}
                        error={error}
                    />
                )

            case 'textarea':
                return (
                    <Textarea
                        {...register(field.name, { required: field.required })}
                        rows={field.rows || 3}
                        placeholder={field.placeholder}
                        defaultValue={defaultValue}
                        error={error}
                    />
                )

            case 'number':
            case 'decimal':
                return (
                    <Input
                        type="number"
                        step={field.step || (field.type === 'decimal' ? '0.01' : '1')}
                        {...register(field.name, {
                            required: field.required,
                            valueAsNumber: true
                        })}
                        placeholder={field.placeholder}
                        defaultValue={defaultValue}
                        error={error}
                    />
                )

            case 'datetime':
                return (
                    <Input
                        type="datetime-local"
                        {...register(field.name, { required: field.required })}
                        defaultValue={defaultValue ? new Date(defaultValue).toISOString().slice(0, 16) : ''}
                        error={error}
                    />
                )

            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        {...register(field.name)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        defaultChecked={defaultValue}
                    />
                )

            case 'select':
                return (
                    <Select
                        {...register(field.name, { required: field.required })}
                        defaultValue={defaultValue}
                        error={error}
                    >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                )

            case 'json':
                return (
                    <Controller
                        name={field.name}
                        control={control}
                        defaultValue={defaultValue ? JSON.stringify(defaultValue, null, 2) : ''}
                        rules={{
                            required: field.required,
                            validate: (value) => {
                                if (!value) return true
                                try {
                                    JSON.parse(value)
                                    return true
                                } catch {
                                    return 'Invalid JSON format'
                                }
                            }
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <JsonEditor
                                ref={ref}
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                rows={field.rows || 6}
                                placeholder={field.placeholder}
                                error={error}
                            />
                        )}
                    />
                )

            default:
                return null
        }
    }

    return (
        <FormField
            label={field.label}
            name={field.name}
            required={field.required}
            error={error}
        >
            {renderInput()}
        </FormField>
    )
}
