import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { PortfolioGallery } from './components/portfolio/PortfolioGallery';
import { ServicesGrid } from './components/services/ServicesGrid';
import { IdeaCalculator } from './components/calculator/IdeaCalculator';
import { BookingModal } from './components/booking/BookingModal';
import { IntroVideoModal } from './components/common/IntroVideoModal';
import { Footer } from './components/layout/Footer';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isIntroVideoOpen, setIsIntroVideoOpen] = useState(false);

  useEffect(() => {
    document.title = 'DISTRICT Arquitectura | Arq. Jaime Facundo | Diseños & Video Presentación';
    
    // Auto open intro video on initial load
    const hasSeenIntro = sessionStorage.getItem('district_intro_seen');
    if (!hasSeenIntro) {
      setIsIntroVideoOpen(true);
      sessionStorage.setItem('district_intro_seen', 'true');
    }
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
          onOpenVideo={() => setIsIntroVideoOpen(true)}
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

      {/* Intro Video Popup Modal (genera_video_de_intro_para_la (1).mp4) */}
      <IntroVideoModal
        isOpen={isIntroVideoOpen}
        onClose={() => setIsIntroVideoOpen(false)}
        videoSrc="./assets/video/genera_video_de_intro_para_la (1).mp4"
      />

    </div>
  );
}

export default App;
