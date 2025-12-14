export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  technologies: Technology[];
  category: ProjectCategory;
  contributors?: number;
}

export interface Technology {
  name: string;
  color: string;
}

export type ProjectCategory = "web" | "api" | "tools" | "all";

export interface ProjectFilter {
  id: ProjectCategory;
  label: string;
}

export interface ProjectStats {
  totalProjects: number;
  totalStars: number;
  activeContributors: number;
  totalContributions: number;
}
