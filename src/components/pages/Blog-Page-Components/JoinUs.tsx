import { Badge, Button } from '@/components/layout'
import { AiOutlineSend } from 'react-icons/ai';
import { HomeImages } from '@/assets';


const JoinUs = () => {
  const { blueBgInitials } = HomeImages;
  return (
    <div>
      <div className='bg-secondary rounded-[3.125rem] bluelightbg h-[400px] relative overflow-hidden'>
        <img src={blueBgInitials} alt="" className='max-md:hidden relative z-0' />
        <div className='absolute inset-0 md:pr-[100px] max-md:px-2 flex justify-center md:justify-end items-center z-10'>
          <div className='text-white w-full max-w-[750px] md:text-right text-center'>
            <h1 className='nohemi-font font-bold text-3xl md:text-5xl text-center md:text-right'>Not that it&apos;s now or never but don&apos;t miss such opportunity.</h1>
            <Button className='w-fit bg-secondary mt-7 max-md:mt-4' spacing={false}>Join the community</Button>
          </div>

        </div>
      </div>
      <div className='flex md:w-[90%] mx-auto flex-wrap md:justify-between sm:flex-nowrap w-full my-12 gap-y-1 relative z-20'>
        <div className='max-w-2xl w-full space-y-1.5'>
          <p className='nohemi-font font-semibold text-2xl'>
            And also make sure to join our newsletter to remain updated about
            the community.
          </p>
          <div className='flex gap-3 justify-start items-center gap-x-2.5'>
            <Badge>article</Badge>
            <Badge>projects</Badge>
            <Badge>tutorial</Badge>
            <Badge>news</Badge>
          </div>
        </div>
        <div className='max-w-xl w-full p-2.5 border-2 border-black rounded-[30px]'>
          <form className='px-[20px] py-[25px] rounded-[20px] flex justify-between bg-[#677C72]/[8%] h-full items-center'>
          <input
            type='text'
            placeholder='Enter you email'
            className='w-4/5 h-5 bg-transparent focus:outline-none urbanist-font text-lg placeholder:text-base flex justify-center items-center'
          />
          <button type='submit' className=''>
            <AiOutlineSend size='25' className='w-5 h-5' />
          </button>
        </form>
        </div>
        
      </div>
    </div>
  );
}

export default JoinUs