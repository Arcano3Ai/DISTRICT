import React, { useState, useEffect } from 'react';
import { DistrictLogo } from '../common/DistrictLogo';
import { Menu, X, Calculator, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenCalculator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Portafolio 3D', href: '#portafolio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Adapta tu Idea', href: '#calculadora' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 shadow-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center">
            <DistrictLogo size="md" useImage={true} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-district-cyan transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-district-darker bg-district-gradient hover:opacity-90 rounded-full shadow-glow-cyan transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              Adapta tu Idea
            </button>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-district-cyan bg-district-card border border-district-cyan/30 hover:border-district-lime hover:text-district-lime rounded-full transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              Reservar Cita
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenCalculator}
              className="p-2 text-district-darker bg-district-lime rounded-full shadow-glow-lime"
              title="Calcular Presupuesto"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-district-card focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-district-cyan/20 px-4 pt-4 pb-6 mt-2 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-district-lime py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-700/50 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-district-darker bg-district-gradient rounded-lg shadow-glow-cyan"
            >
              <Calculator className="w-4 h-4" />
              Cotizar y Adaptar Idea
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-district-cyan bg-district-card border border-district-cyan/40 rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              Reservar Cita Arquitectónica
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
