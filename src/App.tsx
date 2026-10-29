import React, { useState, useEffect } from 'react';
import { defaultProfile } from './data/profile';
import { ProfileData } from './types/profile';
import LightRays from './components/reactbits/LightRays';
import { EditorialLightCursor } from './components/EditorialLightCursor';
import { CompactOverlays, OverlayType } from './components/CompactOverlays';
import { OpeningTransitionOverlay } from './components/OpeningTransitionOverlay';
import { QuickContactBox } from './components/QuickContactBox';
import { ThemeTransitionOverlay } from './components/ThemeTransitionOverlay';
import { IdentityCard } from './components/IdentityCard';
import { ArrowUpRight, Github, Youtube, Instagram, Share2, Check } from 'lucide-react';
import { SiBehance } from 'react-icons/si';

export default function App() {
  const [profile] = useState<ProfileData>(defaultProfile);
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isOverlayClosing, setIsOverlayClosing] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [themeToggleCount, setThemeToggleCount] = useState(0);

  // 1. Completely remove / suppress right-click context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // 2. Double-Click Anywhere to Smoothly Switch Light/Dark Mode
  useEffect(() => {
    document.documentElement.classList.add('theme-transition');

    const handleDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return;

      setIsLightMode((prev) => {
        const next = !prev;
        setThemeToggleCount(c => c + 1);
        if (next) {
          document.documentElement.classList.add('theme-light');
        } else {
          document.documentElement.classList.remove('theme-light');
        }
        return next;
      });
    };

    window.addEventListener('dblclick', handleDblClick);
    return () => window.removeEventListener('dblclick', handleDblClick);
  }, []);

  // 3. Smooth Overlay Open & Close with Optical Motion Blur Coordination
  const handleOpenOverlay = (type: OverlayType) => {
    setIsOverlayClosing(false);
    setActiveOverlay(type);
  };

  const handleCloseOverlay = () => {
    setIsOverlayClosing(true);
    setTimeout(() => {
      setActiveOverlay(null);
      setIsOverlayClosing(false);
    }, 420); // Synchronized with 0.42s exit animation duration
  };

  // 4. Share Profile handler (Web Share API with Clipboard fallback)
  const handleShareProfile = () => {
    const shareData = {
      title: `${profile.fullName} — Digital Portfolio`,
      text: profile.conciseIntroduction,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          setCopiedShare(true);
          setTimeout(() => setCopiedShare(false), 2000);
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      });
    }
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)] select-none flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Smooth Opening Sequence Intro Overlay */}
      {showIntro && (
        <OpeningTransitionOverlay onComplete={() => setShowIntro(false)} />
      )}

      {/* Volumetric Light Rays Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <LightRays
          raysOrigin="top-right"
          raysColor={isLightMode ? '#0284C7' : '#8BE8FF'}
          raysSpeed={0.8}
          lightSpread={1.3}
          rayLength={2.0}
          rayDensity={1.0}
          raySharpness={0.85}
          glow={0.75}
          haze={0.45}
          atmosphere={0.35}
          intensity={isLightMode ? 1.1 : 1.5}
          followMouse={true}
          mouseInfluence={0.2}
          cursorShadow={false}
          noiseAmount={0.06}
          opacity={isLightMode ? 0.45 : 0.85}
        />
      </div>

      {/* Cinematic Architectural Vignette, Tactile Grid & Subtle Film Grain */}
      <div className="vignette-architectural absolute inset-0 z-1 pointer-events-none" />
      <div className="architectural-tactile-grid absolute inset-0 z-1 pointer-events-none opacity-60" />
      <div className="grain-subtle absolute inset-0 z-1 pointer-events-none opacity-40" />

      {/* Exact Visual Center Composition (Unified Group with Motion Blur Coordination) */}
      <main className={`relative z-10 my-auto flex-1 flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto px-4 transition-all duration-700 ease-in-out ${
        activeOverlay && !isOverlayClosing 
          ? 'opacity-0 scale-[0.98] blur-sm pointer-events-none' 
          : 'opacity-100 scale-100 blur-0'
      }`}>
        {/* Animated "Building the Future" Continuous Ticker */}
        <div
          className="w-full max-w-[280px] sm:max-w-[420px] md:max-w-[540px] overflow-hidden py-1 mb-2 sm:mb-3 select-none animate-cascade-in"
          style={{ animationDelay: '100ms' }}
        >
          <div className="inline-flex whitespace-nowrap animate-marquee">
            <span className="flex items-center gap-3 text-[10px] sm:text-xs font-mono-metadata tracking-[0.24em] uppercase text-[var(--text-secondary)] pr-4">
              <span>Building the Future</span>
              <span className={`w-1.5 h-1.5 rounded-full bg-[var(--dot-color)] ${isLightMode ? '' : 'shadow-[0_0_8px_var(--dot-color)]'} inline-block mx-1.5 shrink-0`} />
              <span>Building the Future</span>
              <span className={`w-1.5 h-1.5 rounded-full bg-[var(--dot-color)] ${isLightMode ? '' : 'shadow-[0_0_8px_var(--dot-color)]'} inline-block mx-1.5 shrink-0`} />
              <span>Building the Future</span>
              <span className={`w-1.5 h-1.5 rounded-full bg-[var(--dot-color)] ${isLightMode ? '' : 'shadow-[0_0_8px_var(--dot-color)]'} inline-block mx-1.5 shrink-0`} />
            </span>
            <span className="flex items-center gap-3 text-[10px] sm:text-xs font-mono-metadata tracking-[0.24em] uppercase text-[var(--text-secondary)] pr-4" aria-hidden="true">
              <span>Building the Future</span>
              <span className={`w-1.5 h-1.5 rounded-full bg-[var(--dot-color)] ${isLightMode ? '' : 'shadow-[0_0_8px_var(--dot-color)]'} inline-block mx-1.5 shrink-0`} />
              <span>Building the Future</span>
              <span className={`w-1.5 h-1.5 rounded-full bg-[var(--dot-color)] ${isLightMode ? '' : 'shadow-[0_0_8px_var(--dot-color)]'} inline-block mx-1.5 shrink-0`} />
              <span>Building the Future</span>
              <span className={`w-1.5 h-1.5 rounded-full bg-[var(--dot-color)] ${isLightMode ? '' : 'shadow-[0_0_8px_var(--dot-color)]'} inline-block mx-1.5 shrink-0`} />
            </span>
          </div>
        </div>

        {/* Main Name with Interactive Identity Card Transition & Centered Star */}
        <div
          className="mb-3 sm:mb-3.5 flex justify-center w-full animate-cascade-in"
          style={{ animationDelay: '220ms' }}
        >
          <IdentityCard fullName={profile.fullName} isLightMode={isLightMode} />
        </div>

        {/* 1. Core Focus: Math · AI · Biology (Positioned first, directly under the star) */}
        <p
          className="font-sans-editorial text-xs sm:text-sm md:text-base text-[var(--text-primary)] text-live-grain font-light leading-snug max-w-xl mx-auto mb-1.5 sm:mb-2 px-4 text-balance animate-cascade-in"
          style={{ animationDelay: '340ms' }}
        >
          {profile.professionalDirection}
        </p>

        {/* 2. Supporting Statement (Positioned second, close to the core focus) */}
        <p
          className="font-sans-editorial text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-xl mx-auto mb-5 sm:mb-6 px-4 text-balance animate-cascade-in"
          style={{ animationDelay: '460ms' }}
        >
          {profile.conciseIntroduction}
        </p>

        {/* 3. Essential Navigation (Equal Separator Length: max-w-xs) */}
        <nav
          aria-label="Essential Navigation"
          className="flex justify-center items-center gap-8 sm:gap-14 pt-3 sm:pt-4 border-t border-[var(--border-subtle)] w-full max-w-xs text-xs sm:text-sm font-mono-metadata animate-cascade-in"
          style={{ animationDelay: '580ms' }}
        >
          <button
            onClick={() => handleOpenOverlay('works')}
            className="group inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent-cyan-restrained)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan-restrained)] relative py-1 cursor-pointer"
          >
            <span className="tracking-wider uppercase">Researches</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan-restrained)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent-cyan-restrained)] group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => handleOpenOverlay('projects')}
            className="group inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent-cyan-restrained)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan-restrained)] relative py-1 cursor-pointer"
          >
            <span className="tracking-wider uppercase">Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan-restrained)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent-cyan-restrained)] group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        {/* 2. Quick Gmail Dispatch Box (Equal Separator Length: max-w-xs) */}
        <div 
          className="w-full max-w-xs mt-2 pt-2 border-t border-[var(--border-subtle)] animate-cascade-in" 
          style={{ animationDelay: '700ms' }}
        >
          <QuickContactBox recipientEmail={profile.email || 'personal.ac.oa@gmail.com'} />
        </div>

        {/* 3. Interactive Social Icons */}
        <div
          className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 w-full max-w-xs mx-auto animate-cascade-in"
          style={{ animationDelay: '820ms' }}
        >
          {profile.socialHandles?.github && (
            <a
              href={profile.socialHandles.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-cyan-restrained)] transition-all duration-500 ease-in-out cursor-pointer"
            >
              <Github className="w-4 h-4 transition-transform duration-500" />
            </a>
          )}

          {profile.socialHandles?.github && profile.socialHandles?.youtube && (
            <div className="h-3.5 w-px bg-[var(--border-subtle)] shrink-0" aria-hidden="true" />
          )}

          {profile.socialHandles?.youtube && (
            <a
              href={profile.socialHandles.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-cyan-restrained)] transition-all duration-500 ease-in-out cursor-pointer"
            >
              <Youtube className="w-4 h-4 transition-transform duration-500" />
            </a>
          )}

          {profile.socialHandles?.youtube && profile.socialHandles?.instagram && (
            <div className="h-3.5 w-px bg-[var(--border-subtle)] shrink-0" aria-hidden="true" />
          )}

          {profile.socialHandles?.instagram && (
            <a
              href={profile.socialHandles.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-cyan-restrained)] transition-all duration-500 ease-in-out cursor-pointer"
            >
              <Instagram className="w-4 h-4 transition-transform duration-500" />
            </a>
          )}

          {profile.socialHandles?.instagram && profile.socialHandles?.behance && (
            <div className="h-3.5 w-px bg-[var(--border-subtle)] shrink-0" aria-hidden="true" />
          )}

          {profile.socialHandles?.behance && (
            <a
              href={profile.socialHandles.behance}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance Profile"
              className="flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-cyan-restrained)] transition-all duration-500 ease-in-out cursor-pointer"
            >
              <SiBehance className="w-4 h-4 transition-transform duration-500" />
            </a>
          )}

          <div className="h-3.5 w-px bg-[var(--border-subtle)] shrink-0" aria-hidden="true" />

          {/* Share Profile Icon */}
          <button
            onClick={handleShareProfile}
            aria-label="Share Profile"
            className="flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-cyan-restrained)] transition-all duration-500 ease-in-out cursor-pointer"
          >
            {copiedShare ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Share2 className="w-4 h-4 transition-transform duration-500" />
            )}
          </button>
        </div>
      </main>

      {/* Precision Optical Cursor */}
      <EditorialLightCursor />

      {/* Cross-fade Theme Wash Overlay */}
      <ThemeTransitionOverlay isLightMode={isLightMode} trigger={themeToggleCount} />

      {/* Full-Screen Dialog Views with Coordinated Zoom Motion Blur */}
      {activeOverlay && (
        <CompactOverlays
          activeOverlay={activeOverlay}
          isClosing={isOverlayClosing}
          onClose={handleCloseOverlay}
          profile={profile}
        />
      )}
    </div>
  );
}
