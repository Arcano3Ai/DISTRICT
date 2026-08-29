import React, { useState } from 'react';
import logoAsset from '../../assets/logo/logodistrict.png';

interface DistrictLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DistrictLogo: React.FC<DistrictLogoProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const [imgSrc, setImgSrc] = useState<string>(logoAsset || './logodistrict.png');

  const logoHeights = {
    sm: 'h-10 sm:h-12 w-auto',
    md: 'h-14 sm:h-16 w-auto',
    lg: 'h-20 sm:h-24 w-auto',
  };

  const handleImageError = () => {
    if (imgSrc === logoAsset) {
      setImgSrc('./logodistrict.png');
    } else if (imgSrc === './logodistrict.png') {
      setImgSrc('./assets/logo/logodistrict.png');
    } else if (imgSrc === './assets/logo/logodistrict.png') {
      setImgSrc('./logo-district-original.png');
    }
  };

  return (
    <div className={`inline-flex items-center justify-center select-none bg-white/95 rounded-2xl shadow-glow-cyan border border-district-lime/40 p-1.5 transition-all duration-300 hover:scale-105 hover:shadow-glow-lime ${className}`}>
      <img
        src={imgSrc}
        alt="DISTRICT Arquitectura"
        onError={handleImageError}
        className={`${logoHeights[size]} object-contain rounded-xl`}
      />
    </div>
  );
};
