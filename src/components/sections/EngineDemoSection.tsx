// @phase: Fase1

import { BusinessProfileForm } from '../form/BusinessProfileForm';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';

export function EngineDemoSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: 60% Form & Content */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center gap-8">
          <div>
            <h2 className="font-serif text-3xl text-white mb-2">Contexto de Operación</h2>
            <p className="font-sans text-[#888]">Describe tu escenario técnico para adaptar la arquitectura en tiempo real.</p>
          </div>
          <BusinessProfileForm />
        </div>

        {/* Right Side: 40% Telemetry */}
        <div className="col-span-1 lg:col-span-5 h-[500px]">
          <TelemetryPanel />
        </div>
      </div>
    </section>
  );
}
