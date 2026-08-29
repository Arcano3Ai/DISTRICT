import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCalculator, onOpenBooking }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      
      {/* Background Architectural Blueprint Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#00D2FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-district-glow pointer-events-none rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Brand Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-district-cyan/30 text-xs font-semibold uppercase tracking-widest text-district-cyan animate-float">
              <Sparkles className="w-4 h-4 text-district-lime" />
              <span>DISTRICT ARQUITECTURA • ARQ. JAIME FACUNDO</span>
            </div>

            {/* Main Title & Slogan */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.15]">
              Nos dedicamos al <span className="text-gradient">diseño arquitectónico</span>, y buscamos <span className="underline decoration-district-lime decoration-4 underline-offset-8">adaptar tu idea</span>, para brindarte la mejor opción.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              Transformamos terrenos y espacios existentes en proyectos espectaculares. Desde el anteproyecto conceptual y la visualización fotorrealista 3D hasta la dirección de obra llave en mano.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-district-darker bg-district-gradient rounded-xl shadow-glow-cyan hover:opacity-95 transition-all duration-300 transform hover:scale-105"
              >
                <span>Adapta Tu Idea (Cotizador 3D)</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white glass-card hover:bg-district-card/80 border border-slate-700 hover:border-district-lime rounded-xl transition-all duration-300"
              >
                <Calendar className="w-5 h-5 text-district-lime" />
                Agendar Cita con Arq. Jaime
              </button>
            </div>

            {/* Feature Checklist */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 font-medium border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-district-lime shrink-0" />
                <span>Renders Fotorrealistas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-district-lime shrink-0" />
                <span>Planos de Permiso Municipal</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-district-lime shrink-0" />
                <span>Supervisión de Obra Directa</span>
              </div>
            </div>

          </div>

          {/* Graphic / Visual 3D Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow frame */}
              <div className="absolute -inset-1 rounded-3xl bg-district-gradient opacity-30 blur-lg animate-pulse-glow" />

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden glass-card p-3 border border-district-cyan/30 shadow-2xl">
                
                {/* Featured Architectural Render Image */}
                <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    alt="District Arquitectura Residencia"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-district-darker via-transparent to-transparent opacity-80" />
                  
                  {/* Badge on image */}
                  <div className="absolute top-4 left-4 bg-district-darker/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-district-lime/40 text-[11px] font-bold tracking-wider text-district-lime uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-district-lime animate-ping" />
                    Proyecto Destacado 2024
                  </div>

                  {/* Caption on bottom of image */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h3 className="text-lg font-bold text-white font-display">Residencia La Montaña</h3>
                    <p className="text-xs text-slate-300">San Pedro Garza García • 380 m² de Construcción</p>
                  </div>
                </div>

                {/* Quick Interactive Stat Strip */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center">
                  <div className="p-2 rounded-lg bg-district-darker/60">
                    <span className="block text-lg font-extrabold text-gradient">150+</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">Proyectos</span>
                  </div>
                  <div className="p-2 rounded-lg bg-district-darker/60">
                    <span className="block text-lg font-extrabold text-district-lime">100%</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">Fotorrealismo</span>
                  </div>
                  <div className="p-2 rounded-lg bg-district-darker/60">
                    <span className="block text-lg font-extrabold text-district-cyan">10+</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">Años Exp.</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
