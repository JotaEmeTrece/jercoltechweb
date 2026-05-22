'use client';
import { MutationZone } from '../ui/MutationZone';
import { ManimVideo } from '../ui/ManimVideo';
import { useSession } from '../providers/SessionProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CTAProtocol() {
  const { state } = useSession();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full py-24 px-6 flex flex-col items-center justify-center">
      <MutationZone
        targetId="cta-btn"
        className="z-10"
        defaultContent={
          <button className="bg-white text-black font-sans px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
            Agendar Sesión de Arquitectura
          </button>
        }
        renderMutated={(text) => (
          <button className="bg-[#2B76FF] text-white font-sans px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(43,118,255,0.3)]">
            {text}
          </button>
        )}
      />

      <ManimVideo 
         src="/videos/consolidacion_mutacion.mp4"
         zoneId="cta" 
         zonePriority={5}
         uiPhase={state.phase}
         prefersReducedMotion={prefersReducedMotion}
         allowedPhases={['MUTATED']}
         className="w-full max-w-[400px] aspect-video absolute top-10 pointer-events-none mix-blend-screen opacity-50"
      />
    </section>
  );
}