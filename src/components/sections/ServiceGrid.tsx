// @phase: Fase1

'use client';

export function ServiceGrid() {
  const services = [
    'Orquestación de IA',
    'Arquitectura de datos',
    'Automatización inteligente',
    'Infraestructura escalable',
    'Visión predictiva',
    'Sistemas adaptativos',
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif text-white mb-12">Capacidades técnicas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {services.map((service) => (
          <div key={service} className="bg-[#161616] border border-white/10 p-4 text-center">
            <span className="text-white text-sm font-sans">{service}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
