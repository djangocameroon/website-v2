/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRegisterForm } from '../../models';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/layout';

const Register = () => {
  const RegisterFormSchema = () => {
    return yup.object().shape({
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
          `${'Enter a correct password'}`
        ),

      passwordConfirmation: yup
        .string()
        .required('enter a password')
        // .min(8, 'Password must be atleast 8 characters long')
        .test(`${'passwords match'}`, `${'passwords do not match '}`, function (value) {
          return this.parent.password === value;
        }),
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegisterForm>({
    //@ts-expect-error noerror
    resolver: yupResolver(RegisterFormSchema),
  });

  const fieldHasErrors = (fieldName: keyof IRegisterForm) => {
    return Boolean(errors[fieldName]);
  };

  const onSubmit = async (data: IRegisterForm) => {
    console.log(data);
  };

  return (
    <div className='flex mt-8 justify-center items-center gap-5 w-full'>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-secondary bg-white/10 border rounded-2xl  py-2 pb-4 px-7 w-full md:w-[50%]'
      >
        <div className='flex text-white justify-center items-center flex-col gap-1 py-5'>
          <h2 className='text-lg font-semibold md:text-2xl'>
            Welcome To Django Cameroon
          </h2>
          <p>
            We are always warmed up on welcoming a new member. Feel home and
            safe.
          </p>
        </div>
        <div className='mt-4 w-full flex-col sm:flex-row flex gap-3 justify-between items-center'>
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
                Enter you name
                <span className='text-red-600 text-lg my-0'>*</span>{' '}
              </label>
              <input
                type='text'
                id='name'
                placeholder='enter your name'
                className='mt-2 w-full border-[1px] py-3 px-5 border-white placeholder:text-lg bg-white/10 rounded-lg focus:outline-none'
                required
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
                Enter you email
                <span className='text-red-600 text-lg my-0'>*</span>{' '}
              </label>
              <input
                type='email'
                id='email'
                placeholder='enter your email'
                className='mt-2 w-full border-[1px] py-3 px-5 border-white placeholder:text-lg bg-white/10 rounded-lg focus:outline-none'
                required
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
          <div>
            <div>
              <label
                htmlFor='password'
                className={` mb-2 ${
                  fieldHasErrors('password')
                    ? 'text-red-500'
                    : 'text-white text-lg font-medium'
                } `}
              >
                Enter you password
                <span className='text-red-600 text-lg my-0'>*</span>{' '}
              </label>
              <input
                type='password'
                id='password'
                placeholder='enter a password'
                className='mt-2 w-full border-[1px] py-3 px-5 border-white placeholder:text-lg bg-white/10 rounded-lg focus:outline-none'
                required
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
          <div className=''>
            <div>
              <label
                htmlFor='password-2'
                className={` mb-2 ${
                  fieldHasErrors('password')
                    ? 'text-red-500'
                    : 'text-white text-lg font-medium'
                } `}
              >
                Enter you Password again
                <span className='text-red-600 text-lg my-0'>*</span>{' '}
              </label>
              <input
                type='password'
                id='password-2'
                placeholder='enter your password again'
                className='mt-2 w-full border-[1px] py-3 px-5 border-white placeholder:text-lg bg-white/10 rounded-lg focus:outline-none'
                required
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
        </div>

        <div className='flex justify-center items-center mt-10'>
          <Button outline={false} backgroundColor='bg-secondary'>
            {' '}
            <p className='w-full px-20'>Register</p>{' '}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
