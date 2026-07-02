/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { eventsApi } from '@/lib/eventsApi';
import { EventItem } from '@/types/events';

export const useEvent = (idOrSlug?: string) => {
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrSlug) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await eventsApi.getEventByIdOrSlug(idOrSlug);
        setEvent(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching event:', err);
        setError(err.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [idOrSlug]);

  return { event, loading, error };
};
