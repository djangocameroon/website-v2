import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { HomeImages } from '../../../assets';
import { Button } from '../../layout';
import { ToggleSwitch } from '../../../components';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='w-full z-[7000] h-full fixed top-0 left-0 '>
      <div className='md:flex  bg-white items-center justify-between bg-transparent py-4 md:px-10 px-7'>
        {/* logo section */}
        <div className='font-bold text-2xl cursor-pointer flex items-start gap-1'>
          <img src={HomeImages.Logo} alt='logo image' className='w-36 h-16' />
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'
        >
          {open ? <AiOutlineClose size='27' /> : <HiMenuAlt3 size='27' />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center top-20 h-screen md:h-auto md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-[80%] md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? 'left-0' : 'left-[-890px]'
          }`}
        >
          <li className='md:ml-8 md:my-0 my-7 font-semibold '>
            <a
              href='#home'
              className='text-gray-800 text-xl capitalize hover:text-blue-400 duration-500'
            >
              Home
            </a>
          </li>
          <li className='md:ml-8 md:my-0 my-7 font-semibold '>
            <a
              href='#about'
              className='text-gray-800 text-xl capitalize hover:text-blue-400 duration-500'
            >
              About
            </a>
          </li>
          <li className='md:ml-8 md:my-0 my-7 font-semibold '>
            <a
              href='#event'
              className='text-gray-800 text-xl capitalize hover:text-blue-400 duration-500'
            >
              Event
            </a>
          </li>
          <li className='md:ml-8 md:my-0 my-7 font-semibold '>
            <a
              href='#project'
              className='text-gray-800 text-xl capitalize hover:text-blue-400 duration-500'
            >
              Project
            </a>
          </li>
          <li className='md:ml-8 md:my-0 my-7 font-semibold '>
            <a
              href='#contact'
              className='text-gray-800 text-xl capitalize hover:text-blue-400 duration-500'
            >
              Contact
            </a>
          </li>
          <li className='md:ml-8 md:my-0 my-7 font-semibold '>
            <a
              href='#chapter'
              className='text-gray-800 text-xl capitalize hover:text-blue-400 duration-500'
            >
              Chapter
            </a>
          </li>
          <li className=' flex items-start justify-between flex-col gap-3 md:hidden '>
            <Button
              outline={false}
              backgroundColor='bg-primary whitespace-nowrap'
            >
              Sign Up
            </Button>
            <div className='mt-1'>
              <ToggleSwitch />
            </div>
          </li>
        </ul>
        <div className='mx-4 items-center justify-between gap-3 hidden md:flex'>
          <Button outline={false} backgroundColor='bg-primary'>
            Sign Up
          </Button>
          <div className='mt-1'>
            <ToggleSwitch />
          </div>
        </div>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;
