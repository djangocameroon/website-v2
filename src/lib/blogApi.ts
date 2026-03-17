
import axios, { AxiosInstance } from 'axios';
import { 
  BlogPost, 
  BlogPostCreate, 
  BlogPostUpdate, 
  BlogPostList, 
  BlogFilters 
} from '@/types/blog';

// Use environment variable for API base URL, with a fallback for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dev.djangocameroon.org';

class BlogApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // intercepetor for adding auth token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // interceptor for logging errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
        });
        return Promise.reject(error);
      }
    );
  }

  // ================ GET ALL BLOG POSTS ================
  async getAllPosts(filters?: BlogFilters): Promise<BlogPostList> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.tags) params.append('tags', filters.tags);
    if (filters?.author) params.append('author', filters.author);
    if (filters?.is_published !== undefined) params.append('is_published', String(filters.is_published));
    if (filters?.ordering) params.append('ordering', filters.ordering);
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.page_size) params.append('page_size', String(filters.page_size));

    const response = await this.api.get<BlogPostList>('/blog/', { params });
    return response.data;
  }

  // ================ GET SINGLE BLOG POST ================
  async getPostById(id: number): Promise<BlogPost> {
    const response = await this.api.get<BlogPost>(`/blog/${id}/`);
    return response.data;
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await this.api.get<BlogPost>(`/blog/${slug}/`);
    return response.data;
  }

  // ================ CREATE BLOG POST ================
  async createPost(data: BlogPostCreate): Promise<BlogPost> {
    const payload = {
      title: data.title,
      content: data.content,
      image: data.image,
      tags: data.tags,
      read_time: data.read_time || '5',
      is_published: data.is_published !== undefined ? data.is_published : true,
      ...(data.excerpt && { excerpt: data.excerpt }),
    };

    console.log('Creating blog post with payload:', payload);

    const response = await this.api.post<BlogPost>('/blog/posts/', payload);
    return response.data;
  }

  // ================ UPDATE BLOG POST ================
  async updatePost(id: number, data: BlogPostUpdate): Promise<BlogPost> {
    const response = await this.api.patch<BlogPost>(`/blog/${id}/`, data);
    return response.data;
  }

  // ================ DELETE BLOG POST ================
  async deletePost(id: number): Promise<void> {
    await this.api.delete(`/blog/${id}/`);
  }

  // ================ LIKE/UNLIKE POST ================
  async likePost(id: number): Promise<{ likes_count: number }> {
    const response = await this.api.post(`/blog/${id}/like/`);
    return response.data;
  }

  async unlikePost(id: number): Promise<{ likes_count: number }> {
    const response = await this.api.post(`/blog/${id}/unlike/`);
    return response.data;
  }

  // ================ INCREMENT VIEWS ================
  async incrementViews(id: number): Promise<{ views_count: number }> {
    const response = await this.api.post(`/blog/${id}/view/`);
    return response.data;
  }

  // ================ GET TAGS ================
  async getAllTags(): Promise<string[]> {
    const response = await this.api.get<string[]>('/blog/tags/');
    return response.data;
  }

  // ================ UPLOAD IMAGE ================
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await this.api.post<{ url: string }>('/blog/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const blogApi = new BlogApiService();
