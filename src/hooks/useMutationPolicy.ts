// @phase: Fase1

import { MutationIntent, VisualEffect } from '@/lib/types';

interface PolicyRules {
  allowedEffects: VisualEffect[];
  maxIntensity: 'subtle' | 'moderate' | 'strong';
  maxDurationMs: number;
  canApply: boolean;
}

export function useMutationPolicy(intent?: MutationIntent): PolicyRules {
  if (!intent) return { allowedEffects: ['NONE'], maxIntensity: 'subtle', maxDurationMs: 0, canApply: true };

  switch (intent) {
    case 'INCREASE_TRUST':
      return { allowedEffects: ['FADE_IN', 'COLOR_SHIFT'], maxIntensity: 'subtle', maxDurationMs: 600, canApply: true };
    case 'EMPHASIZE_TECHNICAL_AUTHORITY':
      return { allowedEffects: ['GLOW', 'BORDER_EMPHASIS'], maxIntensity: 'moderate', maxDurationMs: 500, canApply: true };
    case 'HIGHLIGHT_AUTOMATION_RELEVANCE':
      return { allowedEffects: ['PULSE', 'SLIDE'], maxIntensity: 'moderate', maxDurationMs: 400, canApply: true };
    case 'REDUCE_FRICTION':
    case 'REINFORCE_OUTCOME':
      return { allowedEffects: ['SCALE', 'FADE_IN'], maxIntensity: 'subtle', maxDurationMs: 300, canApply: true };
    default:
      return { allowedEffects: ['FADE_IN'], maxIntensity: 'subtle', maxDurationMs: 400, canApply: true };
  }
}
