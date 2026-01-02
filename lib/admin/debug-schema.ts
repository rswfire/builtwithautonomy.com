// lib/admin/debug-schema.ts
import { createSignalSchema } from '@/lib/validation/signal'

export function debugSchema() {
    const shape = createSignalSchema.shape

    console.log('\n=== SCHEMA DEBUG ===\n')

    for (const [fieldName, zodField] of Object.entries(shape)) {
        const field = zodField as any

        console.log(`\nField: ${fieldName}`)
        console.log('  Type:', typeof field)
        console.log('  Constructor:', field?.constructor?.name)
        console.log('  Keys:', Object.keys(field || {}))

        // Try different ways to access metadata
        if (field?._type) console.log('  _type:', field._type)
        if (field?.description) console.log('  description:', field.description)

        // Try parsing approach
        try {
            const parsed = field.safeParse('test')
            console.log('  Parse result:', parsed)
        } catch (e) {
            console.log('  Parse error:', e)
        }
    }
}
