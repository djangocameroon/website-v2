import { HomeImages } from '../../../assets';
import { Button } from '../../layout';

const BecomeMember = () => {
  return (
    <div>
      <div id='#about' className='about-bg bg-image-styles w-full'>
        <div className='flex px-4 sm:px-10 md:px-0 bg-cover justify-center flex-wrap md:flex-nowrap gap-12 py-6 items-center w-full h-full'>
          <div className='hidden md:block md:w-[350px]'>
            <img
              src={HomeImages.map}
              alt='cameroon map'
              className='w-full h-full '
            />
          </div>
          <div className='md:w-[50%]'>
            <h2 className=' text-2xl lg:text-3xl leading-normal text-white font-bold mb-4'>
              Welcome to Django Cameroon, <br className='hidden md:block' />{' '}
              Where Collaboration Fuels <br className='hidden md:block' />{' '}
              Success
            </h2>
            <p className='text-white font-light text-lg  mb-4 leading-normal'>
              Django Cameroon isn't just a community; it's your go-to hub for
              collaboration, learning, and mutual growth. We're a passionate
              collective of developers in Cameroon, united by our love for
              Django. Here, we don't just code; we inspire, help, and elevate
              each other. Whether you're a novice or a pro, we're here to share
              knowledge, tackle challenges, and build a thriving Django
              ecosystem together. Join us in this supportive journey, where we
              celebrate the spirit of camaraderie in the world of coding.
            </p>

            <div className='flex md:flex-row flex-col items-start md:items-center gap-10 mt-12'>
              <Button outline={false} backgroundColor='bg-white'>
                <p className='text-primary py-1'>Become a community member</p>
              </Button>
              <img
                src={HomeImages.arrow}
                alt='design arrow pointing to the right'
                className='hidden lg:block  h-7'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeMember;
