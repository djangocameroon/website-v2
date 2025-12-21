import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { HomeImages } from '@/assets';
import { ToggleSwitch } from '@/components';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn, navLinks } from '@/utils/constants';
import { Button } from '../button';
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const pagesWithSecondaryNavbar = ['/about', '/blog', 'projects'];
  // const [nav, setNav] = useState(false)

  const { pathname } = useLocation();
  const isAuthRoute = pathname.includes('/auth');

  const variant = pagesWithSecondaryNavbar.includes(pathname)
    ? 'secondary'
    : 'default';

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
        className={cn(
          isAuthRoute ? 'hidden' : 'block',
          'h-20 transition-all',
          navBg ? 'bg-white md:shadow-lg' : 'bg-white sm:bg-transparent', {
          'max-sm:backdrop-blur-lg max-sm:bg-transparent': variant === 'secondary' && !navBg && !open,
        }
        )}
      >
        <div className='flex items-center font-medium justify-around lg:justify-between lg:w-[90%] lg:mx-auto'>
          <div className='z-50 p-5 md:w-auto w-full flex justify-between'>
            <Link to='/'>
              <img
                src={HomeImages.Logo}
                alt='logo'
                className={cn('cursor-pointer h-[3.3rem]', {
                  "invert brightness-0": variant === "secondary" && !navBg && !open,
                })}
              />
            </Link>
            <div className={cn('text-3xl md:hidden', {
              'text-white': !navBg && variant === 'secondary' && !open,
            })} onClick={() => setOpen(!open)}>
              {open ? <AiOutlineClose size='25' /> : <HiMenuAlt3 size='25' />}
              {/* {open ? <AiOutlineClose size='25' /> : <HiMenuAlt3 size='25' />} */}
            </div>
          </div>
          <ul className={cn(
            'md:flex hidden capitalise items-center overflow-hidden gap-12'
          )}>
            {
              navLinks.map((navLink, id) => {
                const isActive = pathname === navLink.link;
                return (
                  <li
                    key={id}
                    className={cn(
                      'hover:scale-105 hover:text-primary transition-all text-xl',
                      isActive ? 'font-bold text-primary' : 'font-medium',
                      {
                        'text-white': !navBg && variant === 'secondary',
                        'hover:text-secondary/90': !navBg && variant === 'secondary' && !isActive,
                        'hover:text-secondary': !navBg && variant === 'secondary' && isActive,
                      }
                    )}
                  >
                    <Link to={navLink.link} className='py-7 text-lg inline-block urbanist-font'>
                      {navLink.label}
                    </Link>
                  </li>
                );
              })
            }
          </ul>
          <div className={cn(
            'md:flex hidden flex-row items-center justify-between gap-4 lg:gap-6'
          )}>
            <Link to='/auth/login'>
              <Button
                outline={false}
                spacing={false}
                className={cn(
                  "duration-500 hover:scale-90 font-medium text-xl transition-all py-2.5 px-5 urbanist-font flex gap-x-2.5 items-center",
                  {
                    'bg-secondary text-white': (variant === 'secondary' && !navBg),
                  }
                )}
              >
                <VscAccount className='w-6 h-6' />
                Sign In
              </Button>
            </Link>
          </div>
          {/* Mobile nav */}
          <ul
            className={`
        md:hidden bg-white backdrop-blur-0 fixed w-[70%] top-0 overflow-hidden bottom-0 py-24
        duration-500 ${open ? 'left-0' : 'left-[-100%]'}
        `}
          >
            {navLinks.map((navLink, id) => {
              const isActive = pathname === navLink.link;
              return (
                <li
                  key={id}
                  className={cn(
                    "w-full hover:bg-primary hover:text-white",
                    isActive && "bg-primary text-white"
                  )}
                >
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
