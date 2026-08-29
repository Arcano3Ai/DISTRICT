import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { PortfolioGallery } from './components/portfolio/PortfolioGallery';
import { ServicesGrid } from './components/services/ServicesGrid';
import { IdeaCalculator } from './components/calculator/IdeaCalculator';
import { BookingModal } from './components/booking/BookingModal';
import { Footer } from './components/layout/Footer';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    document.title = 'DISTRICT Arquitectura | Arq. Jaime Facundo | Renders 3D & Proyectos';
  }, []);

  const scrollToCalculator = () => {
    const el = document.getElementById('calculadora');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-district-darker text-slate-100 selection:bg-district-cyan selection:text-district-darker">
      
      {/* Fixed Navigation Bar */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenCalculator={scrollToCalculator}
      />

      {/* Hero Section */}
      <main>
        <HeroSection
          onOpenCalculator={scrollToCalculator}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Portfolio Gallery */}
        <PortfolioGallery
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Services Matrix */}
        <ServicesGrid
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenCalculator={scrollToCalculator}
        />

        {/* Interactive Idea Calculator */}
        <IdeaCalculator
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

    </div>
  );
}

export default App;
