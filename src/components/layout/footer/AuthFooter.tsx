import { Link, useLocation } from "react-router-dom";
import { FiGithub, FiLinkedin, FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { HomeImages } from "@/assets";
import { LanguageSwitcher } from "@/components";
import { cn } from "@/utils";
import { socialLinks } from "@/utils/constants";

const AuthFooter = () => {
  const { Logo } = HomeImages;
  const location = useLocation();
  const showAuthComponent = ['/auth/login', '/auth/register'].includes(location.pathname);

  return (
    <div className={cn("flex bg-transparent flex-col md:flex-row gap-x-2 gap-y-5 py-4 justify-between items-center w-full lg:w-[85%] lg:mx-auto border-t border-t-white border-gray-800", {
      "text-white": showAuthComponent
    })}>
      <div className="font-bold bg-transparent text-2xl cursor-pointer flex items-start gap-1">
        <img src={Logo} alt="logo image" className={cn("w-36 h-16", {
      "invert brightness-0": showAuthComponent
    })} />
      </div>
      <div className="text-lg md:text-base text-center md:text-left  text-opacity-80 urbanist-font">
        <span className="urbanist-font">
          {" "}
          &copy; 2025• Django Cameroon • All rights reserved
        </span>
        <a className="block urbanist-font" href="/">
          {" "}
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
        <Link to={socialLinks.github} aria-label="GitHub" className="text-current" target="_blank" rel="noopener noreferrer">
          <FiGithub size={24} />
        </Link>
        <Link to={socialLinks.twitter} aria-label="Twitter" className="text-current" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={24} />
        </Link>
        <Link to={socialLinks.linkedin} aria-label="LinkedIn" className="text-current" target="_blank" rel="noopener noreferrer">
          <FiLinkedin size={24} />
        </Link>
        <Link to={socialLinks.youtube} aria-label="YouTube" className="text-current" target="_blank" rel="noopener noreferrer">
          <FiYoutube size={24} />
        </Link>
      </div>

      <LanguageSwitcher />
    </div>
  );
};

export default AuthFooter;
