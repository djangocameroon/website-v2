import { resendVerificationEmail } from '@/apis'
import { AuthImages } from '@/assets/images'
import { useAuth } from '@/components/contexts/auth-context'
import { Button } from '@/components/layout/button'
import { AxiosError } from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const VerifyEmailComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const { verifyEmail } = useAuth()
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [loading, setLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [countdown, setCountdown] = useState(60)
    const [email, setEmail] = useState("")
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
    const [isShaking, setIsShaking] = useState(false)
    const [successPulse, setSuccessPulse] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Calculate filled count for progress indicator
    const filledCount = otp.filter(d => d !== "").length
    const isComplete = filledCount === 6

    useEffect(() => {
        const urlEmail = searchParams.get('email');
        const navigatedEmail = location.state?.email;

        const emailToUse = urlEmail || navigatedEmail;
        if (emailToUse) {
            setEmail(emailToUse)

            if (!urlEmail && navigatedEmail) {
                navigate(`/auth/verify-email?email=${encodeURIComponent(navigatedEmail)}`, { replace: true })
            }
        } else {
            navigate("/auth/register", { replace: true })
        }
    }, [location.state?.email, navigate, searchParams])

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    // Trigger success pulse when OTP is complete
    useEffect(() => {
        if (isComplete) {
            setSuccessPulse(true)
            const timer = setTimeout(() => setSuccessPulse(false), 600)
            return () => clearTimeout(timer)
        }
    }, [isComplete])

    const triggerShake = () => {
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500)
    }

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return

        if (!!value && !/^\d$/.test(value)) {
            toast.error("Invalid input. Please enter only numeric digits.")
            triggerShake()
            return
        }

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
        // Arrow key navigation
        if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault()
            inputRefs.current[index - 1]?.focus()
        }
        if (e.key === "ArrowRight" && index < 5) {
            e.preventDefault()
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleOnPaste = (e: React.ClipboardEvent, index = 0) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6)
        const newOtp = [...otp]
        let stoppedIndex = index

        for (let i = 0; i < (6 - index); i++) {
            if (!pastedData[i]) break
            if (!/^\d$/.test(pastedData[i])) {
                toast.error("Invalid input. Please paste only numeric digits.")
                triggerShake()
                break
            }
            newOtp[stoppedIndex] = pastedData[i]
            if (stoppedIndex < 5) stoppedIndex += 1
        }

        setOtp(newOtp)
        inputRefs.current[stoppedIndex]?.focus()
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        const otpCode = otp.join("")

        if (otpCode.length !== 6) {
            toast.error("Invalid OTP. Please enter all 6 digits.")
            triggerShake()
            return
        }

        setLoading(true)
        try {
            await verifyEmail({ email, otp: otpCode })
            toast.success("Email verified successfully!")   
            navigate("/auth/login", { replace: true })
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error?.response?.data.message || "Invalid OTP code."
                toast.error(`Verification Failed: ${errorMessage}`)
                triggerShake()
            }
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        setResendLoading(true)

        try {
            await resendVerificationEmail(email)
            toast.success("OTP sent! A new verification code has been sent to your email.")
            setCountdown(60)
            setOtp(["", "", "", "", "", ""])
            inputRefs.current[0]?.focus()
        } catch (error) {
            if (error instanceof AxiosError) {
                let errorMessage = error?.response?.data.message || "Failed to resend code."
                if (error.status === 429) 
                        errorMessage = "Too many requests. Please wait before trying again."
                toast.error(`Failed to resend OTP: ${errorMessage}`)
            }
        } finally {
            setResendLoading(false)
        }
    }

    // Format countdown as mm:ss
    const formatCountdown = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="green-backbg w-screen min-h-screen flex items-center justify-center bg-inherit overflow-hidden relative">
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
            </div>

            <div className="relative z-10 w-full max-w-lg px-6 max:px-2 animate-[fadeInUp_0.6s_ease-out_forwards]">

                {/* Glass card container */}
                <div className="sm:backdrop-blur-xl am:bg-white/5 sm:border border-white/10 rounded-[2rem] p-8 md:p-10 sm:shadow-2xl">
                    {/* Header section */}
                    <div className="text-center mb-10 space-y-4 animate-[fadeIn_0.5s_ease-out_0.2s_both]">
                        {/* Logo with hover effect */}
                        <Link
                            to="/"
                            className="block w-fit mx-auto mb-10 group"
                        >
                            <img
                                src={AuthImages.whiteLogo}
                                alt="Django Cameroon"
                                className="h-14 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(66,133,244,0.4)]"
                            />
                        </Link>

                        <h1 className="text-2xl md:text-3xl font-bold text-white nohemi-font tracking-tight">
                            Verify your email
                        </h1>
                        <p className="text-white/70 urbanist-font text-base md:text-lg leading-relaxed max-w-sm mx-auto">
                            We&apos;ve sent a 6-digit code to<br />
                            <span className="text-secondary font-semibold break-all">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-8">
                        {/* OTP Input Grid */}
                        <div className="space-y-4">
                            <div
                                className={`flex justify-center gap-2 md:gap-3 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                            >
                                {otp.map((digit: string, index: number) => (
                                    <div
                                        key={index}
                                        className="relative"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {/* Glow effect for focused/filled inputs */}
                                        <div
                                            className={`
                                                absolute -inset-1 rounded-2xl transition-all duration-300
                                                ${focusedIndex === index
                                                    ? 'bg-secondary/40 blur-sm scale-105'
                                                    : digit
                                                        ? 'bg-secondary/20 blur-sm'
                                                        : 'bg-transparent'
                                                }
                                            `}
                                        />
                                        <input
                                            ref={(el) => { inputRefs.current[index] = el }}
                                            onPaste={(e) => handleOnPaste(e, index)}
                                            id={`otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onFocus={() => setFocusedIndex(index)}
                                            onBlur={() => setFocusedIndex(null)}
                                            autoComplete="one-time-code"
                                            className={`
                                                relative w-12 h-14 md:w-14 md:h-16
                                                bg-white/10 backdrop-blur-sm
                                                text-center text-2xl md:text-3xl font-bold text-white
                                                rounded-xl border-2 transition-all duration-300 ease-out
                                                focus:outline-none urbanist-font
                                                ${focusedIndex === index
                                                    ? 'border-secondary bg-white/15 scale-105 shadow-[0_0_30px_rgba(66,133,244,0.3)]'
                                                    : digit
                                                        ? 'border-secondary/60 bg-white/12'
                                                        : 'border-white/20 hover:border-white/40 hover:bg-white/12'
                                                }
                                                ${successPulse && digit ? 'animate-[successPop_0.3s_ease-out]' : ''}
                                                ${index === 2 ? 'mr-2 md:mr-4' : ''}
                                            `}
                                            style={{
                                                animationDelay: successPulse ? `${index * 50}ms` : '0ms',
                                                caretColor: 'transparent'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Progress indicator */}
                            <div className="flex justify-center items-center gap-2 pt-2">
                                <div className="flex gap-1">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`
                                                w-2 h-2 rounded-full transition-all duration-300
                                                ${i < filledCount
                                                    ? 'bg-secondary scale-100'
                                                    : 'bg-white/20 scale-75'
                                                }
                                            `}
                                            style={{ transitionDelay: `${i * 30}ms` }}
                                        />
                                    ))}
                                </div>
                                <span className="text-white/50 text-sm urbanist-font ml-2">
                                    {filledCount}/6
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading || !isComplete}
                            backgroundColor={isComplete ? "bg-secondary" : "bg-white/20"}
                            spacing={false}
                            className={`
                                w-full relative overflow-hidden group
                                transition-all duration-500 ease-out
                                ${isComplete
                                    ? 'hover:shadow-[0_10px_40px_rgba(66,133,244,0.4)] hover:-translate-y-1'
                                    : 'cursor-not-allowed'
                                }
                            `}
                        >
                            {/* Button shimmer effect */}
                            <div
                                className={`
                                    absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                    -translate-x-full transition-transform duration-1000
                                    ${isComplete && !loading ? 'group-hover:translate-x-full' : ''}
                                `}
                            />
                            <span className={`relative flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                                <span>Verify Email</span>
                                {isComplete && (
                                    <svg className="w-5 h-5 animate-[bounceRight_1s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                )}
                            </span>
                            {loading && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                </span>
                            )}
                        </Button>
                    </form>

                    {/* Resend section */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3 animate-[fadeIn_0.5s_ease-out_0.4s_both]">
                        <p className="text-white/60 urbanist-font text-sm">
                            Didn&apos;t receive the code?{' '}
                            <span className="text-white/40">Check your spam folder</span>
                        </p>

                        <button
                            onClick={handleResend}
                            disabled={countdown > 0 || resendLoading}
                            className={`
                                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                                urbanist-font font-medium text-sm
                                transition-all duration-300 ease-out
                                ${countdown > 0 || resendLoading
                                    ? 'text-white/40 cursor-not-allowed'
                                    : 'text-secondary hover:bg-secondary/10 hover:text-secondary active:scale-95'
                                }
                            `}
                        >
                            {resendLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Sending...</span>
                                </>
                            ) : countdown > 0 ? (
                                <>
                                    {/* Circular countdown indicator */}
                                    <div className="relative w-8 h-8">
                                        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="14"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                opacity="0.2"
                                            />
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="14"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeDasharray={`${(countdown / 60) * 88} 88`}
                                                className="text-secondary transition-all duration-1000 ease-linear"
                                            />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                                            {countdown}
                                        </span>
                                    </div>
                                    <span>Resend in {formatCountdown(countdown)}</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Resend Code</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Back to login link */}
                <div className="mt-8 text-center animate-[fadeIn_0.5s_ease-out_0.6s_both]">
                    <Link
                        to="/auth/login"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white urbanist-font text-sm transition-colors duration-300 group"
                    >
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to login</span>
                    </Link>
                </div>
            </div>

            {/* Keyframe animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10% { transform: translateX(-8px); }
                    30% { transform: translateX(8px); }
                    50% { transform: translateX(-6px); }
                    70% { transform: translateX(6px); }
                    90% { transform: translateX(-4px); }
                }
                
                @keyframes successPop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
                
                @keyframes bounceRight {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(4px); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
            `}</style>
        </div>
    )
}

export default VerifyEmailComponent