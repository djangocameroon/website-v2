import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { HomeImages } from '@/assets';
import { navLinks } from '@/utils/constants';
import { ToggleSwitch } from '@/components';
import { Button } from '../button';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);

  const { pathname } = useLocation();
  const isAuthRoute = pathname.includes('/auth');

  useEffect(() => {
    const changeNavColor = () => {
      setNavBg(window.scrollY >= 200);
    };

    window.addEventListener('scroll', changeNavColor);
    return () => window.removeEventListener('scroll', changeNavColor);
  }, []);

  /* to  prevent body scroll when mobile menu is open*/
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  if (isAuthRoute) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`relative z-50 h-20 transition-all ${
          navBg ? 'bg-white md:shadow-lg' : 'bg-white sm:bg-transparent'
        }`}
      >
        <div className="flex items-center font-medium justify-around lg:justify-between lg:w-[90%] lg:mx-auto">

         
          <div className="z-50 p-5 w-full md:w-auto flex justify-between items-center">
            <Link to="/">
              <img
                src={HomeImages.Logo}
                alt="logo"
                className="cursor-pointer h-[3.3rem]"
              />
            </Link>

            <div
              className="text-3xl md:hidden cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {open ? <AiOutlineClose size={25} /> : <HiMenuAlt3 size={25} />}
            </div>
          </div>

          {/* navbar desktop view */}
          <ul className="md:flex hidden capitalize items-center gap-12">
            {navLinks.map((navLink) => {
              const isActive = pathname === navLink.link;
              return (
                <li
                  key={navLink.link}
                  className={`urbanist-font text-xl transition-all hover:scale-105 ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'font-medium hover:text-primary'
                  }`}
                >
                  <Link to={navLink.link} className="py-7 inline-block">
                    {navLink.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/*mobile view navbar*/}
          <div className="md:flex hidden items-center gap-6">
            <Link to="/auth/login">
              <Button
                outline={false}
                spacing={false}
                className="flex items-center gap-2.5 text-xl py-2.5 px-5 transition-all hover:scale-90"
              >
                <VscAccount className="w-6 h-6" />
                Sign In
              </Button>
            </Link>
          </div>
          <ul
            className={`md:hidden fixed top-0 bottom-0 left-0 w-[70%] bg-white py-24 z-50
              overscroll-contain transition-all duration-500
              ${open ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            {navLinks.map((navLink) => {
              const isActive = pathname === navLink.link;
              return (
                <li
                  key={navLink.link}
                  className={`w-full ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary hover:text-white'
                  }`}
                >
                  <Link
                    to={navLink.link}
                    className="block py-5 px-10 text-xl capitalize"
                    onClick={() => setOpen(false)}
                  >
                    {navLink.label}
                  </Link>
                </li>
              );
            })}

            <div className="px-10 py-6 flex flex-col gap-6">
              <Link to="/auth/login" onClick={() => setOpen(false)}>
                <Button
                  outline={false}
                  spacing={false}
                  className="w-full transition-all hover:scale-95"
                >
                  Sign In
                </Button>
              </Link>

              <ToggleSwitch />
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
