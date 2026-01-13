// components/admin/forms/signal/PresentationFields.tsx
'use client'

import { Input, Textarea } from '../../ui'
import { FormField } from '../FormField'
import type { UseFormRegister } from 'react-hook-form'

interface PresentationFieldsProps {
    register: UseFormRegister<any>
    watch: (name: string) => any
}

export function PresentationFields({ register, watch }: PresentationFieldsProps) {
    const generateSlug = () => {
        const title = watch('signal_title')
        if (!title) return ''

        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                    <strong>Presentation Settings:</strong> Configure how this signal appears on public realm pages.
                    Leave slug empty to keep signal private and accessible only by ID.
                </p>
            </div>

            <FormField
                label="Slug"
                name="presentation_slug"
                description="URL-friendly identifier (lowercase letters, numbers, hyphens only)"
            >
                <div className="flex gap-2">
                    <Input
                        {...register('presentation_slug')}
                        placeholder="my-signal-slug"
                        pattern="^[a-z0-9-]+$"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            const slug = generateSlug()
                            const input = document.querySelector('[name="presentation_slug"]') as HTMLInputElement
                            if (input) input.value = slug
                        }}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm whitespace-nowrap"
                    >
                        Generate from Title
                    </button>
                </div>
            </FormField>

            <FormField
                label="Category"
                name="presentation_category"
                description="Group related signals together (e.g., 'essays', 'projects', 'notes')"
            >
                <Input
                    {...register('presentation_category')}
                    placeholder="essays"
                />
            </FormField>

            <FormField
                label="Featured"
                name="presentation_featured"
                description="Mark this signal for prominent display on realm pages"
            >
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register('presentation_featured')}
                        className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Feature this signal</span>
                </label>
            </FormField>

            <FormField
                label="SEO Title"
                name="presentation_seo_title"
                description="Custom title for search engines (max 200 characters)"
            >
                <Input
                    {...register('presentation_seo_title')}
                    placeholder="Leave empty to use signal title"
                    maxLength={200}
                />
            </FormField>

            <FormField
                label="SEO Description"
                name="presentation_seo_description"
                description="Custom description for search engines (max 500 characters)"
            >
                <Textarea
                    {...register('presentation_seo_description')}
                    placeholder="Leave empty to use signal summary"
                    rows={3}
                    maxLength={500}
                />
            </FormField>

            <FormField
                label="Hero Image"
                name="presentation_hero_image"
                description="Path or URL to hero image for this signal"
            >
                <Input
                    {...register('presentation_hero_image')}
                    placeholder="/images/hero.jpg"
                />
            </FormField>

            <FormField
                label="Publish Date"
                name="presentation_publish_date"
                description="When this signal should be considered 'published' (optional, separate from creation date)"
            >
                <Input
                    type="date"
                    {...register('presentation_publish_date')}
                />
            </FormField>
        </div>
    )
}
