import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../../domain/portfolioData';
import type { PortfolioItem, ProjectCategory } from '../../domain/types';
import { ProjectModal } from './ProjectModal';
import { Eye, MapPin, Maximize2, Layers } from 'lucide-react';

interface PortfolioGalleryProps {
  onOpenBooking: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'Todos los Proyectos' },
    { id: 'fachadas', label: 'Fachadas Modernas' },
    { id: 'renders', label: 'Renders 3D HD' },
    { id: 'interiores', label: 'Interiores & Cocinas' },
    { id: 'albercas', label: 'Albercas & Terrazas' },
    { id: 'terrenos', label: 'Obra & Terrenos' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="portafolio" className="py-24 relative bg-district-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-district-cyan/30 text-xs font-bold uppercase tracking-widest text-district-cyan">
            <Layers className="w-4 h-4 text-district-lime" />
            Galería de Obras & Renders
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
            Portafolio <span className="text-gradient">DISTRICT</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light">
            Explora nuestros diseños conceptuales, renders fotorrealistas 3D y obras ejecutadas con la máxima precisión arquitectónica.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-district-gradient text-district-darker shadow-glow-cyan scale-105'
                  : 'glass-card text-slate-300 hover:text-white hover:border-district-cyan/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between border border-slate-800"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-district-darker via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.is3dRender ? (
                      <span className="bg-district-cyan/90 backdrop-blur-md text-district-darker px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                        Render 3D HD
                      </span>
                    ) : (
                      <span className="bg-district-lime/90 backdrop-blur-md text-district-darker px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                        Obra Construida
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay Eye Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-district-darker/60 backdrop-blur-sm">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-district-gradient text-district-darker font-bold text-xs uppercase tracking-wider shadow-glow-lime">
                      <Eye className="w-4 h-4" />
                      Ver Proyecto 3D
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-district-lime font-bold uppercase tracking-wider">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-district-cyan transition-colors font-display">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 font-light">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/50">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-district-cyan" />
                  {project.location}
                </span>
                {project.m2 && (
                  <span className="flex items-center gap-1 font-semibold text-slate-300">
                    <Maximize2 className="w-3.5 h-3.5 text-district-lime" />
                    {project.m2} m²
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
