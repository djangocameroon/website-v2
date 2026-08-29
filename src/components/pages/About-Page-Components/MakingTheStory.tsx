"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AboutImages } from '@/assets/images'
import AnimatedSection from './animated-section';

const MakingTheStory = () => {
    const t = useTranslations("AboutPage.makingTheStory");
    return (
        <AnimatedSection className='w-screen lg:h-screen relative lg:mb-[100px] mb-8 max-lg:px-4'>
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <Image src={AboutImages.makingstorybanner} alt={t('bannerAlt')} className='max-xl:hidden w-full h-full' />
            </div>

            {/* Content wrapper — flex column so the two text blocks never overlap */}
            <div className='relative z-10 flex flex-col h-full justify-between items-center text-center lg:py-[70px] max-lg:py-8 max-lg:gap-8'>
                {/* Banner text section */}
                <div className='space-y-2'>
                    <span className="text-secondary urbanist-font text-xl font-medium inline-block">{t('eyebrow')}</span>
                    <h2 className="nohemi-font font-bold text-[2rem] leading-[2.188rem]">{t('title')}</h2>
                </div>

                {/* Main heading and description section */}
                <div className='space-y-2 lg:w-[50%] max-lg:mt-8'>
                    <h1 className="nohemi-font text-[5rem] max-lg:text-[3rem] leading-[5.313rem] max-lg:leading-[3.313rem] font-extrabold inline-block">{t('heading')}</h1>
                    <p className="urbanist-font">
                        {t('body')}
                    </p>
                </div>
            </div>
        </AnimatedSection>
    )
}

export default MakingTheStory;