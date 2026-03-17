/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { blogApi } from '@/lib/blogApi';
import { BlogPost } from '@/types/blog';

export const useBlogPost = (id?: string, slug?: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id && !slug) return;

      try {
        setLoading(true);
        const data = id 
          ? await blogApi.getPostById(id)
          : await blogApi.getPostBySlug(slug!);
        setPost(data);
        setError(null);

        // Incrémenter les vues automatiquement
        if (data.id) {
          await blogApi.incrementViews(data.id);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch blog post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, slug]);

  return { post, loading, error };
};