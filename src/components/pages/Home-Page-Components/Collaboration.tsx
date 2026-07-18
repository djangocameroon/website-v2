"use client";

import Image from "next/image";
import { GoArrowUpRight } from 'react-icons/go';
import { HomeImages } from '@/assets';
import { Button } from '@/components/layout';
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";
import { revealOnce, slideInLeft, slideInRight } from './motion';


const Collaboration = () => {
  const t = useTranslations("HomePage.collaboration");
  const tc = useTranslations("Common");

  const handleJoinCommunityClick = () => {
    const communityLink = process.env.NEXT_PUBLIC_DJANGO_COMMUNITY_INVITE_LINK || "";
    window.open(communityLink, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className=' flex justify-center lg:justify-start md:flex-row flex-col items-center md:gap-x-28 '>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealOnce}
        variants={slideInLeft}
        className='w-full max-w-2xl md:mt-7 lg:mt-0'
      >
        <h2 className='text-primary text-2xl md:text-3xl font-bold nohemi-font'>
          {t("title")}
        </h2>
        <p className='text-base my-4 urbanist-font '>
          {t("description")}
        </p>
        <blockquote className='inline-block text-sm urbanist-font my-3 text-text-color/60 pl-2.5 border-l-[3px] border-primary-lighter'>
          {t("quote")}
        </blockquote>
        <Button className='py-2.5 px-5 flex gap-x-2.5 urbanist-font justify-center items-center text-xl' onClick={handleJoinCommunityClick}>
          {tc("joinCommunity")}
          <GoArrowUpRight className='w-6 h-6' />
        </Button>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealOnce}
        variants={slideInRight}
        className='block'
      >
        <Image src={HomeImages.teamGoals} alt='' />
      </motion.div>
    </div>
  );
}

export default Collaboration;