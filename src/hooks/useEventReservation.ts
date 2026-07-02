import { useState, useEffect, useCallback } from 'react';
import { eventsApi } from '@/lib/eventsApi';
import { useAuth } from '@/components/contexts/auth-context';
import toast from 'react-hot-toast';

export const useEventReservation = (eventId?: string) => {
  const { isAuthenticated, user } = useAuth();
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const checkExistingReservation = useCallback(async () => {
    if (!eventId || !isAuthenticated || !user) {
      setChecking(false);
      return;
    }
    try {
      setChecking(true);
      const { registered, reservation_id } = await eventsApi.checkRegistration(eventId);
      setReservationId(registered ? reservation_id : null);
    } catch {
      setReservationId(null);
    } finally {
      setChecking(false);
    }
  }, [eventId, isAuthenticated, user]);

  useEffect(() => {
    checkExistingReservation();
  }, [checkExistingReservation]);

  const register = useCallback(async () => {
    if (!eventId) return;
    try {
      setSubmitting(true);
      const reservation = await eventsApi.registerForEvent(eventId);
      setReservationId(reservation.id);
      toast.success('You are registered for this event!');
    } catch {
      toast.error('Failed to register for this event');
    } finally {
      setSubmitting(false);
    }
  }, [eventId]);

  const cancel = useCallback(async () => {
    if (!reservationId) return;
    try {
      setSubmitting(true);
      await eventsApi.cancelReservation(reservationId);
      setReservationId(null);
      toast.success('Registration cancelled');
    } catch {
      toast.error('Failed to cancel registration');
    } finally {
      setSubmitting(false);
    }
  }, [reservationId]);

  return {
    isRegistered: !!reservationId,
    checking,
    submitting,
    register,
    cancel,
  };
};
