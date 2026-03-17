export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string; // main image URL
  tags: string[];
  author: {
    username: string;
  };
  read_time: number;
  likes: number;
  views: number;
  created_at: string;
}

export interface BlogPostCreate {
  title: string;
  content: string; // HTML complet de l'éditeur
  cover_image: string; // Image principale uniquement
  tags: string[];
  read_time: number;
}

export interface BlogPostUpdate extends Partial<BlogPostCreate> {}

export interface BlogPostList {
  status: boolean,
  message: string,
  status_code: number,
  page: number,
  page_size: number,
  total: number,
  pagination: {
    next: null,
    previous: null,
    count: number,
    current_page: number,
    total_pages: number
  },
  data: BlogPost[];
}

export interface BlogFilters {
  search?: string;
  tags?: string;
  author?: string;
  is_published?: boolean;
  ordering?: 'latest' | 'most_liked' | 'most_viewed' | '-created_at' | '-likes_count' | '-views_count';
  page?: number;
  page_size?: number;
}