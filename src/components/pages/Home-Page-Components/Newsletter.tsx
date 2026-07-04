import { useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Badge, Button } from '@/components/layout'
import { AiOutlineSend, AiOutlineLoading3Quarters, AiOutlineCheck } from 'react-icons/ai';
import { HomeImages } from '@/assets';
import { subsApi } from '@/lib/subsApi';

type SubmitState = 'idle' | 'loading' | 'success';

const Newsletter = () => {
  const { blueBgInitials } = HomeImages;
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleJoinCommunityClick = () => {
    const communityLink = import.meta.env.VITE_PUBLIC_DJANGO_COMMUNITY_INVITE_LINK || "";
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
      <div className='bg-secondary rounded-[3.125rem] bluelightbg h-[500px] relative'>
        <img src={blueBgInitials} alt="" className='max-md:hidden' />
        <div className='absolute inset-0 md:pr-[100px] max-md:px-2 flex justify-center md:justify-end items-center'>
          <div className='text-white w-full max-w-[750px] md:text-right text-center'>
            <h1 className='nohemi-font font-bold text-3xl md:text-5xl text-center md:text-right'>Not that it&apos;s now or never but don&apos;t miss such opportunity.</h1>
            <Button className='w-fit bg-secondary mt-7 max-md:mt-4' spacing={false} onClick={handleJoinCommunityClick}>Join the community</Button>
          </div>

        </div>
      </div>
      <div className='flex md:w-[90%] mx-auto flex-wrap md:justify-between sm:flex-nowrap w-full my-12 gap-y-5'>
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
          <button type='submit' disabled={submitState === 'loading'} className='disabled:cursor-not-allowed'>
            {submitState === 'loading' && (
              <AiOutlineLoading3Quarters size='25' className='size-5 animate-spin' />
            )}
            {submitState === 'success' && (
              <AiOutlineCheck size='25' className='size-5 text-primary' />
            )}
            {submitState === 'idle' && (
              <AiOutlineSend size='25' className='size-5' />
            )}
          </button>
        </form>
        </div>
        
      </div>
    </>
  );
}

export default Newsletter