/* eslint-disable @typescript-eslint/no-explicit-any */

import {ILoginForm} from '../../models'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { Button } from '../../components/layout';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import {Carousel} from "../../components";
// import { useNavigate } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';
import AuthQuote from '../../components/pages/Auth-Page-Components/AuthQuote';


const Login = () => {
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const loginFormSchema = yup.object().shape({
      email: yup
        .string()
        .required('This field is required')
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          `${'Enter a valid email'}`
        ),
      password: yup
        .string()
        .required('enter a password')
        .min(8, 'Password must be atleast 8 characters long')
        .matches(
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
          `${'Enter a correct password'}`
        ),
    });
  
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginFormSchema),
  });


  const fieldHasErrors = (fieldName: keyof ILoginForm) => {
    return Boolean(errors[fieldName]);
  };

  const onSubmit = async (data: ILoginForm) => {
    console.log(data)
  };

  return (
    <div className='flex h-full justify-center gap-5 md:gap-10 w-full items-stretch'>
      <AuthQuote />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='md:border-secondary md:border-[3px] md:bg-white/10 rounded-[3.125rem] p-5 md:p-10 w-full max-w-3xl'
      >
        <div className='text-white text-center md:p-2.5 md:mb-[3.75rem] mb-12'>
          <h2 className='text-2xl max-md:text-xl font-semibold md:text-2xl nohemi-font'>
            Welcome Back Buddy!
          </h2>
          <p className='urbanist-font font-medium text-xl max-md:text-lg'>It&apos;s been a while here since you were gone.</p>
        </div>
        <div className='md:px-2.5'>
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className={`${
                fieldHasErrors('email')
                  ? 'text-red-500'
                  : 'text-white urbanist-font'
              } `}
            >
              Hey, remind us your email
            </label>
            <input
              type='email'
              id='email'
              placeholder='Your email address'
              className='w-full border-[1.5px] py-3.5 px-5 text-base border-white placeholder:text-lg bg-white/10 rounded-2xl focus:outline-none urbanist-font text-white'
              {...register('email')}
            />
          </div>
          <label className='label'>
            {errors['email'] && (
              <span className='label-text-alt text-red-500'>
                {errors['email']?.message}
              </span>
            )}
          </label>
        </div>
        <div className='mt-7 md:px-2.5'>
          <div className='space-y-2'>
            <label
              htmlFor='password'
              className={` mb-2 ${
                fieldHasErrors('password')
                  ? 'text-red-500'
                  : 'text-white urbanist-font'
              } `}
            >
              And your Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Your password'
                className='w-full border-[1.5px] py-3.5 px-5 border-white placeholder:text-lg bg-white/10 rounded-2xl focus:outline-none urbanist-font text-white'
                {...register('password')}
              />
              <div className='absolute right-5 inset-y-0 top-[50%] transform -translate-y-[50%]'>
                {showPassword ? (
                  <AiOutlineEye
                    className='w-6 h-6'
                    color='white'
                    // size={23}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  ) : (
                    <AiOutlineEyeInvisible
                    className='w-6 h-6'
                    color='white'
                      // size={23}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                }
              </div>
            </div>
          </div>
            
        </div>
        <label className='label'>
          {errors['password'] && (
            <span className='label-text-alt text-red-500'>
              {errors['password']?.message}
            </span>
          )}
        </label>
        <div className='flex md:justify-between md:items-center mt-2 px-2.5 md:mb-20 mb-5 max-md:flex-col-reverse gap-y-7'>
          <div>
            <input type='checkbox' className='md:w-[1.17rem] md:h-[1.17rem] w-4 h-4 rounded-md border-secondary border-1' />
            <span className='text-white urbanist-font ml-2.5'>Keep me logged in next time</span>
          </div>
          <Link
            to='/auth/forgot-password'
            className='text-white mt-1 flex justify-end items-end urbanist-font gap-x-2'
          >
            Forgot password?
            <GoArrowUpRight className='md:w-6 md:h-6 w-5 h-5 ' />
          </Link>
        </div>

        <Button outline={false} backgroundColor='bg-secondary' className='w-full'>
          Login into account
        </Button>
      </form>
    </div>
  );
}

export default Login