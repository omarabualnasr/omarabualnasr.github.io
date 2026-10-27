/**
 * NOIR SIGNAL — CENTRAL PROFILE DATA
 * 
 * ============================================================================
 * EDITABLE DIGITAL IDENTITY
 * To personalize this profile:
 * 1. Modify fullName, descriptor, location, and personalStatement below.
 * 2. Configure your direct email and external links.
 * 3. Add up to 3 selected-work entries (or leave empty [] to cleanly hide).
 * ============================================================================
 */

import { ProfileData } from '../types/profile';

export const defaultProfile: ProfileData = {
  id: 'Omar Abu Alnasr',
  fullName: 'Omar Abu Alnasr',
  monogram: 'EV',
  editorialIdentifier: 'RESEARCH IN INTELLIGENT SYSTEMS · MATHEMATICAL ONTOLOGIES',
  descriptor: 'Independent Researcher & Systems Architect',
  location: 'Oxford / London',
  professionalDirection:
    'Investigating foundational intelligence architectures, mathematical graph ontologies, and long-arc archival preservation.',
  conciseIntroduction:
    'Exploring how structural clarity, formal verification, and deliberate editorial restraint allow complex ideas to remain transparent, durable, and human-aligned.',
  personalStatement:
    'Investigating enduring architectures of human inquiry — constructing resilient knowledge frameworks that outlast ephemeral digital cycles.',
  extendedBio: [
    'My practice examines how structural design, open archival ontologies, and deliberate restraint enable ideas to endure across decades.',
    'Working across information architecture, spatial documentation, and independent research, I focus on systems where clarity and durability take precedence over speed.',
  ],
  principles: [
    'Durability over velocity: measure impact by what remains legible twenty years from now.',
    'Typographic discipline: eliminate decorative noise so structural thought stands on its own rigor.',
    'Material grounding: balance abstract computational models with physical artifacts and field surveys.',
  ],
  email: 'elena.vance@inquiry.archive',
  socials: [
    {
      platform: 'Digital Archive',
      handle: 'archive.elenavance.org',
      url: 'https://example.org/archive',
    },
    {
      platform: 'Research Index',
      handle: 'orcid.org/0000-0002-1829-441X',
      url: 'https://orcid.org',
    },
    {
      platform: 'Field Notebooks',
      handle: '@elenavance',
      url: 'https://example.org/field-notes',
    },
  ],
  socialHandles: {
    github: 'hhttps://github.com/omarabualnasr',
    youtube: 'https://www.youtube.com/@oasstudio',
    instagram: 'https://www.instagram.com/oaasstudio/',
  },
  selectedWorks: [
    {
      id: 'work-01',
      number: '01',
      title: 'The Civic Memory Corpus',
      category: 'Open Archival Framework',
      year: '2025',
      summary:
        'A public-access archival standard preserving community oral histories and municipal land records across non-proprietary schemas.',
      overview:
        'A three-year initiative establishing decentralized metadata protocols for 1,840 at-risk historical records, accompanied by an annual letterpress reference catalog.',
      tags: ['Information Architecture', 'Open Standards', 'Archival Systems'],
      destinationUrl: 'https://example.org/civic-corpus',
      accentTone: '#8BE8FF',
    },
    {
      id: 'work-02',
      number: '02',
      title: 'Topography of the Margin',
      category: 'Bibliographic Monograph',
      year: '2024',
      summary:
        'A spatial analysis examining how informal margin annotations shaped mathematical discoveries before formal peer review.',
      overview:
        'Survey of 84 rare manuscripts documenting marginalia as an informal conversational medium where dissenting scientific conjectures were first tested.',
      tags: ['Historical Bibliography', 'Typography', 'Monograph'],
      destinationUrl: 'https://example.org/topography-margin',
      accentTone: '#94A3B8',
    },
    {
      id: 'work-03',
      number: '03',
      title: 'The Silent Atlas',
      category: 'Cartographic Field Survey',
      year: '2024',
      summary:
        'An eight-month foot survey documenting unpaved Neolithic holloways and historic rights-of-way across Southern England.',
      overview:
        'Vector topological mapping combining high-precision field GPS logging with historical enclosure maps to legally safeguard contested public paths.',
      tags: ['Cartography', 'Field Research', 'Spatial Analysis'],
      destinationUrl: 'https://example.org/downs-atlas',
      accentTone: '#7DD3FC',
    },
  ],
};
