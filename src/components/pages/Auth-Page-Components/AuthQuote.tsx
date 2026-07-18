"use client";

import Image from "next/image";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { AuthImages } from '@/assets'

const AuthQuote = () => {
    const pathname = usePathname();
    const t = useTranslations("AuthPage.quote");
    const { avatarsList } = AuthImages;

    const isRegisterPage = pathname === '/auth/register'

    const backgroundImageImage = isRegisterPage ? "stevebg-auth" : "joelfahbg-auth"
    const quote = isRegisterPage ? t("register") : t("login")

    const quoteAuthor = isRegisterPage ? "- Steve Yonkeu" : "- Joël FAH"
    
  return (
    <div className={`${backgroundImageImage} max-w-[31rem] w-full h-full hidden md:flex rounded-[3.125rem] border border-secondary px-5 items-end relative`}>
        <div className="space-y-2.5 text-white mb-[3.125rem]">
            <p className='urbanist-font'>{quote}</p>
            <p className="text-end italic font-medium text-xl">{quoteAuthor}</p>
        </div>
        <Image src={avatarsList} alt="avatars" className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'  />
    </div>
  )
}

export default AuthQuote