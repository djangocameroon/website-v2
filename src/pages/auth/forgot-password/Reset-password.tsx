import {Link, useNavigate} from 'react-router-dom';
import { AuthImages, HomeImages } from '@/assets';
import { Button } from '@/components/layout';
import { useForm } from 'react-hook-form';
import { ResetPasswordForm } from '@/models';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ResetPassword = () => {
    const navigate = useNavigate();

     const ResetPasswordSchema = yup.object().shape({
          password: yup
            .string()
            .required('enter a password')
            .min(8, 'Password must be atleast 8 characters long')
            .matches(
              /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
              `${'Enter a correct password'}`
            ),

          confirmPassword: yup
            .string()
            .required('enter a password')
            // .min(8, 'Password must be atleast 8 characters long')
            .test(
              `${'passwords match'}`,
              `${'passwords do not match '}`,
              function (value) {
                return this.parent.password === value;
              }
            ),
        });
      


    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<ResetPasswordForm>({
      resolver: yupResolver(ResetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordForm) => {
        console.log(data);
    }
    

  return (
    <div className=' px-5 py-10 bg-no-repeat bg-cover h-screen bg-center flex flex-col justify-start items-center'>
      <Link to={'/'} className='pb-4 w-40'>
        <img src={HomeImages.Logo} alt='' />
      </Link>
      <div>
        <h1 className='text-3xl font-bold text-center'>Reset Password</h1>
        <p className='text-center text-lg text-medium'>
          Now you get a chance to reset your password. keep it safe this time.
        </p>
      </div>
      <div>
        <div className='mt-10 flex justify-center items-center gap-10'>
          <div className='hidden md:block w-80'>
            <img className='' src={AuthImages.Keys} alt='' />
          </div>

          <div className='w-full md:w-[50%]'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor='password' className='mb-2 text-lg font-light'>
                  Set up a new password
                  <span className='text-red-600 text-lg my-0'>*</span>
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='enter new password'
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
                  Confirm new password
                  <span className='text-red-600 text-lg my-0'>*</span>
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  placeholder='enter the new password again'
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
                <button onClick={()=>{
                    navigate('/auth/login')
                }} className='text-red-500 bg-transparent border border-red-500 rounded-xl px-10 py-2 flex justify-center items-center text-lg font-semibold'>
                  Cancel
                </button>
                <Button outline={false} backgroundColor='bg-secondary'>
                  <p className='px-10'>Reset Password</p>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;