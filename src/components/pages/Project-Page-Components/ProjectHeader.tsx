import { FaGithub } from "react-icons/fa";
import { Project } from "@/types/project";

interface ProjectHeaderProps {
  featuredProjects?: Project[];
}

const ProjectHeader = ({ featuredProjects = [] }: ProjectHeaderProps) => {
  return (
    <div className="relative w-full  pt-24 pb-12 overflow-visible border-4 border-[#e20707] mt-14 ">
      {/* Dark navy background with stars */}
      <div className="absolute inset-0 bg-[#0A0E27] stars-background"></div>

      <div className="">
        {/* Vertical line with dot - absolutely positioned so it doesn't affect layout and touches bottom */}
      <div className="absolute left-8 md:left-16 lg:left-20 top-10 bottom-0 max-md:hidden flex flex-col items-center z-20 pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-white mb-2"></div>
        <div className="w-[2px] flex-1 bg-gradient-to-b from-white via-white/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full pl-8 md:pl-16 lg:pl-20">
        <div className="flex items-start gap-6 md:gap-8 max-w-7xl">
          {/* Main Content Area */}
          <div className="flex-1 pr-8 md:pr-16 lg:pr-20">
            {/* Text Content - Left Aligned */}
            <div className="mb-10 ml-8">
              {/* Subtitle */}
              <p className="text-[#4A90E2] urbanist-font text-base md:text-lg font-medium">
                Get busy with us
              </p>

              {/* Main Heading */}
              <h1 className="nohemi-font max-w-[780px] text-3xl sm:text-4xl space-y-2 md:text-5xl lg:text-6xl font-extrabold leading-tight">
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

            {/* Featured Project Cards Preview - Extends beyond container */}
            {featuredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-2 mt-3 ml-8 -mb-20 ">
                {featuredProjects.slice(0, 3).map((project, index) => (
                  <div
                    key={project.id}
                    className="relative z-30 rounded-2xl overflow-visible shadow-xl border border-[#2A3B6F] transition-transform transform translate-y-3 md:translate-y-3 hover:translate-y-4"
                  >
                    {/* Top title bar (blue) */}
                    <div className="bg-[#4A90E2] px-4 py-3 text-white urbanist-font font-medium text-sm rounded-t-2xl">
                      {project.title || `This project's name #${index + 1}`}
                    </div>

                    {/* Project Image/Preview (fills rest of card) */}
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
    </div>
  );
};

export default ProjectHeader;
