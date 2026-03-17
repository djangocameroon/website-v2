/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { blogApi } from '@/lib/blogApi';
import { BlogPost, BlogFilters } from '@/types/blog';

export const useBlogPosts = (filters?: BlogFilters) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await blogApi.getAllPosts(filters);
      setPosts(data.results);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blog posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [JSON.stringify(filters)]);

  return {
    posts,
    loading,
    error,
    pagination,
    refetch: fetchPosts,
  };
};