"use client";

import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '@/lib/eventsApi';
import { queryKeys } from '@/lib/query-keys';

export const useEvent = (idOrSlug?: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.event(idOrSlug ?? ''),
    queryFn: () => eventsApi.getEventByIdOrSlug(idOrSlug!),
    enabled: !!idOrSlug,
  });

  return {
    event: data ?? null,
    loading: isPending,
    error: error ? (error as Error).message || 'Failed to load event' : null,
  };
};
