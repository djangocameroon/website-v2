import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { HomeImages } from '@/assets';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '@/utils/constants';
import Button from '@/components/layout/button/Button';
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);

  const { pathname } = useLocation();
  const specialRoutes = ['/', '/blog']; 
  const isSpecialRoute = specialRoutes.includes(pathname);
  const isAuthRoute = pathname.includes('/auth');

  const changeNavColor = () => {
    window.scrollY >= 50 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavColor);
    return () => window.removeEventListener('scroll', changeNavColor);
  }, []);
  const isTransparent = isSpecialRoute && !navBg;

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${isAuthRoute ? 'hidden' : 'block'} ${
        isTransparent 
          ? 'bg-transparent py-5' 
          : 'bg-white shadow-lg py-3'
      }`}
    >
      <div className='flex items-center justify-between w-[92%] lg:w-[90%] mx-auto'>
        
        {/* Logo */}
        <div className='z-50'>
          <img
            src={HomeImages.Logo}
            alt='logo'
            className={`md:cursor-pointer h-10 lg:h-12 transition-all ${isTransparent ? 'brightness-0 invert' : ''}`} 
          />
        </div>

        {/* Desktop Links */}
        <ul className='hidden md:flex items-center gap-8 lg:gap-12'>
          {navLinks.map((navLink, id) => (
            <li key={id}>
              <Link 
                to={navLink.link} 
                className={`text-sm lg:text-base font-semibold transition-colors hover:text-blue-400 ${
                  isTransparent ? 'text-white' : 'text-gray-700'
                }`}
              >
                {navLink.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions (Button) */}
        <div className='hidden md:flex items-start justify-start gap-4'>
          <Link to='/auth/login'>
            <Button 
              className={`flex items-center gap-2 px-10 py-5 text-sm font-bold transition-all ${
                isTransparent 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-none' 
                  : 'bg-blue-600 text-white'
              }`}
            >
              <VscAccount className='w-5 h-5' />
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div 
          className={`text-3xl md:hidden cursor-pointer ${isTransparent ? 'text-white' : 'text-gray-900'}`} 
          onClick={() => setOpen(!open)}
        >
          {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm transition-opacity md:hidden
        ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `} onClick={() => setOpen(false)} />

      {/* Mobile Menu Sidebar */}
      <ul className={`
        md:hidden fixed top-0 h-screen w-[75%] bg-white py-20 px-10 transition-all duration-500 z-50
        ${open ? 'left-0' : 'left-[-100%]'}
      `}>
        {navLinks.map((navLink, id) => (
          <li key={id} className="mb-6">
            <Link 
              to={navLink.link} 
              className="text-xl font-bold text-gray-900"
              onClick={() => setOpen(false)}
            >
              {navLink.label}
            </Link>
          </li>
        ))}
        <div className="mt-10">
          <Link to='/auth/login' onClick={() => setOpen(false)}>
            <Button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">
              Sign In
            </Button>
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;