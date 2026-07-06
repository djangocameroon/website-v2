"use client";

import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/lib/blogApi';
import { BlogFilters } from '@/types/blog';
import { queryKeys } from '@/lib/query-keys';

const EMPTY_PAGINATION = {
  count: 0,
  next: null as string | null,
  previous: null as string | null,
  current_page: 1,
  total_pages: 1,
};

export const useBlogPosts = (filters?: BlogFilters) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: queryKeys.posts(filters),
    queryFn: () => blogApi.getAllPosts(filters),
  });

  return {
    posts: data?.data ?? [],
    loading: isPending,
    error: error ? (error as Error).message || 'Failed to fetch blog posts' : null,
    pagination: data?.pagination ?? EMPTY_PAGINATION,
    refetch,
  };
};
