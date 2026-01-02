// lib/admin/form-config.ts
import { createSignalSchema } from '@/lib/validation/signal'
import { createClusterSchema } from '@/lib/validation/cluster'
import { createUserSchema } from '@/lib/validation/user'
import { generateFormFromZodSchema } from './schema-to-form'
import type { ModelConfig } from './form-types'

export type { FieldType, FieldConfig, ModelConfig } from './form-types'

// Generate configs directly from schemas - no manual manipulation
export const signalFormConfig = generateFormFromZodSchema(
    createSignalSchema,
    'Signal',
    '/api/admin/signals',
    ['signal_id', 'coordinates']  // Only exclude ID and coordinates helper
)

export const clusterFormConfig = generateFormFromZodSchema(
    createClusterSchema,
    'Cluster',
    '/api/admin/clusters',
    ['cluster_id']
)

export const userFormConfig = generateFormFromZodSchema(
    createUserSchema,
    'User',
    '/api/admin/users',
    ['user_id']
)

export const synthesisFormConfig: ModelConfig = {
    name: 'Synthesis',
    apiEndpoint: '/api/admin/synthesis',
    fields: [
        // ... synthesis fields (can't auto-generate due to discriminated union)
    ],
}

export const getModelConfig = (modelName: string): ModelConfig | null => {
    switch (modelName.toLowerCase()) {
        case 'signal':
            return signalFormConfig
        case 'cluster':
            return clusterFormConfig
        case 'synthesis':
            return synthesisFormConfig
        case 'user':
            return userFormConfig
        default:
            return null
    }
}
