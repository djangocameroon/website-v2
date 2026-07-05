import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';
import { motion } from 'framer-motion';
import { EventCard } from '@/components/pages/Event-Page-Components';
import { Button } from '@/components/layout';
import { useEvents } from '@/hooks/useEvents';
import { EventFilters } from '@/types/events';
import { cn } from '@/utils/constants';
import { fadeUp, revealOnce, staggerContainer } from './motion';

const cardsStagger = staggerContainer(0.08);
const SKELETON_COUNT = 7;

// Static reference so useEvents' effect doesn't refetch on every render.
const HOME_EVENTS_FILTERS: EventFilters = { upcoming: true, page_size: SKELETON_COUNT };

const EventCardSkeleton = () => (
  <div className="h-[350px] w-full max-w-96 shrink-0 animate-pulse overflow-hidden rounded-[30px] border-[1.5px] border-primary/10">
    <div className="aspect-[16/10] w-full bg-primary/10" />
    <div className="flex flex-col gap-3 px-5 py-4">
      <div className="h-5 w-3/4 rounded-full bg-primary/10" />
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full bg-primary/10" />
        <div className="h-6 w-16 rounded-full bg-primary/10" />
      </div>
      <div className="h-5 w-24 rounded-full bg-primary/10" />
    </div>
  </div>
);

const EventsDiscoverMoreCard = () => (
  <div className="green-backbg flex h-[350px] w-full max-w-96 shrink-0 flex-col items-center justify-center rounded-[30px] border-[1.5px] border-primary px-5 py-5 shadow-outline shadow-xl transition-transform duration-300 hover:-translate-y-1">
    <div className="space-y-12">
      <h1 className="text-center text-white nohemi-font font-semibold text-2xl">
        Discover more events from the community
      </h1>
      <Link to="/events" className="block w-full">
        <Button backgroundColor="bg-white" className="py-4 flex justify-center items-center gap-x-2.5 text-primary w-full">
          View More
          <GoArrowUpRight className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  </div>
);

const EventsSection = () => {
  const { events, loading, error } = useEvents(HOME_EVENTS_FILTERS);
  const showEmptyState = !loading && (error !== null || events.length === 0);

  return (
    <div className='mt-24'>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealOnce}
        variants={fadeUp}
        className='text-center mb-1.5'
      >
        <p className='text-grey mb-2 text-xl urbanist-font font-medium'>
          {' '}
          Going through projects might be a bit confusing...
        </p>
        <h3 className='text-primary text-3xl font-bold nohemi-font'>
          You are welcome at our &#123;next&#125; events
        </h3>
        <Link to="/events" className='mx-auto w-fit flex items-center gap-x-2 urbanist-font text-xl text-secondary py-1 px-2 border-b border-b-secondary'>
          View all events
          <GoArrowUpRight className='w-6 h-6' />
        </Link>
      </motion.div>

      <motion.div
        variants={cardsStagger}
        initial="hidden"
        whileInView="visible"
        viewport={revealOnce}
        className='mt-6 flex justify-center flex-wrap items-center gap-5'
      >
        {loading &&
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <motion.div key={index} variants={fadeUp} className={cn('sm:shrink-0', index >= 2 && 'max-md:hidden')}>
              <EventCardSkeleton />
            </motion.div>
          ))}

        {!loading && !showEmptyState &&
          events.map((event, index) => (
            <motion.div key={event.id} variants={fadeUp} className={cn('sm:shrink-0', index >= 2 && 'max-md:hidden')}>
              <EventCard event={event} className="h-[350px]" />
            </motion.div>
          ))}

        <motion.div variants={fadeUp} className="sm:shrink-0">
          <EventsDiscoverMoreCard />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventsSection;
