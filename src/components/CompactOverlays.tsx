import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProfileData } from '../types/profile';

export type OverlayType = 'works' | 'projects' | null;

interface CompactOverlaysProps {
  activeOverlay: OverlayType;
  isClosing: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const CompactOverlays: React.FC<CompactOverlaysProps> = ({
  activeOverlay,
  isClosing,
  onClose,
  profile,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeOverlay) return;

    // Reset scroll position on open
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeOverlay, onClose]);

  if (!activeOverlay) return null;

  // Close when clicking directly on background, margins, gutters, or outside card bodies
  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't close if clicking links, buttons, or form controls
    if (target.closest('a, button, input, textarea')) {
      return;
    }
    // Don't close if clicking directly inside a card body
    if (target.closest('[data-card="true"]')) {
      return;
    }
    onClose();
  };

  const projectGroups = profile.projectGroups || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[60] bg-[var(--bg-canvas)] flex flex-col cursor-default ${
        isClosing ? 'animate-zoom-blur-out' : 'animate-zoom-blur-in'
      }`}
      onClick={handleBackgroundClick}
    >
      {/* Background Textures */}
      <div className="vignette-architectural absolute inset-0 z-0 pointer-events-none" />
      <div className="architectural-tactile-grid absolute inset-0 z-0 pointer-events-none opacity-60" />
      <div className="grain-subtle absolute inset-0 z-0 pointer-events-none opacity-40" />

      {/* Content Area with High-Performance Smooth Hardware-Accelerated Scrolling */}
      <div 
        ref={contentRef}
        className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          transform: 'translateZ(0)',
        }}
        onClick={handleBackgroundClick}
      >
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8 md:px-10 py-12 sm:py-20 md:py-24">
          {/* 1. RESEARCHES SECTION */}
          {activeOverlay === 'works' && (
            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-2">
                <h3 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[var(--text-primary)]">
                  Researches
                </h3>
              </div>

              <div className="space-y-4 border-t border-[var(--border-subtle)]">
                {profile.selectedWorks?.map((work) => (
                  <div 
                    key={work.id} 
                    data-card="true"
                    className="py-8 sm:py-10 border-b border-[var(--border-subtle)] group cursor-default"
                  >
                    <div className="text-xs font-mono-metadata mb-2.5 sm:mb-3">
                      <span className="text-[var(--accent-cyan-restrained)]">{work.number}</span>
                    </div>

                    <h4 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-normal group-hover:text-[var(--accent-cyan-restrained)] transition-colors mb-4 sm:mb-6">
                      {work.title}
                    </h4>

                    <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-sans-editorial leading-relaxed max-w-2xl mb-6 sm:mb-8">
                      {work.summary}
                    </p>

                    {work.destinationUrl && (
                      <a
                        href={work.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono-metadata text-[var(--accent-cyan-restrained)] hover:translate-x-1 transition-transform group/link"
                      >
                        <span className="border-b border-[var(--accent-cyan-restrained)] pb-0.5">EXPLORE RESEARCH</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. PROJECTS SECTION (Categorized: Apps, UI, Wiki, AI Projects) */}
          {activeOverlay === 'projects' && (
            <div className="space-y-12 sm:space-y-16">
              <div className="space-y-2">
                <h3 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[var(--text-primary)]">
                  Projects
                </h3>
              </div>

              <div className="space-y-12 sm:space-y-16 border-t border-[var(--border-subtle)] pt-2">
                {projectGroups.map((group) => (
                  <div key={group.categoryTitle} className="space-y-4">
                    {/* Category Header */}
                    <div className="border-b border-[var(--border-subtle)] pb-3.5 pt-8">
                      <h4 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[var(--text-primary)]">
                        {group.categoryTitle}
                      </h4>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2">
                      {group.projects.map((project) => (
                        <div 
                          key={project.id} 
                          data-card="true"
                          className="py-7 sm:py-9 border-b border-[var(--border-subtle)] group cursor-default"
                        >
                          <div className="text-xs font-mono-metadata mb-2 sm:mb-2.5">
                            <span className="text-[var(--accent-cyan-restrained)]">{project.number}</span>
                          </div>

                          <h5 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-normal group-hover:text-[var(--accent-cyan-restrained)] transition-colors mb-3 sm:mb-4">
                            {project.title}
                          </h5>

                          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans-editorial leading-relaxed max-w-2xl mb-5 sm:mb-6">
                            {project.summary}
                          </p>

                          <a
                            href={project.destinationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono-metadata text-[var(--accent-cyan-restrained)] hover:translate-x-1 transition-transform group/link"
                          >
                            <span className="border-b border-[var(--accent-cyan-restrained)] pb-0.5">VIEW PROJECT</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
