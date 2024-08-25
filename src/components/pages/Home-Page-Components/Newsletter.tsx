import { Badge, Button } from '../../layout'
import { AiOutlineSend } from 'react-icons/ai';
import { HomeImages } from '../../../assets';


const Newsletter = () => {
  const { blueBgInitials } = HomeImages;
  return (
    <>
      <div className='bg-secondary mt-20 rounded-[3.125rem] bluelightbg h-[500px] relative'>
        <img src={blueBgInitials} alt="" className='' />
        <div className='absolute inset-0 pr-[100px] flex justify-end items-center'>
          <div className='text-white w-[750px] text-right'>
            <h1 className='nohemi-font font-bold text-5xl text-right'>Not that it&apos;s now or never but don&apos;t miss such opportunity.</h1>
            <Button className='w-fit bg-secondary mt-7' spacing={false}>Join the community</Button>
          </div>
          
        </div>
        {/* <p className='text-xl md:text-3xl w-full px-2 md:px-0 md:w-[60%] text-center mx-auto font-semibold text-white'>
          Not that it’s now or never but don’t miss such opportunity.
        </p>
        <div className='flex md:flex-row flex-col items-center justify-center gap-10 mt-8  '>
          <Button outline={false} backgroundColor='bg-white'>
            <p className='text-primary py-1'>Get Started</p>
          </Button>

        </div> */}
      </div>
      <div className='flex md:w-[90%] mx-auto flex-wrap md:justify-between sm:flex-nowrap w-full my-12'>
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
    </>
  );
}

export default Newsletter