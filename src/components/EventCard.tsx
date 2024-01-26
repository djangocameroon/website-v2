import { Badge, Button } from './layout';
import { HomeImages } from '../assets';
import { FaArrowRightLong } from 'react-icons/fa6';

const EventCard = () => {
  return (
    <div className='w-full shadow-outline shadow-lg px-4 py-5'>

        <div className='flex items-start gap-4'>
          <div className='w-3/6'>
            <div className='flex mb-12 justify-start items-center gap-4'>
              <Badge>architecture</Badge>
              <Badge>mvt</Badge>
              <Badge>web</Badge>
            </div>
            <h3 className='text-primary font-semibold text-xl md:text-2xl'>
              Model-View-Template Harmony: Django Workshop for Comprehensive Web
              Development
            </h3>
            <p className='font-light py-4 md:text-lg'>
              Explore the synergy of Django's Model-View-Template architecture
              in this comprehensive workshop, perfect for developers aiming for
              full-stack expertise.
            </p>

            <div className='flex flex-wrap gap-4 items-center pb-4'>
              <Badge>
                <p>Hilton hotel, Central post, Yaounde</p>
              </Badge>
              <Badge>
                <p>3:00 pm WAT, (GMT+1)</p>
              </Badge>
              <Badge>
                <p>Sept. 20 2023</p>
              </Badge>
            </div>
            <Button backgroundColor='bg-primary' outline={false}>
              RSVP and get a ticket
            </Button>
            <span>1 day left</span>

            <div className='flex justify-start items-center gap-3 mt-12'>
              <p className='text-text-color/80 text-sm font-bold'>Read More</p>
              <FaArrowRightLong className='text-sm text-text-color' />
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='w-72 rounded-lg h-16 relative  flex justify-center items-center overflow-hidden'>
              <img
                src={HomeImages.projectBg}
                alt='projectbg'
                className='absolute object-contain'
              />
            </div>
            <img src={HomeImages.mankaa} alt='' className='w-80' />
            <Badge>
              <div>MankaaChe</div>
            </Badge>
          </div>
        </div>

    </div>
  );
}

export default EventCard