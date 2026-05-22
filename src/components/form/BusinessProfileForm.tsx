'use client';
import { useState } from 'react';
import { useSession } from '../providers/SessionProvider';
import { SimulationLog, MutationDirective } from '@/lib/types';

export function BusinessProfileForm() {
  const { state, dispatch } = useSession();
  const [formData, setFormData] = useState({ companyName: '', industry: '', painPoints: '' });
  const isDisabled = state.phase === 'ANALYZING' || state.phase === 'FALLBACK';

  const simulateBackendResponse = () => {
    const logs: SimulationLog[] = [
      { logId: '1', sessionId: 's1', message: 'Payload received — 247 bytes', level: 'info', timing: { emittedAt: Date.now(), displayDelayMs: 200 }, category: 'network' },
      { logId: '2', sessionId: 's1', message: 'Tokenizing business context...', level: 'debug', timing: { emittedAt: Date.now(), displayDelayMs: 1200 }, category: 'ai' },
      { logId: '3', sessionId: 's1', message: '3 mutations resolved — confidence: 0.87', level: 'success', timing: { emittedAt: Date.now(), displayDelayMs: 2500 }, category: 'mutation' }
    ];
    
    dispatch({ type: 'APPEND_LOGS', payload: logs });

    setTimeout(() => {
      const mockMutations: MutationDirective[] = [
        { directiveId: 'm1', targetId: 'hero-headline', intent: 'INCREASE_TRUST', action: 'SET_CONTENT', value: `Optimizamos operaciones para ${formData.industry || 'tu industria'}`, priority: 1, appliedAt: null, status: 'pending' },
        { directiveId: 'm2', targetId: 'cta-btn', intent: 'REDUCE_FRICTION', action: 'SET_CONTENT', value: 'Ver solución logística', priority: 2, appliedAt: null, status: 'pending' }
      ];
      dispatch({ type: 'MUTATION_DISPATCHED', payload: { directives: mockMutations, confidenceScore: 0.87 } });
    }, 2800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'FORM_SUBMITTED', payload: { sessionId: 's1' } });
    simulateBackendResponse();
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="space-y-1">
        <label className="text-sm font-sans text-[#A0A0A0]">Nombre de la Empresa</label>
        <input 
          className="w-full bg-[#111] border border-[#333] rounded px-4 py-2 font-sans text-white focus:border-[#2B76FF] outline-none transition-colors"
          value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-sans text-[#A0A0A0]">Industria</label>
        <input 
          className="w-full bg-[#111] border border-[#333] rounded px-4 py-2 font-sans text-white focus:border-[#2B76FF] outline-none transition-colors"
          value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} required
        />
      </div>
      <button type="submit" className="mt-4 bg-white text-black font-sans font-medium py-3 rounded hover:bg-[#E0E0E0] transition-colors">
        {state.phase === 'ANALYZING' ? 'Analizando Contexto...' : 'Iniciar Análisis de Negocio'}
      </button>
    </form>
  );
}
