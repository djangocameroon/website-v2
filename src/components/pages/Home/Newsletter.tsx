import { HomeImages } from '../../../assets';
import { Badge, Button } from '../../layout'
import { AiOutlineSend } from 'react-icons/ai';


const Newsletter = () => {
  return (
    <>
      <div className='get-started bg-image-styles bg-contain mt-10 py-5 pb-8 px-10 rounded-lg'>
        <p className='text-xl md:text-3xl w-full px-2 md:px-0 md:w-[40%] font-semibold text-white'>
          Not that it’s now or never but don’t miss such opportunity.
        </p>
        <div className='flex md:flex-row flex-col items-start md:items-center gap-10 mt-8 '>
          <Button outline={false} backgroundColor='bg-white'>
            <p className='text-primary py-1'>Get Started</p>
          </Button>
          <img
            src={HomeImages.arrow}
            alt='design arrow pointing to the right'
            className='hidden lg:block  h-7'
          />
        </div>
      </div>
      <div className='flex items-start pb-20  md:w-[90%] mx-auto flex-wrap gap-3 sm:flex-nowrap w-full mt-8'>
        <div className=' w-full'>
          <p>
            And also make sure to join our newsletter to remain updated about
            the community.
          </p>
          <div className='flex gap-3 justify-start items-center mt-4'>
            <Badge>Article</Badge>
            <Badge>Projects</Badge>
            <Badge>Tutorial</Badge>
          </div>
        </div>
        <form className='relative w-full'>
          <input
            type='text'
            placeholder='Enter you email'
            className='py-3 focus:border-secondary px-3 w-full rounded-full bg-secondary/10 border-secondary border-2 focus:outline-none placeholder:text-secondary'
          />
          <button type='submit' className='absolute top-3 px-6 right-0'>
            <AiOutlineSend size='25' className='text-secondary' />
          </button>
        </form>
      </div>
    </>
  );
}

export default Newsletter