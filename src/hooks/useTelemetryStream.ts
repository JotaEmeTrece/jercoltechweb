// @phase: Fase1

import { useEffect, useState, useRef } from 'react';
import { SimulationLog, UIPhase } from '@/lib/types';

export function useTelemetryStream(logs: SimulationLog[], phase: UIPhase) {
  const [visibleLogs, setVisibleLogs] = useState<SimulationLog[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Phase Colors
  const getDotColor = () => {
    switch(phase) {
      case 'ANALYZING': return '#2B76FF'; // Blue
      case 'MUTATED': return '#27C99F';   // Green
      case 'FALLBACK': return '#D1A153';  // Amber
      default: return '#606060';          // Gray
    }
  };

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    logs.forEach(log => {
      if (!visibleLogs.find(v => v.logId === log.logId)) {
        const t = setTimeout(() => {
          setVisibleLogs(prev => [...prev, log]);
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }, log.timing.displayDelayMs);
        timeouts.push(t);
      }
    });

    return () => timeouts.forEach(clearTimeout);
  }, [logs, visibleLogs]);

  return { visibleLogs, terminalRef, dotColor: getDotColor() };
}
