import { motion, MotionConfig } from 'framer-motion';
import { HiOutlineChevronDown, HiOutlineGlobeAlt, HiOutlineMapPin } from 'react-icons/hi2';
import { cn } from '@/utils/constants';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const EventHeaderScene = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-primary">
      {/* dot-grid "map" pattern */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* ambient glows */}
      <div className="absolute -top-24 right-[-10%] size-[26rem] rounded-full bg-secondary/25 blur-[110px] motion-safe:animate-pulse [animation-duration:6s]" />
      <div className="absolute bottom-[-15%] left-[-10%] size-[24rem] rounded-full bg-dark-primary/20 blur-[110px] motion-safe:animate-pulse [animation-duration:8s]" />
      {/* vignette so foreground text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
    </div>
  );
};

const LocationMarker = ({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof HiOutlineMapPin;
  label: string;
  className?: string;
}) => (
  <div className={cn('flex items-center gap-3', className)}>
    <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm">
      <Icon className="size-4 text-dark-primary" />
    </div>
    <span className="text-sm font-medium text-white/70 urbanist-font whitespace-nowrap">
      {label}
    </span>
  </div>
);

const EventHeader = () => {
  const scrollToEvents = () => {
    document.getElementById('events-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-primary">
        <EventHeaderScene />

        <div className="relative flex flex-1 items-center">
          <div className="mx-auto w-full max-w-2xl px-6 text-center lg:mx-0 lg:w-[85%] lg:max-w-none lg:px-0 lg:text-left">
            <div className="lg:pl-16">
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
                {/* connecting line + markers: encodes "in person and online" from the copy below */}
                <div className="hidden shrink-0 flex-col items-start gap-6 lg:flex">
                  <LocationMarker icon={HiOutlineMapPin} label="In person" />
                  <div className="ml-[1.125rem] h-10 w-px bg-white/25" />
                  <LocationMarker icon={HiOutlineGlobeAlt} label="Online" />
                </div>

                <div className="max-w-2xl">
                  <motion.span
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0}
                    className="block text-lg font-semibold text-secondary-light urbanist-font max-md:text-base"
                  >
                    Meet the community, in person and online
                  </motion.span>

                  <motion.h1
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0.08}
                    className="my-4 text-5xl font-bold leading-[1.05] text-white nohemi-font sm:text-6xl lg:text-7xl"
                  >
                    Upcoming <span className="text-dark-primary">#Events</span>
                  </motion.h1>

                  <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0.16}
                    className="leading-relaxed text-white/75 urbanist-font"
                  >
                    Workshops, talks, and meetups from Django Cameroon and Django Girls
                    Cameroon. Find something happening near you, or join online from
                    anywhere.
                  </motion.p>

                  {/* mobile-only markers, shown inline since the side rail is desktop-only */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0.22}
                    className="mt-6 flex items-center justify-center gap-8 lg:hidden"
                  >
                    <LocationMarker icon={HiOutlineMapPin} label="In person" />
                    <LocationMarker icon={HiOutlineGlobeAlt} label="Online" />
                  </motion.div>

                  <motion.button
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0.28}
                    onClick={scrollToEvents}
                    className="mt-10 inline-flex items-center gap-2.5 rounded-2xl bg-dark-primary px-7 py-4 text-lg font-medium text-primary nohemi-font transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
                  >
                    Browse events
                    <HiOutlineChevronDown className="size-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToEvents}
          aria-label="Scroll to the events list"
          className="relative mx-auto mb-8 flex size-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white motion-safe:animate-bounce [animation-duration:2.2s]"
        >
          <HiOutlineChevronDown className="size-5" />
        </button>
      </section>
    </MotionConfig>
  );
};

export default EventHeader;
