"use client";

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/layout';
import { useAuth } from '@/components/contexts/auth-context';
import { useEventReservation } from '@/hooks/useEventReservation';

const EventRegisterButton = ({ eventId }: { eventId: string }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { isRegistered, checking, submitting, register, cancel } = useEventReservation(eventId);

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto p-4 ring-1 ring-black ring-opacity-5`}
        >
          <p className="text-sm font-medium text-gray-900">You need to be logged in to register for this event.</p>
        </div>
      ));
      router.push('/auth/login' + `?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    if (isRegistered) {
      cancel();
    } else {
      register();
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={checking || submitting}
      backgroundColor={isRegistered ? 'bg-white' : 'bg-primary'}
      outline={isRegistered}
      className={isRegistered ? 'text-primary' : ''}
    >
      {submitting ? 'Please wait…' : isRegistered ? 'Cancel Registration' : 'Register for Event'}
    </Button>
  );
};

export default EventRegisterButton;
