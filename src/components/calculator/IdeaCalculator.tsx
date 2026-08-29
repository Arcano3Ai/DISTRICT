import React, { useState, useMemo } from 'react';
import { calculateProjectEstimate, formatCurrencyMXN } from '../../domain/estimator';
import type { EstimationParams, FinishLevel, ServiceType } from '../../domain/types';
import { Calculator, Check, Sparkles, Send, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IdeaCalculatorProps {
  onOpenBooking: () => void;
}

export const IdeaCalculator: React.FC<IdeaCalculatorProps> = ({ onOpenBooking }) => {
  const [projectType, setProjectType] = useState<ServiceType>('diseno_arquitectonico');
  const [areaM2, setAreaM2] = useState<number>(180);
  const [finishLevel, setFinishLevel] = useState<FinishLevel>('residencial');
  const [include3DRenders, setInclude3DRenders] = useState<boolean>(true);
  const [includeStructuralCalc, setIncludeStructuralCalc] = useState<boolean>(true);
  const [includePermits, setIncludePermits] = useState<boolean>(false);

  const estimationParams: EstimationParams = useMemo(() => ({
    projectType,
    areaM2,
    finishLevel,
    include3DRenders,
    includeStructuralCalc,
    includePermits
  }), [projectType, areaM2, finishLevel, include3DRenders, includeStructuralCalc, includePermits]);

  const estimate = useMemo(() => {
    return calculateProjectEstimate(estimationParams);
  }, [estimationParams]);

  const handleWhatsAppSend = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const projectLabels: Record<ServiceType, string> = {
      diseno_arquitectonico: 'Diseño Arquitectónico',
      proyecto_ejecutivo: 'Proyecto Ejecutivo Completo',
      visualizacion_3d: 'Renders & Visualización 3D',
      remodelacion: 'Remodelación / Ampliación',
      direccion_obra: 'Dirección de Obra'
    };

    const message = `Hola *Arq. Jaime Facundo (DISTRICT Arquitectura)*, me interesa cotizar mi proyecto con la herramienta *Adapta tu Idea*:
    
📌 *Tipo de Proyecto:* ${projectLabels[projectType]}
📐 *Superficie:* ${areaM2} m²
✨ *Nivel de Acabados:* ${finishLevel.toUpperCase()}
🎨 *Renders 3D:* ${include3DRenders ? 'Sí' : 'No'}
🏗️ *Cálculo Estructural:* ${includeStructuralCalc ? 'Sí' : 'No'}
📄 *Permiso Municipal:* ${includePermits ? 'Sí' : 'No'}

💰 *Estimado de Diseño:* ${formatCurrencyMXN(estimate.estimatedDesignCostMin)} - ${formatCurrencyMXN(estimate.estimatedDesignCostMax)} MXN
⏱️ *Tiempo Estimado:* ${estimate.estimatedDays} días hábiles

¿Podríamos revisar los detalles y agendar una llamada?`;

    const whatsappUrl = `https://wa.me/524197079143?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="calculadora" className="py-24 relative overflow-hidden bg-district-darker">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-district-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-district-lime/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-district-lime/30 text-xs font-bold uppercase tracking-widest text-district-lime">
            <Calculator className="w-4 h-4" />
            Herramienta Interactiva
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
            Adapta tu Idea & <span className="text-gradient">Calcula tu Presupuesto</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Configura los m² y necesidades de tu propiedad para obtener una estimación transparente de diseño, proyecto técnico e inversión estimada.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 glass-card p-6 sm:p-8 rounded-3xl border border-district-cyan/20">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-district-cyan mb-3">
                1. Selecciona el Tipo de Proyecto
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'diseno_arquitectonico', name: 'Diseño Residencial', icon: '🏡' },
                  { id: 'proyecto_ejecutivo', name: 'Proyecto Ejecutivo', icon: '📐' },
                  { id: 'visualizacion_3d', name: 'Renders 3D HD', icon: '🎨' },
                  { id: 'remodelacion', name: 'Remodelación / Terraza', icon: '🔨' },
                  { id: 'direccion_obra', name: 'Dirección de Obra', icon: '👷' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProjectType(item.id as ServiceType)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      projectType === item.id
                        ? 'bg-district-cyan/20 border-district-cyan text-white shadow-glow-cyan'
                        : 'bg-district-darker/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs font-bold leading-tight">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Surface Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-district-cyan">
                  2. Superficie de Construcción / Área (m²)
                </label>
                <div className="flex items-center gap-2 bg-district-darker px-3 py-1 rounded-lg border border-slate-700">
                  <input
                    type="number"
                    min={20}
                    max={1500}
                    value={areaM2}
                    onChange={(e) => setAreaM2(Math.max(1, Number(e.target.value)))}
                    className="w-16 bg-transparent text-right font-extrabold text-district-lime focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-400">m²</span>
                </div>
              </div>

              <input
                type="range"
                min={25}
                max={600}
                step={5}
                value={areaM2}
                onChange={(e) => setAreaM2(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-district-cyan"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>25 m² (Cochera/Terraza)</span>
                <span>200 m² (Casa Mediana)</span>
                <span>600+ m² (Residencia)</span>
              </div>
            </div>

            {/* Step 3: Finish Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-district-cyan mb-3">
                3. Nivel de Acabados & Estilo
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'economico', name: 'Estándar', desc: 'Funcional y óptimo' },
                  { id: 'residencial', name: 'Residencial', desc: 'Piedra, cristal & LED' },
                  { id: 'luxury', name: 'Luxury High-End', desc: 'Mármol, automatizado' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setFinishLevel(lvl.id as FinishLevel)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      finishLevel === lvl.id
                        ? 'bg-district-lime/20 border-district-lime text-white shadow-glow-lime'
                        : 'bg-district-darker/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="block text-xs font-bold text-white">{lvl.name}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{lvl.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Add-on Checkboxes */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-district-cyan mb-3">
                4. Complementos y Entregables Adicionales
              </label>
              <div className="space-y-2.5">
                {[
                  {
                    id: 'renders',
                    label: 'Visualización Fotorrealista 3D (Renders HD & Recorrido)',
                    checked: include3DRenders,
                    onChange: setInclude3DRenders,
                  },
                  {
                    id: 'struct',
                    label: 'Cálculo Estructural & Planos de Cimentación Ingenieril',
                    checked: includeStructuralCalc,
                    onChange: setIncludeStructuralCalc,
                  },
                  {
                    id: 'permits',
                    label: 'Planos & Expediente para Permisos Municipales',
                    checked: includePermits,
                    onChange: setIncludePermits,
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      item.checked
                        ? 'bg-district-card/90 border-district-cyan/50 text-white'
                        : 'bg-district-darker/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.onChange(e.target.checked)}
                      className="w-4 h-4 rounded text-district-cyan focus:ring-0 accent-district-cyan cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-district-lime/40 shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-district-lime/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-district-lime flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Estimado de Inversión
                </span>
                <span className="text-xs font-medium text-slate-400 bg-district-darker px-2.5 py-1 rounded-full">
                  {areaM2} m² Configurados
                </span>
              </div>

              {/* Design Cost Box */}
              <div className="bg-district-darker/80 p-5 rounded-2xl border border-district-cyan/30 mb-5">
                <span className="text-xs font-medium text-slate-400 block mb-1">
                  Honorarios de Diseño & Proyecto Arquitectónico:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-gradient font-display">
                  {formatCurrencyMXN(estimate.estimatedDesignCostMin)} – {formatCurrencyMXN(estimate.estimatedDesignCostMax)} <span className="text-xs font-normal text-slate-400">MXN</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  *Atención directa por Arq. Jaime Facundo (Tel. 419-707-9143)
                </span>
              </div>

              {/* Construction Reference Box */}
              <div className="bg-district-darker/60 p-4 rounded-2xl border border-slate-800 mb-6">
                <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Referencia Estimada de Obra / Construcción:
                </span>
                <div className="text-lg font-bold text-district-lime">
                  {formatCurrencyMXN(estimate.estimatedConstructionCostMin)} – {formatCurrencyMXN(estimate.estimatedConstructionCostMax)} <span className="text-xs font-normal text-slate-400">MXN</span>
                </div>
              </div>

              {/* Days Timeline */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 mb-6">
                <Clock className="w-5 h-5 text-district-cyan shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-300 font-semibold block">Tiempo Estimado de Entrega de Proyecto:</span>
                  <span className="text-district-lime font-bold">{estimate.estimatedDays} Días Hábiles</span>
                </div>
              </div>

              {/* Cost Breakdown Items */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Desglose de la propuesta:
                </span>
                {estimate.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/60 text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-district-lime" />
                      {item.label}
                    </span>
                    <span className="font-semibold text-white">{formatCurrencyMXN(item.amount)}</span>
                  </div>
                ))}
              </div>

              {/* Action Trigger Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider text-district-darker bg-district-gradient shadow-glow-cyan hover:opacity-90 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  Enviar Cotización a WhatsApp (419-707-9143)
                </button>

                <button
                  onClick={onOpenBooking}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-district-cyan bg-district-card border border-district-cyan/40 hover:border-district-lime hover:text-district-lime transition-all"
                >
                  Agendar Revisión Técnica Gratuita
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
