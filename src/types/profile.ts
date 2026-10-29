export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  destinationUrl?: string;
}

export interface ProjectCategoryGroup {
  categoryTitle: string;
  projects: ProjectItem[];
}

export interface ProfileData {
  fullName: string;
  professionalDirection: string;
  conciseIntroduction: string;
  email?: string;
  socialHandles?: {
    github?: string;
    youtube?: string;
    instagram?: string;
    behance?: string;
  };
  selectedWorks?: ProjectItem[];
  projectGroups?: ProjectCategoryGroup[];
}
