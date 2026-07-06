"use client";

import Image from "next/image";
import { useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Badge, Button } from '@/components/layout'
import { AiOutlineSend, AiOutlineLoading3Quarters, AiOutlineCheck } from 'react-icons/ai';
import { HomeImages } from '@/assets';
import { subsApi } from '@/lib/subsApi';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, revealOnce, scaleIn, staggerContainer } from './motion';

const badgesStagger = staggerContainer(0.06);

type SubmitState = 'idle' | 'loading' | 'success';

const Newsletter = () => {
  const { blueBgInitials } = HomeImages;
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleJoinCommunityClick = () => {
    const communityLink = process.env.NEXT_PUBLIC_DJANGO_COMMUNITY_INVITE_LINK || "";
    window.open(communityLink, '_blank', 'noopener,noreferrer');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitState === 'loading' || !email.trim()) return;

    setSubmitState('loading');
    try {
      const response = await subsApi.sendVerificationEmail(email.trim());
      toast.success(response.message || 'Verification email sent!');
      setSubmitState('success');
      setEmail('');
      setTimeout(() => setSubmitState('idle'), 2000);
    } catch (error) {
      let errorMessage = error instanceof AxiosError
        ? error?.response?.data?.message || 'Failed to send verification email.'
        : 'Failed to send verification email.';
      if (error instanceof AxiosError && error.response?.status === 429) {
        errorMessage = 'Too many requests. Please try again later.';
      }
      toast.error(errorMessage);
      setSubmitState('idle');
    }
  }

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealOnce}
        variants={scaleIn}
        className='bg-secondary rounded-[3.125rem] bluelightbg h-[500px] relative'
      >
        <Image src={blueBgInitials} alt="" className='max-md:hidden' />
        <div className='absolute inset-0 md:pr-[100px] max-md:px-2 flex justify-center md:justify-end items-center'>
          <div className='text-white w-full max-w-[750px] md:text-right text-center'>
            <h1 className='nohemi-font font-bold text-3xl md:text-5xl text-center md:text-right'>Not that it&apos;s now or never but don&apos;t miss such opportunity.</h1>
            <Button className='w-fit bg-secondary mt-7 max-md:mt-4' spacing={false} onClick={handleJoinCommunityClick}>Join the community</Button>
          </div>

        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealOnce}
        variants={fadeUp}
        className='flex md:w-[90%] mx-auto flex-wrap md:justify-between sm:flex-nowrap w-full my-12 gap-y-5'
      >
        <div className='max-w-2xl w-full space-y-1.5'>
          <p className='nohemi-font font-semibold text-2xl'>
            And also make sure to join our newsletter to remain updated about
            the community.
          </p>
          <motion.div
            variants={badgesStagger}
            initial="hidden"
            whileInView="visible"
            viewport={revealOnce}
            className='flex gap-3 justify-start items-center gap-x-2.5'
          >
            <motion.div variants={fadeUp}><Badge>article</Badge></motion.div>
            <motion.div variants={fadeUp}><Badge>projects</Badge></motion.div>
            <motion.div variants={fadeUp}><Badge>tutorial</Badge></motion.div>
            <motion.div variants={fadeUp}><Badge>news</Badge></motion.div>
          </motion.div>
        </div>
        <div className='max-w-xl w-full p-2.5 border-2 border-black rounded-[30px]'>
          <form onSubmit={handleSubmit} className='px-[20px] py-[25px] rounded-[20px] flex justify-between bg-[#677C72]/[8%] h-full items-center'>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitState === 'loading'}
            placeholder='Enter your email'
            className='w-4/5 h-5 bg-transparent focus:outline-none urbanist-font text-lg placeholder:text-base flex justify-center items-center disabled:opacity-60'
          />
          <motion.button
            whileTap={{ scale: 0.85 }}
            type='submit'
            disabled={submitState === 'loading'}
            className='disabled:cursor-not-allowed'
          >
            <AnimatePresence mode='wait' initial={false}>
              {submitState === 'loading' && (
                <motion.span
                  key='loading'
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className='block'
                >
                  <AiOutlineLoading3Quarters size='25' className='size-5 animate-spin' />
                </motion.span>
              )}
              {submitState === 'success' && (
                <motion.span
                  key='success'
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className='block'
                >
                  <AiOutlineCheck size='25' className='size-5 text-primary' />
                </motion.span>
              )}
              {submitState === 'idle' && (
                <motion.span
                  key='idle'
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className='block'
                >
                  <AiOutlineSend size='25' className='size-5' />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
        </div>

      </motion.div>
    </>
  );
}

export default Newsletter