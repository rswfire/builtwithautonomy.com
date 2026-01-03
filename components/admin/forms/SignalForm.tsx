// components/admin/forms/SignalForm.tsx
'use client'

import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMemo, useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { FormSection } from './FormSection'
import { FormField } from './FormField'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Select } from '../ui/Select'
import { JsonEditor } from './JsonEditor'
import { Controller } from 'react-hook-form'
import { SIGNAL_TYPES, SIGNAL_CONTEXT, SIGNAL_STATUS, SIGNAL_VISIBILITY, DEFAULTS } from '@/lib/constants'
import type { Realm } from '@/lib/types'
import { TagInput } from '../ui/TagInput'

interface SignalFormProps {
    mode: 'create' | 'edit'
    defaultValues?: any
    onSuccess?: () => void
    isPostgres: boolean
}

const SIGNAL_CONTEXT_DESCRIPTIONS = {
    CAPTURE: 'Generic documentation, intent to be determined',
    NOTE: 'Quick capture, ephemeral thought',
    JOURNAL: 'Reflective writing, daily log',
    CODE: 'Technical artifact, implementation',
    REFERENCE: 'External source, citation',
    OBSERVATION: 'Field note, documented reality',
    ARTIFACT: 'Created work, finished piece',
} as const

const SIGNAL_TYPES_SORTED = [...SIGNAL_TYPES].sort()
const SIGNAL_CONTEXT_SORTED = [...SIGNAL_CONTEXT].sort()

export function SignalForm({ mode, defaultValues, onSuccess, isPostgres }: SignalFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [realms, setRealms] = useState<Realm[]>([])
    const [loadingRealms, setLoadingRealms] = useState(true)

    const formDefaults = defaultValues ? {
        ...defaultValues,
        signal_metadata: defaultValues.signal_metadata ? JSON.stringify(defaultValues.signal_metadata, null, 2) : '',
        signal_payload: defaultValues.signal_payload ? JSON.stringify(defaultValues.signal_payload, null, 2) : '',
        signal_tags: defaultValues.signal_tags ? JSON.stringify(defaultValues.signal_tags, null, 2) : '',
        signal_location: defaultValues.signal_location ? JSON.stringify(defaultValues.signal_location, null, 2) : '',
    } : {
        realm_id: '',
        signal_type: 'DOCUMENT',
        signal_context: DEFAULTS.SIGNAL_CONTEXT,
        signal_status: DEFAULTS.SIGNAL_STATUS,
        signal_visibility: DEFAULTS.SIGNAL_VISIBILITY,
        signal_temperature: DEFAULTS.SIGNAL_TEMPERATURE,
    }

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: formDefaults,
    })

    const [latitude, setLatitude] = useState<string>(
        defaultValues?.signal_location?.coordinates?.[1]?.toString() || ''
    )
    const [longitude, setLongitude] = useState<string>(
        defaultValues?.signal_location?.coordinates?.[0]?.toString() || ''
    )

    const signalType = watch('signal_type')

    useEffect(() => {
        async function loadRealms() {
            try {
                const res = await fetch('/api/admin/realms')
                if (!res.ok) throw new Error('Failed to load realms')

                const data = await res.json()
                setRealms(data)

                if (mode === 'create' && data.length > 0 && !defaultValues?.realm_id) {
                    setValue('realm_id', data[0].realm_id)
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load realms')
            } finally {
                setLoadingRealms(false)
            }
        }
        loadRealms()
    }, [mode, defaultValues, setValue])

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        setError(null)

        try {
            const processedData = { ...data }

            // Convert lat/lng to appropriate format
            if (latitude && longitude) {
                if (isPostgres) {
                    processedData.signal_location = {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    }
                } else {
                    processedData.signal_latitude = parseFloat(latitude)
                    processedData.signal_longitude = parseFloat(longitude)
                }
            }

            delete processedData.latitude
            delete processedData.longitude

            ;['signal_metadata', 'signal_payload', 'signal_tags', 'signal_location'].forEach(field => {
                if (processedData[field] && typeof processedData[field] === 'string') {
                    try {
                        processedData[field] = JSON.parse(processedData[field])
                    } catch {
                        // Keep as string if invalid
                    }
                }
            })

            const url = mode === 'create'
                ? '/api/admin/signals'
                : `/api/admin/signals/${defaultValues?.signal_id}`

            const response = await fetch(url, {
                method: mode === 'create' ? 'POST' : 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processedData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to save signal')
            }

            if (onSuccess) {
                onSuccess()
            } else {
                router.push('/admin/signals')
                router.refresh()
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loadingRealms) {
        return <div className="text-gray-600">Loading realms...</div>
    }

    if (realms.length === 0) {
        return (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <p className="font-medium">No realms found</p>
                <p className="text-sm mt-1">You need at least one realm to create signals.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-medium">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            )}

            <Card title={mode === 'create' ? 'Create Signal' : 'Edit Signal'}>
                <FormSection title="Realm" description="Select the realm this signal belongs to">
                    <FormField label="Realm" name="realm_id" required error={errors.realm_id?.message as string}>
                        <Select
                            {...register('realm_id', { required: 'Realm is required' })}
                            disabled={mode === 'edit'}
                        >
                            <option value="">Select Realm</option>
                            {realms.map(realm => (
                                <option key={realm.realm_id} value={realm.realm_id}>
                                    {realm.realm_name}
                                </option>
                            ))}
                        </Select>
                    </FormField>
                    {mode === 'edit' && (
                        <p className="text-sm text-gray-500 mt-2">
                            Realm cannot be changed after signal creation
                        </p>
                    )}
                </FormSection>

                <FormSection title="Core Information" description="Basic signal details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Type" name="signal_type" required error={errors.signal_type?.message as string}>
                            <Select {...register('signal_type', { required: 'Type is required' })}>
                                <option value="">Select Type</option>
                                {SIGNAL_TYPES_SORTED.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Select>
                        </FormField>

                        <FormField label="Context" name="signal_context" required error={errors.signal_context?.message as string}>
                            <Select {...register('signal_context', { required: 'Context is required' })}>
                                {SIGNAL_CONTEXT_SORTED.map(ctx => (
                                    <React.Fragment key={ctx}>
                                        <option value={ctx} className="font-semibold py-2">
                                            {ctx}
                                        </option>
                                        <option disabled className="text-gray-500 text-sm italic pl-4 py-1">
                                            {SIGNAL_CONTEXT_DESCRIPTIONS[ctx]}
                                        </option>
                                    </React.Fragment>
                                ))}
                            </Select>
                        </FormField>
                    </div>

                    <FormField label="Title" name="signal_title" required error={errors.signal_title?.message as string}>
                        <Input
                            {...register('signal_title', { required: 'Title is required' })}
                            placeholder="Enter signal title"
                        />
                    </FormField>

                    <FormField label="Description" name="signal_description">
                        <Textarea
                            {...register('signal_description')}
                            rows={4}
                            placeholder="Enter description"
                        />
                    </FormField>

                    <FormField
                        label="Tags"
                        name="signal_tags"
                        description="Keywords for categorization and search"
                    >
                        <Controller
                            name="signal_tags"
                            control={control}
                            render={({ field }) => (
                                <TagInput
                                    value={field.value || []}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </FormField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Author" name="signal_author" required error={errors.signal_author?.message as string}>
                            <Input
                                {...register('signal_author', { required: 'Author is required' })}
                                placeholder="Author name"
                            />
                        </FormField>

                        <FormField
                            label="Temperature"
                            name="signal_temperature"
                            description="Importance: -1.0 (low) to 1.0 (critical)"
                        >
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="-1.0"
                                    max="1.0"
                                    step="0.1"
                                    {...register('signal_temperature', { valueAsNumber: true })}
                                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <span className="text-sm font-mono text-gray-700 min-w-[3rem] text-right">
            {watch('signal_temperature')?.toFixed(1) ?? '0.0'}
        </span>
                            </div>
                        </FormField>
                    </div>
                </FormSection>

                <FormSection title="Location" description="Geospatial coordinates (optional)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Latitude" name="latitude">
                            <Input
                                type="number"
                                step="any"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                placeholder="e.g., 43.8041"
                            />
                        </FormField>

                        <FormField label="Longitude" name="longitude">
                            <Input
                                type="number"
                                step="any"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                placeholder="e.g., -124.0631"
                            />
                        </FormField>
                    </div>
                </FormSection>

                <FormSection title="Metadata" description="Status and visibility settings">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FormField label="Status" name="signal_status">
                            <Select {...register('signal_status')}>
                                <option value="">Select Status</option>
                                {SIGNAL_STATUS.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </Select>
                        </FormField>

                        <FormField label="Visibility" name="signal_visibility">
                            <Select {...register('signal_visibility')}>
                                <option value="">Select Visibility</option>
                                {SIGNAL_VISIBILITY.map(vis => (
                                    <option key={vis} value={vis}>{vis}</option>
                                ))}
                            </Select>
                        </FormField>

                        <FormField
                            label="Created Date"
                            name="stamp_created"
                            description="When the signal was originally created/captured"
                        >
                            <Input type="datetime-local" {...register('stamp_created')} />
                        </FormField>
                    </div>
                </FormSection>

                <FormSection
                    title="Data Payloads"
                    description={`Type-specific data for ${signalType || 'signal'}`}
                >
                    <FormField
                        label="Metadata (JSON)"
                        name="signal_metadata"
                        description="Technical metadata (EXIF, duration, file size, etc.)"
                    >
                        <Controller
                            name="signal_metadata"
                            control={control}
                            render={({ field }) => (
                                <JsonEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    rows={6}
                                    placeholder='{\n  "key": "value"\n}'
                                />
                            )}
                        />
                    </FormField>

                    <FormField
                        label="Payload (JSON)"
                        name="signal_payload"
                        description="Content data (file paths, text content, transcripts)"
                    >
                        <Controller
                            name="signal_payload"
                            control={control}
                            render={({ field }) => (
                                <JsonEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    rows={6}
                                    placeholder='{\n  "key": "value"\n}'
                                />
                            )}
                        />
                    </FormField>

                </FormSection>

                <div className="flex gap-3 pt-8 border-t border-gray-200">
                    <Button type="submit" disabled={isSubmitting} variant="primary" size="lg">
                        {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Signal' : 'Save Changes'}
                    </Button>

                    <Button type="button" onClick={() => router.back()} variant="ghost" size="lg">
                        Cancel
                    </Button>
                </div>
            </Card>
        </form>
    )
}
