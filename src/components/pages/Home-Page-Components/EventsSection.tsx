import { EventCard } from '@/components';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';
import { motion } from 'framer-motion';
import { fadeUp, revealOnce, staggerContainer } from './motion';

const cardsStagger = staggerContainer(0.08);

const EventsSection = () => {
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
        <motion.div variants={fadeUp} className="shrink-0"><EventCard /></motion.div>
        <motion.div variants={fadeUp} className="shrink-0"><EventCard /></motion.div>
        <motion.div variants={fadeUp} className="shrink-0 max-md:hidden"><EventCard /></motion.div>
        <motion.div variants={fadeUp} className="shrink-0 max-md:hidden"><EventCard /></motion.div>
        <motion.div variants={fadeUp} className="shrink-0 max-md:hidden"><EventCard /></motion.div>
        <motion.div variants={fadeUp} className="shrink-0 max-md:hidden"><EventCard /></motion.div>
        <motion.div variants={fadeUp} className="shrink-0 max-md:hidden"><EventCard /></motion.div>
        <motion.div variants={fadeUp} className="shrink-0"><EventCard discoverMore /></motion.div>
      </motion.div>
    </div>
  );
};

export default EventsSection;
