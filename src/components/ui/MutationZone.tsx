// @phase: Fase1

'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useSession } from '../providers/SessionProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutationPolicy } from '@/hooks/useMutationPolicy';

interface Props {
  targetId: string;
  defaultContent: ReactNode;
  renderMutated?: (value: any) => ReactNode;
  className?: string;
}

export function MutationZone({ targetId, defaultContent, renderMutated, className }: Props) {
  const { state } = useSession();
  const mutation = state.uiState.mutations[targetId];
  const policy = useMutationPolicy(mutation?.intent);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (mutation && state.phase !== 'ANALYZING') {
      setShowBadge(true);
      const t = setTimeout(() => setShowBadge(false), 4000);
      return () => clearTimeout(t);
    }
  }, [mutation, state.phase]);

  const badgeText = state.phase === 'FALLBACK' ? '[STABILIZED]' : '[ADAPTED]';
  const isStabilized = state.phase === 'FALLBACK';

  return (
    <div className={`relative transition-all duration-300 ${className} min-h-[40px]`} style={{ minHeight: 'max-content' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mutation ? 'mutated' : 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: policy.maxDurationMs / 1000 }}
        >
          {mutation && renderMutated ? renderMutated(mutation.value) : defaultContent}
        </motion.div>
      </AnimatePresence>

      {showBadge && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`absolute -top-6 right-0 font-mono text-[11px] px-2 py-0.5 rounded-sm border ${
            isStabilized ? 'border-[#D1A153]/30 text-[#606060]' : 'border-[#27C99F]/30 text-[#27C99F]'
          }`}
        >
          {badgeText}
        </motion.span>
      )}
    </div>
  );
}
