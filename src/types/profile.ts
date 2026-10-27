/**
 * NOIR SIGNAL — DIGITAL IDENTITY PROFILE TYPES
 * 
 * Field-independent, universal schema for a minimalist single-viewport digital identity.
 */

export interface ProjectEntry {
  id: string;
  number: string;              // e.g. "01", "02"
  title: string;
  category: string;            // Field-neutral discipline / category
  year: string;
  summary: string;             // 1-2 sentence core overview
  overview?: string;           // Optional deeper context
  tags?: string[];
  destinationUrl?: string;     // Real external link if configured
  accentTone?: string;         // e.g. "#8BE8FF"
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
}

export interface ProfileData {
  id: string;
  fullName: string;
  monogram?: string;
  editorialIdentifier?: string; // Small restrained widely tracked discipline label
  professionalDirection: string; // Short honest statement of current interests (e.g. AI, mathematics, research)
  conciseIntroduction: string;   // 1-2 carefully written lines on what they explore/build
  descriptor?: string;
  location?: string;
  personalStatement: string;
  extendedBio?: string[];
  principles?: string[];
  email?: string;
  socials?: SocialLink[];
  socialHandles?: {
    github?: string;
    youtube?: string;
    instagram?: string;
  };
  selectedWorks?: ProjectEntry[];
}
