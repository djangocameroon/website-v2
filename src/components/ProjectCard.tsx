import { HomeImages } from "@/assets";
import { Badge } from "./layout";
import { FaStar, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { BiGitPullRequest } from "react-icons/bi";
import { useState } from "react";

const ProjectCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer bg-white px-6 py-6 max-md:w-[90vw] max-md:h-[500px] w-[625px] h-[700px] border border-gray-400 rounded-[55px] shadow-xl flex flex-col shrink-0 transition-all duration-300 hover:shadow-2xl hover:border-secondary group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={HomeImages.projectBg} alt="" className="rounded-[30px]" />
        {/* Hover Overlay with Actions */}
        <div
          className={`absolute inset-0 bg-[#0C4B33]/95 rounded-[30px] flex items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="bg-white text-[#0C4B33] p-4 rounded-2xl hover:scale-110 transition-transform shadow-lg flex flex-col items-center gap-2">
            <FaStar className="w-6 h-6" />
            <span className="text-xs urbanist-font font-bold">Star</span>
          </button>
          <button className="bg-white text-[#0C4B33] p-4 rounded-2xl hover:scale-110 transition-transform shadow-lg flex flex-col items-center gap-2">
            <FaExternalLinkAlt className="w-6 h-6" />
            <span className="text-xs urbanist-font font-bold">Live</span>
          </button>
          <button className="bg-white text-[#0C4B33] p-4 rounded-2xl hover:scale-110 transition-transform shadow-lg flex flex-col items-center gap-2">
            <BiGitPullRequest className="w-6 h-6" />
            <span className="text-xs urbanist-font font-bold">Contribute</span>
          </button>
        </div>
      </div>
      <div className="grow flex justify-between flex-col">
        <div className="md:space-y-9 space-y-5">
          <p className="text-primary text-2xl my-3 urbanist-font font-bold group-hover:text-secondary transition-colors">
            Doing something more interesting and funny with Django rather than
            just python manage.py runserver
          </p>
          <div className="flex justify-start items-center gap-3 flex-wrap">
            <Badge backgroundColor="bg-[#0C4B33]/10">
              <div className="flex justify-center items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0C4B33]"></span>
                <p className="urbanist-font text-[#0C4B33] font-medium">
                  Django
                </p>
              </div>
            </Badge>
            <Badge backgroundColor="bg-blue-100">
              <div className="flex justify-center items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <p className="urbanist-font text-blue-600 font-medium">
                  Python
                </p>
              </div>
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex items-center gap-x-2 urbanist-font text-lg text-gray-600 py-1 px-2 font-medium hover:text-[#0C4B33] transition-colors"
          >
            <FaGithub className="w-5 h-5" />
            View on GitHub
          </a>
          <div className="flex items-center gap-2 text-gray-500 urbanist-font text-sm">
            <FaStar className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">234</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
