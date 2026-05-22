import { MutationZone } from '../ui/MutationZone';

export function CTAProtocol() {
  return (
    <section className="w-full py-24 px-6 flex justify-center">
      <MutationZone
        targetId="cta-btn"
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
    </section>
  );
}
