import { GoArrowUpRight } from 'react-icons/go';
import { HomeImages } from '../../../assets';
import { Button } from '../../layout';


const Collaboration = () => {
  return (
    <div className=' flex justify-center lg:justify-start md:flex-row flex-col items-center md:gap-x-28 '>
      <div className='w-full max-w-2xl mt-7 lg:mt-0'>
        <h2 className='text-primary text-2xl md:text-3xl font-bold nohemi-font'>
          Start Your Journey of Collaboration and Innovation
        </h2>
        <p className='text-base my-4 urbanist-font '>
          Embark on a dynamic collaborative journey with us, where knowledge
          blooms, skills soar, and innovation knows no limits. Together, let's
          shape a brighter future in web development!
        </p>
        <blockquote className='inline-block text-sm urbanist-font my-3 text-text-color/60 pl-2.5 border-l-[3px] border-primary-lighter'>
          🎩🐍{" "}Tired of web development feeling like a medieval quest? Embrace
          Django, your code-sorcerer sidekick, and let the magic of ORM, admin
          panels, and security spells turn your web projects into enchanted
          experiences! ✨🪄
        </blockquote>
        <Button className='py-2.5 px-5 flex gap-x-2.5 urbanist-font justify-center items-center text-xl'>
          Join the community
          <GoArrowUpRight className='w-6 h-6' />
        </Button>
      </div>
      <div className='hidden lg:block'>
        <img src={HomeImages.teamGoals} alt='' />
      </div>
    </div>
  );
}

export default Collaboration;