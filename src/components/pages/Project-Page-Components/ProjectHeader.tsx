import { FaGithub } from "react-icons/fa";
import { Project } from "@/types/project";

interface ProjectHeaderProps {
  featuredProjects?: Project[];
}

const ProjectHeader = ({ featuredProjects = [] }: ProjectHeaderProps) => {
  return (
    <div className="relative w-full pt-32 pb-20 overflow-hidden">
      {/* Dark navy background with stars */}
      <div className="absolute inset-0 bg-[#0A0E27] stars-background"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full pl-8 md:pl-16 lg:pl-20">
        <div className="flex items-start gap-6 md:gap-8 max-w-7xl">
          {/* Vertical line with dot - Fixed position */}
          <div className="flex flex-col items-center flex-shrink-0 max-md:hidden">
            <div className="w-3 h-3 rounded-full bg-white mb-2"></div>
            <div className="w-[2px] h-[580px] bg-gradient-to-b from-white via-white/50 to-transparent"></div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 pr-8 md:pr-16 lg:pr-20">
            {/* Text Content - Left Aligned */}
            <div className="space-y-6 mb-16">
              {/* Subtitle */}
              <p className="text-[#4A90E2] urbanist-font text-base md:text-lg font-medium">
                Get busy with us
              </p>

              {/* Main Heading */}
              <h1 className="nohemi-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
                <span className="text-white">We build </span>
                <span className="text-gray-400">Open</span>
                <br />
                <span className="text-[#6B7FBF]">Source </span>
                <span className="text-white">#Projects.</span>
              </h1>

              {/* GitHub Button */}
              <div className="pt-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 -mb-32">
                {featuredProjects.slice(0, 3).map((project, index) => (
                  <div
                    key={project.id}
                    className="relative bg-gradient-to-br from-[#1E2749] to-[#0F1629] rounded-2xl p-4 border border-[#2A3B6F] hover:border-[#4A90E2] transition-all group overflow-hidden shadow-xl"
                  >
                    {/* Project Label */}
                    <div className="bg-[#4A90E2]/20 backdrop-blur-sm text-[#4A90E2] text-xs urbanist-font font-medium px-3 py-1 rounded-full inline-block mb-3">
                      The project's name #{index + 1}
                    </div>

                    {/* Project Image/Preview */}
                    <div className="rounded-xl overflow-hidden bg-[#0F1629] border border-[#2A3B6F] aspect-video">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
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
