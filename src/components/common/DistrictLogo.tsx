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
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Uploaded Logo from assets/logo/logodistrict.png */}
      <img
        src="./assets/logo/logodistrict.png"
        alt="DISTRICT Arquitectura Logo"
        className={`${logoHeights[size]} object-contain filter drop-shadow-[0_0_20px_rgba(0,200,255,0.4)] transition-transform duration-300 hover:scale-105`}
        onError={(e) => {
          // Fallback to root assets if relative subfolder path varies
          const target = e.target as HTMLImageElement;
          if (target.src !== './logo-district-original.png') {
            target.src = './logo-district-original.png';
          }
        }}
      />
    </div>
  );
};
