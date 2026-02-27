import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthImages, HomeImages } from '@/assets'
import { Button } from '@components/layout';
import { useForm } from 'react-hook-form';
import { FiCheck, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { sendPasswordResetRequest, resetUserPassword } from '@/apis';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// Schema for initial email verification step
const EmailSchema = yup.object().shape({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('This field is required'),
});

// Schema for reset password step (after email verified)
const ResetPasswordSchema = yup.object().shape({
    otp: yup
        .string()
        .matches(/^\d{6}$/, 'The code is invalid')
        .required('Enter a code'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
            'Password must contain uppercase, lowercase, number and special character'
        ),
    passwordConfirmation: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

type EmailFormData = yup.InferType<typeof EmailSchema>;
type ResetPasswordFormData = yup.InferType<typeof ResetPasswordSchema>;

type VerificationStatus = 'idle' | 'sending' | 'success' | 'error';

// Progress step indicator component - defined outside to prevent re-creation on render
const ProgressIndicator = ({ verificationStatus }: { verificationStatus: VerificationStatus }) => {
    if (verificationStatus === 'idle') return null;

    return (
        <div className='ml-5 overflow-hidden'>
            {/* Dashed line connector with animation */}
            <div
                className={`w-0 h-11 bg-transparent border-l border-dashed translate-x-[15px] transition-all duration-500 ease-out
                    ${verificationStatus === 'error' ? 'border-[#DB4437]' : 'border-gray-400'}
                    ${verificationStatus === 'sending' ? 'animate-pulse' : ''}
                `}
            />
            <div className='flex gap-2 justify-start relative items-center'>
                <div
                    className={`size-[30px] rounded-full border flex justify-center items-center transition-all duration-300
                        ${verificationStatus === 'error'
                            ? 'border-[#DB4437] bg-[#DB4437]/10'
                            : verificationStatus === 'success'
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-gray-400 bg-transparent'
                        }
                        ${verificationStatus === 'sending' ? 'animate-pulse' : ''}
                    `}
                >
                    {verificationStatus === 'error' ? (
                        <FiX className='size-4 text-[#DB4437]' />
                    ) : verificationStatus === 'success' ? (
                        <FiCheck className='size-4 text-green-500' />
                    ) : (
                        <div className='size-2 rounded-full bg-gray-400 animate-ping' />
                    )}
                </div>
                <span
                    className={`text-base urbanist-font transition-colors duration-300
                        ${verificationStatus === 'error'
                            ? 'text-[#DB4437]'
                            : verificationStatus === 'success'
                                ? 'text-green-500'
                                : 'text-gray-400'
                        }
                    `}
                >
                    {verificationStatus === 'error'
                        ? 'Verification failed'
                        : verificationStatus === 'success'
                            ? 'Code sent successfully!'
                            : 'Sending verification code...'
                    }
                </span>
            </div>
        </div>
    );
};

const ForgotPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
    const [step, setStep] = useState<'email' | 'reset'>('email');
    const [userEmail, setUserEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form for email step
    const {
        handleSubmit: handleEmailSubmit,
        register: registerEmail,
        formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
        setValue: setEmailValue,
    } = useForm<EmailFormData>({
        resolver: yupResolver(EmailSchema),
    });

    // Form for reset password step
    const {
        handleSubmit: handleResetSubmit,
        register: registerReset,
        formState: { errors: resetErrors, isSubmitting: isResetSubmitting },
    } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(ResetPasswordSchema),
    });

    useEffect(() => {
        const emailFromState = location.state?.email;
        if (emailFromState) setEmailValue('email', emailFromState)
    }, [location.state, setEmailValue])

    const handleSendPasswordResetRequest = async (data: EmailFormData) => {
        setVerificationStatus('sending');
        try {
            await sendPasswordResetRequest(data.email);
            setVerificationStatus('success');
            setUserEmail(data.email);
            // Transition to reset step after brief success indication
            setTimeout(() => {
                setStep('reset');
            }, 800);
        } catch {
            setVerificationStatus('error');
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        try {
            await resetUserPassword({
                otp: data.otp,
                password: data.password,
                password_confirmation: data.passwordConfirmation,
            });
            toast.success('Password reset successfully!');
            navigate('/auth/login', { replace: true });
        } catch {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className='bg-no-repeat bg-cover min-h-screen bg-center flex flex-col justify-start items-center w-[85%] mx-auto pb-10'>
            <Link to={'/'} className='pt-[3.125rem] pb-[3.9rem] w-40'>
                <img src={HomeImages.Logo} alt='' className='h-[3.66rem] mx-auto md:cursor-pointer' />
            </Link>
            <div className="flex flex-col flex-[1] w-full h-fit">
                <div className=''>
                    <h1 className='text-5xl max-md:text-3xl font-bold text-center nohemi-font'>
                        {step === 'email' ? 'Forgot Password' : 'Reset Password'}
                    </h1>
                    <p className='text-center text-lg max-md:text-base text-medium urbanist-font mt-2'>
                        {step === 'email'
                            ? "We are very sorry for you losing your password but we got your back."
                            : `Enter the code sent to ${userEmail} and set your new password.`
                        }
                    </p>
                </div>
                <div className='mt-10 flex justify-center flex-[1]'>
                    <div className='max-md:hidden w-1/2'>
                        <img
                            className={`w-[80%] -ml-7 transition-all duration-500 ${step === 'reset' ? 'opacity-80 scale-95' : ''}`}
                            src={AuthImages.Lock}
                            alt=''
                        />
                    </div>

                    <div className='w-full md:w-[50%]'>
                        {/* Email Step */}
                        {step === 'email' && (
                            <form onSubmit={handleEmailSubmit(handleSendPasswordResetRequest)} className='animate-fadeIn'>
                                <div>
                                    <label htmlFor='email' className='block mb-2.5 urbanist-font'>
                                        Hey, remind us your email
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        placeholder='Your email address'
                                        disabled={isEmailSubmitting}
                                        className='w-full border-[1.5px] py-3.5 px-5 border-black placeholder:text-base rounded-2xl focus:outline-none urbanist-font disabled:opacity-50 disabled:cursor-not-allowed transition-opacity'
                                        {...registerEmail('email')}
                                    />
                                </div>
                                <label className='label'>
                                    {emailErrors['email'] && (
                                        <span className='label-text-alt text-red-500'>
                                            {emailErrors['email']?.message}
                                        </span>
                                    )}
                                </label>

                                {/* Progress step indicator */}
                                <ProgressIndicator verificationStatus={verificationStatus} />

                                <div className='flex justify-center items-center gap-7 mt-6'>
                                    <Button
                                        spacing={false}
                                        outline={false}
                                        className='w-full'
                                        disabled={isEmailSubmitting || verificationStatus === 'sending'}
                                    >
                                        {isEmailSubmitting || verificationStatus === 'sending'
                                            ? 'Verifying...'
                                            : 'Verify Email'
                                        }
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Reset Password Step */}
                        {step === 'reset' && (
                            <form onSubmit={handleResetSubmit(handleResetPassword)} className='animate-fadeIn'>
                                {/* OTP Input */}
                                <div>
                                    <div
                                        className='w-2 h-8 ml-5 bg-transparent border-l border-dashed border-gray-500 translate-x-[15px]'
                                    />
                                    <div>
                                        <label
                                            htmlFor='otp'
                                            className='mb-2.5 block urbanist-font'
                                        >
                                            Enter the verification code we sent to your email
                                        </label>
                                        <input
                                            id='otp'
                                            placeholder='XXXXXX'
                                            maxLength={6}
                                            className='w-full border-[1.5px] py-3.5 px-5 border-black placeholder:text-base rounded-2xl focus:outline-none urbanist-font tracking-[0.5em] text-center text-xl font-semibold'
                                            {...registerReset('otp')}
                                        />
                                    </div>
                                </div>
                                <label className='label'>
                                    {resetErrors['otp'] && (
                                        <span className='label-text-alt text-red-500'>
                                            {resetErrors['otp']?.message}
                                        </span>
                                    )}
                                </label>

                                {/* Password Input */}
                                <div className='mt-5'>
                                    <label htmlFor='password' className='block mb-2.5 urbanist-font'>
                                        Set up a new password
                                    </label>
                                    <div className='relative'>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id='password'
                                            placeholder='Your new password'
                                            className='w-full border-[1.5px] py-3.5 px-5 border-black placeholder:text-base rounded-2xl focus:outline-none urbanist-font pr-12'
                                            {...registerReset('password')}
                                        />
                                        <button
                                            type='button'
                                            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <AiOutlineEye className='w-6 h-6' />
                                            ) : (
                                                <AiOutlineEyeInvisible className='w-6 h-6' />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <label className='label'>
                                    {resetErrors['password'] && (
                                        <span className='label-text-alt text-red-500'>
                                            {resetErrors['password']?.message}
                                        </span>
                                    )}
                                </label>

                                {/* Confirm Password Input */}
                                <div className='mt-5'>
                                    <label htmlFor='passwordConfirmation' className='block mb-2.5 urbanist-font'>
                                        Confirm new password
                                    </label>
                                    <div className='relative'>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id='passwordConfirmation'
                                            placeholder='Confirm your new password'
                                            className='w-full border-[1.5px] py-3.5 px-5 border-black placeholder:text-base rounded-2xl focus:outline-none urbanist-font pr-12'
                                            {...registerReset('passwordConfirmation')}
                                        />
                                        <button
                                            type='button'
                                            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <AiOutlineEye className='w-6 h-6' />
                                            ) : (
                                                <AiOutlineEyeInvisible className='w-6 h-6' />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <label className='label'>
                                    {resetErrors['passwordConfirmation'] && (
                                        <span className='label-text-alt text-red-500'>
                                            {resetErrors['passwordConfirmation']?.message}
                                        </span>
                                    )}
                                </label>

                                <div className='flex justify-center items-center gap-7 mt-6'>
                                    <Button
                                        spacing={false}
                                        outline={false}
                                        className='w-full'
                                        disabled={isResetSubmitting}
                                    >
                                        {isResetSubmitting ? 'Resetting...' : 'Reset Password'}
                                    </Button>
                                </div>

                                {/* Back to email step link */}
                                <button
                                    type='button'
                                    onClick={() => {
                                        setStep('email');
                                        setVerificationStatus('idle');
                                    }}
                                    className='w-full mt-4 text-center text-gray-500 hover:text-gray-700 urbanist-font transition-colors text-sm'
                                >
                                    ← Use a different email
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword