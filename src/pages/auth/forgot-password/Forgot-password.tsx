import { Link } from 'react-router-dom'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthImages, HomeImages } from '../../../assets'
import { Button } from '../../../components/layout';
import { useForm } from 'react-hook-form';
import { ForgotPasswordForm } from '../../../models';

const ForgotPassword = () => {

      const ForgotPasswordSchema = yup.object().shape({
          email: yup
            .string()
            .required('This field is required')
            .matches(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              `${'Enter a valid email'}`
            ),
          code: yup
            .string()
            .required('enter a code')
           
        });
    

      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm<ForgotPasswordForm>({
        resolver: yupResolver(ForgotPasswordSchema),
      });
    

      const onSubmit = async (data: ForgotPasswordForm) => {
        console.log(data);
      };


  return (
    <div className=' px-5 py-10 bg-no-repeat bg-cover h-screen bg-center flex flex-col justify-start items-center'>
      <Link to={'/'} className='pb-4 w-40'>
        <img src={HomeImages.Logo} alt='' />
      </Link>
      <div>
        <h1 className='text-3xl font-bold text-center'>Forgot Password</h1>
        <p className='text-center text-lg text-medium'>
          We are very sorry for you losing your password but we got your back.
        </p>
      </div>
      <div>
        <div className='mt-10 flex justify-center items-center gap-10'>
          <div className='hidden md:block w-80'>
            <img className='' src={AuthImages.Lock} alt='' />
          </div>

          <div className='w-full md:w-[50%]'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor='email' className='mb-2 text-lg font-light'>
                  Enter you email
                  <span className='text-red-600 text-lg my-0'>*</span>
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder='enter email'
                  className='mt-2 w-full border-[1px] py-3 px-3 border-gray-500 placeholder:text-lg rounded-lg focus:outline-none focus:border-secondary'
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
              <div>
                <div className='w-2 h-8 ml-5 bg-transparent border-l border-dashed border-gray-500'></div>
                <div className='flex gap-2 ml-3 items-start justify-start relative b'>
                  <div className='w-5 h-5 rounded-full border border-gray-500 bg-transparent'></div>
                  <span className='text-gray-400 text-base'>
                    Verifying email...
                  </span>
                </div>
              </div>
              <div>
                <div className='w-2 h-8 ml-5 bg-transparent border-l border-dashed border-gray-500'></div>
                <div className='flex gap-2 ml-3 items-start justify-start relative b'>
                  <div className='w-5 h-5 rounded-full border border-gray-500 bg-transparent'></div>
                  <span className='text-gray-400 text-base'>
                    Sending verification code...
                  </span>
                </div>
              </div>
              <div>
                <div className='w-2 h-8 ml-5 bg-transparent border-l border-dashed border-gray-500'></div>
                <div>
                  <label
                    htmlFor='email'
                    className='mb-2 text-gray-400 font-light'
                  >
                    Enter the verification code we sent to your email
                    <span className='text-red-600 text-lg my-0'>*</span>
                  </label>
                  <input
                    type='text'
                    id='code'
                    placeholder='enter code'
                    className='mt-2 w-full border-[1px] py-3 px-3 border-gray-500 placeholder:text-lg rounded-lg focus:outline-none focus:border-secondary'
                    {...register('code')}
                  />
                </div>
              </div>
              <label className='label'>
                {errors['code'] && (
                  <span className='label-text-alt text-red-500'>
                    {errors['code']?.message}
                  </span>
                )}
              </label>
              <div className='flex justify-center items-center gap-7 mt-10'>
                <button className='text-white bg-transparent border border-red-500 rounded-xl px-10 py-2 flex justify-center items-center text-lg font-semibold'>
                  Cancel
                </button>
                <Button outline={false} backgroundColor='bg-secondary'>
                  <p className='px-10'>Proceed</p>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword