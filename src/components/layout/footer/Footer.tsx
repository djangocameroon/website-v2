import { HomeImages } from '../../../assets';
import { VscGithubAlt } from 'react-icons/vsc';
import { CiTwitter } from 'react-icons/ci';
import { FiLinkedin, FiYoutube } from 'react-icons/fi';
import { LanguageSwitcher } from '../..';


const Footer = () => {
  return (
    <div className=' flex bg-transparent flex-col md:flex-row gap-2 py-4 justify-between items-center w-full lg:w-[85%] lg:mx-auto border-t-2 border-gray-800'>
      <div className='font-bold bg-transparent text-2xl cursor-pointer flex items-start gap-1'>
        <img src={HomeImages.Logo} alt='logo image' className='w-36 h-16' />
      </div>
      <div className='text-lg md:text-base text-center md:text-left'>
        <span> &copy; 2023• Django Cameroon • All rights reserved</span>
        <a className='block' href='/'>
          {' '}
          Terms of use & Privacy Policy
        </a>
      </div>
      <div>
        <a className='block text-lg md:text-base' href='/'>
          FAQ's
        </a>
      </div>
      <div className='flex items-center gap-3'>
        <VscGithubAlt size='20' />
        <CiTwitter size='20' />
        <FiLinkedin size='20' />
        <FiYoutube size='20' />
      </div>

      <LanguageSwitcher />
    </div>
  );
}

export default Footer