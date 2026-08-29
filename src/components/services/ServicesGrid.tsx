import React from 'react';
import { SERVICES_LIST } from '../../domain/portfolioData';
import { PenTool, Compass, Box, Home, HardHat, Check, ArrowUpRight } from 'lucide-react';

interface ServicesGridProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenBooking, onOpenCalculator }) => {
  const iconMap: Record<string, React.ReactNode> = {
    PenTool: <PenTool className="w-7 h-7 text-district-cyan" />,
    Compass: <Compass className="w-7 h-7 text-district-lime" />,
    Box: <Box className="w-7 h-7 text-district-cyan" />,
    Home: <Home className="w-7 h-7 text-district-lime" />,
    HardHat: <HardHat className="w-7 h-7 text-district-cyan" />,
  };

  return (
    <section id="servicios" className="py-24 relative bg-district-darker overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-district-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-district-lime/30 text-xs font-bold uppercase tracking-widest text-district-lime">
            Servicios Profesionales
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
            Soluciones <span className="text-gradient">Arquitectónicas Integrales</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light">
            Desde la primera idea en papel hasta la entrega final de llaves. Te acompañamos en cada etapa con rigor técnico y diseño vanguardista.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.id}
              className="glass-card glass-card-hover rounded-3xl p-8 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                {/* Icon Header */}
                <div className="w-14 h-14 rounded-2xl bg-district-darker border border-district-cyan/30 flex items-center justify-center mb-6 shadow-inner">
                  {iconMap[srv.iconName] || <PenTool className="w-7 h-7 text-district-cyan" />}
                </div>

                <h3 className="text-2xl font-bold text-white font-display mb-3">
                  {srv.title}
                </h3>

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {srv.fullDesc}
                </p>

                {/* Deliverable Checklist */}
                <div className="space-y-2 mb-8 pt-4 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-district-lime block mb-2">
                    Entregables Incluidos:
                  </span>
                  {srv.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-district-cyan shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <button
                onClick={onOpenCalculator}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-district-darker hover:bg-district-card border border-slate-800 hover:border-district-cyan text-xs font-bold uppercase tracking-wider text-white transition-all group"
              >
                <span>Cotizar {srv.title}</span>
                <ArrowUpRight className="w-4 h-4 text-district-lime group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

            </div>
          ))}

          {/* Banner Card: Remodelación Completa */}
          <div className="glass-card rounded-3xl p-8 border border-district-lime/40 bg-gradient-to-br from-district-card to-district-darker flex flex-col justify-between relative overflow-hidden shadow-glow-lime">
            <div className="relative z-10">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-district-darker bg-district-lime px-3 py-1 rounded-full mb-6">
                Servicio Destacado
              </span>

              <h3 className="text-2xl font-extrabold text-white font-display mb-3">
                ¿Tienes un Terreno o Casa por Remodelar?
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                Te asesoramos en sitio o de manera virtual. Analizamos orientación, regulaciones urbanas y viabilidad presupuestal.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-4 px-6 rounded-xl text-xs font-black uppercase tracking-wider text-district-darker bg-district-gradient shadow-glow-cyan hover:opacity-90 transition-all text-center relative z-10"
            >
              Agendar Consulta Gratuita
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
