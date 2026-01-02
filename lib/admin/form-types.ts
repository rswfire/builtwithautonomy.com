// lib/admin/form-types.ts
export type FieldType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'decimal'
    | 'datetime'
    | 'checkbox'
    | 'select'
    | 'json'

export interface FieldConfig {
    name: string
    label: string
    type: FieldType
    required?: boolean
    options?: { value: string; label: string }[]
    placeholder?: string
    step?: string
    rows?: number
}

export interface ModelConfig {
    name: string
    fields: FieldConfig[]
    apiEndpoint: string
}
