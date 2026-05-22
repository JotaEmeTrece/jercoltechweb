'use client';
import { useSession } from '../providers/SessionProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ManimVideo } from './ManimVideo';

export function BackgroundAmbientVideo() {
  const { state } = useSession();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[-50] pointer-events-none bg-[#101010] h-screen w-screen">
       <ManimVideo
          src="/videos/reposo_infraestructura.mp4"
          zoneId="background"
          zonePriority={10}
          uiPhase={state.phase}
          prefersReducedMotion={prefersReducedMotion}
          allowedPhases={['DEFAULT', 'RECOVERY_READY']}
          loop={true}
          className="w-full h-full aspect-video"
          activeOpacityClass="opacity-[0.12]"
       />
    </div>
  );
}