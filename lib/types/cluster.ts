// lib/types/cluster.ts

import { Cluster, ClusterType } from '@prisma/client';

/**
 * Cluster metadata structure
 */
export type ClusterMetadata = {
    // Temporal bounds (for TEMPORAL clusters)
    temporal?: {
        start: string; // ISO datetime
        end: string;
        duration_days?: number;
    };

    // Spatial bounds (for SPATIAL clusters)
    spatial?: {
        center_lat: number;
        center_lng: number;
        radius_km?: number;
        bounding_box?: {
            north: number;
            south: number;
            east: number;
            west: number;
        };
    };

    // Thematic data (for THEMATIC clusters)
    thematic?: {
        primary_themes: string[];
        similarity_threshold?: number;
        clustering_algorithm?: string; // 'cosine', 'euclidean', etc.
    };

    // Signal count
    signal_count?: number;

    // Quality metrics
    coherence_score?: number;

    // Custom fields
    [key: string]: any;
};

/**
 * Cluster notes structure
 */
export type ClusterNotes = {
    description?: string;
    observations?: string[];
    synthesis?: string;

    // User annotations
    annotations?: {
        created_at: string;
        content: string;
    }[];

    [key: string]: any;
};

/**
 * Cluster tags structure
 */
export type ClusterTags = string[];

/**
 * Cluster with relations included
 */
export type ClusterWithRelations = Cluster & {
    signals?: any[];
    metadata?: any;
    reflections?: any[];
};

/**
 * Cluster creation input
 */
export type CreateClusterInput = {
    cluster_type: ClusterType;
    cluster_title?: string;
    cluster_notes?: ClusterNotes;
    cluster_tags?: ClusterTags;
    cluster_metadata?: ClusterMetadata;
    cluster_state: string; // 'active', 'archived', 'draft', etc.
    stamp_cluster_start?: Date;
    stamp_cluster_end?: Date;
};

/**
 * Cluster signal addition input
 */
export type AddSignalToClusterInput = {
    cluster_ulid: string;
    signal_ulid: string;
    position?: number;
    pivot_metadata?: {
        reason?: string; // Why this signal is in this cluster
        relevance_score?: number;
        [key: string]: any;
    };
};

/**
 * Clustering algorithm configuration
 */
export type ClusteringConfig = {
    algorithm: 'temporal' | 'spatial' | 'thematic' | 'manual';

    // Temporal clustering params
    temporal?: {
        window_hours?: number; // Group signals within N hours
        max_gap_hours?: number; // Max time between signals in cluster
    };

    // Spatial clustering params
    spatial?: {
        radius_km?: number; // Group signals within N km
        min_signals?: number; // Minimum signals to form cluster
    };

    // Thematic clustering params
    thematic?: {
        similarity_threshold?: number; // 0-1, cosine similarity threshold
        min_common_themes?: number; // Minimum shared themes
        use_embeddings?: boolean; // Use vector embeddings or just keywords
    };
};

/**
 * Cluster synthesis result
 */
export type ClusterSynthesis = {
    synthesis_ulid: string;
    cluster_ulid: string;

    // Synthesized data
    summary: string;
    key_themes: string[];
    narrative_arc?: string;

    // Pattern detection
    patterns: {
        type: string;
        description: string;
        signal_ulids: string[]; // Which signals contribute to this pattern
        confidence: number;
    }[];

    // Temporal analysis (if applicable)
    temporal_analysis?: {
        trajectory: 'ascending' | 'descending' | 'cyclical' | 'stable';
        inflection_points?: {
            timestamp: string;
            signal_ulid: string;
            description: string;
        }[];
    };

    // Metadata
    synthesized_at: string;
    synthesized_by: string; // AI provider
    confidence: number;
};
