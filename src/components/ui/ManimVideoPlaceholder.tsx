// @phase: Fase1

export function ManimVideoPlaceholder({ zoneId, uiPhase }: { zoneId: string; uiPhase: string }) {
  return (
    <div className="manim-placeholder w-full h-full bg-[#080808] border border-[#222] rounded-lg flex items-center justify-center opacity-40">
      <span className="font-mono text-xs text-[#444]">[ Manim Canvas : {zoneId} ]</span>
    </div>
  );
}
