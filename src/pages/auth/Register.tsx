/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRegisterForm } from '../../models';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/layout';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
// import {Carousel} from "../../components";
// import {useNavigate} from "react-router-dom";
import AuthQuote from '../../components/pages/Auth-Page-Components/AuthQuote';

const Register = () => {
//   const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState({
	password1: false,
	password2: false
  });
  const RegisterFormSchema = yup.object().shape({
      name: yup.string().required('this is required'),
      username: yup.string().required('this is required'),
      phone: yup.number().required('this is required'),
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
      <div className='flex justify-center items-stretch md:gap-10 w-full'>
        <div className="h-[44.4rem]">
			<AuthQuote />
        </div>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='md:border-secondary md:border-[3px] md:bg-white/10 rounded-[3.125rem] p-5 md:p-10 w-full max-w-5xl flex flex-col md:justify-between'
        >
			<div className="space-y-16 max-md:space-y-12 max-md:mb-5">
				<div className='text-white text-center md:space-y-1 md:py-5'>
					<h3 className='text-xl text-center font-semibold md:text-2xl nohemi-font'>
						Good to have you here!
					</h3>
					<p className="urbanist-font text-xl font-medium max-md:text-lg">
						We are always warmed up on welcoming a new member. Feel home and safe.
					</p>
				</div>

				<div className='mt-4 flex flex-wrap gap-x-4 gap-y-7'>
					<div className='max-md:w-full'>
						<div className=''>
							<label
								htmlFor='name'
								className={`block mb-2 ${
									fieldHasErrors('name')
										? 'text-red-500'
										: 'text-white urbanist-font'
								} `}
							>
								We&apos;ll need your first & last names
							</label>
							<input
								type='text'
								id='name'
								placeholder='Your names'
								className='w-[18.315rem] max-md:w-full border-[1.5px] p-4 border-white text-white bg-white/10 rounded-2xl focus:outline-none urbanist-font'
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

					<div className='max-md:w-full'>
						<div>
							<label
								htmlFor='email'
								className={`mb-2 block ${
									fieldHasErrors('email')
										? 'text-red-500'
										: 'text-white urbanist-font'
								} `}
							>
								What&apos;s your email address?
							</label>
							<input
								type='email'
								id='email'
								placeholder='Your email'
								className='w-[18.315rem] max-md:w-full border-[1.5px] p-4 border-white text-white bg-white/10 rounded-2xl focus:outline-none urbanist-font'
								{...register('email')}
							/>
						</div>
						<label className='label'>
							{errors['email'] && (
								<span className='label-text-alt text-red-500'>{errors['email']?.message}</span>
							)}
						</label>
					</div>

					<div className='max-md:w-full'>
						<div>
							<label
								htmlFor='email'
								className={`mb-2 block ${
									fieldHasErrors('email')
										? 'text-red-500'
										: 'text-white urbanist-font'
								} `}
							>
								And your phone number?
							</label>
							<input
								type='number'
								id='phone'
								placeholder='Your phone number'
								style={{ appearance: "textfield"}}
								className='w-[18.315rem] max-md:w-full border-[1.5px] p-4 border-white text-white bg-white/10 rounded-2xl focus:outline-none urbanist-font'
								{...register('phone')}
							/>
						</div>
						<label className='label'>
							{errors['phone'] && (
								<span className='label-text-alt text-red-500'>{errors['phone']?.message}</span>
							)}
						</label>
					</div>

					<div className='max-md:w-full'>
						<div>
							<label
								htmlFor='username'
								className={`block mb-2 ${
									fieldHasErrors('username')
										? 'text-red-500'
										: 'text-white urbanist-font'
								} `}
							>
								Set up a username
							</label>
							<input
								type='text'
								id='username'
								placeholder='@your_username'
								className='w-[18.315rem] max-md:w-full border-[1.5px] p-4 border-white text-white bg-white/10 rounded-2xl focus:outline-none urbanist-font'
								{...register('username')}
							/>
						</div>
						<label className='label'>
							{errors['username'] && (
								<span className='label-text-alt text-red-500'>
							{errors['username']?.message}
							</span>
							)}
						</label>
					</div>

					<div className='max-md:w-full'>
						<div className='space-y-2'>
							<label
								htmlFor='password'
								className={` mb-2 ${
									fieldHasErrors('password')
									? 'text-red-500'
									: 'text-white urbanist-font'
								} `}
							>
								Set Up Password
							</label>
							<div className="relative">
								<input
									type={showPassword.password1 ? 'text' : 'password'}
									id='password'
									placeholder='Your password'
									className='w-[18.315rem] max-md:w-full border-[1.5px] p-4 border-white text-white bg-white/10 rounded-2xl focus:outline-none urbanist-font'
									{...register('password')}
								/>
								<div className='absolute right-5 inset-y-0 top-[50%] transform -translate-y-[50%]'>
									{showPassword.password1 ? (
										<AiOutlineEye
											className='w-6 h-6'
											color='white'
											// size={23}
											onClick={() => setShowPassword(prev => ({ ...prev, password1: !(showPassword.password1) }))}
										/>
									) : (
										<AiOutlineEyeInvisible
											className='w-6 h-6'
											color='white'
											// size={23}
											onClick={() => setShowPassword(prev => ({ ...prev, password1: !(showPassword.password1) }))}
										/>
									)}
								</div>
								<label className='label'>
									{errors['phone'] && (
										<span className='label-text-alt text-red-500'>{errors['phone']?.message}</span>
									)}
								</label>
							</div>
						</div>	
					</div>

					<div className='max-md:w-full'>
						<div className='space-y-2'>
							<label
								htmlFor='password2'
								className={` mb-2 ${
									fieldHasErrors('passwordConfirmation')
									? 'text-red-500'
									: 'text-white urbanist-font'
								} `}
							>
								Confirm your password
							</label>
							<div className="relative">
								<input
									type={showPassword.password2 ? 'text' : 'password'}
									id='password2'
									placeholder='Re-enter password'
									className='w-[18.315rem] max-md:w-full border-[1.5px] p-4 border-white text-white bg-white/10 rounded-2xl focus:outline-none urbanist-font'
									{...register('passwordConfirmation')}
								/>
								<div className='absolute right-5 inset-y-0 top-[50%] transform -translate-y-[50%]'>
									{showPassword.password2 ? (
										<AiOutlineEye
											className='w-6 h-6'
											color='white'
											onClick={() => setShowPassword(prev => ({ ...prev, password2: !(showPassword.password2) }))}
										/>
									) : (
										<AiOutlineEyeInvisible
											className='w-6 h-6'
											color='white'
											onClick={() => setShowPassword(prev => ({ ...prev, password2: !(showPassword.password2) }))}
										/>
									)}
								</div>
								<label className='label'>
									{errors['phone'] && (
										<span className='label-text-alt text-red-500'>{errors['phone']?.message}</span>
									)}
								</label>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			

			<Button backgroundColor='bg-secondary' className='w-full' spacing={false}>Finish account registration</Button>
        </form>
      </div>
  );
};

export default Register;
