// app/api/signals/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const signal = await prisma.signal.findUnique({
            where: { signal_ulid: id },
            include: {
                metadata: true,
                reflections: true,
                clusters: {
                    include: {
                        cluster: true,
                    },
                },
            },
        });

        if (!signal) {
            return NextResponse.json(
                { error: 'Signal not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ signal });

    } catch (error) {
        console.error('Signal fetch failed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;
        const body = await request.json();

        const signal = await prisma.signal.update({
            where: { signal_ulid: id },
            data: body,
        });

        return NextResponse.json({ signal });

    } catch (error) {
        console.error('Signal update failed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        await prisma.signal.delete({
            where: { signal_ulid: id },
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Signal delete failed:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
