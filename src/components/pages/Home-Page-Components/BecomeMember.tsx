"use client";

import Image from "next/image";
import { HomeImages } from '@/assets';
import { Button } from '@/components/layout';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";
import { fadeUp, revealOnce, slideInLeft, slideInRight } from './motion';

const BecomeMember = () => {
  const t = useTranslations("HomePage.becomeMember");
  const { blueDjango, blueMap } = HomeImages;
  const router = useRouter();
  return (
    <section id="become-member" className='relative max-w-7xl mx-auto'>
      <div className='absolute left-0 2xl:-translate-x-1/2 max-xl:hidden -z-10'>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealOnce}
          variants={slideInLeft}
          transition={{ delay: 0.2 }}
        >
          <Image src={blueDjango} alt='' className='' />
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealOnce}
        variants={fadeUp}
        className='max-w-4xl w-full mx-auto text-center'
      >
        <h1 className='font-bold nohemi-font text-5xl max-md:text-2xl'>
          {t.rich("title", { br: () => <br /> })}
        </h1>
        <p className='font-light urbanist-font mt-2 md:mt-4 mb-3 text-base md:text-xl text-balance'>
          {t("description")}
        </p>
        <Button outline={false} backgroundColor='bg-primary' onClick={() => router.push('/about')}>
          {t("cta")}
        </Button>
      </motion.div>

      <div className='absolute right-0 2xl:translate-x-1/2 max-xl:hidden -z-10 -bottom-2'>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealOnce}
          variants={slideInRight}
          transition={{ delay: 0.2 }}
        >
          <Image src={blueMap} alt='' className='' />
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeMember;
