import { Badge, Button } from './layout';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';
import { cn } from '../utils/constants';

interface EventCardProps {
  discoverMore?: boolean;
  className?: string;
}
const EventCard = ({ discoverMore=false, className }: EventCardProps) => {
  return (
    <div className={cn('max-w-96 h-[350px] w-full shadow-outline shadow-xl rounded-[30px] px-5 py-5 flex flex-col justify-between border-[1.5px] border-primary shrink-0',
      className,
      {
        "green-backbg justify-center items-center": discoverMore
      }
    )}>
      {!discoverMore ? (
        <>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-primary nohemi-font font-semibold text-2xl'>Model-View-Template Harmony: Django Workshop for Comprehensive Web Development</h1>
            <div className='flex justify-start items-center gap-x-2.5'>
              <Badge backgroundColor='bg-[#D6ECE2]' className='text-primary rounded-[10px] py-1'>architecture</Badge>
              <Badge backgroundColor='bg-[#D6ECE2]' className='text-primary rounded-[10px] py-1'>mvt</Badge>
              <Badge backgroundColor='bg-[#D6ECE2]' className='text-primary rounded-[10px] py-1'>web</Badge>
            </div>
          </div>
          <Link to="#" className='w-fit flex items-center gap-x-2 urbanist-font text-xl text-secondary py-1 px-2 font-medium'>
              View Event
              <GoArrowUpRight className='w-6 h-6' />
          </Link>
        </>
      ) : (
        <>
          <div className='space-y-12'>
            <h1 className="text-center text-white nohemi-font font-semibold text-2xl">Discover more events from the community</h1>
            <Link to="#" className='block w-full'>
              <Button backgroundColor='bg-white' className='py-4 flex justify-center items-center gap-x-2.5 text-primary w-full'>
                View More
                <GoArrowUpRight className='w-6 h-6' />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default EventCard