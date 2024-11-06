import { HomeImages } from '@/assets';
import { VscGithubAlt } from 'react-icons/vsc';
import { CiTwitter } from 'react-icons/ci';
import { FiLinkedin, FiYoutube } from 'react-icons/fi';
import { LanguageSwitcher } from '@/components';
import { useLocation } from 'react-router-dom';


const Footer = () => { 

    const { pathname } = useLocation();
    const isAuthRoute = pathname.includes('/auth');

  return (
    <div className={`${isAuthRoute ? 'hidden' : 'block'} flex bg-transparent flex-col md:flex-row gap-2 py-4 justify-between items-center w-full lg:w-[85%] lg:mx-auto border-t-2 border-gray-800`}>
      <div className='font-bold bg-transparent text-2xl cursor-pointer flex items-start gap-1'>
        <img src={HomeImages.Logo} alt='logo image' className='w-36 h-16' />
      </div>
      <div className='text-lg md:text-base text-center md:text-left  text-opacity-80 urbanist-font'>
        <span className='urbanist-font'> &copy; 2023• Django Cameroon • All rights reserved</span>
        <a className='block urbanist-font' href='/'>
          {' '}
          Terms of use & Privacy Policy
        </a>
      </div>
      <div>
        <a className='block text-lg md:text-base urbanist-font' href='/'>
        Sitemap • Credits • FAQs
        </a>
      </div>
      <div className='flex items-center gap-2.5'>
        <VscGithubAlt size='24' />
        <CiTwitter size='24' />
        <FiLinkedin size='24' />
        <FiYoutube size='24' />
      </div>

      <LanguageSwitcher />
    </div>
  );
}

export default Footer