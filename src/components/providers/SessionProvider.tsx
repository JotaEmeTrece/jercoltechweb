'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UIPhase, UIState, SimulationLog, MutationDirective } from '@/lib/types';

interface SessionState {
  phase: UIPhase;
  sessionId: string | null;
  uiState: UIState;
  logs: SimulationLog[];
  pendingMutations: MutationDirective[];
  confidenceScore: number;
  totalMutations: number;
  analyzingStartedAt: number | null;
}

type Action =
  | { type: 'FORM_SUBMITTED'; payload: { sessionId: string } }
  | { type: 'AI_ANALYSIS_STARTED' }
  | { type: 'MUTATION_DISPATCHED'; payload: { directives: MutationDirective[], confidenceScore: number } }
  | { type: 'MUTATION_APPLIED'; payload: { directive: MutationDirective } }
  | { type: 'FALLBACK_TRIGGERED'; payload: { safePackMutations: MutationDirective[] } }
  | { type: 'EXPERIENCE_STABILIZED' }
  | { type: 'APPEND_LOGS'; payload: SimulationLog[] }
  | { type: 'RESET_SESSION' };

const initialState: SessionState = {
  phase: 'DEFAULT',
  sessionId: null,
  uiState: { stateId: '', sessionId: '', mutations: {}, phase: 'DEFAULT', createdAt: Date.now() },
  logs: [],
  pendingMutations: [],
  confidenceScore: 0,
  totalMutations: 0,
  analyzingStartedAt: null,
};

function sessionReducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case 'FORM_SUBMITTED':
      return {
        ...state,
        phase: 'ANALYZING',
        sessionId: action.payload.sessionId,
        logs: [],
        analyzingStartedAt: Date.now()
      };
    case 'MUTATION_DISPATCHED':
      return { 
        ...state, 
        pendingMutations: action.payload.directives,
        confidenceScore: action.payload.confidenceScore,
        totalMutations: action.payload.directives.length
      };
    case 'MUTATION_APPLIED':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          mutations: { ...state.uiState.mutations, [action.payload.directive.targetId]: action.payload.directive }
        },
        pendingMutations: state.pendingMutations.filter(m => m.directiveId !== action.payload.directive.directiveId)
      };
    case 'FALLBACK_TRIGGERED':
      return { ...state, phase: 'FALLBACK', pendingMutations: action.payload.safePackMutations };
    case 'EXPERIENCE_STABILIZED':
      return { ...state, phase: state.phase === 'FALLBACK' ? 'FALLBACK' : 'MUTATED' };
    case 'APPEND_LOGS':
      return { ...state, logs: [...state.logs, ...action.payload] };
    case 'RESET_SESSION':
      return initialState;
    default:
      return state;
  }
}

const SessionContext = createContext<{ state: SessionState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  return <SessionContext.Provider value={{ state, dispatch }}>{children}</SessionContext.Provider>;
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
};