import { useEffect, useRef, useState } from 'react';
import { useGlobalAnimationStore } from '../stores/globalAnimationStore';
import { UIPhase } from '@/lib/types';

interface Props {
  zoneId: string;
  zonePriority: number;
  uiPhase: UIPhase;
  prefersReducedMotion: boolean;
  allowedPhases: UIPhase[];
}

export function useAnimationOrchestrator({ 
  zoneId, 
  zonePriority, 
  uiPhase, 
  prefersReducedMotion,
  allowedPhases
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  
  const registerZone = useGlobalAnimationStore((s) => s.registerZone);
  const unregisterZone = useGlobalAnimationStore((s) => s.unregisterZone);
  const getActiveZoneId = useGlobalAnimationStore((s) => s.getActiveZoneId);
  
  const activeZoneId = getActiveZoneId();
  const isPhaseValid = allowedPhases.includes(uiPhase);
  
  const hasExecutionPermit = isInViewport && activeZoneId === zoneId && !prefersReducedMotion && isPhaseValid;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        if (entry.isIntersecting) {
          registerZone(zoneId, zonePriority);
        } else {
          unregisterZone(zoneId);
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      observer.disconnect();
      unregisterZone(zoneId);
    };
  }, [zoneId, zonePriority, registerZone, unregisterZone]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (hasExecutionPermit) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [hasExecutionPermit]);

  return { videoRef, isPlaying: hasExecutionPermit };
}