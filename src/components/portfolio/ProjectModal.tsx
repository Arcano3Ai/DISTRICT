import React, { useState } from 'react';
import type { PortfolioItem } from '../../domain/types';
import { X, MapPin, Maximize2, Check, Send } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenBooking }) => {
  if (!project) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-district-darker/90 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Modal Card Container */}
      <div className="relative w-full max-w-5xl glass-card rounded-3xl border border-district-cyan/30 overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-district-darker/80 text-slate-300 hover:text-white hover:bg-district-card border border-slate-700 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Main Image Gallery Column (7 Cols) */}
          <div className="lg:col-span-7 bg-district-darker p-4 flex flex-col justify-between">
            
            {/* Active Main Display Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden mb-4 border border-slate-800">
              <img
                src={project.galleryImages[activeImageIndex] || project.mainImage}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {project.is3dRender && (
                <div className="absolute top-3 left-3 bg-district-cyan text-district-darker px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-glow-cyan">
                  Render 3D HD
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {project.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-district-lime scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* Details Column (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-district-lime block mb-1">
                {project.category.toUpperCase()} • {project.year}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-3 leading-tight">
                {project.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 text-xs text-slate-300 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-district-cyan" />
                  <span>{project.location}</span>
                </div>
                {project.m2 && (
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-district-lime" />
                    <span>{project.m2} m² de Construcción</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                {project.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Especificaciones Destacadas:
                </span>
                {project.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-district-lime shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-district-darker bg-district-gradient shadow-glow-cyan hover:opacity-90 transition-all"
              >
                <Send className="w-4 h-4" />
                Me Interesa un Proyecto Similar
              </button>

              <button
                onClick={onClose}
                className="w-full text-center py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cerrar Visor
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
