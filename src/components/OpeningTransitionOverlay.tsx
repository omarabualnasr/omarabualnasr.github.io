import React, { useEffect, useState } from 'react';

interface OpeningTransitionOverlayProps {
  onComplete: () => void;
}

export const OpeningTransitionOverlay: React.FC<OpeningTransitionOverlayProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Phase 1: Small delay before starting the split
    const timer1 = setTimeout(() => setIsOpening(true), 400);
    
    // Phase 2: Signal completion after animation finishes
    const timer2 = setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Upper Shutter */}
      <div 
        className={`absolute top-0 left-0 w-full h-1/2 bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] transition-transform duration-[1400ms] ease-in-out ${
          isOpening ? '-translate-y-full' : 'translate-y-0'
        }`}
      />
      
      {/* Lower Shutter */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-1/2 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] transition-transform duration-[1400ms] ease-in-out ${
          isOpening ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Central Beam Line (Initial visual anchor) */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-[2px] bg-[var(--accent-cyan-restrained)] transition-all duration-700 ease-in-out shadow-[0_0_20px_var(--accent-cyan-restrained)] ${
          isOpening ? 'opacity-0 scale-x-150 blur-md' : 'opacity-100 scale-x-100'
        }`}
      />

      {/* Atmospheric Focal Point */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] rounded-full shadow-[0_0_150px_60px_var(--accent-cyan-restrained)] transition-opacity duration-1000 ${
          isOpening ? 'opacity-0' : 'opacity-30'
        }`}
      />
    </div>
  );
};
