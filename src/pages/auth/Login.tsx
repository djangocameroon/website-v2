/* eslint-disable @typescript-eslint/no-explicit-any */

import {ILoginForm} from '../../models'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { Button } from '../../components/layout';
import { Link } from 'react-router-dom';


const Login = () => {

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
    <div className='flex mt-8 justify-center items-center gap-5 w-full overflow-hidden'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-secondary bg-white/10 border rounded-2xl py-2 pb-4 px-7'
      >
        <div className='flex text-white justify-center items-center flex-col gap-1 py-5'>
          <h2 className='text-lg font-semibold md:text-2xl'>
            Welcome Back Buddy!
          </h2>
          <p>Login to continue</p>
        </div>
        <div>
          <div>
            <label
              htmlFor='name'
              className={` mb-2 ${
                fieldHasErrors('email')
                  ? 'text-red-500'
                  : 'text-white text-lg font-medium'
              } `}
            >
              Enter you email
              <span className='text-red-600 text-lg my-0'>*</span>{' '}
            </label>
            <input
              type='email'
              id='email'
              placeholder='enter email'
              className='mt-2 w-full border-[1px] py-3 px-5 border-white placeholder:text-lg bg-white/10 rounded-lg focus:outline-none'
            
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
        <div className='mt-4'>
          <div>
            <label
              htmlFor='name'
              className={` mb-2 ${
                fieldHasErrors('password')
                  ? 'text-red-500'
                  : 'text-white text-lg font-medium'
              } `}
            >
              Enter you Password
              <span className='text-red-600 text-lg my-0'>*</span>{' '}
            </label>
            <input
              type='text'
              id='password'
              placeholder='enter password'
              className='mt-2 w-full border-[1px] py-3 px-5 border-white placeholder:text-lg bg-white/10 rounded-lg focus:outline-none'
              
              {...register('password')}
            />
          </div>
          <label className='label'>
            {errors['password'] && (
              <span className='label-text-alt text-red-500'>
                {errors['password']?.message}
              </span>
            )}
          </label>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <div>
            <input type='checkbox' />
            <span className='text-white font-light ml-2'>Remember me</span>
          </div>
          <Link
            to='/auth/forgot-password'
            className='underline text-white font-medium mt-1 text-sm flex justify-end items-end'
          >
            Forgot password?
          </Link>
        </div>

        <div className='flex justify-center items-center mt-10'>
          <Button outline={false} backgroundColor='bg-secondary'>
            {' '}
            <p className='w-full px-20'>Login</p>{' '}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login