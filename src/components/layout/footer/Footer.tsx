import { HomeImages } from '@/assets';
import { FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { LanguageSwitcher } from '@/components';
import { useLocation, Link } from 'react-router-dom';
import { FaXTwitter } from 'react-icons/fa6';
import { socialLinks } from '@/utils/constants';


const Footer = () => {

  const { pathname } = useLocation();
  const isAuthRoute = pathname.includes('/auth');
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear > 2021 ? `2021-${currentYear}` : '2021';

  return (
    <div className={`${isAuthRoute ? 'hidden' : 'block'} flex bg-transparent flex-col md:flex-row gap-2 py-4 justify-between items-center w-full lg:w-[85%] lg:mx-auto border-t-2 border-gray-800`}>
      <Link to='/' className='font-bold bg-transparent text-2xl cursor-pointer flex items-start gap-1'>
        <img src={HomeImages.Logo} alt='logo image' className='w-36 h-16' />
      </Link>
      <div className='text-lg md:text-base text-center md:text-left  text-opacity-80 urbanist-font'>
        <span className='urbanist-font'> &copy; {yearRange} • Django Cameroon • All rights reserved</span>
        <a className='block urbanist-font' href='/'>
          {' '}
          Terms of use & Privacy Policy
        </a>
      </div>
      <div>
        <span className="block text-lg md:text-base urbanist-font">
          <a href="/sitemap">Sitemap</a>
          <span className="mx-2">•</span>
          <a href="/credits">Credits</a>
          <span className="mx-2">•</span>
          <a href="/faqs">FAQs</a>
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <Link to={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FiGithub size={24} />
        </Link>
        <Link to={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <FaXTwitter size={24} />
        </Link>
        <Link to={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FiLinkedin size={24} />
        </Link>
        <Link to={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FiYoutube size={24} />
        </Link>
      </div>

      <LanguageSwitcher />
    </div>
  );
};

export default Footer;
