"use client";

import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from 'react-icons/go';
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlineGlobeAlt, HiOutlineMapPin } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/constants';
import { EventCommunity, EventItem } from '@/types/events';

interface EventCardProps {
  event: EventItem;
  className?: string;
}

const communityBadgeStyles: Record<EventCommunity, string> = {
  'Django Cameroon': 'bg-primary/10 text-primary',
  'Django Girls Cameroon': 'bg-secondary/10 text-secondary',
};

const EventImagePlaceholder = () => (
  <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary/50">
    <HiOutlineCalendarDays className="size-10 text-white/50" />
  </div>
);

const EventCard = ({ event, className }: EventCardProps) => {
  const t = useTranslations('EventsPage.card');
  const isOnline = event.type === 'Online';
  const locationLabel = isOnline
    ? t('online')
    : event.location_data?.name || event.location_data?.city?.name || t('locationTba');
  const dateTimeLabel = new Date(event.date).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div
      className={cn(
        'group flex h-full w-full max-w-96 shrink-0 flex-col overflow-hidden rounded-[30px] border-[1.5px] border-primary shadow-outline shadow-xl transition-transform duration-300 hover:-translate-y-1',
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary">
        {event.thumbnail ? (
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <EventImagePlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        <h1 className="line-clamp-2 text-2xl font-semibold text-primary nohemi-font">
          {event.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium urbanist-font',
              communityBadgeStyles[event.for_community]
            )}
          >
            {event.for_community}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-grey/10 px-3 py-1 text-xs font-medium text-grey urbanist-font">
            {isOnline ? (
              <HiOutlineGlobeAlt className="size-3.5" />
            ) : (
              <HiOutlineMapPin className="size-3.5" />
            )}
            <span className="line-clamp-1">{locationLabel}</span>
          </span>
        </div>

        <span className="flex items-center gap-1.5 text-sm text-grey urbanist-font">
          <HiOutlineClock className="size-4 shrink-0" />
          <span className="line-clamp-1">{dateTimeLabel}</span>
        </span>

        <Link
          href={`/events/${event.slug}`}
          className="mt-auto flex w-fit items-center gap-x-2 py-1 text-xl font-medium text-secondary urbanist-font transition-colors duration-200 hover:text-secondary/80"
        >
          {t('viewEvent')}
          <GoArrowUpRight className="size-6 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
