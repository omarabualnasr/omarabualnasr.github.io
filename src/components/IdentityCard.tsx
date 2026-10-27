import React, { useState } from 'react';

interface IdentityCardProps {
  fullName: string;
  isLightMode: boolean;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({ fullName, isLightMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center justify-center h-[160px] sm:h-[200px] md:h-[240px] w-full cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Primary Editorial Name (Visible initially, blurs on hover) */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
          isHovered ? 'opacity-0 blur-xl pointer-events-none' : 'opacity-100 blur-0'
        }`}
      >
        <h1 className="font-serif-display text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-normal tracking-[-0.03em] leading-[0.92] text-center text-tactile-live">
          {fullName.split(' ').map((part, i) => (
            <span key={i} className="block">{part}</span>
          ))}
        </h1>
      </div>

      {/* 2. Rounded Profile Picture (Emerges on hover) */}
      <div 
        className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-700 ease-out ${
          isHovered ? 'opacity-100 blur-0 pointer-events-auto' : 'opacity-0 blur-xl pointer-events-none'
        }`}
      >
        <div className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border border-[var(--border-subtle)] overflow-hidden ${isLightMode ? '' : 'shadow-2xl'}`}>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
