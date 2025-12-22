import { HomeImages } from "@/assets";
import { Link } from "react-router-dom";
import { navLinks } from "@/utils/constants";
import { VscAccount } from "react-icons/vsc";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const ProjectNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E27]/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between w-[90%] mx-auto h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={HomeImages.Logo}
              alt="Django Cameroon"
              className="h-10 md:h-12 cursor-pointer brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((navLink, id) => (
              <li key={id}>
                <Link
                  to={navLink.link}
                  className="text-white/80 hover:text-white urbanist-font text-base lg:text-lg font-medium transition-all hover:scale-105"
                >
                  {navLink.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign In Button - Desktop */}
          <div className="hidden md:block">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 bg-[#4A90E2] text-white urbanist-font font-semibold text-base px-5 py-2.5 rounded-lg hover:bg-[#357ABD] transition-all"
            >
              <VscAccount className="w-5 h-5" />
              Sign in
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <AiOutlineClose size={25} /> : <HiMenuAlt3 size={25} />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-20 left-0 right-0 bg-[#0A0E27]/98 backdrop-blur-md border-b border-white/10 transition-all duration-300 z-40 ${
          open
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((navLink, id) => (
            <li key={id}>
              <Link
                to={navLink.link}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white urbanist-font text-lg font-medium transition-all"
              >
                {navLink.label}
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <Link
              to="/auth/login"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 bg-[#4A90E2] text-white urbanist-font font-semibold text-base px-6 py-3 rounded-lg hover:bg-[#357ABD] transition-all"
            >
              <VscAccount className="w-5 h-5" />
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectNavbar;
