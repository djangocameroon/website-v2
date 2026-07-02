import type { IconType } from 'react-icons';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MotionConfig, motion } from 'framer-motion';
import {
  HiOutlineArrowLeft,
  HiOutlineCalendarDays,
  HiOutlineComputerDesktop,
  HiOutlineEyeSlash,
  HiOutlineGlobeAlt,
  HiOutlineMapPin,
  HiOutlineTag,
} from 'react-icons/hi2';
import { useEvent } from '@/hooks/useEvent';
import { useAuth } from '@/components/contexts/auth-context';
import { Badge } from '@/components/layout';
import { PageNotFound } from '@/components';
import { EventSpeakers, EventRegisterButton } from '@/components/pages/Event-Page-Components';
import { EventCommunity, EventType } from '@/types/events';
import { cn } from '@/utils/constants';

const PLACEHOLDER_THUMBNAIL = 'https://placehold.co/1920x1080';

const communityBadgeStyles: Record<EventCommunity, string> = {
  'Django Cameroon': 'bg-primary text-white',
  'Django Girls Cameroon': 'bg-secondary text-white',
};

const typeMeta: Record<EventType, { icon: IconType; label: string }> = {
  Online: { icon: HiOutlineGlobeAlt, label: 'Online' },
  'In-person': { icon: HiOutlineMapPin, label: 'In-person' },
  Hybrid: { icon: HiOutlineComputerDesktop, label: 'Hybrid' },
};

const EASE = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } }),
};

const EventDetailSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="aspect-[4/3] w-full animate-pulse bg-primary/10 sm:aspect-[16/7]" />
    <main className="relative -mt-10 max-w-4xl mx-auto rounded-t-[2rem] bg-white px-6 pb-20 pt-10 sm:-mt-16 sm:px-10 sm:pt-14">
      <div className="flex gap-2">
        <div className="h-7 w-24 animate-pulse rounded-full bg-primary/10" />
        <div className="h-7 w-28 animate-pulse rounded-full bg-primary/10" />
      </div>
      <div className="mt-6 h-10 w-3/4 animate-pulse rounded-full bg-primary/10" />
      <div className="mt-8 h-16 w-full animate-pulse rounded-2xl bg-primary/10" />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full animate-pulse rounded-full bg-primary/10" />
        <div className="h-4 w-full animate-pulse rounded-full bg-primary/10" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-primary/10" />
      </div>
    </main>
  </div>
);

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { event, loading, error } = useEvent(id);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  if (loading || authLoading) {
    return <EventDetailSkeleton />;
  }

  if (error || !event) {
    return <PageNotFound />;
  }

  if (!event.published && !isAuthenticated) {
    return <PageNotFound />;
  }

  const TypeIcon = typeMeta[event.type].icon;
  const thumbnailSrc = event.thumbnail || PLACEHOLDER_THUMBNAIL;
  const locationLabel = event.location_data
    ? `${event.location_data.name}, ${event.location_data.city.name}, ${event.location_data.city.region.name}`
    : event.type === 'Online'
      ? 'Online — link shared after registration'
      : null;

  return (
    <>
      <Helmet>
        <title>{event.title} | Events - Django Cameroon</title>
        <meta name="description" content={event.description.slice(0, 160)} />
        <meta property="og:image" content={thumbnailSrc} />
      </Helmet>

      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-white">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary sm:aspect-[16/7]">
            <img
              src={thumbnailSrc}
              alt={event.title}
              fetchPriority="high"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

            <Link
              to="/events"
              className="absolute max-sm:hidden flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/50 sm:left-6 sm:top-24"
            >
              <HiOutlineArrowLeft className="size-4" />
              <span className="urbanist-font text-sm font-semibold">Back to events</span>
            </Link>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="absolute max-sm:hidden inset-x-4 bottom-4 flex flex-wrap items-center gap-2 sm:inset-x-6 sm:bottom-6"
            >
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold urbanist-font',
                  communityBadgeStyles[event.for_community]
                )}
              >
                {event.for_community}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-dark urbanist-font">
                <TypeIcon className="size-3.5" />
                {typeMeta[event.type].label}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-dark-primary px-3 py-1 text-xs font-semibold text-primary urbanist-font">
                <HiOutlineTag className="size-3.5" />
                {event.category}
              </span>
            </motion.div>
          </div>

          <main className="relative -mt-10 max-w-4xl mx-auto rounded-t-[2rem] bg-white px-6 pb-20 pt-8 shadow-[0_-8px_30px_rgba(16,62,46,0.08)] sm:-mt-16 sm:px-10 sm:pt-10">
            {!event.published && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 urbanist-font">
                <HiOutlineEyeSlash className="size-4 shrink-0" />
                This event isn&apos;t published yet — it&apos;s only visible to you.
              </div>
            )}

            {event.tags_list.length > 0 && (
              <div className="flex gap-2.5 mb-6 flex-wrap">
                {event.tags_list.map((tag) => (
                  <Badge key={tag} backgroundColor="bg-[#D9E7FF]" className="text-secondary rounded-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.05}
              className="text-3xl md:text-5xl font-bold nohemi-font text-primary leading-tight mb-6"
            >
              {event.title}
            </motion.h1>

            <div className="flex max-md:flex-col gap-x-8 max-md:gap-y-3 py-4 border-y border-dark/10 mb-8 urbanist-font text-dark">
              <span className="flex items-center gap-2">
                <HiOutlineCalendarDays size={20} className="shrink-0 text-primary" />
                {new Date(event.date).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
              {locationLabel && (
                <span className="flex items-center gap-2">
                  <HiOutlineMapPin size={20} className="shrink-0 text-primary" />
                  {locationLabel}
                </span>
              )}
              <span className="flex items-center gap-2">
                <TypeIcon size={20} className="shrink-0 text-primary" />
                {typeMeta[event.type].label}
              </span>
            </div>

            <p className="urbanist-font text-lg leading-relaxed text-dark mb-10 whitespace-pre-line">
              {event.description}
            </p>

            {
              (event.date && new Date(event.date) < new Date()) ? (
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 urbanist-font">
                  <HiOutlineEyeSlash className="size-4 shrink-0" />
                  This event has already taken place.
                </div>
              ) : (<EventRegisterButton eventId={event.id} />)
            }
            <EventSpeakers speakers={event.speakers_data} />
          </main>
        </div>
      </MotionConfig>
    </>
  );
};

export default EventDetail;
