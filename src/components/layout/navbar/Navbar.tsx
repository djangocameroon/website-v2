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
    if (window.scrollY >= 200) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
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
            <Link to='/'>
              <img
                src={HomeImages.Logo}
                alt='logo'
                className='cursor-pointer h-[3.3rem]'
              />
            </Link>
            <div className='text-3xl md:hidden' onClick={() => setOpen(!open)}>
              {open ? <AiOutlineClose size='25' /> : <HiMenuAlt3 size='25' />}
            </div>
          </div>
          <ul className='md:flex hidden capitalise items-center overflow-hidden gap-12'>
            {
              navLinks.map((navLink, id) => {
                const isActive = pathname === navLink.link;
                return (
                  <li key={id} className={`hover:scale-105 hover:text-primary transition-all urbanist-font text-xl ${isActive ? 'text-primary font-bold' : 'font-medium'}`}>
                    <Link to={navLink.link} className='py-7 text-lg inline-block'>
                      {navLink.label}
                    </Link>
                  </li>
                );
              })
            }
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
          </ul>
          <div className='md:flex hidden  flex-row items-center justify-between gap-4 lg:gap-6'>
            <Link to='/auth/login'>
                <Button outline={false} spacing={false} className="duration-500 hover:scale-90 font-medium text-xl transition-all py-2.5 px-5 urbanist-font flex gap-x-2.5 items-center">
                  <VscAccount className='w-6 h-6' />
                  Sign In
                </Button>
            </Link>
            {/* <div className='mt-1'>
              <ToggleSwitch />
            </div> */}
          </div>
          {/* Mobile nav */}
          <ul
            className={`
        md:hidden bg-white fixed w-[70%] top-0 overflow-hidden bottom-0 py-24
        duration-500 ${open ? 'left-0' : 'left-[-100%]'}
        `}
          >
            {navLinks.map((navLink, id) => {
              const isActive = pathname === navLink.link;
              return (
                <li key={id} className={`w-full hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                  <Link
                    to={navLink.link}
                    className='py-5 capitalise text-xl inline-block px-10'
                    onClick={() => setOpen(false)}
                  >
                    {navLink.label}
                  </Link>
                </li>
              );
            })}

            <div className='py-5 flex flex-col gap-7 items-start justify-start px-10'>
              <Link to='/auth/login'>
                <Button outline={false} spacing={false} className="duration-500 hover:scale-90 transition-all">
                  Sign Up
                </Button>
              </Link>
              <div className='mt-1'>
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
