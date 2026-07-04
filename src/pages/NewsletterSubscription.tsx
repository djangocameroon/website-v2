import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Helmet } from 'react-helmet-async';
import { AuthImages } from '@/assets';
import { Button } from '@/components/layout/button';
import { PageNotFound } from '@/components';
import { subsApi } from '@/lib/subsApi';

type Status = 'verifying' | 'success' | 'error';

const STATUS_COPY: Record<Exclude<Status, 'verifying'>, { title: string; fallback: string }> = {
  success: {
    title: "You're subscribed!",
    fallback: 'Your email has been verified. Welcome to the Django Cameroon community.',
  },
  error: {
    title: 'Subscription failed',
    fallback: 'This verification link is invalid or has expired.',
  },
};

const NewsletterSubscription = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>('verifying');
  const [message, setMessage] = useState('');
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!token || hasRequested.current) return;
    hasRequested.current = true;

    (async () => {
      try {
        const response = await subsApi.verifyToken(token);
        setMessage(response.message || STATUS_COPY.success.fallback);
        setStatus('success');
      } catch (error) {
        console.error('Error verifying subscription token:', error);
        const errorMessage = error instanceof AxiosError
          ? error?.response?.data?.message || STATUS_COPY.error.fallback
          : STATUS_COPY.error.fallback;
        setMessage(errorMessage);
        setStatus('error');
      }
    })();
  }, [token]);

  if (!token) {
    return <PageNotFound />;
  }

  return (
    <div className="green-backbg w-screen min-h-dvh flex items-center justify-center bg-inherit overflow-hidden relative">
      <Helmet>
        <title>Newsletter subscription | Django Cameroon</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl motion-safe:animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl motion-safe:animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-6 max:px-2 motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]">
        <div className="sm:backdrop-blur-xl sm:bg-white/5 sm:border border-white/10 rounded-[2rem] p-8 md:p-10 sm:shadow-2xl text-center">
          <Link to="/" className="block w-fit mx-auto mb-8 group">
            <img
              src={AuthImages.whiteLogo}
              alt="Django Cameroon"
              className="h-14 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(66,133,244,0.4)]"
            />
          </Link>

          <div aria-live="polite" className="flex flex-col items-center">
            <StatusSeal status={status} />

            {status === 'verifying' && (
              <div className="mt-8 space-y-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white nohemi-font tracking-tight">
                  Confirming your subscription
                </h1>
                <p className="text-white/70 urbanist-font text-base md:text-lg leading-relaxed max-w-sm mx-auto">
                  Hang tight, we&apos;re verifying your link.
                </p>
              </div>
            )}

            {status !== 'verifying' && (
              <div className="mt-8 space-y-3 motion-safe:animate-[fadeIn_0.5s_ease-out_0.1s_both]">
                <h1 className="text-2xl md:text-3xl font-bold text-white nohemi-font tracking-tight">
                  {STATUS_COPY[status].title}
                </h1>
                <p className="text-white/70 urbanist-font text-base md:text-lg leading-relaxed max-w-sm mx-auto break-words">
                  {message || STATUS_COPY[status].fallback}
                </p>
              </div>
            )}
          </div>

          {status !== 'verifying' && (
            <div className="mt-10 motion-safe:animate-[fadeIn_0.5s_ease-out_0.2s_both]">
              <Link to="/">
                <Button
                  type="button"
                  backgroundColor="bg-secondary"
                  spacing={false}
                  className="w-full hover:shadow-[0_10px_40px_rgba(66,133,244,0.4)] hover:-translate-y-1"
                >
                  {status === 'success' ? 'Back to home' : 'Return to homepage'}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes sealSpin {
          to { transform: rotate(360deg); }
        }

        @keyframes sealDraw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes sealMarkDraw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes sealPop {
          0% { transform: scale(0.85); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

/**
 * The page's signature moment: a wax-seal-style ring that spins while the
 * token is verified server-side, then "stamps" itself shut as a check (success)
 * or crossed mark (failure) — echoing the community-membership framing of a
 * newsletter subscription rather than a generic spinner/checkmark swap.
 */
const StatusSeal = ({ status }: { status: Status }) => {
  const isVerifying = status === 'verifying';
  const isSuccess = status === 'success';

  return (
    <div className="relative size-24 md:size-28" role="img" aria-label={
      isVerifying ? 'Verifying subscription' : isSuccess ? 'Subscription confirmed' : 'Subscription failed'
    }>
      <svg viewBox="0 0 100 100" className="size-full">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="4"
        />
        {isVerifying ? (
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgb(66,133,244)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="66 197"
            className="origin-center motion-safe:animate-[sealSpin_1s_linear_infinite]"
          />
        ) : (
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={isSuccess ? 'rgb(15,157,88)' : 'rgb(219,68,55)'}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset="264"
            className="motion-safe:animate-[sealDraw_0.6s_ease-out_forwards] motion-reduce:[stroke-dashoffset:0]"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}
          />
        )}

        {isSuccess && (
          <path
            d="M32 52 L44 64 L69 37"
            fill="none"
            stroke="rgb(15,157,88)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60"
            strokeDashoffset="60"
            className="motion-safe:animate-[sealMarkDraw_0.4s_ease-out_0.5s_forwards] motion-reduce:[stroke-dashoffset:0]"
          />
        )}

        {status === 'error' && (
          <g
            stroke="rgb(219,68,55)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="40"
            strokeDashoffset="40"
          >
            <path
              d="M36 36 L64 64"
              className="motion-safe:animate-[sealMarkDraw_0.35s_ease-out_0.5s_forwards] motion-reduce:[stroke-dashoffset:0]"
            />
            <path
              d="M64 36 L36 64"
              className="motion-safe:animate-[sealMarkDraw_0.35s_ease-out_0.65s_forwards] motion-reduce:[stroke-dashoffset:0]"
            />
          </g>
        )}
      </svg>

      {!isVerifying && (
        <div className="absolute inset-0 motion-safe:animate-[sealPop_0.4s_ease-out_both]" />
      )}
    </div>
  );
};

export default NewsletterSubscription;
