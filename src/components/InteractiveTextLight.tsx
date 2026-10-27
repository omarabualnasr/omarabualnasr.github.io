import React, { useRef, useEffect, useState } from 'react';

interface InteractiveTextLightProps {
  fullName: string;
  className?: string;
}

export const InteractiveTextLight: React.FC<InteractiveTextLightProps> = ({
  fullName,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    // Check fine pointer / touch
    const pointerQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouchDevice(pointerQuery.matches);
    const pointerHandler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    pointerQuery.addEventListener('change', pointerHandler);

    if (motionQuery.matches) {
      return () => {
        motionQuery.removeEventListener('change', motionHandler);
        pointerQuery.removeEventListener('change', pointerHandler);
      };
    }

    const container = containerRef.current;
    if (!container) return;

    // Default coordinates (start at center)
    let rect = container.getBoundingClientRect();
    let targetX = rect.width / 2;
    let targetY = rect.height / 2;
    let currentX = targetX;
    let currentY = targetY;
    let targetOpacity = 0.85; // Initial welcoming focal light
    let currentOpacity = 0;
    let isInsideOrNear = false;
    let lastMoveTime = performance.now();
    let rafId: number;

    const updateRect = () => {
      if (container) rect = container.getBoundingClientRect();
    };

    const handlePointerMove = (e: PointerEvent) => {
      lastMoveTime = performance.now();
      updateRect();

      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      // Calculate distance to the headline bounding box
      const distX = Math.max(0, rect.left - e.clientX, e.clientX - rect.right);
      const distY = Math.max(0, rect.top - e.clientY, e.clientY - rect.bottom);
      const distance = Math.hypot(distX, distY);

      // Light illuminates when pointer is within 380px of headline
      if (distance < 380) {
        isInsideOrNear = true;
        // Brighter when directly over letters, smoothly falls off with distance
        targetOpacity = Math.max(0.2, 1 - distance / 380);
      } else {
        isInsideOrNear = false;
        targetOpacity = 0;
      }
    };

    const handlePointerLeave = () => {
      isInsideOrNear = false;
      targetOpacity = 0;
    };

    const loop = () => {
      // Smooth exponential interpolation (lerp)
      const lerpSpeed = isInsideOrNear ? 0.22 : 0.1;
      currentX += (targetX - currentX) * lerpSpeed;
      currentY += (targetY - currentY) * lerpSpeed;
      currentOpacity += (targetOpacity - currentOpacity) * 0.12;

      // Idle subtle breathing when mouse is stationary but nearby
      const now = performance.now();
      const idleTime = now - lastMoveTime;
      let finalOpacity = currentOpacity;
      if (isInsideOrNear && idleTime > 1200) {
        const breath = Math.sin(now * 0.002) * 0.08;
        finalOpacity = Math.min(1, Math.max(0.15, currentOpacity + breath));
      }

      container.style.setProperty('--light-x', `${currentX.toFixed(2)}px`);
      container.style.setProperty('--light-y', `${currentY.toFixed(2)}px`);
      container.style.setProperty('--light-opacity', finalOpacity.toFixed(3));

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', updateRect);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      motionQuery.removeEventListener('change', motionHandler);
      pointerQuery.removeEventListener('change', pointerHandler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const nameParts = fullName.split(' ');

  return (
    <div
      ref={containerRef}
      className={`relative inline-block select-none text-center ${className}`}
      style={
        {
          '--light-x': '50%',
          '--light-y': '50%',
          '--light-opacity': '0',
        } as React.CSSProperties
      }
    >
      <h1 className="font-serif-display text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-normal tracking-[-0.03em] leading-[0.92] text-center">
        {nameParts.map((part, index) => (
          <span key={index} className="relative block">
            {/* 1. Underlying Base Text with Tactile Live Micro-Grain & Breathing Sheen */}
            <span className="block text-tactile-live">{part}</span>

            {/* 2. Interactive Pointer-Driven Light Highlight Layer */}
            {!reducedMotion && !isTouchDevice && (
              <span
                aria-hidden="true"
                className="absolute inset-0 block select-none pointer-events-none font-serif-display transition-opacity duration-150"
                style={{
                  background: 'var(--light-gradient)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  opacity: 'var(--light-opacity, 0)',
                  filter: 'var(--light-drop-shadow)',
                }}
              >
                {part}
              </span>
            )}

            {/* 3. Touch Device & Fallback Periodic Ambient Light Sweep */}
            {!reducedMotion && isTouchDevice && (
              <span
                aria-hidden="true"
                style={{ animationDelay: `${index * 0.18}s` }}
                className="absolute inset-0 block select-none pointer-events-none light-beam-active font-serif-display"
              >
                {part}
              </span>
            )}
          </span>
        ))}
      </h1>
    </div>
  );
};
