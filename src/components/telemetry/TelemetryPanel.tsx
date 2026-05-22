// @phase: Fase1

'use client';
import { useSession } from '../providers/SessionProvider';
import { useTelemetryStream } from '@/hooks/useTelemetryStream';
import { PhaseIndicator } from '../ui/PhaseIndicator';

export function TelemetryPanel() {
  const { state } = useSession();
  const { visibleLogs, terminalRef, dotColor } = useTelemetryStream(state.logs, state.phase);
  const isLive = state.phase === 'ANALYZING';

  return (
    <div className="flex flex-col h-full bg-[#0C0C0C] border border-[#222] rounded-xl overflow-hidden font-mono text-[13px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#222] bg-[#111]">
        <div className="flex items-center gap-3">
          <PhaseIndicator color={dotColor} isPulsing={isLive} />
          <span className="text-[#888]">System.Runtime</span>
        </div>
        {isLive && <span className="text-[#2B76FF] animate-pulse">[LIVE]</span>}
      </div>

      {/* Terminal Body */}
      <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto space-y-2 text-[#A0A0A0]">
        {visibleLogs.map(log => (
          <div key={log.logId} className="flex gap-3 leading-relaxed">
            <span className="text-[#555]">[{new Date(log.timing.emittedAt).toLocaleTimeString()}]</span>
            <span className={log.level === 'warn' ? 'text-[#D1A153]' : log.level === 'success' ? 'text-[#27C99F]' : ''}>
              {log.message}
            </span>
          </div>
        ))}
        {isLive && <span className="animate-pulse text-[#555]">_</span>}
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-2 border-t border-[#222] bg-[#111] flex justify-between text-[#666] text-[11px]">
        <span>Confidence: {(state.confidenceScore * 100).toFixed(0)}%</span>
        <span>Mutations: {state.totalMutations}</span>
        <span>Phase: {state.phase}</span>
      </div>
    </div>
  );
}
