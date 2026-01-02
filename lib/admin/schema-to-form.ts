// lib/admin/schema-to-form.ts
import { z } from 'zod'
import type { FieldConfig, ModelConfig } from './form-types'

function unwrapZodType(zodField: any): any {
    let current = zodField
    while (current.constructor.name === 'ZodOptional' ||
    current.constructor.name === 'ZodNullable' ||
    current.constructor.name === 'ZodDefault') {
        current = current.unwrap()
    }
    return current
}

function zodTypeToFieldType(zodField: any): FieldConfig['type'] {
    const unwrapped = unwrapZodType(zodField)
    const typeName = unwrapped.constructor.name

    switch (typeName) {
        case 'ZodString':
            return 'text'
        case 'ZodNumber':
            return 'number'
        case 'ZodDate':
            return 'datetime'
        case 'ZodBoolean':
            return 'checkbox'
        case 'ZodEnum':
            return 'select'
        case 'ZodArray':
        case 'ZodRecord':
        case 'ZodObject':
            return 'json'
        default:
            return 'text'
    }
}

function createEnumOptions(zodEnum: any): { value: string; label: string }[] {
    const unwrapped = unwrapZodType(zodEnum)
    const values = unwrapped.options || unwrapped.enum || []

    return values.map((value: string) => ({
        value,
        label: value.split('_').map(word =>
            word.charAt(0) + word.slice(1).toLowerCase()
        ).join(' ')
    }))
}

function generateFieldFromZod(
    fieldName: string,
    zodField: any,
    isRequired: boolean
): FieldConfig {
    const unwrapped = unwrapZodType(zodField)
    const fieldType = zodTypeToFieldType(zodField)

    const baseConfig: FieldConfig = {
        name: fieldName,
        label: fieldName.split('_').slice(1).join(' ')
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' '),
        type: fieldType,
        required: isRequired,
    }

    // Handle enums
    if (unwrapped.constructor.name === 'ZodEnum') {
        return {
            ...baseConfig,
            type: 'select',
            options: createEnumOptions(zodField),
        }
    }

    // Handle textareas
    if (fieldName.includes('description')) {
        return {
            ...baseConfig,
            type: 'textarea',
            rows: 4,
            placeholder: 'Enter description',
        }
    }

    // Handle JSON fields
    if (unwrapped.constructor.name === 'ZodArray' ||
        unwrapped.constructor.name === 'ZodRecord' ||
        unwrapped.constructor.name === 'ZodObject') {
        return {
            ...baseConfig,
            type: 'json',
            rows: fieldName.includes('tags') ? 4 : 6,
            placeholder: fieldName.includes('tags') ? '["tag1", "tag2"]' : '{\n  "key": "value"\n}',
        }
    }

    // Handle decimals
    if (fieldName.includes('latitude') || fieldName.includes('longitude')) {
        return {
            ...baseConfig,
            type: 'decimal',
            step: 'any',
            placeholder: fieldName.includes('latitude') ? 'e.g., 43.8041' : 'e.g., -124.0631',
        }
    }

    return baseConfig
}

export function generateFormFromZodSchema(
    schema: z.ZodObject<any>,
    modelName: string,
    apiEndpoint: string,
    excludeFields: string[] = []
): ModelConfig {
    const shape = schema.shape
    const fields: FieldConfig[] = []

    for (const [fieldName, zodField] of Object.entries(shape)) {
        // Skip excluded fields
        if (excludeFields.includes(fieldName)) continue

        // Skip auto-generated fields
        if (['stamp_created', 'stamp_updated', 'signal_embedding'].includes(fieldName)) continue

        // Check if required
        const isRequired = zodField.constructor.name !== 'ZodOptional' &&
            zodField.constructor.name !== 'ZodNullable'

        fields.push(generateFieldFromZod(fieldName, zodField as any, isRequired))
    }

    return {
        name: modelName,
        apiEndpoint,
        fields,
    }
}
