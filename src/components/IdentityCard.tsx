import React, { useState } from 'react';

interface IdentityCardProps {
  fullName: string;
  isLightMode: boolean;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({ fullName, isLightMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center justify-center min-h-[140px] sm:min-h-[165px] md:min-h-[185px] w-full cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Primary Editorial Name & Centered Star (Visible initially, blurs on hover) */}
      <div 
        className={`flex flex-col items-center justify-center transition-all duration-500 ease-out ${
          isHovered ? 'opacity-0 blur-xl pointer-events-none' : 'opacity-100 blur-0'
        }`}
      >
        <h1 className="font-serif-display text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-normal tracking-[-0.03em] leading-[0.9] text-center text-tactile-live">
          {(() => {
            const parts = fullName.split(' ');
            if (parts.length >= 3) {
              return (
                <>
                  <span className="block">{parts[0]}</span>
                  <span className="block">{parts.slice(1).join(' ')}</span>
                </>
              );
            }
            return parts.map((part, i) => <span key={i} className="block">{part}</span>);
          })()}
        </h1>

        {/* 4-sided star ornament centered directly below the name */}
        <div className="flex justify-center items-center mt-3 sm:mt-4">
          <svg 
            viewBox="0 0 24 24" 
            width="18" 
            height="18" 
            fill="currentColor" 
            className="text-[var(--text-primary)] opacity-85"
            aria-hidden="true"
          >
            <path d="M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z" />
          </svg>
        </div>
      </div>

      {/* 2. Rounded Profile Picture (Emerges smoothly on hover) */}
      <div 
        className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-500 ease-out ${
          isHovered ? 'opacity-100 blur-0 pointer-events-auto' : 'opacity-0 blur-xl pointer-events-none'
        }`}
      >
        <div className={`w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border border-[var(--border-subtle)] overflow-hidden ${isLightMode ? '' : 'shadow-2xl'}`}>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop" 
            alt="Profile portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
