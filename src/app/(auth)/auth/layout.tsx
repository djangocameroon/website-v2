"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { TogglePage } from '@/components/pages/Auth-Page-Components';
import { AuthFooter, AuthNavbar } from '@/components/layout';
import { HomeImages } from '@/assets';

const AuthLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const pathname = usePathname();
  const showAuthComponent = ['/auth/login', '/auth/register'].includes(pathname);

  if (!showAuthComponent) return (
    <>
      {children}
      <AuthFooter />
    </>
  );

  return (
    <div className='relative md:px-5 flex flex-col md:gap-2 justify-start h-screen items-center  overflow-auto'>
      <div className="fixed inset-0 -z-10 bg-primary/90" />
      <Image
        src={HomeImages.greenBackBg}
        alt=""
        priority
        className="fixed inset-0 -z-10 size-full object-cover"
      />

      <AuthNavbar />
      <div className='md:mb-[4.625rem] mb-10'>
        <TogglePage />
      </div>

      {children}

      <div className="mt-[6.75rem] w-full">
        <AuthFooter />
      </div>

    </div>

  )
}

export default AuthLayout;
