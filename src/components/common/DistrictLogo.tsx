import React from 'react';

interface DistrictLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  useImage?: boolean;
  className?: string;
}

export const DistrictLogo: React.FC<DistrictLogoProps> = ({ 
  size = 'md', 
  showText = true,
  useImage = false,
  className = ''
}) => {
  const iconSizes = {
    sm: 'h-9 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
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

  if (useImage) {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img
          src="/logo-district-original.png"
          alt="DISTRICT Arquitectura"
          className={`${iconSizes[size]} object-contain filter drop-shadow-[0_0_12px_rgba(0,200,255,0.35)] transition-transform duration-300 hover:scale-105`}
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
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon matching exact geometry */}
      <svg 
        className={`${iconSizes[size]} transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_10px_rgba(0,200,255,0.3)]`}
        viewBox="0 0 500 440" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="districtGradientOfficial" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00C8FF" />
            <stop offset="50%" stopColor="#00D4E6" />
            <stop offset="100%" stopColor="#A4E033" />
          </linearGradient>
        </defs>

        <g transform="translate(0, 10)">
          {/* Base Ground Wings */}
          <path d="M 25 410 L 155 380 L 155 400 L 25 410 Z" fill="url(#districtGradientOfficial)" />
          <path d="M 345 380 L 475 410 L 345 400 Z" fill="url(#districtGradientOfficial)" />

          {/* Pillar 1 */}
          <path d="M 155 400 L 155 130 L 175 145 L 175 400 Z" fill="url(#districtGradientOfficial)" />

          {/* Pillar 2 */}
          <path d="M 185 400 L 185 105 L 205 120 L 205 400 Z" fill="url(#districtGradientOfficial)" />

          {/* Pillar 3 */}
          <path d="M 215 400 L 215 80 L 235 95 L 235 400 Z" fill="url(#districtGradientOfficial)" />

          {/* Main Architectural Arch Portal */}
          <path d="M 245 400 L 245 35 L 345 95 L 345 400 H 330 L 330 115 L 265 75 L 265 400 Z" fill="url(#districtGradientOfficial)" />
        </g>
      </svg>

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
