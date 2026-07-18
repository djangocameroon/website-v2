"use client";

import Image from "next/image";
import { Badge, Button } from '@/components/layout'
import { AiOutlineSend } from 'react-icons/ai';
import { useTranslations } from 'next-intl';
import { HomeImages } from '@/assets';


const JoinUs = () => {
  const tc = useTranslations('Common');
  const { blueBgInitials } = HomeImages;
  return (
    <div>
      <div className='bg-secondary rounded-[3.125rem] p-3 max-md:px-7 bluelightbg h-[400px] md:h-[400px] max-md:h-[250px] relative overflow-hidden'>
        <Image src={blueBgInitials} alt="" className='max-md:hidden relative z-0' />
        <div className='absolute inset-0 md:pr-[100px] max-md:px-6 flex justify-center md:justify-end items-center z-10'>
          <div className='text-white w-full max-w-[750px] md:text-right text-center'>
            <h1 className='nohemi-font font-bold text-2xl md:text-5xl text-center md:text-right max-md:leading-tight'>{tc('notNowOrNever')}</h1>
            <Button className='w-fit bg-secondary mt-5 max-md:mt-4 max-md:text-sm max-md:px-4 max-md:py-2' spacing={false}>{tc('joinCommunity')}</Button>
          </div>

        </div>
      </div>
      <div className='flex md:w-[90%] mx-auto flex-wrap md:justify-between sm:flex-nowrap w-full my-12 max-md:my-8 gap-y-6 max-md:gap-y-4 relative z-20 max-md:px-4'>
        <div className='max-w-2xl w-full space-y-1.5 max-md:space-y-2'>
          <p className='nohemi-font font-semibold text-2xl max-md:text-lg'>
            {tc('newsletter.blurb')}
          </p>
          <div className='flex gap-3 justify-start items-center gap-x-2.5 max-md:gap-x-2 flex-wrap'>
            <Badge className='max-md:text-xs max-md:px-2 max-md:py-1'>{tc('newsletter.badges.article')}</Badge>
            <Badge className='max-md:text-xs max-md:px-2 max-md:py-1'>{tc('newsletter.badges.projects')}</Badge>
            <Badge className='max-md:text-xs max-md:px-2 max-md:py-1'>{tc('newsletter.badges.tutorial')}</Badge>
            <Badge className='max-md:text-xs max-md:px-2 max-md:py-1'>{tc('newsletter.badges.news')}</Badge>
          </div>
        </div>
        <div className='max-w-xl w-full p-2.5 max-md:p-2 border-2 border-black rounded-[30px] max-md:rounded-[20px]'>
          <form className='px-[20px] max-md:px-[12px] py-[25px] max-md:py-[15px] rounded-[20px] max-md:rounded-[15px] flex justify-between bg-[#677C72]/[8%] h-full items-center'>
          <input
            type='text'
            placeholder={tc('newsletter.emailPlaceholder')}
            className='w-4/5 h-5 bg-transparent focus:outline-none urbanist-font text-lg max-md:text-sm placeholder:text-base max-md:placeholder:text-sm flex justify-center items-center'
          />
          <button type='submit' className=''>
            <AiOutlineSend size='25' className='w-5 h-5 max-md:w-4 max-md:h-4' />
          </button>
        </form>
        </div>
        
      </div>
    </div>
  );
}

export default JoinUs