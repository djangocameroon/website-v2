"use client";

import Image from "next/image";
import { HomeImages } from '@/assets';
import { FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { LanguageSwitcher } from '@/components';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaXTwitter } from 'react-icons/fa6';
import { socialLinks } from '@/utils/constants';


const Footer = () => {

  const tc = useTranslations("Common");
  const pathname = usePathname();
  const isAuthRoute = pathname.includes('/auth');
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear > 2021 ? `2021-${currentYear}` : '2021';

  return (
    <div className={`${isAuthRoute ? 'hidden' : 'block'} flex bg-transparent flex-col md:flex-row gap-2 py-4 justify-between items-center w-full lg:w-[85%] lg:mx-auto border-t-2 border-gray-800`}>
      <Link href='/' className='font-bold bg-transparent text-2xl cursor-pointer flex items-start gap-1'>
        <Image src={HomeImages.Logo} alt='logo image' className='w-36 h-16 dark:invert dark:brightness-0' />
      </Link>
      <div className='text-lg md:text-base text-center md:text-left  text-opacity-80 urbanist-font'>
        <span className='urbanist-font'> {tc("footer.copyright", { yearRange })}</span>
        <Link className='block urbanist-font' href='/'>
          {' '}
          {tc("footer.termsPrivacy")}
        </Link>
      </div>
      <div>
        <span className="block text-lg md:text-base urbanist-font">
          <a href="/sitemap.xml">Sitemap</a>
          <span className="mx-2">•</span>
          <a href="/credits">{tc("footer.credits")}</a>
          <span className="mx-2">•</span>
          <a href="/faqs">{tc("footer.faqs")}</a>
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FiGithub size={24} />
        </Link>
        <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <FaXTwitter size={24} />
        </Link>
        <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FiLinkedin size={24} />
        </Link>
        <Link href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FiYoutube size={24} />
        </Link>
      </div>

      <LanguageSwitcher />
    </div>
  );
};

export default Footer;
