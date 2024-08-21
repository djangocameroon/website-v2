import { AvatarUsers } from '../..';
import { HomeImages } from '../../../assets';
import { Badge, Button } from '../../layout';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from "react-icons/go";


const YoutubeSection = () => {
  const { bird, connect, whyJoin } = HomeImages;
  return (
    <div>
      <div className='py-20 flex justify-center items-start flex-wrap md:flex-nowrap gap-x-36'>
        <div className='w-full max-w-2xl mt-11'>
          <h2 className='text-primary text-3xl lg:text-[32px] nohemi-font font-bold leading-9'>
            Empowering Learning Through YouTube <br className='hidden lg:block' /> Tutorials
          </h2>

          <p className='leading-6 urbanist-font mt-4 mb-3'>
            Our YouTube channel is your passport to Django expertise. Dive into
            a world of friendly tutorials that make web development a breeze.
            Whether you're starting fresh or leveling up, we're here to guide
            you every step of the way. Let's learn, create, and inspire
            together!
          </p>

          <Button outline={false} backgroundColor='bg-primary'>Consider getting started now</Button>

          <div className='flex items-center flex-wrap gap-4'>
            <Badge>1.3k subscribers</Badge>
            <Badge>20+ videos</Badge>
            <Badge>1M+ views</Badge>
            <Badge>10+ playlists</Badge>
            <Badge>Source code links</Badge>
            <Badge>7d/24h active support</Badge>
          </div>
        </div>
        <div className='w-full'>
          {/* <div className='border-4 border-dashed border-secondary rounded-lg p-2'>
            <img
              src={HomeImages.channel}
              alt='channel'
              className='rounded-lg'
            />
          </div> */}
          <div className='flex flex-col justify-center items-start gap-y-7'>
            <div className='bg-secondary/10 rounded-[30px] space-y-4 p-5 w-[500px]'>
              <div className='flex items-center gap-5'>
                <img src={whyJoin} alt='' className='w-12' />
                <h3 className='text-text-color nohemi-font font-semibold text-2xl'>Why Joining?</h3>
              </div>
              <p className='text-base text-text-color urbanist-font'>
                Join Django Cameroon to connect, learn, and grow with fellow
                passionate developers. Together, we empower dreams and make
                coding an inspiring journey!
              </p>
              <AvatarUsers />
            </div>

            <div className='bg-secondary/10 rounded-[30px] space-y-4 p-5 ml-auto w-[500px]'>
              <div className='flex items-center gap-5 mb-3'>
                <img src={connect} alt='' className='w-10' />
                <p className='text-text-color nohemi-font font-semibold text-2xl'>Connect & Learn</p>
              </div>
              <p className='text-base text-text-color urbanist-font'>
              Learn, grow, and code together with fellow passionate developers.
              Together, we empower dreams and make coding an inspiring journey!
              </p>
              <img src={bird} alt='avatars' className='ml-auto'/>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='relative '>
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
      </div> */}
      <div className='h-fit'>
        <div className='text-center mb-7'>
          <h2 className='mx-auto w-fit nohemi-font font-bold text-3xl'>
            Still doubting on where and how to get <br className="max-md:hidden" />
            started with Django? Doubt no more!</h2>
          <Link to="#" className='mx-auto w-fit flex items-center gap-x-2 urbanist-font text-xl text-secondary py-1 px-2 border-b border-b-secondary'>
            View all Tutorials
            <GoArrowUpRight className='w-6 h-6' />
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(3,_minmax(24rem,_3fr))] gap-5">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className={`border rounded-[28px] h-[300px] ${index%2 === 0 ? "border-secondary bg-secondary-light" : "border-primary bg-primary-light"}`}></div>
          ))}
        </div>
        <div className="h-[300px] transform -translate-y-[80%] relative">
          {/* <div className="blur-[75px] z-0 bg-white inset-0 absolute"/> */}
          <div className="w-full bg-gradient-to-b absolute bottom-0 left-0 from-transparent to-white via-white   inset-0 z-0" />
          <Button
            outline={false}
            backgroundColor='bg-secondary'
            spacing={false}
            className='mt-[167px] z-20 absolute left-1/2 transform -translate-x-1/2'
          >
            View videos catalogue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default YoutubeSection