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
    behance: 'https://www.behance.net/theoaati',
  },
  selectedWorks: [
    {
      id: 'research-01',
      number: '01',
      title: 'AI & DNA Research',
      summary:
        '',
      destinationUrl: 'https://github.com/omarabualnasr/AIDNAResearch',
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
            "",
          destinationUrl: 'https://github.com/omarabualnasr/TheColorPalette',
        },
        {
          id: 'app-02',
          number: '02',
          title: 'The Power Menu',
          summary:
            '',
          destinationUrl: 'https://github.com/omarabualnasr/ThePowerMenu',
        },
        {
          id: 'app-03',
          number: '03',
          title: 'The Calendar',
          summary:
            '',
          destinationUrl: 'https://github.com/omarabualnasr/TheCalendar',
        },
        {
          id: 'app-04',
          number: '04',
          title: 'Text Motion Studio',
          summary:
            '',
          destinationUrl: 'https://github.com/omarabualnasr/TextMotionStudio',
        },
        {
          id: 'app-05',
          number: '05',
          title: 'The Health Calculator',
          summary:
            '',
          destinationUrl: 'https://github.com/omarabualnasr/TheHealthCalculator',
        },
      ],
    },
    {
      categoryTitle: 'UI',
      projects: [
        {
          id: 'ui-01',
          number: '06',
          title: 'The Web UI',
          summary:
            '',
          destinationUrl: 'https://github.com/omarabualnasr/TheWebUI',
        },
      ],
    },
    {
      categoryTitle: 'Wiki',
      projects: [
        {
          id: 'wiki-01',
          number: '07',
          title: 'The Math Wiki',
          summary:
            '',
          destinationUrl: 'https://github.com/omarabualnasr/TheMathWiki',
        },
        
      ],
    },
    {
      categoryTitle: 'AI Projects',
      projects: [
        {
          id: 'ai-01',
          number: '8',
          title: 'MiniGPT',
          summary:
            '',
          destinationUrl: 'https://github.com/omarabualnasr/MiniGPT',
        },
                {
          id: 'ai-02',
          number: '9',
          title: 'SmartCPUAIInstaller',
          summary:
            '',
          destinationUrl: 'https://github.com/omarabualnasr/SmartCPUAIInstaller',
        },
      ],
    },
  ],
};
