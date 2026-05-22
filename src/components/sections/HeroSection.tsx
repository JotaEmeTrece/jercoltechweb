// @phase: Fase1

import { MutationZone } from '../ui/MutationZone';
import { ManimVideoPlaceholder } from '../ui/ManimVideoPlaceholder';
import { useSession } from '../providers/SessionProvider';

export function HeroSection() {
  const { state } = useSession();
  return (
    <section className="relative w-full pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="absolute inset-0 -z-10 w-full h-[600px] pointer-events-none opacity-20">
         <ManimVideoPlaceholder zoneId="HERO_BG" uiPhase={state.phase} />
      </div>

      <MutationZone 
        targetId="hero-headline"
        className="w-full max-w-4xl"
        defaultContent={<h1 className="font-serif text-5xl md:text-7xl text-white leading-tight tracking-tight">Ingeniería de Software de Alta Precisión y Orquestación de IA</h1>}
        renderMutated={(text) => <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight tracking-tight">{text}</h1>}
      />
      
      <MutationZone 
        targetId="hero-subheadline"
        className="mt-6 w-full max-w-2xl"
        defaultContent={<p className="font-sans text-xl text-[#A0A0A0]">Diseñamos y optimizamos arquitecturas digitales escalables mediante sistemas inteligentes avanzados.</p>}
        renderMutated={(text) => <p className="font-sans text-xl text-[#A0A0A0]">{text}</p>}
      />
    </section>
  );
}
