import { HomeImages } from '../../../assets';
import { Button } from '../../layout';

const BecomeMember = () => {
  const { blueDjango, blueMap } = HomeImages;
  return (
    <div className='relative md:mx-56'>
      <div className='absolute left-0 top-14 max-md:hidden'>
        <img src={blueDjango} alt='' className='' />
      </div>
      <div className='max-w-4xl w-full mx-auto text-center'>
        <h1 className='font-bold nohemi-font text-5xl max-md:text-2xl'>
          Welcome to Django Cameroon,<br/>
          Where Collaboration Fuels Success
        </h1>
        <p className='font-light urbanist-font mt-2 md:mt-4 mb-3 text-base md:text-xl text-balance'>
          Django Cameroon isn't just a community; it's your go-to hub for
          collaboration, learning, and mutual growth. We're a passionate
          collective of developers in Cameroon, united by our love for
          Django. Here, we don't just code; we inspire, help, and elevate
          each other. Whether you're a novice or a pro, we're here to share
          knowledge, tackle challenges, and build a thriving Django
          ecosystem together. Join us in this supportive journey, where we  
          celebrate the spirit of camaraderie in the world of coding.
        </p>
        <Button outline={false} backgroundColor='bg-primary'>
          Discover more about
        </Button>
      </div>

      <div className='absolute right-0 -bottom-4 max-md:hidden'>
        <img src={blueMap} alt='' className='' />
      </div>
    </div>
  );
};

export default BecomeMember;
