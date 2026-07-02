import { useMemo, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { HiOutlineCalendarDays, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineFaceFrown } from 'react-icons/hi2';
import {
  EventCard,
  EventDateFilter,
  EventHeader,
  EventsFilterBar,
  EventTypeFilter,
} from '@/components/pages/Event-Page-Components';
import { useEvents } from '@/hooks/useEvents';
import { cn } from '@/utils/constants';

const SKELETON_COUNT = 4;

const getEventDateStatus = (dateStr: string): 'Upcoming' | 'Ongoing' | 'Past' => {
  const eventDate = new Date(dateStr);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfEventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

  if (startOfEventDay.getTime() === startOfToday.getTime()) return 'Ongoing';
  return startOfEventDay > startOfToday ? 'Upcoming' : 'Past';
};

const EventCardSkeleton = () => (
  <div className="w-full max-w-96 shrink-0 animate-pulse overflow-hidden rounded-[30px] border-[1.5px] border-primary/10">
    <div className="aspect-[16/10] w-full bg-primary/10" />
    <div className="flex flex-col gap-3 px-5 py-5">
      <div className="h-6 w-3/4 rounded-full bg-primary/10" />
      <div className="flex gap-2">
        <div className="h-6 w-24 rounded-full bg-primary/10" />
        <div className="h-6 w-16 rounded-full bg-primary/10" />
      </div>
      <div className="h-6 w-24 rounded-full bg-primary/10" />
    </div>
  </div>
);

const Events = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<EventTypeFilter>('All');
  const [dateFilter, setDateFilter] = useState<EventDateFilter>('All');

  const filters = useMemo(() => ({ page }), [page]);
  const { events, loading, error, pagination, refetch } = useEvents(filters);

  const hasActiveFilters = search.trim() !== '' || typeFilter !== 'All' || dateFilter !== 'All';

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      if (typeFilter !== 'All' && event.type !== typeFilter) return false;
      if (dateFilter !== 'All' && getEventDateStatus(event.date) !== dateFilter) return false;

      if (query) {
        const haystack = [
          event.title,
          event.description,
          event.for_community,
          event.location_data?.name,
          event.location_data?.city?.name,
          ...event.tags_list,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [events, typeFilter, dateFilter, search]);

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('All');
    setDateFilter('All');
  };

  return (
    <div className="relative">
      <EventHeader />
      <div className="w-full md:w-[85%] mx-auto max-md:px-4">
        <section id="events-grid" className="scroll-mt-10 pt-10 pb-10">
          {loading ? (
            <div className="flex flex-wrap gap-5">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-grey urbanist-font">
                Something went wrong loading events. {error}
              </p>
              <button
                onClick={() => refetch()}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white nohemi-font transition-transform duration-300 hover:-translate-y-0.5"
              >
                Try again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <HiOutlineCalendarDays className="size-10 text-primary/40" />
              <p className="text-grey urbanist-font">No events found. Check back soon!</p>
            </div>
          ) : (
            <MotionConfig reducedMotion="user">
              <EventsFilterBar
                search={search}
                onSearchChange={setSearch}
                typeFilter={typeFilter}
                onTypeFilterChange={setTypeFilter}
                dateFilter={dateFilter}
                onDateFilterChange={setDateFilter}
              />

              {filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-20 text-center">
                  <HiOutlineFaceFrown className="size-10 text-primary/40" />
                  <p className="text-grey urbanist-font">No events match your filters.</p>
                  <button
                    onClick={clearFilters}
                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white nohemi-font transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-5">
                    <AnimatePresence mode="popLayout">
                      {filteredEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          layout
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: Math.min(index, 6) * 0.05 }}
                        >
                          <EventCard event={event} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {!hasActiveFilters && (
                    <nav
                      aria-label="Events pagination"
                      className="mt-12 flex items-center justify-center gap-3 text-sm font-medium urbanist-font"
                    >
                      <button
                        disabled={!pagination.previous}
                        onClick={() => setPage((p) => p - 1)}
                        aria-label="Previous page"
                        className={cn(
                          'flex size-9 items-center justify-center rounded-full border border-primary/20 text-primary transition-all duration-200',
                          'hover:border-primary hover:bg-primary hover:text-white',
                          'disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-300'
                        )}
                      >
                        <HiOutlineChevronLeft className="size-5" />
                      </button>
                      <span className="text-gray-400">
                        Page {pagination.current_page} of {pagination.total_pages}
                      </span>
                      <button
                        disabled={!pagination.next}
                        onClick={() => setPage((p) => p + 1)}
                        aria-label="Next page"
                        className={cn(
                          'flex size-9 items-center justify-center rounded-full border border-primary/20 text-primary transition-all duration-200',
                          'hover:border-primary hover:bg-primary hover:text-white',
                          'disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-300'
                        )}
                      >
                        <HiOutlineChevronRight className="size-5" />
                      </button>
                    </nav>
                  )}
                </>
              )}
            </MotionConfig>
          )}
        </section>
      </div>
    </div>
  );
};

export default Events;
