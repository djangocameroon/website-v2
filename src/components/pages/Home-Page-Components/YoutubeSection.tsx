import { AvatarUsers } from '../..';
import { HomeImages } from '../../../assets';
import { Badge, Button } from '../../layout';
import { Link } from 'react-router-dom';
import { BiSolidMoviePlay } from 'react-icons/bi';


const YoutubeSection = () => {
  return (
    <div>
      <div className='py-20 flex justify-center items-start flex-wrap md:flex-nowrap  gap-10'>
        <div className='w-full md:w-[40%]'>
          <h2 className='text-primary text-3xl lg:text-4xl font-semibold leading-normal'>
            Empowering Learning <br className='hidden lg:block' /> Through
            YouTube <br className='hidden lg:block' /> Tutorials
          </h2>

          <p className='text-xl leading-relaxed mt-5 mb-6'>
            Our YouTube channel is your passport to Django expertise. Dive into
            a world of friendly tutorials that make web development a breeze.
            Whether you're starting fresh or leveling up, we're here to guide
            you every step of the way. Let's learn, create, and inspire
            together!
          </p>

          <Button outline={false} backgroundColor='bg-secondary'>
            <p className='py-1 '>Consider getting started now</p>
          </Button>

          <div className='flex items-center flex-wrap gap-4 mt-10'>
            <Badge>1.3k subscribers</Badge>
            <Badge>20+ videos</Badge>
            <Badge>1M+ views</Badge>
            <Badge>10+ playlists</Badge>
            <Badge>Source code links</Badge>
            <Badge>7d/24h active support</Badge>
          </div>
        </div>
        <div className='w-full md:w-[60%]'>
          <div className='border-4 border-dashed border-secondary rounded-lg p-2'>
            <img
              src={HomeImages.channel}
              alt='channel'
              className='rounded-lg'
            />
          </div>
          <div className='flex flex-col lg:flex-row justify-center items-start gap-7'>
            <div className=' border-4 border-dashed border-secondary rounded-lg p-2 mt-4'>
              <div className='flex items-center gap-5'>
                <img src={HomeImages.whyJoin} alt='' className='w-12' />
                <p className='text-text-color text-xl'>Why Join?</p>
              </div>
              <p className='text-sm text-text-color mb-3'>
                Join Django Cameroon to connect, learn, and grow with fellow
                passionate developers. Together, we empower dreams and make
                coding an inspiring journey!
              </p>
              <AvatarUsers />
            </div>

            <div className=' border-4 border-dashed border-secondary rounded-lg p-2 mt-4'>
              <div className='flex items-center gap-5 mb-3'>
                <img src={HomeImages.connect} alt='' className='w-10' />
                <p className='text-text-color text-xl'>Connect & Learn</p>
              </div>
              <p className='text-sm text-text-color mb-3'>
                Join Django Cameroon to connect, learn, and grow with fellow
                passionate developers. Together, we empower dreams and make
                coding an inspiring journey!
              </p>
              <AvatarUsers />
            </div>
          </div>
        </div>
      </div>

      <div className='relative '>
        <div className='green-backbg z-[1000] overflow-hidden bg-no-repeat py-3 md:py-5 bg-center bg-cover w-full h-full md:px-8 px-2 rounded-lg'>
          <p className='text-2xl md:text-3xl text-white mt-8 font-semibold'>
            Still doubting on where and how to get started with Django? Doubt no
            more!
          </p>
          <div className='flex flex-wrap-reverse lg:flex-nowrap justify-start items-center gap-7'>
            <div className='mt-10 w-full lg:w-[40%]'>
              <div className='w-full'>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    1. Starting my Django journey
                  </p>
                </Link>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    2. Setting up my environment
                  </p>
                </Link>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    3. Django MVT architecture
                  </p>
                </Link>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    4. Models, Views & Templates
                  </p>
                </Link>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    5. Basic TODO app
                  </p>
                </Link>
              </div>
              <Link to='/' className=' w-[23em] z-[200] '>
                <div className='flex gap-4 text-white  justify-start rounded-lg items-center py-3 px-5 bg-secondary mb-3 w-full'>
                  <BiSolidMoviePlay size='25' className='text-white' />
                  <p className='text-lg font-semibold  '>See more videos</p>
                </div>
              </Link>
            </div>

            <div className='mt-10 red-bg  rounded-lg flex justify-center items-center py-6 px-10'>
              <img src={HomeImages.youtubeThumbnail} alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubeSection