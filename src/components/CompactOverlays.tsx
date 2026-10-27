import React, { useEffect, useRef, useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Cpu } from 'lucide-react';
import { ProfileData } from '../types/profile';

export type OverlayType = 'about' | 'works' | 'projects' | 'contact' | null;

interface CompactOverlaysProps {
  activeOverlay: OverlayType;
  onClose: () => void;
  profile: ProfileData;
}

export const CompactOverlays: React.FC<CompactOverlaysProps> = ({
  activeOverlay,
  onClose,
  profile,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeOverlay) return;

    // Reset scroll when overlay changes
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleTriggerClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOverlay]);

  if (!activeOverlay) return null;

  const handleTriggerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 750); // Matches exit animation duration
  };

  const handleCopyEmail = () => {
    if (!profile.email) return;
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  // Close when clicking background (area not occupied by text/cards)
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleTriggerClose();
    }
  };

  const sampleProjects = [
    {
      id: 'proj-01',
      number: '01',
      title: 'Noir Signal Interface',
      category: 'WebGL & Light Architecture',
      year: '2026',
      summary:
        'A single-viewport digital identity engine combining optical light-sweep shaders with zero-latency mouse field tracking.',
      destinationUrl: 'https://example.org/noir-signal',
    },
    {
      id: 'proj-02',
      number: '02',
      title: 'Spatial Knowledge Mesh',
      category: 'Graph Neural Index',
      year: '2025',
      summary:
        'A real-time vector search engine indexing multidimensional research papers across interconnected semantic nodes.',
      destinationUrl: 'https://example.org/spatial-mesh',
    },
    {
      id: 'proj-03',
      number: '03',
      title: 'Axiom Engine',
      category: 'Formal Verification Workbench',
      year: '2025',
      summary:
        'A browser-native symbolic logic runtime evaluating mathematical proofs and ontology consistency.',
      destinationUrl: 'https://example.org/axiom-engine',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[60] bg-[var(--bg-canvas)] flex flex-col cursor-default transition-all duration-700 ease-out ${
        isClosing ? 'animate-zoom-blur-out' : 'animate-zoom-blur-in'
      }`}
      onClick={handleBackgroundClick}
    >
      {/* Background Textures */}
      <div className="vignette-architectural absolute inset-0 z-0 pointer-events-none" />
      <div className="architectural-tactile-grid absolute inset-0 z-0 pointer-events-none opacity-60" />
      <div className="grain-subtle absolute inset-0 z-0 pointer-events-none opacity-40" />

      {/* Content Area */}
      <div 
        ref={contentRef}
        className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden"
        onClick={handleBackgroundClick}
      >
        <div className="w-full max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-32 pointer-events-none">
          {/* Internal wrapper to re-enable pointer events for actual content */}
          <div className="pointer-events-auto">
            {/* 1. ABOUT SECTION */}
            {activeOverlay === 'about' && (
              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="font-serif-display text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[var(--text-primary)]">
                    {profile.fullName}
                  </h3>
                  <div className="text-sm font-mono-metadata text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                    {profile.descriptor} · {profile.location}
                  </div>
                </div>

                <div className="space-y-6 text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed font-sans-editorial font-light opacity-90 max-w-2xl">
                  {profile.extendedBio?.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {profile.principles && profile.principles.length > 0 && (
                  <div className="pt-12 border-t border-[var(--border-subtle)]">
                    <div className="text-xs font-mono-metadata tracking-[0.3em] uppercase text-[var(--accent-cyan-restrained)] mb-8">
                      GUIDING AXIOMS
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {profile.principles.map((pr, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                          <span className="font-mono-metadata text-[var(--accent-cyan-restrained)] text-sm mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            0{i + 1}.
                          </span>
                          <span className="text-[var(--text-primary)] font-sans-editorial font-light leading-relaxed">
                            {pr}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. RESEARCHES SECTION */}
            {activeOverlay === 'works' && (
              <div className="space-y-12">
                <div className="space-y-2">
                  <h3 className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-[var(--text-primary)]">
                    Researches & Monographs
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-sans-editorial max-w-lg">
                    Curated documentation of mathematical, ontological, and archival research inquiries exploring the intersection of digital and physical signals.
                  </p>
                </div>

                <div className="space-y-4 border-t border-[var(--border-subtle)]">
                  {profile.selectedWorks?.map((work) => (
                    <div key={work.id} className="py-10 border-b border-[var(--border-subtle)] group">
                      <div className="flex items-center justify-between text-xs font-mono-metadata mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[var(--accent-cyan-restrained)]">{work.number}</span>
                          <span className="w-8 h-px bg-[var(--border-subtle)]" />
                          <span className="text-[var(--text-secondary)] uppercase tracking-wider">{work.category}</span>
                        </div>
                        <span className="text-[var(--text-tertiary)]">{work.year}</span>
                      </div>

                      <h4 className="font-serif-display text-3xl sm:text-4xl text-[var(--text-primary)] font-normal group-hover:text-[var(--accent-cyan-restrained)] transition-colors mb-6">
                        {work.title}
                      </h4>

                      <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans-editorial leading-relaxed max-w-2xl mb-8">
                        {work.summary}
                      </p>

                      {work.destinationUrl && (
                        <a
                          href={work.destinationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-mono-metadata text-[var(--accent-cyan-restrained)] hover:translate-x-1 transition-transform group/link"
                        >
                          <span className="border-b border-[var(--accent-cyan-restrained)] pb-0.5">EXAMINE FULL RECORD</span>
                          <ArrowUpRight className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PROJECTS SECTION (Replaced APPS) */}
            {activeOverlay === 'projects' && (
              <div className="space-y-12">
                <div className="space-y-2">
                  <h3 className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-[var(--text-primary)]">
                    Projects & Systems
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-sans-editorial max-w-lg">
                    Functional interactive runtimes, search engines, and spatial interfaces built with performance and precision in mind.
                  </p>
                </div>

                <div className="grid gap-6">
                  {sampleProjects.map((project) => (
                    <div key={project.id} className="p-8 sm:p-10 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan-restrained)]/40 transition-all group">
                      <div className="flex items-center justify-between text-xs font-mono-metadata mb-6">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-[var(--accent-cyan-restrained)] text-[var(--bg-canvas)] font-bold">{project.number}</span>
                          <span className="text-[var(--text-secondary)] uppercase tracking-widest">{project.category}</span>
                        </div>
                        <span className="text-[var(--text-tertiary)]">{project.year}</span>
                      </div>

                      <h4 className="font-serif-display text-3xl text-[var(--text-primary)] font-normal mb-4 flex items-center gap-3">
                        <Cpu className="w-6 h-6 text-[var(--accent-cyan-restrained)]" />
                        <span>{project.title}</span>
                      </h4>

                      <p className="text-base text-[var(--text-secondary)] font-sans-editorial leading-relaxed max-w-xl mb-8">
                        {project.summary}
                      </p>

                      <a
                        href={project.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg-canvas)] font-mono-metadata text-xs uppercase tracking-widest hover:bg-[var(--accent-cyan-restrained)] transition-colors"
                      >
                        <span>Launch Runtime</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CONTACT SECTION */}
            {activeOverlay === 'contact' && (
              <div className="space-y-12">
                <div className="space-y-2">
                  <h3 className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-[var(--text-primary)]">
                    Direct Communication
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-sans-editorial max-w-lg">
                    Open for research collaborations, monographs, and systems consultations. Standard response window is 48 hours.
                  </p>
                </div>

                {profile.email && (
                  <div className="p-10 sm:p-16 border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col items-center text-center space-y-8">
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono-metadata tracking-[0.4em] uppercase text-[var(--accent-cyan-restrained)]">
                        PRIMARY GATEWAY
                      </span>
                      <div className="font-mono-metadata text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] break-all select-all hover:text-[var(--accent-cyan-restrained)] transition-colors cursor-pointer">
                        {profile.email}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 font-mono-metadata w-full max-w-sm">
                      <a
                        href={`mailto:${profile.email}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs uppercase tracking-widest bg-[var(--text-primary)] text-[var(--bg-canvas)] hover:bg-[var(--accent-cyan-restrained)] transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send Dispatch</span>
                      </a>

                      <button
                        onClick={handleCopyEmail}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs uppercase tracking-widest border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-cyan-restrained)] transition-all"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500" />
                            <span className="text-emerald-500">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>COPY ADDRESS</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
