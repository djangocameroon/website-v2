import { Badge, Button } from './layout';
import { HomeImages } from '../assets';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';
import {
  MdOutlineLocationOn,
  MdCalendarMonth,
  MdAccessTime,
} from 'react-icons/md';

const EventCard = () => {
  return (
    <div className='max-w-[80%] w-[80%] shadow-outline shadow-xl rounded-lg px-4 py-5'>
      <div className='flex justify-between items-start gap-4'>
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
            Explore the synergy of Django's Model-View-Template architecture in
            this comprehensive workshop, perfect for developers aiming for
            full-stack expertise.
          </p>

          <div className='flex flex-wrap gap-4 items-center pb-4 mt-3'>
            <Badge>
              <div className='flex items-center gap-2'>
                <MdOutlineLocationOn className='text-secondary' />
                <p className='text-sm'>Hilton hotel, Central post, Yaounde</p>
              </div>
            </Badge>
            <Badge>
              <div className='flex items-center gap-2'>
                <MdAccessTime className='text-secondary' />
                <p className='text-sm'>3:00 pm WAT, (GMT+1)</p>
              </div>
            </Badge>
            <Badge>
              <div className='flex items-center gap-2'>
                <MdCalendarMonth className='text-secondary' />
                <p className='text-sm'>Sept. 20 2023</p>
              </div>
            </Badge>
          </div>
          <Button backgroundColor='bg-primary' outline={false}>
            RSVP and get a ticket
          </Button>
          <span className='ml-3'>(1 day left)</span>

          <div className='flex justify-start items-center gap-3 mt-5'>
            <p className='text-text-color/80 text-sm font-bold'>Read More</p>
            <FaArrowRightLong className='text-sm text-text-color' />
          </div>
        </div>
        <div className='flex flex-col items-center gap-6 cursor-pointer'>
          <div className='w-72 rounded-lg h-16 relative  flex justify-center items-center overflow-hidden'>
            <img
              src={HomeImages.projectBg}
              alt='projectbg'
              className='absolute object-contain'
            />
          </div>
          <img src={HomeImages.mankaa} alt='' className='w-80' />
          <div className='flex justify-center items-center gap-3'>
            <Badge outline={true}>
              <div className='flex items-center gap-2'>
                <FaRegUserCircle className='text-secondary' size='28' />
                <div>
                  <p className='text-base'>MankaaChe</p>
                  <p className='text-sm'>@ManeBa_cnm</p>
                </div>
              </div>
            </Badge>
            <Badge outline={true}>
              <FiTwitter className='text-secondary' />
            </Badge>
            <Badge outline={true}>
              <SlSocialLinkedin className='text-secondary' />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard