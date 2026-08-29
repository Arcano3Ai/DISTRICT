import React from 'react';
import logoDistrictImg from '../../assets/logo/logodistrict.png';
import fallbackLogoImg from '../../assets/logo-district-original.png';

interface DistrictLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'plaque' | 'transparent';
  className?: string;
}

export const DistrictLogo: React.FC<DistrictLogoProps> = ({ 
  size = 'md',
  variant = 'plaque',
  className = ''
}) => {
  const containerSizes = {
    sm: 'h-10 sm:h-12 px-3 py-1',
    md: 'h-14 sm:h-16 px-4 py-1.5',
    lg: 'h-20 sm:h-24 px-5 py-2',
  };

  const imageSizes = {
    sm: 'h-8 sm:h-10 w-auto',
    md: 'h-11 sm:h-13 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
  };

  if (variant === 'plaque') {
    return (
      <div className={`inline-flex items-center justify-center select-none bg-white rounded-2xl shadow-glow-cyan border border-district-lime/50 p-1.5 transition-all duration-300 hover:scale-105 hover:shadow-glow-lime ${className}`}>
        <img
          src={logoDistrictImg}
          alt="DISTRICT Arquitectura - Arq. Jaime Facundo"
          className={`${imageSizes[size]} object-contain rounded-xl`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackLogoImg) {
              target.src = fallbackLogoImg;
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center select-none ${containerSizes[size]} ${className}`}>
      <img
        src={logoDistrictImg}
        alt="DISTRICT Arquitectura"
        className={`${imageSizes[size]} object-contain filter drop-shadow-[0_0_15px_rgba(0,200,255,0.5)] transition-transform duration-300 hover:scale-105`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== fallbackLogoImg) {
            target.src = fallbackLogoImg;
          }
        }}
      />
    </div>
  );
};
