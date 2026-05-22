jercol-frontend/
├── public/
│   └── videos/                     (se llenará en Fase 2 y 3)
│       ├── ingesta.mp4
│       ├── consolidacion.mp4
│       ├── mitigacion.mp4
│       └── reposo.mp4
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Server Component (raíz)
│   │   ├── page.tsx                # Server Component (home)
│   │   └── api/
│   │       └── analyze/
│   │           └── route.ts        # API route (POST /api/analyze)
│   │
│   ├── components/
│   │   ├── providers/
│   │   │   └── SessionProvider.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── EngineDemoSection.tsx
│   │   │   ├── ServiceGrid.tsx
│   │   │   ├── PredictiveDashboard.tsx
│   │   │   └── CTAProtocol.tsx
│   │   ├── mutation/
│   │   │   ├── MutationEngine.tsx
│   │   │   ├── MutationZone.tsx
│   │   │   └── useMutationPolicy.ts   (hook)
│   │   ├── telemetry/
│   │   │   ├── TelemetryPanel.tsx
│   │   │   ├── LogEntry.tsx
│   │   │   └── useTelemetryStream.ts   (hook)
│   │   ├── ui/
│   │   │   ├── GlowBorder.tsx
│   │   │   ├── PhaseIndicator.tsx
│   │   │   ├── ManimVideo.tsx          (Fase 3)
│   │   │   └── ManimVideoPlaceholder.tsx (Fase 1)
│   │   └── form/
│   │       └── BusinessProfileForm.tsx
│   │
│   ├── hooks/
│   │   ├── useSession.ts           # helper para consumir SessionProvider
│   │   ├── useTelemetryStream.ts   # (si no está dentro de components/telemetry)
│   │   └── useAnimationOrchestrator.ts  # Fase 3
│   │
│   ├── lib/
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── mutation-engine/
│   │   │   └── scheduler.ts        # lógica de cooldown, prioridad (opcional)
│   │   └── telemetry/
│   │       └── stream-controller.ts
│   │
│   ├── stores/
│   │   └── globalAnimationStore.ts # Zustand store (Fase 3)
│   │
│   └── styles/
│       └── globals.css             # Tailwind + tokens CSS
│
├── .env.local                      # variables de entorno (LLM_PROVIDER, etc.)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js