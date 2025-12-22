import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthImages, HomeImages } from '@/assets';
import { Button } from '@components/layout';
import { IoIosCheckmark } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { ForgotPasswordForm } from '@/models';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const ForgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .required('This field is required')
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Enter a valid email'
      ),
    code: yup.string().required('enter a code'),
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
    <div className="px-5 py-10 min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center">
      <Link to="/" className="pb-6 w-40">
        <img src={HomeImages.Logo} alt="logo" />
      </Link>
      <div className="max-w-xl text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Forgot Password</h1>
        <p className="text-lg text-gray-500">
          We are very sorry for you losing your password, but we’ve got your back.
        </p>
      </div>

      <div className="mt-12 w-full flex justify-center">
        <div className="flex justify-center items-start gap-12 w-full max-w-5xl">

          {/* illustration of the work */}
          <div className="hidden md:block w-80">
            <img src={AuthImages.Lock} alt="lock" />
          </div>

          {/* the form */}
          <div className="w-full md:w-[50%] bg-white p-8 rounded-2xl shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* email */}
              <div>
                <label htmlFor="email" className="text-lg font-medium">
                  Enter your email
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="enter email"
                  className="mt-2 w-full border py-3 px-4 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-secondary"
                  {...register('email')}
                />
                {errors['email'] && (
                  <span className="text-sm text-red-500">
                    {errors['email']?.message}
                  </span>
                )}
              </div>

            
              <div className="space-y-5 pl-2">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                    <IoIosCheckmark />
                  </div>
                  <span>Verifying email...</span>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                    <IoIosCheckmark />
                  </div>
                  <span>Sending verification code...</span>
                </div>
              </div>

              
              <div>
                <label htmlFor="code" className="text-lg font-medium text-gray-600">
                  Enter the verification code sent to your email
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="code"
                  placeholder="enter code"
                  className="mt-2 w-full border py-3 px-4 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-secondary"
                  {...register('code')}
                />
                {errors['code'] && (
                  <span className="text-sm text-red-500">
                    {errors['code']?.message}
                  </span>
                )}
              </div>

              
              <div className="flex justify-center items-center gap-6 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/auth/login')}
                  className="text-red-500 border border-red-500 rounded-xl px-10 py-2 text-lg font-semibold hover:bg-red-50 transition"
                >
                  Cancel
                </button>

                <Button outline={false} backgroundColor="bg-secondary">
                  <p className="px-10">Proceed</p>
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
