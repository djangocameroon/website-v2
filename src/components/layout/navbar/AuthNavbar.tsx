"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthImages } from '@/assets'

const AuthNavbar = () => {
  return (
    <div className='bg-transparent pt-[3.125rem] pb-[3.9rem]'>
      <Link href={"/"}>
        <Image
          src={AuthImages.whiteLogo}
          alt='logo'
          className='md:cursor-pointer h-[3.66rem] w-auto mx-auto'
        />
      </Link>
        
    </div>
  )
}

export default AuthNavbar