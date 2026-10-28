import { ProfileData } from '../types/profile';

export const defaultProfile: ProfileData = {
  fullName: 'Omar Abu Alnasr',
  professionalDirection: 'Math · AI · Biology',
  conciseIntroduction:
    "I'm fascinated by the way maths discovers patterns, the way AI learns and reasons, and the role of both the human mind and DNA in life. I'm very interested in the links between all these areas, from the logic of intelligent systems to the biology of life itself.",
  email: 'work.ac.oa@gmail.com',
  socialHandles: {
    github: 'https://github.com/omarabualnasr/',
    youtube: 'https://www.youtube.com/@oasstudio',
    instagram: 'https://www.instagram.com/oaasstudio/',
  },
  selectedWorks: [
    {
      id: 'research-01',
      number: '01',
      title: 'Future AI Research',
      summary:
        'Investigating foundational intelligence architectures, cognitive model scaling, autonomous symbolic learning, and next-generation reasoning paradigms.',
      destinationUrl: 'https://github.com/omarabualnasr/Future-AI-Research',
    },
    {
      id: 'research-02',
      number: '02',
      title: 'AI & DNA Research',
      summary:
        'Exploring deep learning representations of genomic sequences, synthetic biology pathways, macromolecular folding, and the biology of life itself.',
      destinationUrl: 'https://github.com/omarabualnasr/AI-DNA-Research',
    },
    {
      id: 'research-03',
      number: '03',
      title: 'New Programming Language & AI Research',
      summary:
        'Developing a modern, formally verified programming language designed from first principles for native AI workloads, compiler proofs, and neural symbiosis.',
      destinationUrl: 'https://github.com/omarabualnasr/New-Programming-Language-AI-Research',
    },
  ],
  projectGroups: [
    {
      categoryTitle: 'Apps',
      projects: [
        {
          id: 'app-01',
          number: '01',
          title: 'The Color Palette',
          summary:
            "I'm fascinated by the way maths discovers patterns, the way AI learns and reasons, and the role of both the human mind and DNA in life. I'm very interested in the links between all these areas, from the logic of intelligent systems to the biology of life itself.I'm fascinated by the way maths discovers patterns, the way AI learns and reasons, and the role of both the human mind and DNA in life. I'm very interested in the links between all these areas, from the logic of intelligent systems to the biology of life itself.",
          destinationUrl: 'https://github.com/omarabualnasr/The-Color-Palette',
        },
        {
          id: 'app-02',
          number: '02',
          title: 'The Power Menu',
          summary:
            'A keyboard-first launcher and power execution workflow replacing traditional system menus with zero-latency dispatch.',
          destinationUrl: 'https://github.com/omarabualnasr/The-Power-Menu',
        },
        {
          id: 'app-03',
          number: '03',
          title: 'The Calendar',
          summary:
            'A minimalist time-mapping interface emphasizing temporal density, uninterrupted focus blocks, and cyclical scheduling.',
          destinationUrl: 'https://github.com/omarabualnasr/The-Calendar',
        },
        {
          id: 'app-04',
          number: '04',
          title: 'The Blocks',
          summary:
            'A spatial computing canvas organizing disparate notes, media fragments, and thoughts into structured, draggable blocks.',
          destinationUrl: 'https://github.com/omarabualnasr/The-Blocks',
        },
        {
          id: 'app-05',
          number: '05',
          title: 'The Widgets',
          summary:
            'Glanceable micro-instruments monitoring compute metrics, bio-signals, and live telemetry without contextual interruption.',
          destinationUrl: 'https://github.com/omarabualnasr/The-Widgets',
        },
        {
          id: 'app-06',
          number: '06',
          title: 'The App Builder',
          summary:
            'A visual declarative sandbox generating production-grade TypeScript components and headless schemas from natural intent.',
          destinationUrl: 'https://github.com/omarabualnasr/The-App-Builder',
        },
        {
          id: 'app-07',
          number: '07',
          title: 'The Health Calculator',
          summary:
            'A private mathematical modeling tool computing metabolic benchmarks, biomarker trends, and circadian recovery cycles.',
          destinationUrl: 'https://github.com/omarabualnasr/The-Health-Calculator',
        },
      ],
    },
    {
      categoryTitle: 'UI',
      projects: [
        {
          id: 'ui-01',
          number: '08',
          title: 'The Web UI',
          summary:
            'An architectural design system and component library built with strict typographic rhythm, tactile feedback, and restrained aesthetics.',
          destinationUrl: 'https://github.com/omarabualnasr/The-Web-UI',
        },
      ],
    },
    {
      categoryTitle: 'Wiki',
      projects: [
        {
          id: 'wiki-01',
          number: '09',
          title: 'The Math Wiki',
          summary:
            'An open interactive compendium mapping interconnected theorems, foundational axioms, and formal mathematical proofs.',
          destinationUrl: 'https://github.com/omarabualnasr/The-Math-Wiki',
        },
      ],
    },
    {
      categoryTitle: 'AI Projects',
      projects: [
        {
          id: 'ai-01',
          number: '10',
          title: 'Arab Lens',
          summary:
            'A computer vision and OCR pipeline specializing in Arabic calligraphy restoration, historical manuscript digitization, and semantic search.',
          destinationUrl: 'https://github.com/omarabualnasr/Arab-Lens',
        },
        {
          id: 'ai-02',
          number: '11',
          title: 'The ML',
          summary:
            'An interactive browser-native machine learning workbench for visual neural network experimentation and latent space navigation.',
          destinationUrl: 'https://github.com/omarabualnasr/The-ML',
        },
      ],
    },
  ],
};
