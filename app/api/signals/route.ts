// app/api/signals/route.ts

import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import { prisma } from '@/lib/db';
import { getAIProvider } from '@/lib/ai';

const createSignalSchema = z.object({
    signal_type: z.enum(['PHOTO', 'VIDEO', 'AUDIO', 'TEXT', 'LOCATION']),
    signal_title: z.string().optional(),
    signal_description: z.string().optional(),
    signal_author: z.string().optional(),
    signal_source: z.string().optional(),
    signal_latitude: z.number().min(-90).max(90).optional(),
    signal_longitude: z.number().min(-180).max(180).optional(),
    signal_status: z.enum(['PENDING', 'PROCESSING', 'PROCESSED', 'FAILED']).optional(),
    signal_visibility: z.enum(['PUBLIC', 'PRIVATE', 'SANCTUM']).optional(),
    signal_metadata: z.record(z.string(), z.any()).optional(),
    signal_payload: z.record(z.string(), z.any()).optional(),
    signal_tags: z.array(z.string()).optional(),
    stamp_created: z.string().datetime().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = createSignalSchema.parse(body);

        const signal = await prisma.signal.create({
            data: {
                signal_ulid: crypto.randomUUID(),
                signal_type: validated.signal_type,
                signal_title: validated.signal_title,
                signal_description: validated.signal_description,
                signal_author: validated.signal_author,
                signal_source: validated.signal_source,
                signal_latitude: validated.signal_latitude,
                signal_longitude: validated.signal_longitude,
                signal_status: validated.signal_status || 'PENDING',
                signal_visibility: validated.signal_visibility || 'PUBLIC',
                signal_metadata: validated.signal_metadata as any,
                signal_payload: validated.signal_payload as any,
                signal_tags: validated.signal_tags as any,
                stamp_created: validated.stamp_created ? new Date(validated.stamp_created) : new Date(),
            },
        });

        return NextResponse.json({ signal }, { status: 201 });

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Signal creation failed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const status = searchParams.get('status');
        const visibility = searchParams.get('visibility');
        const limit = parseInt(searchParams.get('limit') || '50');

        const signals = await prisma.signal.findMany({
            where: {
                ...(type && { signal_type: type as any }),
                ...(status && { signal_status: status as any }),
                ...(visibility && { signal_visibility: visibility as any }),
            },
            include: {
                metadata: true,
                reflections: true,
            },
            orderBy: { stamp_created: 'desc' },
            take: Math.min(limit, 100),
        });

        return NextResponse.json({ signals });

    } catch (error) {
        console.error('Signal fetch failed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
