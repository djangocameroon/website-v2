"use client";

import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/lib/blogApi';
import { queryKeys } from '@/lib/query-keys';

export const useBlogPost = (slug?: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.post(slug ?? ''),
    queryFn: () => blogApi.getPostBySlug(slug!),
    enabled: !!slug,
  });

  return {
    post: data ?? null,
    loading: isPending,
    error: error ? (error as Error).message || 'Failed to load blog post' : null,
  };
};
