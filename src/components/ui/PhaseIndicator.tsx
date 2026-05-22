// @phase: Fase1

import { motion } from 'framer-motion';

export function PhaseIndicator({ color, isPulsing }: { color: string, isPulsing: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-3 h-3">
      {isPulsing && (
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute rounded-full w-full h-full"
          style={{ backgroundColor: color }}
        />
      )}
      <div className="relative rounded-full w-2 h-2" style={{ backgroundColor: color }} />
    </div>
  );
}
