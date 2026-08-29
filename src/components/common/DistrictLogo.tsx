import React from 'react';

interface DistrictLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const DistrictLogo: React.FC<DistrictLogoProps> = ({ 
  size = 'md', 
  showText = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'h-10 w-auto',
    md: 'h-14 w-auto',
    lg: 'h-20 w-auto',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const subtextSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-xs tracking-[0.35em]',
    lg: 'text-sm tracking-[0.45em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High Quality User Logo */}
      <img
        src="./assets/logo/logodistrict.png"
        alt="DISTRICT Arquitectura"
        className={`${iconSizes[size]} object-contain filter drop-shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-transform duration-300 hover:scale-105`}
        onError={(e) => {
          // Fallback if path relative changes
          (e.target as HTMLImageElement).src = './logo-district-original.png';
        }}
      />

      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold leading-none tracking-wider text-white ${textSizes[size]} font-display`}>
            DISTRICT
          </span>
          <span className={`font-semibold text-district-lime leading-tight ${subtextSizes[size]} uppercase`}>
            ARQUITECTURA
          </span>
        </div>
      )}
    </div>
  );
};
