'use client';
import { useEffect, useRef } from 'react';
import { useSession } from '../providers/SessionProvider';

export function MutationEngine() {
  const { state, dispatch } = useSession();
  const activeMutationsCount = Object.keys(state.uiState.mutations).length;
  const lastMutationTime = useRef<Record<string, number>>({});

  useEffect(() => {
    if (state.pendingMutations.length === 0) {
      if (state.phase === 'ANALYZING' && activeMutationsCount > 0) {
        dispatch({ type: 'EXPERIENCE_STABILIZED' });
      }
      return;
    }

    if (activeMutationsCount >= 4) return;

    const processNext = async () => {
      const nextMutation = state.pendingMutations[0];
      const now = Date.now();

      if (state.phase === 'ANALYZING' && activeMutationsCount === 0) {
        const elapsed = now - (state.analyzingStartedAt || now);
        if (elapsed < 1500) {
          await new Promise(r => setTimeout(r, 1500 - elapsed));
        }
      }

      const targetCooldown = lastMutationTime.current[nextMutation.targetId] || 0;
      if (now - targetCooldown < 1500) {
        await new Promise(r => setTimeout(r, 1500 - (now - targetCooldown)));
      }

      if (state.pendingMutations.length > 2) {
        await new Promise(r => setTimeout(r, 150));
      }

      lastMutationTime.current[nextMutation.targetId] = Date.now();
      dispatch({ 
        type: 'MUTATION_APPLIED', 
        payload: { directive: { ...nextMutation, status: 'applied', appliedAt: Date.now() } } 
      });
    };

    processNext();
  }, [state.pendingMutations, activeMutationsCount, state.phase, dispatch, state.analyzingStartedAt]);

  return null;
}