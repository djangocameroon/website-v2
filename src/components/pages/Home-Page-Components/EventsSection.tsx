import { EventCard } from '../..';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

const EventsSection = () => {
  return (
    <div className='mt-24'>
      <div className='text-center mb-1.5'>
        <p className='text-grey mb-2 text-xl urbanist-font font-medium'>
          {' '}
          Going through projects might be a bit confusing...
        </p>
        <h3 className='text-primary text-3xl font-bold nohemi-font'>
          You are welcome at our &#123;next&#125; events
        </h3>
        <Link to="#" className='mx-auto w-fit flex items-center gap-x-2 urbanist-font text-xl text-secondary py-1 px-2 border-b border-b-secondary'>
          View all events
          <GoArrowUpRight className='w-6 h-6' />
        </Link>
      </div>

      <div className='mt-6 flex justify-start flex-wrap items-center gap-5'>
        {Array.from({ length: 8 }, (_, index) => (
          <EventCard key={index} discoverMore={index===7} />
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
