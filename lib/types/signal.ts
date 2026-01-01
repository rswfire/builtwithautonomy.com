// lib/types/signal.ts

import { Signal, SignalType, SignalStatus, SignalVisibility } from '@prisma/client';

/**
 * Signal payload structure
 */
export type SignalPayload = {
    // Core content
    file_path?: string;
    file_url?: string;
    transcript?: string;
    text_content?: string;

    // Pre-processing annotations (optional)
    annotations?: {
        instructions?: string[];
        context?: Record<string, any>;
    };

    // Custom fields
    [key: string]: any;
};

/**
 * Signal metadata structure
 */
export type SignalMetadata = {
    // Technical metadata
    file_size?: number;
    duration?: number;
    resolution?: string;
    format?: string;

    // Content metadata
    tags?: string[];
    categories?: string[];

    // Custom fields
    [key: string]: any;
};

/**
 * Signal with relations included
 */
export type SignalWithRelations = Signal & {
    metadata?: any;
    reflections?: any[];
    clusters?: any[];
};

/**
 * Signal creation input
 */
export type CreateSignalInput = {
    signal_type: SignalType;
    signal_title?: string;
    signal_description?: string;
    signal_author?: string;
    signal_source?: string;
    signal_latitude?: number;
    signal_longitude?: number;
    signal_status?: SignalStatus;
    signal_visibility?: SignalVisibility;
    signal_metadata?: SignalMetadata;
    signal_payload?: SignalPayload;
    signal_tags?: string[];
};
