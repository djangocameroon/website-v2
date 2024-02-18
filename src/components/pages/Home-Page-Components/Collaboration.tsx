import { HomeImages } from '../../../assets';


const Collaboration = () => {
  return (
    <div className=' flex justify-center lg:justify-start md:flex-row flex-col items-center '>
      <div className='w-full lg:w-[60%] mt-7 lg:mt-0'>
        <h2 className='text-primary text-3xl md:text-4xl font-semibold'>
          Start Your Journey of Collaboration and Innovation
        </h2>
        <p className='text-lg mt-5 mb-4'>
          Embark on a dynamic collaborative journey with us, where knowledge
          blooms, skills soar, and innovation knows no limits. Together, let's
          shape a brighter future in web development!
        </p>
        <blockquote className='text-xs italic text-text-color/60'>
          🎩🐍 Tired of web development feeling like a medieval quest? Embrace
          Django, your code-sorcerer sidekick, and let the magic of ORM, admin
          panels, and security spells turn your web projects into enchanted
          experiences! ✨🪄
        </blockquote>
      </div>
      <div className='hidden lg:block'>
        <img src={HomeImages.spaceShip} alt='' />
      </div>
    </div>
  );
}

export default Collaboration;