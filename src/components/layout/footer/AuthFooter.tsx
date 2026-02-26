import { useLocation } from "react-router-dom";
import { FiGithub, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";
import { HomeImages } from "@/assets";
import { LanguageSwitcher } from "@/components";
import { cn } from "@/utils";

const AuthFooter = () => {
  const { Logo } = HomeImages;
  const location = useLocation();
  const showAuthComponent = ['/auth/login', '/auth/register'].includes(location.pathname);

  return (
    <div className={cn("flex bg-transparent flex-col md:flex-row gap-x-2 gap-y-5 py-4 justify-between items-center w-full lg:w-[85%] lg:mx-auto border-t border-t-white border-gray-800", {
      "text-white": showAuthComponent
    })}>
      <div className="font-bold bg-transparent text-2xl cursor-pointer flex items-start gap-1">
        <img src={Logo} alt="logo image" className="w-36 h-16" />
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
        <a className="block text-lg md:text-base urbanist-font" href="/">
          Sitemap • Credits • FAQs
        </a>
      </div>
      <div className="flex items-center gap-2.5">
        <FiGithub size="24" />
        <FiTwitter size="24" />
        <FiLinkedin size="24" />
        <FiYoutube size="24" />
      </div>

      <LanguageSwitcher />
    </div>
  );
};

export default AuthFooter;
