import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { HomeImages } from '@/assets';
import { ToggleSwitch } from '@/components';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '@/utils/constants';
import { Button } from '../button';
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);
  // const [nav, setNav] = useState(false)

  const { pathname } = useLocation();
  const isAuthRoute = pathname.includes('/auth');

  const changeNavColor = () => {
    window.scrollY >= 200 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavColor);
    return () => {
      window.removeEventListener('scroll', changeNavColor);
    };
  }, []);

  return (
    <>
      <nav
        className={` ${isAuthRoute ? 'hidden' : 'block'} h-20 transition-all ${
          navBg === true
            ? 'bg-white md:shadow-lg'
            : 'bg-white sm:bg-transparent'
        }`}
      >
        <div className='flex items-center font-medium justify-around lg:justify-between lg:w-[90%] lg:mx-auto'>
          <div className='z-50 p-5 md:w-auto w-full flex justify-between'>
            <img
              src={HomeImages.Logo}
              alt='logo'
              className='md:cursor-pointer h-[3.3rem]'
            />
            <div className='text-3xl md:hidden' onClick={() => setOpen(!open)}>
              {open ? <AiOutlineClose size='25' /> : <HiMenuAlt3 size='25' />}
            </div>
          </div>
          {/* <ul className='md:flex hidden capitalise items-center overflow-hidden gap-12'>
            {
              navLinks.map((navLink, id) => (
                <li key={id} className='hover:scale-105 hover:text-primary font-medium hover:font-bold transition-all urbanist-font text-xl'>
                  <Link to={navLink.link} className='py-7 text-lg inline-block'>
                    {navLink.label}
                  </Link>
                </li>
              ))
            } */}
            {/* <li className='hover:scale-105 hover:text-primary font-semibold hover:font-bold  transition-all'>
              <Link to='/' className='py-7 text-lg  inline-block'>
                Home
              </Link>
            </li>
            <li className='hover:scale-105 hover:text-primary font-semibold hover:font-bold transition-all'>
              <Link to='/about' className='py-7 text-lg  inline-block'>
                About
              </Link>
            </li>
            <li className='hover:scale-105 hover:text-primary font-semibold hover:font-bold transition-all'>
              <Link to='/' className='py-7 text-lg  inline-block'>
                Event
              </Link>
            </li>
            <li className='hover:scale-105 hover:text-primary font-semibold hover:font-bold transition-all'>
              <Link to='/' className='py-7 text-lg  inline-block'>
                Projects
              </Link>
            </li>

            <li className='hover:scale-105 hover:text-primary font-semibold hover:font-bold transition-all'>
              <Link to='/' className='py-7 text-lg  inline-block'>
                Contact
              </Link>
            </li>
            <li className='hover:scale-105 hover:text-primary font-semibold hover:font-bold transition-all'>
              <Link to='/' className='py-7 text-lg  inline-block'>
                Chapter
              </Link>
            </li> */}
          {/* Desktop View Container */}
          {/* </ul>
           */}
{/* the desktop view container of our website */}
<div className='md:flex hidden flex-row items-center justify-between gap-4 lg:gap-6'>
    {/* links*/}
    <nav>
        <ul className="flex items-center space-x-6 lg:space-x-8">
            {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/', label: 'Event' },
                { path: '/', label: 'Project' },
                { path: '/', label: 'Contact' },
                { path: '/', label: 'Chapter' },
            ].map((item) => (
                <li key={item.label} className="relative group">
                    <Link
                        to={item.path}
                        // changing the text to primary green on hover
                        className='
                            text-gray-700 font-semibold text-base py-3 transition-colors duration-300
                            hover:text-[#103e2e] tracking-wide
                        '
                    >
                        {item.label}
                    </Link>
                    {/* animated underline on nav links uses primary green color */}
                    <span className='
                        absolute bottom-0 left-0 h-0.5 bg-[#103e2e] transition-all duration-300 ease-in-out
                        group-hover:w-full w-0
                    '></span>
                </li>
            ))}
        </ul>
    </nav>

    {/*the sign in button*/}
    <Link to='/auth/login'>
        <Button
            outline={false}
            spacing={false}
            //sign in button backgrounduses primary green color
            className="
                duration-300 hover:scale-105 active:scale-95 font-medium text-lg transition-all py-2.5 px-5
                bg-[#103e2e] text-white rounded-full shadow-md hover:shadow-lg hover:bg-[#0c3124]
                flex gap-x-2.5 items-center urbanist-font
            "
        >
            <VscAccount className='w-6 h-6' />
            Sign In
        </Button>
    </Link>
</div>

{/*for the mobile view*/}
<ul
    className={`
        md:hidden bg-gray-50 fixed w-[75%] top-0 bottom-0 py-24 px-4 shadow-2xl z-50
        transition-all ease-in-out duration-500
        ${open ? 'left-0' : 'left-[-100%]'}
    `}
>
    <div className='flex flex-col gap-1 border-b border-gray-200 pb-4 mb-4'>
        <li className='w-full rounded-lg transition-all duration-300 ease-out hover:scale-[1.02]'>
            <Link
                to='/'
                // links hover background effect with primary color
                className='block py-3 px-4 text-gray-700 hover:bg-[#103e2e] hover:text-white rounded-lg capitalize text-lg font-medium transition-colors duration-300'
            >
                Home
            </Link>
        </li>
        <li className='w-full rounded-lg transition-all duration-300 ease-out hover:scale-[1.02]'>
            <Link
                to='/about'
                className='block py-3 px-4 text-gray-700 hover:bg-[#103e2e] hover:text-white rounded-lg capitalize text-lg font-medium transition-colors duration-300'
            >
                About
            </Link>
        </li>
        <li className='w-full rounded-lg transition-all duration-300 ease-out hover:scale-[1.02]'>
            <Link
                to='/'
                className='block py-3 px-4 text-gray-700 hover:bg-[#103e2e] hover:text-white rounded-lg capitalize text-lg font-medium transition-colors duration-300'
            >
                Event
            </Link>
        </li>
        <li className='w-full rounded-lg transition-all duration-300 ease-out hover:scale-[1.02]'>
            <Link
                to='/'
                className='block py-3 px-4 text-gray-700 hover:bg-[#103e2e] hover:text-white rounded-lg capitalize text-lg font-medium transition-colors duration-300'
            >
                Project
            </Link>
        </li>

        <li className='w-full rounded-lg transition-all duration-300 ease-out hover:scale-[1.02]'>
            <Link
                to='/'
                className='block py-3 px-4 text-gray-700 hover:bg-[#103e2e] hover:text-white rounded-lg capitalize text-lg font-medium transition-colors duration-300'
            >
                Contact
            </Link>
        </li>
        <li className='w-full rounded-lg transition-all duration-300 ease-out hover:scale-[1.02]'>
            <Link
                to='/'
                className='block py-3 px-4 text-gray-700 hover:bg-[#103e2e] hover:text-white rounded-lg capitalize text-lg font-medium transition-colors duration-300'
            >
                Chapter
            </Link>
        </li>
    </div>
    <div className='py-5 flex flex-col gap-6 items-start justify-start px-4'>
        <Link to='/auth/login'>
            <Button
                outline={false}
                spacing={true}
                className="bg-[#103e2e] text-white font-semibold rounded-full px-8 py-3 shadow-md hover:shadow-lg hover:bg-[#0c3124] active:scale-95 transition-all duration-300"
            >
                Sign Up
            </Button>
        </Link>
        <div className='mt-2'>
            <ToggleSwitch />
        </div>
    </div>
</ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
