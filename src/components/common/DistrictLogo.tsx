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
  const imageSizes = {
    sm: 'h-8 sm:h-10 w-auto',
    md: 'h-11 sm:h-14 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
  };

  return (
    <div className={`inline-flex items-center justify-center select-none bg-white rounded-2xl shadow-glow-cyan border border-district-lime/50 p-1.5 transition-all duration-300 hover:scale-105 ${className}`}>
      <img
        src="./logodistrict.png"
        alt=""
        className={`${imageSizes[size]} object-contain rounded-xl`}
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
