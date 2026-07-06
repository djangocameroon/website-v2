"use client";

import { useQuery } from '@tanstack/react-query';
import { youtubeApi } from '@/lib/youtubeApi';
import { queryKeys } from '@/lib/query-keys';

export const useYoutubeVideos = (handle: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: queryKeys.youtubeVideos(handle),
    queryFn: () => youtubeApi.getChannelVideos(handle),
    retry: 1,
  });

  return {
    videos: data ?? [],
    loading: isPending,
    error: error ? (error as Error).message || 'Failed to fetch YouTube videos' : null,
    refetch,
  };
};
