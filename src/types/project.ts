export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_link: string | null;
  demo_link: string | null;
  thumbnail: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface ProjectListResponse {
  status: boolean;
  message: string;
  data: ProjectItem[];
  status_code: number;
}

export interface ProjectStats {
  totalProjects: number;
  totalStars: number;
  activeContributors: number;
  totalContributions: number;
}
