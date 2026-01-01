// lib/types/index.ts

// Metadata types
export type {
    MetadataHistoryAttempt,
    MetadataHistory,
    MetadataAnnotations,
    MetadataError,
    MetadataErrors,
    MetadataExtractionResult,
    ModelCollapseAnalysis,
} from './metadata';

// Signal types
export type {
    SignalPayload,
    SignalMetadata,
    SignalWithRelations,
    CreateSignalInput,
} from './signal';

// Cluster types
export type {
    ClusterMetadata,
    ClusterNotes,
    ClusterTags,
    ClusterWithRelations,
    CreateClusterInput,
    AddSignalToClusterInput,
    ClusteringConfig,
    ClusterSynthesis,
} from './cluster';

// Re-export Prisma enums for convenience
export { SignalType, SignalStatus, SignalVisibility } from '@prisma/client';
export { ClusterType } from '@prisma/client';
export { ReflectionType } from '@prisma/client';
