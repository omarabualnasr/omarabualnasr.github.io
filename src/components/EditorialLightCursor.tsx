import React, { useEffect, useRef, useState } from 'react';

export const EditorialLightCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const ambientLightRef = useRef<HTMLDivElement>(null);

  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop fine-pointer devices
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(media.matches);

    const mediaHandler = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };
    media.addEventListener('change', mediaHandler);
    
    if (!media.matches) return () => media.removeEventListener('change', mediaHandler);

    document.documentElement.classList.add('custom-cursor-active');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      // Use local state check to avoid re-triggering logic unnecessarily
      setIsVisible(true);

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, .interactive-hover')
      );
      setIsHovered(isInteractive);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      setIsVisible(true);
    };

    const animate = () => {
      // Easing for precision dot (fast)
      currentX += (targetX - currentX) * 0.4;
      currentY += (targetY - currentY) * 0.4;

      // Easing for thin ring (soft optical momentum)
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (ambientLightRef.current) {
        ambientLightRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    document.documentElement.addEventListener('pointerenter', handlePointerEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.documentElement.removeEventListener('pointerenter', handlePointerEnter);
      document.documentElement.classList.remove('custom-cursor-active');
      media.removeEventListener('change', mediaHandler);
      cancelAnimationFrame(rafId);
    };
  }, []); // Remove isVisible from dependencies

  if (!isFinePointer) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[110] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Subtle Local Ambient Illumination Following Pointer */}
      <div
        ref={ambientLightRef}
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full will-change-transform transition-colors duration-500"
        style={{
          background: 'var(--cursor-ambient)',
          filter: 'blur(28px)',
        }}
      />

      {/* 2. Thin Understated Circular Outline */}
      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 rounded-full border will-change-transform transition-[width,height,border-color,box-shadow,background-color] duration-200 ease-out"
        style={{
          width: isHovered ? '2.5rem' : '1.5rem',
          height: isHovered ? '2.5rem' : '1.5rem',
          borderColor: isHovered ? 'var(--cursor-ring-hover)' : 'var(--cursor-ring)',
          boxShadow: isHovered ? 'var(--cursor-shadow-hover)' : 'var(--cursor-shadow-rest)',
        }}
      />

      {/* 3. Tiny Central Point */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 rounded-full will-change-transform transition-[width,height,background-color,box-shadow] duration-150"
        style={{
          width: isHovered ? '0.375rem' : '0.25rem',
          height: isHovered ? '0.375rem' : '0.25rem',
          backgroundColor: isHovered ? 'var(--cursor-ring-hover)' : 'var(--cursor-dot)',
          boxShadow: isHovered ? 'var(--cursor-shadow-hover)' : 'none',
        }}
      />
    </div>
  );
};
