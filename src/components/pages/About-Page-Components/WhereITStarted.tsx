"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AboutImages } from '@/assets';
import AnimatedSection from './animated-section';

const WhereITStarted = () => {
  const t = useTranslations("AboutPage.whereItStarted");

  return (
    <AnimatedSection
      id='where-it-started'
      className='relative flex max-md:flex-col items-start justify-between gap-10 lg:gap-32 pt-8 md:pb-[134px] pb-10'
    >

      <div className='absolute left-0 inset-y-0 flex w-[0.938rem] max-md:hidden'>
        <div className="flex justify-center flex-[1]">
          <div className="w-[1px] bg-dark"></div>
        </div>
      </div>

      <div className='w-[35%] max-md:w-full'>
        <div className='md:mt-4 md:pl-10 relative'>
          <div className="max-md:hidden absolute left-0 top-4 size-[0.938rem] bg-white rounded-full border-[0.5px] border-text-color  flex justify-center items-center">
            <div className='bg-text-color rounded-full size-[0.688rem] border-0'></div>
          </div>

          <span className='text-sm text-secondary urbanist-font mb-2 inline-block max-md:w-full max-md:text-center'>
            {t('eyebrow')}
          </span>
          <h3 className='timeline-title text-[1.625rem] leading-[1.875rem] font-semibold nohemi-font max-md:text-center'>
            {t.rich('title', { br: () => <br /> })}
          </h3>
        </div>
      </div>

      <article className='w-full space-y-8'>
        <div className='w-full rounded-[30px] border-secondary border-[5px] overflow-hidden max-h-[350px]'>
          <Image src={AboutImages.peopleTogether} alt='' className='object-fill w-full h-full grayscale hover:grayscale-[85%] transition-all' />
        </div>

        <div className='space-y-4'>
          <h2 className='text-[32px] leading-[35px] nohemi-font font-bold'>
            {t('subtitle')}
          </h2>
          <p className='text-text-color text-base urbanist-font'>
            {t('body')}
          </p>
        </div>
      </article>
    </AnimatedSection>
  );
};

export default WhereITStarted;
