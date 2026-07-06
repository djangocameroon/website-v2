"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { eventsApi } from '@/lib/eventsApi';
import { useAuth } from '@/components/contexts/auth-context';
import { queryKeys } from '@/lib/query-keys';

export const useEventReservation = (eventId?: string) => {
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  const registrationQuery = useQuery({
    queryKey: queryKeys.eventRegistration(eventId ?? ''),
    queryFn: async () => {
      try {
        return await eventsApi.checkRegistration(eventId!);
      } catch {
        return { registered: false, reservation_id: '' };
      }
    },
    enabled: !!eventId && isAuthenticated && !!user,
  });

  const reservationId = registrationQuery.data?.registered
    ? registrationQuery.data.reservation_id
    : null;

  const invalidate = () => {
    if (eventId) {
      queryClient.invalidateQueries({ queryKey: queryKeys.eventRegistration(eventId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.event(eventId) });
    }
  };

  const registerMutation = useMutation({
    mutationFn: () => eventsApi.registerForEvent(eventId!),
    onSuccess: (reservation) => {
      queryClient.setQueryData(queryKeys.eventRegistration(eventId ?? ''), {
        registered: true,
        reservation_id: reservation.id,
      });
      toast.success('You are registered for this event!');
      invalidate();
    },
    onError: () => {
      toast.error('Failed to register for this event');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => eventsApi.cancelReservation(reservationId!),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.eventRegistration(eventId ?? ''), {
        registered: false,
        reservation_id: '',
      });
      toast.success('Registration cancelled');
      invalidate();
    },
    onError: () => {
      toast.error('Failed to cancel registration');
    },
  });

  return {
    isRegistered: !!reservationId,
    checking: registrationQuery.isLoading,
    submitting: registerMutation.isPending || cancelMutation.isPending,
    register: () => {
      if (eventId) registerMutation.mutate();
    },
    cancel: () => {
      if (reservationId) cancelMutation.mutate();
    },
  };
};
