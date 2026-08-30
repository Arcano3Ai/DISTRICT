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
    sm: 'h-10 sm:h-12 w-auto max-h-12',
    md: 'h-14 sm:h-16 w-auto max-h-16',
    lg: 'h-20 sm:h-28 w-auto max-h-28',
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="DISTRICT Arquitectura"
        loading="eager"
        decoding="async"
        className={`${logoHeights[size]} object-contain filter drop-shadow-[0_0_20px_rgba(0,210,255,0.45)] transition-transform duration-300 hover:scale-105`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (!target.src.endsWith('/logodistrict.png') && target.src !== './logodistrict.png') {
            target.src = './logodistrict.png';
          }
        }}
      />
    </div>
  );
};

