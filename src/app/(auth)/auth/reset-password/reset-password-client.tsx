"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthImages, HomeImages } from '@/assets';
import { Button } from '@/components/layout';
import { useForm } from 'react-hook-form';
import { ResetPasswordForm } from '@/models';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

const ResetPasswordClient = () => {
    const router = useRouter();
    const t = useTranslations('AuthPage.resetPassword');
    const tc = useTranslations('AuthPage.common');

    const ResetPasswordSchema = z
      .object({
        password: z
          .string()
          .min(1, tc('required'))
          .min(8, tc('passwordTooShort'))
          .regex(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, 
            tc('passwordStrong')
          ),
        confirmPassword: z.string().min(1, tc('required')),
      })
      .refine((values) => values.password === values.confirmPassword, {
        message: tc('passwordMismatch'),
        path: ['confirmPassword'],
      });

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<ResetPasswordForm>({
      resolver: zodResolver(ResetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordForm) => {
        console.log(data);
    }


  return (
    <div className=' px-5 py-10 bg-no-repeat bg-cover h-screen bg-center flex flex-col justify-start items-center'>
      <Link href={'/'} className='pb-4 w-40'>
        <Image src={HomeImages.Logo} alt='' />
      </Link>
      <div>
        <h1 className='text-3xl font-bold text-center'>{t('title')}</h1>
        <p className='text-center text-lg text-medium'>
          {t('subtitle')}
        </p>
      </div>
      <div>
        <div className='mt-10 flex justify-center items-center gap-10'>
          <div className='hidden md:block w-80'>
            <Image className='' src={AuthImages.Keys} alt='' />
          </div>

          <div className='w-full md:w-[50%]'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor='password' className='mb-2 text-lg font-light'>
                  {t('passwordLabel')}
                  <span className='text-red-600 text-lg my-0'>*</span>
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder={t('passwordPlaceholder')}
                  {...register('password')}
                  className='mt-2 w-full border-[1px] placeholder:text-base py-3 px-3 border-gray-500 rounded-lg focus:outline-none focus:border-secondary'
                />
              </div>
              <label className='label'>
                {errors['password'] && (
                  <span className='label-text-alt text-red-500'>
                    {errors['password']?.message}
                  </span>
                )}
              </label>

              <div className='mt-5'>
                <label htmlFor='confirm-password' className='mb-2 font-light'>
                  {t('confirmPasswordLabel')}
                  <span className='text-red-600 text-lg my-0'>*</span>
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  placeholder={t('confirmPasswordPlaceholder')}
                  {...register('confirmPassword')}
                  className='mt-2 placeholder:text-base w-full border-[1px] py-3 px-3 border-gray-500 rounded-lg focus:outline-none focus:border-secondary'
                />
              </div>
              <label className='label'>
                {errors['confirmPassword'] && (
                  <span className='label-text-alt text-red-500'>
                    {errors['confirmPassword']?.message}
                  </span>
                )}
              </label>
              <div className='flex justify-center items-center gap-7 mt-10'>
                <button type='button' onClick={()=>{
                    router.push('/auth/login')
                }} className='text-red-500 bg-transparent border border-red-500 rounded-xl px-10 py-2 flex justify-center items-center text-lg font-semibold'>
                  {t('cancel')}
                </button>
                <Button outline={false} backgroundColor='bg-secondary'>
                  <p className='px-10'>{t('submit')}</p>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordClient;
