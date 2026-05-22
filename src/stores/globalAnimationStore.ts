import { create } from 'zustand';

interface VisibleZone {
  id: string;
  priority: number;
}

interface AnimationStore {
  visibleZones: VisibleZone[];
  registerZone: (id: string, priority: number) => void;
  unregisterZone: (id: string) => void;
  getActiveZoneId: () => string | null;
}

export const useGlobalAnimationStore = create<AnimationStore>((set, get) => ({
  visibleZones: [],
  registerZone: (id, priority) => set((state) => {
    const exists = state.visibleZones.some(z => z.id === id);
    const updated = exists 
      ? state.visibleZones.map(z => z.id === id ? { id, priority } : z)
      : [...state.visibleZones, { id, priority }];
    return { visibleZones: updated.sort((a, b) => a.priority - b.priority) };
  }),
  unregisterZone: (id) => set((state) => ({
    visibleZones: state.visibleZones.filter(z => z.id !== id)
  })),
  getActiveZoneId: () => {
    const zones = get().visibleZones;
    return zones.length > 0 ? zones[0].id : null;
  }
}));