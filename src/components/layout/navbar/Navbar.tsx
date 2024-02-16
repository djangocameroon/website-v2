
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { HomeImages } from '../../../assets';
import { ToggleSwitch } from '../../../components';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
   const isAuthRoute= pathname.includes('/auth')

  return (
    
      <nav
        className={` ${
          isAuthRoute ? 'hidden' : 'block'
        } w-full bg-white flex items-center justify-center `}
      >
        <div className='md:flex w-[95%] lg:w-[90%] mx-auto items-center justify-between bg-transparent py-4'>
          {/* logo section */}
          <div className='cursor-pointer flex items-start'>
            <img src={HomeImages.Logo} alt='logo image' className='w-32 h-16' />
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
            className={`md:flex md:items-center md:justify-between lg:w-[67%] top-20 h-screen md:h-auto md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-[80%] md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? 'left-0' : 'left-[-990px]'
            }`}
          >
            <div className='md:flex md:items-center gap-3'>
              <li className=' md:my-0 my-7 font-medium '>
                <NavLink
                  to='/'
                  className='text-gray-800 text-[1.3rem] md:text-base lg:text-xl capitalize hover:text-blue-400 duration-500'
                >
                  Home
                </NavLink>
              </li>
              <li className=' md:my-0 my-7 font-medium '>
                <NavLink
                  to='/about'
                  className='text-gray-800 text-[1.3rem] md:text-base lg:text-xl capitalize hover:text-blue-400 duration-500'
                >
                  About
                </NavLink>
              </li>
              <li className=' md:my-0 my-7 font-medium '>
                <NavLink
                  to='/event'
                  className='text-gray-800 text-[1.3rem] md:text-base lg:text-xl capitalize hover:text-blue-400 duration-500'
                >
                  Event
                </NavLink>
              </li>
              <li className=' md:my-0 my-7 font-medium '>
                <NavLink
                  to='/project'
                  className='text-gray-800 text-[1.3rem] md:text-base lg:text-xl capitalize hover:text-blue-400 duration-500'
                >
                  Projects
                </NavLink>
              </li>
              <li className=' md:my-0 my-7 font-medium '>
                <NavLink
                  to='/contact'
                  className='text-gray-800 text-[1.3rem] md:text-base lg:text-xl capitalize hover:text-blue-400 duration-500'
                >
                  Contact
                </NavLink>
              </li>
              <li className=' md:my-0 my-7 font-medium '>
                <NavLink
                  to='/chapter'
                  className='text-gray-800 text-[1.3rem] md:text-base lg:text-xl capitalize hover:text-blue-400 duration-500'
                >
                  Chapter
                </NavLink>
              </li>
            </div>
            <li className='md:mx-4 flex md:flex-row flex-col items-start md:items-center justify-between gap-3'>
              <NavLink
                to='/auth/login'
                className='text-xl capitalize bg-primary px-4 py-2 text-white hover:scale-90 transition-all rounded-md duration-500'
              >
                Login
              </NavLink>
              <div className='mt-1'>
                <ToggleSwitch />
              </div>
            </li>
          </ul>

          {/* button */}
        </div>
      </nav>
  );
};

export default Navbar;




