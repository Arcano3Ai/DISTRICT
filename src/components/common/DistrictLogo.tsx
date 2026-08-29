import React from 'react';

interface DistrictLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DistrictLogo: React.FC<DistrictLogoProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const logoHeights = {
    sm: 'h-10 sm:h-12 w-auto',
    md: 'h-14 sm:h-16 w-auto',
    lg: 'h-20 sm:h-24 w-auto',
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src="./logodistrict.png"
        alt="DISTRICT Arquitectura"
        className={`${logoHeights[size]} object-contain filter drop-shadow-[0_0_20px_rgba(0,200,255,0.35)] transition-transform duration-300 hover:scale-105`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (!target.src.endsWith('assets/logo/logodistrict.png')) {
            target.src = './assets/logo/logodistrict.png';
          }
        }}
      />
    </div>
  );
};
