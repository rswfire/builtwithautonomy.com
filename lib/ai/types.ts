// lib/ai/types.ts

import type { MetadataExtractionResult } from '@/lib/types';

export interface AIProvider {
    name: string;
    model: string;
    extract(content: string, signalType: string): Promise<MetadataExtractionResult>;
}
