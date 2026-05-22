// @phase: Fase1

export type UIPhase = 'DEFAULT' | 'ANALYZING' | 'MUTATED' | 'FALLBACK' | 'RECOVERY_READY';
export type UIZone = 'HERO' | 'VALUE_PROP' | 'CASE_STUDY' | 'CTA' | 'TECH_STACK' | 'TELEMETRY_PANEL' | 'FOOTER';
export type MutationAction = 'SET_CONTENT' | 'TOGGLE_VISIBILITY' | 'REORDER' | 'HIGHLIGHT' | 'RESET_DEFAULT';
export type MutationIntent = 'INCREASE_TRUST' | 'EMPHASIZE_TECHNICAL_AUTHORITY' | 'HIGHLIGHT_AUTOMATION_RELEVANCE' | 'SURFACE_INDUSTRY_FIT' | 'REDUCE_FRICTION' | 'AMPLIFY_PAIN_POINT' | 'REINFORCE_OUTCOME';
export type VisualEffect = 'GLOW' | 'PULSE' | 'FADE_IN' | 'SLIDE' | 'COLOR_SHIFT' | 'BORDER_EMPHASIS' | 'SCALE' | 'BLUR_BACKGROUND' | 'NONE';

export interface BusinessProfile {
  id: string;
  companyName: string;
  industry: string;
  painPoints: string[];
  currentStack: string | null;
  desiredOutcome: string;
  capturedAt: number;
  source: 'form' | 'api';
}

export interface SimulationLog {
  logId: string;
  sessionId: string;
  message: string;
  level: 'info' | 'warn' | 'debug' | 'success';
  timing: { emittedAt: number; displayDelayMs: number };
  category: 'network' | 'ai' | 'mutation' | 'system';
}

export interface MutationDirective {
  directiveId: string;
  targetId: string;
  intent: MutationIntent;
  action: MutationAction;
  value: any;
  priority: number;
  appliedAt: number | null;
  status: 'pending' | 'applied' | 'rejected';
}

export interface UIState {
  stateId: string;
  sessionId: string;
  mutations: Record<string, MutationDirective>; // active applied mutations
  phase: UIPhase;
  createdAt: number;
}
