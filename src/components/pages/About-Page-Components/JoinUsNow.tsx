"use client";

import { useTranslations } from "next-intl";
import { Button } from '@/components/layout';


const JoinUsNow = () => {
  const t = useTranslations("AboutPage.joinUsNow");
  const tc = useTranslations("Common");
  return (
    <>
      <h2 className='text-center font-semibold text-3xl py-4 px-10'>
        {t.rich('title', { br: () => <br className='hidden md:block' /> })}
      </h2>
      <p className='text-center text-base w-full md:w-[60%] mx-auto px-10'>
        {t('body')}
      </p>

      <div className='get-started bg-image-styles h-full bg-contain my-10 py-40 pb-20 px-5 sm:px-10 rounded-lg'>
        <p className='text-xl md:text-3xl w-[80%] md:px-0 md:w-[40%] font-semibold text-white'>
          {tc('notNowOrNever')}
        </p>
        <div className='flex md:flex-row flex-col items-start md:items-center gap-10 mt-8 '>
          <Button outline={false} backgroundColor='bg-white'>
            <p className='text-primary py-1'>{tc('joinCommunity')}</p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default JoinUsNow