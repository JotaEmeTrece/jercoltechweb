// src/app/page.tsx
'use client';

import { SessionProvider } from '@/components/providers/SessionProvider';
import { HeroSection } from '@/components/sections/HeroSection';
import { EngineDemoSection } from '@/components/sections/EngineDemoSection';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { CTAProtocol } from '@/components/sections/CTAProtocol';

export default function Home() {
  return (
    <SessionProvider>
      <main className="min-h-screen bg-[#101010]">
        <HeroSection />
        <EngineDemoSection />
        <ServiceGrid />
        <CTAProtocol />
      </main>
    </SessionProvider>
  );
}
