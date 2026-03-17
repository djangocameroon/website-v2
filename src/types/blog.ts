export interface BlogPost {
  id: number;
  title: string;
  slug?: string;
  content: string; // content all blog post HTML
  excerpt?: string;
  image: string; // main image URL
  tags: string[];
  author: {
    id: number;
    username: string;
    email?: string;
  } | string;
  read_time: string;
  likes_count: number;
  views_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPostCreate {
  title: string;
  content: string; // HTML complet de l'éditeur
  excerpt?: string;
  image: string; // Image principale uniquement
  tags: string[];
  read_time?: string;
  is_published?: boolean;
}

export interface BlogPostUpdate extends Partial<BlogPostCreate> {}

export interface BlogPostList {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogPost[];
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