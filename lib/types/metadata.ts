// lib/types/metadata.ts

/**
 * Single attempt in metadata processing history
 */
export type MetadataHistoryAttempt = {
    attempt_id: string;
    attempt_number: number;
    timestamp: string; // ISO datetime

    input: {
        provider: string;
        model: string;
        prompt: string;
        annotations?: MetadataAnnotations;
        temperature?: number;
        max_tokens?: number;
    };

    output: {
        raw_response: string;
        parsed_content?: MetadataExtractionResult;
        parse_error?: string;
    };

    status: 'success' | 'failed' | 'partial';
    error?: string;
    duration_ms: number;
    tokens_used?: number;

    confidence?: number;
    validation?: {
        passed: boolean;
        issues?: string[];
    };
};

/**
 * Complete history array stored in metadata_history
 */
export type MetadataHistory = MetadataHistoryAttempt[];

/**
 * Annotations to guide AI processing
 */
export type MetadataAnnotations = {
    version: number;
    created_at: string;

    instructions: string[];

    corrections: {
        field: string;
        expected: any;
        reason: string;
    }[];

    context?: {
        location?: string;
        event?: string;
        participants?: string[];
        custom?: Record<string, any>;
    };

    prevent_hallucination?: {
        forbidden_patterns: string[];
        required_patterns: string[];
    };
};

/**
 * Error tracking structure
 */
export type MetadataError = {
    error_id: string;
    timestamp: string;
    attempt_number: number;

    error_type: 'parse_error' | 'validation_error' | 'api_error' | 'timeout' | 'model_collapse';
    error_message: string;
    error_details?: Record<string, any>;

    recovery?: {
        action: 'retry' | 'annotate' | 'manual_review' | 'skip';
        annotations_added?: MetadataAnnotations;
        resolved: boolean;
    };
};

/**
 * Array of errors stored in metadata_errors
 */
export type MetadataErrors = MetadataError[];

/**
 * What AI extracts from a signal
 */
export type MetadataExtractionResult = {
    themes: {
        primary: string[];
        secondary: string[];
        keywords: string[];
    };

    patterns: {
        type: string;
        description: string;
        confidence: number;
    }[];

    sentiment: {
        emotional_markers: string[];
        cognitive_state: string;
        intensity: number;
    };
};

/**
 * Model collapse detection result
 */
export type ModelCollapseAnalysis = {
    collapsed: boolean;
    indicators: string[];
    recommendation: 'continue' | 'annotate' | 'switch_model' | 'manual_review';
};
