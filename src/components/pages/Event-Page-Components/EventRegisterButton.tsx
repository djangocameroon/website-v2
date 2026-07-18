"use client";

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/layout';
import { useAuth } from '@/components/contexts/auth-context';
import { useEventReservation } from '@/hooks/useEventReservation';

const EventRegisterButton = ({ eventId }: { eventId: string }) => {
  const t = useTranslations('EventsPage.register');
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { isRegistered, checking, submitting, register, cancel } = useEventReservation(eventId);

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.custom((toastItem) => (
        <div
          className={`${
            toastItem.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto p-4 ring-1 ring-black ring-opacity-5`}
        >
          <p className="text-sm font-medium text-gray-900">{t('loginRequired')}</p>
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
      {submitting ? t('pleaseWait') : isRegistered ? t('cancelRegistration') : t('register')}
    </Button>
  );
};

export default EventRegisterButton;
