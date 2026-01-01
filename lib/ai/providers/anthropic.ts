// lib/ai/providers/anthropic.ts

import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider } from '../types';
import type { MetadataExtractionResult } from '@/lib/types';

export class AnthropicProvider implements AIProvider {
    name = 'anthropic';
    model = 'claude-sonnet-4-20250514';

    private client: Anthropic;

    constructor(apiKey: string) {
        this.client = new Anthropic({ apiKey });
    }

    async extract(content: string, signalType: string): Promise<MetadataExtractionResult> {
        const prompt = `
Analyze this ${signalType} signal and extract structured data.

Content: ${content}

Respond ONLY with valid JSON in this exact format:
{
  "themes": {
    "primary": ["theme1", "theme2"],
    "secondary": ["theme3"],
    "keywords": ["keyword1", "keyword2"]
  },
  "patterns": [
    {
      "type": "pattern_type",
      "description": "what was detected",
      "confidence": 0.85
    }
  ],
  "sentiment": {
    "emotional_markers": ["marker1", "marker2"],
    "cognitive_state": "reflective",
    "intensity": 0.7
  }
}
    `.trim();

        const response = await this.client.messages.create({
            model: this.model,
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }],
        });

        const text = response.content[0].type === 'text'
            ? response.content[0].text
            : '';

        const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();

        return JSON.parse(cleaned);
    }
}
