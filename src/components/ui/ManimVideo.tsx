'use client';
import { UIPhase } from '@/lib/types';
import { useAnimationOrchestrator } from '@/hooks/useAnimationOrchestrator';

interface Props {
  src: string;
  zoneId: string;
  zonePriority: number;
  uiPhase: UIPhase;
  prefersReducedMotion: boolean;
  allowedPhases: UIPhase[];
  loop?: boolean;
  className?: string;
  activeOpacityClass?: string;
}

export function ManimVideo({ 
  src, zoneId, zonePriority, uiPhase, prefersReducedMotion, allowedPhases, 
  loop = false, className = '', activeOpacityClass = 'opacity-100'
}: Props) {
  const { videoRef, isPlaying } = useAnimationOrchestrator({
    zoneId, zonePriority, uiPhase, prefersReducedMotion, allowedPhases
  });

  const currentOpacity = (isPlaying && !prefersReducedMotion) ? activeOpacityClass : 'opacity-0';

  return (
    <div className={`relative overflow-hidden bg-transparent ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop={loop}
        preload={zonePriority === 1 ? 'auto' : 'none'}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${currentOpacity}`}
      />
      {prefersReducedMotion && (
         <div className="absolute inset-0 bg-[#080808] opacity-50 flex items-center justify-center border border-[#222] rounded-lg">
            <span className="font-mono text-xs text-[#444]">[ System Ready : Motion Reduced ]</span>
         </div>
      )}
    </div>
  );
}