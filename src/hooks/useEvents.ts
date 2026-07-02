/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { eventsApi } from '@/lib/eventsApi';
import { EventItem, EventFilters } from '@/types/events';

export const useEvents = (filters?: EventFilters) => {
  const [events, setEvents] = useState<EventItem[]>([]);
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
    next: null,
    previous: null,
    current_page: 1,
    total_pages: 1,
  });

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await eventsApi.getAllEvents(filters);
      setEvents(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    pagination,
    refetch: fetchEvents,
  };
};
