import { FaGithub } from "react-icons/fa";
import { Project } from "@/types/project";
import { cn } from "@/utils/constants";

interface ProjectHeaderProps {
  featuredProjects?: Project[];
}

export const RoundMarker = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={cn(
        `relative size-[0.938rem] bg-[#0A0E27] rounded-full border-[0.5px] border-white flex justify-center items-center ${className}`
      )}
    >
      <div className="bg-white rounded-full size-[0.688rem] border-0"></div>
    </div>
  );
};

const ProjectHeader = ({ featuredProjects = [] }: ProjectHeaderProps) => {
  return (
    <div className="relative w-full pt-24 pb-12 overflow-visible ">
      {/* Dark navy background with stars */}
      <div className="absolute inset-0 bg-[#0A0E27] stars-background"></div>

      <div className="hidden lg:block absolute top-[3.375rem] bottom-0">
        <div className="mx-auto size-full md:w-[85%] relative">
          <div className="absolute top-[3.375rem] left-8 md:left-16 lg:left-20 inset-y-0 flex flex-col z-20">
            <RoundMarker className="-top-[0.5px]" />
            <div className="flex justify-center flex-1">
              <div className="w-0 border-l-[1px] border-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full top-[3.375rem] mb-[4.375rem] pl-8 md:pl-16 lg:pl-20">
        <div className="flex items-start gap-6 md:gap-8 max-w-7xl">
          {/* Main Content Area */}
          <div className="flex-1 pr-8 md:pr-16 lg:pr-20">
            {/* Text Content */}
            <div className="mb-10 ml-8">
              {/* Subtitle */}
              <p className="text-[#4A90E2] urbanist-font text-base md:text-lg xl:text-[20px] font-bold">
                Get busy with us
              </p>

              {/* Main Heading */}
              <h1 className="nohemi-font max-w-[780px] text-3xl sm:text-4xl space-y-2 md:text-5xl lg:text-6xl xl:text-[80px] font-extrabold leading-tight">
                <span className="text-white">We build </span>
                <span className="text-gray-400">Open</span>
                <br />
                <span className="text-[#6B7FBF]">Source </span>
                <span className="text-white">#Projects.</span>
              </h1>

              {/* GitHub Button */}
              <div className="pt-2 md:mb-2">
                <a
                  href="https://github.com/djangocameroon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#4A90E2] text-white urbanist-font font-semibold text-base md:text-lg px-6 py-3 rounded-lg hover:bg-[#357ABD] transition-all shadow-lg"
                >
                  <FaGithub className="w-5 h-5" />
                  View organization on GitHub
                </a>
              </div>
            </div>

            {/* Featured Project Cards Preview */}
            {featuredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ml-8 -mb-20">
                {featuredProjects.slice(0, 3).map((project, index) => (
                  <div
                    key={project.id}
                    className="relative z-30 rounded-2xl overflow-hidden shadow-xl border border-[#2A3B6F] transition-transform transform translate-y-3 hover:translate-y-4 cursor-pointer"
                  >
                    {/* Top title bar */}
                    <div className="bg-[#4A90E2] px-4 py-3 text-white urbanist-font font-medium text-sm rounded-t-2xl">
                      {project.title || `This project's name #${index + 1}`}
                    </div>

                    {/* Project Image */}
                    <div className="aspect-video bg-[#0F1629]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
