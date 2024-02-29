/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRegisterForm } from '../../models';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/layout';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import {Carousel} from "../../components";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const RegisterFormSchema = yup.object().shape({
      name: yup.string().required('this is required'),
      email: yup
        .string()
        .required('this is required')
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
          `${'Enter a password with numbers, letters and special characters'}`
        ),

      passwordConfirmation: yup
        .string()
        .required('enter a password')
        // .min(8, 'Password must be atleast 8 characters long')
        .test(`${'passwords match'}`, `${'passwords do not match '}`, function (value) {
          return this.parent.password === value;
        }),
    });
  

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const fieldHasErrors = (fieldName: keyof IRegisterForm) => {
    return Boolean(errors[fieldName]);
  };

  const onSubmit = async (data: IRegisterForm) => {
    console.log(data)
  };

  return (
      <div className='flex justify-center items-start gap-5 md:gap-10 w-full'>
        <div className={'hidden md:block w-[30%]'}>
          <Carousel/>
        </div>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='border-secondary md:bg-white/10 md:border rounded-2xl   py-2 pb-4 px-7 w-full lg:w-[50%]'
        >
          <div className='flex text-white justify-center items-center flex-col gap-1 py-5'>
            <h2 className='text-lg font-semibold md:text-2xl'>
              Welcome To Django Cameroon
            </h2>
            <p className={'text-center'}>
              We are always warmed up on welcoming a new member. Feel home and
              safe.
            </p>
          </div>
          <div className='mt-4 w-full flex-col sm:flex-row flex gap-3 justify-between items-center'>
            <div className=''>
              <div>
                <label
                    htmlFor='name'
                    className={` mb-2 ${
                        fieldHasErrors('name')
                            ? 'text-red-500'
                            : 'text-white text-lg font-medium'
                    } `}
                >
                  Enter you name
                  <span className='text-red-600 text-lg my-0'>*</span>{' '}
                </label>
                <input
                    type='text'
                    id='name'
                    placeholder='Enter your name'
                    className='mt-2 w-full border-[1px] py-3 px-5 border-white placeholder:text-lg bg-white/10 rounded-lg focus:outline-none'
                    {...register('name')}
                />
              </div>
              <label className='label'>
                {errors['name'] && (
                    <span className='label-text-alt text-red-500'>
                  {errors['name']?.message}
                </span>
                )}
              </label>
            </div>
            <div className=''>
              <div>
                <label
                    htmlFor='email'
                    className={` mb-2 ${
                        fieldHasErrors('email')
                            ? 'text-red-500'
                            : 'text-white text-lg font-medium'
                    } `}
                >
                  Enter you name
                  <span className='text-red-600 text-lg my-0'>*</span>{' '}
                </label>
                <input
                    type='email'
                    id='email'
                    placeholder='Enter your email'
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
          </div>
          <div className='mt-4 w-full flex-col sm:flex-row flex gap-3 justify-between items-center'>
            <div className='relative'>
              <div className=''>
                <label
                    htmlFor='password'
                    className={` mb-2 ${
                        fieldHasErrors('password')
                            ? 'text-red-500'
                            : 'text-white text-lg font-medium'
                    } `}
                >
                  Enter a password
                  <span className='text-red-600 text-lg my-0'>*</span>{' '}
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    placeholder='******'
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
              <div className='absolute right-2 top-[50px]'>
                {showPassword ? (
                    <AiOutlineEye
                        className=''
                        size={23}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    <AiOutlineEyeInvisible
                        size={23}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )}
              </div>
            </div>
            <div className='relative'>
              <div>
                <label
                    htmlFor='password2'
                    className={` mb-2 ${
                        fieldHasErrors('passwordConfirmation')
                            ? 'text-red-500'
                            : 'text-white text-lg font-medium'
                    } `}
                >
                  confirm you password
                  <span className='text-red-600 text-lg my-0'>*</span>{' '}
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id='password2'
                    placeholder='******'
                    className='mt-2 w-full border-[1px] py-3 px-5 border-white placeholder:text-lg bg-white/10 rounded-lg focus:outline-none'
                    {...register('passwordConfirmation')}
                />
              </div>
              <label className='label'>
                {errors['passwordConfirmation'] && (
                    <span className='label-text-alt text-red-500'>
                  {errors['passwordConfirmation']?.message}
                </span>
                )}
              </label>
              <div className='absolute right-2 top-[50px]'>
                {showPassword ? (
                    <AiOutlineEye
                        className=''
                        size={23}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    <AiOutlineEyeInvisible
                        size={23}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                )}
              </div>
            </div>
          </div>

          <div className='flex justify-center flex-col sm:flex-row items-center gap-7 mt-10'>
            <button onClick={()=>{
              navigate('/')
            }}
                    className='text-white bg-transparent border border-red-500 rounded-xl px-10 py-2 flex justify-center items-center text-lg font-semibold'>
              Cancel
            </button>
            <Button outline={false} backgroundColor='bg-secondary'>
              {' '}
              <p className='w-full px-10'>Register</p>{' '}
            </Button>
          </div>
        </form>
      </div>
  );
};

export default Register;
