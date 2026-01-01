// lib/metadata/helpers.ts

import type {
    MetadataHistory,
    MetadataAnnotations,
    ModelCollapseAnalysis,
} from '@/lib/types';

/**
 * Detect model collapse from history
 */
export function detectModelCollapse(
    history: MetadataHistory
): ModelCollapseAnalysis {
    const indicators: string[] = [];

    // Analyze recent attempts
    const recentAttempts = history.slice(-5);
    const failureRate = recentAttempts.filter(a => a.status === 'failed').length / recentAttempts.length;

    if (failureRate > 0.6) {
        indicators.push('High failure rate in recent attempts');
    }

    // Check confidence trends
    const confidences = history
        .filter(a => a.confidence != null)
        .map(a => a.confidence!);

    if (confidences.length >= 3) {
        const recent = confidences.slice(-3);
        if (recent[2] < recent[0] - 0.2) {
            indicators.push('Confidence scores decreasing');
        }
    }

    // Determine recommendation
    let recommendation: ModelCollapseAnalysis['recommendation'] = 'continue';

    if (indicators.length >= 2) {
        recommendation = 'switch_model';
    } else if (indicators.length === 1) {
        recommendation = 'annotate';
    }

    return {
        collapsed: indicators.length >= 2,
        indicators,
        recommendation,
    };
}

/**
 * Build annotations from error history
 */
export function buildAnnotationsFromErrors(
    history: MetadataHistory,
    customInstructions?: string[]
): MetadataAnnotations {
    const failedAttempts = history.filter(a => a.status === 'failed');

    return {
        version: 1,
        created_at: new Date().toISOString(),
        instructions: [
            ...(customInstructions || []),
            ...failedAttempts.map(a =>
                `Previous attempt failed: ${a.error}`
            ),
        ],
        corrections: [],
    };
}
