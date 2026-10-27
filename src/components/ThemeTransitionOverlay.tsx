import React, { useEffect, useState } from 'react';

interface ThemeTransitionOverlayProps {
  isLightMode: boolean;
  trigger: any; // Used to trigger the effect
}

export const ThemeTransitionOverlay: React.FC<ThemeTransitionOverlayProps> = ({ isLightMode, trigger }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevThemeIsLight, setPrevThemeIsLight] = useState(!isLightMode);

  useEffect(() => {
    // Phase 1: Capture previous state and start animation
    setIsAnimating(true);
    setPrevThemeIsLight(!isLightMode);

    // Phase 2: Fade duration (1.2 seconds for "super smooth" feel)
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (!isAnimating) return null;

  return (
    <div 
      className={`fixed inset-0 z-[120] pointer-events-none ${
        prevThemeIsLight ? 'bg-[#F5F3EC]' : 'bg-[#07090C]'
      } animate-theme-wash`}
      aria-hidden="true"
    />
  );
};
