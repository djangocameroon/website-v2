/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '@/lib/blogApi';
import { BlogPost, BlogFilters } from '@/types/blog';

export const useBlogPosts = (filters?: BlogFilters) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
    current_page: number;
    total_pages: number;
  }>({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
    current_page: 1,
    total_pages: 1,
  });

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await blogApi.getAllPosts(filters);
      setPosts(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blog posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    pagination,
    refetch: fetchPosts,
  };
};