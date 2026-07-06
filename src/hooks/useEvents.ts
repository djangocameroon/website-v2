"use client";

import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '@/lib/eventsApi';
import { EventFilters } from '@/types/events';
import { queryKeys } from '@/lib/query-keys';

const EMPTY_PAGINATION = {
  count: 0,
  next: null as string | null,
  previous: null as string | null,
  current_page: 1,
  total_pages: 1,
};

export const useEvents = (filters?: EventFilters) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: queryKeys.events(filters),
    queryFn: () => eventsApi.getAllEvents(filters),
  });

  return {
    events: data?.data ?? [],
    loading: isPending,
    error: error ? (error as Error).message || 'Failed to fetch events' : null,
    pagination: data?.pagination ?? EMPTY_PAGINATION,
    refetch,
  };
};
