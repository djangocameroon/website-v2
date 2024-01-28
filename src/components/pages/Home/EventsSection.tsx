import { EventCard } from '../../../components';


const EventsSection = () => {
  const next = 'next'
  return (
    <div className='mt-24'>
      <div>
        <p className='text-center text-text-color/70 mb-2 text-xl'>
          {' '}
          Going through projects might be a bit confusing...
        </p>
        <h3 className='text-center text-primary text-4xl font-semibold'>
          You are welcome at our {next} events
        </h3>
      </div>
      <div className=''>
        <div className='mt-10 flex justify-center items-center gap-8'>
          <button className='text-lg rounded-full bg-secondary/20 border border-secondary cursor-pointer text-secondary flex justify-center items-center py-2 px-4'>
            Quick Peek
          </button>
          <button className='text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-4'>
            Workshops
          </button>
          <button className='text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-4'>
            Talks
          </button>
          <button className='text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-4'>
            Online
          </button>
          <button className='text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-4'>
            In-person
          </button>
        </div>
      </div>

      <div className='mt-6 flex justify-start flex-wrap items-center gap-4'>
        <EventCard />
      </div>
    </div>
  );
}

export default EventsSection