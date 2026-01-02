// components/admin/DynamicModelForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldRenderer } from './FieldRenderer'
import { ModelConfig } from '@/lib/admin/form-config'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { FormSection } from './forms/FormSection'

interface DynamicModelFormProps {
    config: ModelConfig
    mode: 'create' | 'edit'
    defaultValues?: any
    onSuccess?: () => void
}

// Field grouping configuration per model
const FIELD_GROUPS: Record<string, {
    core: string[]
    location?: string[]
    metadata: string[]
    data: string[]
}> = {
    Signal: {
        core: ['signal_type', 'signal_title', 'signal_description', 'signal_author'],
        location: ['signal_latitude', 'signal_longitude', 'signal_location'],
        metadata: ['signal_status', 'signal_visibility', 'stamp_imported'],
        data: ['signal_metadata', 'signal_payload', 'signal_tags'],
    },
    Cluster: {
        core: ['cluster_type', 'cluster_title', 'cluster_depth'],
        metadata: ['cluster_state', 'stamp_cluster_start', 'stamp_cluster_end', 'parent_cluster_id'],
        data: ['cluster_annotations', 'cluster_metadata', 'cluster_payload', 'cluster_tags'],
    },
    Synthesis: {
        core: ['synthesis_type', 'synthesis_subtype', 'synthesis_source', 'synthesis_depth', 'polymorphic_type', 'polymorphic_id'],
        metadata: [],
        data: ['synthesis_annotations', 'synthesis_content'],
    },
    User: {
        core: ['user_email', 'user_name', 'user_password'],
        metadata: ['user_role', 'is_owner'],
        data: [],
    },
}

export function DynamicModelForm({
                                     config,
                                     mode,
                                     defaultValues,
                                     onSuccess
                                 }: DynamicModelFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
    })

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const processedData = { ...data }
            config.fields.forEach((field) => {
                if (field.type === 'json' && processedData[field.name]) {
                    try {
                        processedData[field.name] = JSON.parse(processedData[field.name])
                    } catch {
                        // Keep as string if parsing fails
                    }
                }
            })

            const idField = config.name === 'Signal' ? 'signal_id'
                : config.name === 'Cluster' ? 'cluster_id'
                    : config.name === 'Synthesis' ? 'synthesis_id'
                        : 'user_id'

            const url = mode === 'create'
                ? config.apiEndpoint
                : `${config.apiEndpoint}/${defaultValues?.[idField]}`

            const method = mode === 'create' ? 'POST' : 'PATCH'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(processedData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to save')
            }

            if (onSuccess) {
                onSuccess()
            } else {
                router.push(`/admin/${config.name.toLowerCase()}s`)
                router.refresh()
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Get field grouping for this model
    const fieldGroups = FIELD_GROUPS[config.name]

    // If no field groups defined, render all fields without grouping
    if (!fieldGroups) {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded">
                        <p className="font-medium">Error</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                )}

                <Card title={mode === 'create' ? `Create ${config.name}` : `Edit ${config.name}`}>
                    <FormSection
                        title="Information"
                        description={`${config.name} details`}
                    >
                        {config.fields.map((field) => (
                            <FieldRenderer
                                key={field.name}
                                field={field}
                                register={register}
                                control={control}
                                errors={errors}
                                defaultValue={defaultValues?.[field.name]}
                            />
                        ))}
                    </FormSection>

                    <div className="flex gap-3 pt-8 border-t border-gray-200">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="primary"
                            size="lg"
                        >
                            {isSubmitting
                                ? 'Saving...'
                                : mode === 'create'
                                    ? `Create ${config.name}`
                                    : `Save Changes`
                            }
                        </Button>

                        <Button
                            type="button"
                            onClick={() => router.back()}
                            variant="ghost"
                            size="lg"
                        >
                            Cancel
                        </Button>
                    </div>
                </Card>
            </form>
        )
    }

    const coreFields = config.fields.filter(f => fieldGroups.core.includes(f.name))
    const locationFields = fieldGroups.location
        ? config.fields.filter(f => fieldGroups.location!.includes(f.name))
        : []
    const metadataFields = config.fields.filter(f => fieldGroups.metadata.includes(f.name))
    const dataFields = config.fields.filter(f => fieldGroups.data.includes(f.name))

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-medium">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            )}

            <Card title={mode === 'create' ? `Create ${config.name}` : `Edit ${config.name}`}>
                <FormSection
                    title="Core Information"
                    description={`Basic ${config.name.toLowerCase()} details`}
                >
                    {coreFields.map((field) => (
                        <FieldRenderer
                            key={field.name}
                            field={field}
                            register={register}
                            control={control}
                            errors={errors}
                            defaultValue={defaultValues?.[field.name]}
                        />
                    ))}
                </FormSection>

                {locationFields.length > 0 && (
                    <FormSection
                        title="Location"
                        description="Geospatial coordinates (optional)"
                    >
                        <div className={locationFields.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}>
                            {locationFields.map((field) => (
                                <FieldRenderer
                                    key={field.name}
                                    field={field}
                                    register={register}
                                    control={control}
                                    errors={errors}
                                    defaultValue={defaultValues?.[field.name]}
                                />
                            ))}
                        </div>
                    </FormSection>
                )}

                {metadataFields.length > 0 && (
                    <FormSection
                        title="Metadata"
                        description="Status and settings"
                    >
                        <div className={`grid grid-cols-1 ${metadataFields.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}>
                            {metadataFields.map((field) => (
                                <FieldRenderer
                                    key={field.name}
                                    field={field}
                                    register={register}
                                    control={control}
                                    errors={errors}
                                    defaultValue={defaultValues?.[field.name]}
                                />
                            ))}
                        </div>
                    </FormSection>
                )}

                {dataFields.length > 0 && (
                    <FormSection
                        title="Data Payloads"
                        description="JSON data structures"
                    >
                        {dataFields.map((field) => (
                            <FieldRenderer
                                key={field.name}
                                field={field}
                                register={register}
                                control={control}
                                errors={errors}
                                defaultValue={defaultValues?.[field.name]}
                            />
                        ))}
                    </FormSection>
                )}

                <div className="flex gap-3 pt-8 border-t border-gray-200">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="primary"
                        size="lg"
                    >
                        {isSubmitting
                            ? 'Saving...'
                            : mode === 'create'
                                ? `Create ${config.name}`
                                : `Save Changes`
                        }
                    </Button>

                    <Button
                        type="button"
                        onClick={() => router.back()}
                        variant="ghost"
                        size="lg"
                    >
                        Cancel
                    </Button>
                </div>
            </Card>
        </form>
    )
}
