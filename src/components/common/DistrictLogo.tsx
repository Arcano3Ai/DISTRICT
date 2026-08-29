import React from 'react';
import logoImg from '../../assets/logo/logodistrict.png';

interface DistrictLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DistrictLogo: React.FC<DistrictLogoProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const logoHeights = {
    sm: 'h-9 sm:h-11 w-auto',
    md: 'h-12 sm:h-14 w-auto',
    lg: 'h-18 sm:h-22 w-auto',
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src="./logodistrict.png"
        alt="DISTRICT Arquitectura"
        className={`${logoHeights[size]} object-contain filter drop-shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-transform duration-300 hover:scale-105`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== logoImg && logoImg) {
            target.src = logoImg;
          }
        }}
      />
    </div>
  );
};
