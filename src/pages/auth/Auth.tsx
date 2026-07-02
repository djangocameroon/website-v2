
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TogglePage } from '@/components/pages/Auth-Page-Components';
import { AuthFooter, AuthNavbar } from '@/components/layout';
import { useAuth } from '@/components/contexts/auth-context';
import { useEffect } from 'react';
import { HomeImages } from '@/assets';

const Auth = () => {
  const location = useLocation();
  const showAuthComponent = ['/auth/login', '/auth/register'].includes(location.pathname);

  if (!showAuthComponent) return (
    <>
      <Outlet />
      <AuthFooter />
    </>
  );

  return (
    <div className='relative md:px-5 flex flex-col md:gap-2 justify-start h-screen items-center  overflow-auto'>
      <div className="fixed inset-0 -z-10 bg-primary/90" />
      <img
        src={HomeImages.greenBackBg}
        alt=""
        fetchPriority="high"
        className="fixed inset-0 -z-10 size-full object-cover"
      />

      <AuthNavbar />
      <div className='md:mb-[4.625rem] mb-10'>
        <TogglePage />
      </div>

      <Outlet />

      <div className="mt-[6.75rem] w-full">
        <AuthFooter />
      </div>

    </div>

  )
}

export const AuthRedirectWrapper = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = new URLSearchParams(window.location.search).get('redirect');
      navigate(redirectPath || '/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>{children}</>

  )
}

export default Auth;