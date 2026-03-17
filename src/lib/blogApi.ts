
import { AxiosInstance } from 'axios';
import { 
  BlogPost, 
  BlogPostCreate, 
  BlogPostUpdate, 
  BlogPostList, 
  BlogFilters 
} from '@/types/blog';
import axiosClient from '@/apis/axios';

class BlogApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axiosClient;
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

    const response = await this.api.get('/posts/', { params });
    return response.data;
  }

  // ================ GET SINGLE BLOG POST ================
  async getPostById(id: string): Promise<BlogPost> {
    const response = await this.api.get<BlogPost>(`/posts/${id}/`);
    return response.data;
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await this.api.get<BlogPost>(`/posts/${slug}/`);
    return response.data;
  }

  // ================ CREATE BLOG POST ================
  async createPost(data: BlogPostCreate): Promise<BlogPost> {
    const payload = {
      ...data
    };

    console.log('Creating blog post with payload:', payload);

    const { data: response } = await this.api.post('/posts/', payload);
    return response.data;
  }

  // ================ UPDATE BLOG POST ================
  async updatePost(id: string, data: BlogPostUpdate): Promise<BlogPost> {
    const response = await this.api.patch<BlogPost>(`/posts/${id}/`, data);
    return response.data;
  }

  // ================ DELETE BLOG POST ================
  async deletePost(id: string): Promise<void> {
    await this.api.delete(`/posts/${id}/`);
  }

  // ================ LIKE/UNLIKE POST ================
  async likePost(id: string): Promise<{ likes_count: number }> {
    const response = await this.api.post(`/posts/${id}/like/`);
    return response.data;
  }

  async unlikePost(id: string): Promise<{ likes_count: number }> {
    const response = await this.api.post(`/posts/${id}/unlike/`);
    return response.data;
  }

  // ================ INCREMENT VIEWS ================
  async incrementViews(id: string): Promise<{ views_count: number }> {
    const response = await this.api.get(`/posts/${id}/view/`);
    return response.data;
  }

  // ================ GET TAGS ================
  async getAllTags(): Promise<string[]> {
    const { data: response } = await this.api.get('/blog/tags/');
    return response.data;
  }

  // ================ UPLOAD IMAGE ================
  async uploadImage(file: File): Promise<{ file_url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const { data: response } = await this.api.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const blogApi = new BlogApiService();
