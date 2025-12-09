import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const handleViewProject = () => {
    window.open(project.githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-3xl p-6 hover:shadow-lg transition-all border border-gray-100 flex flex-col h-full max-w-lg">
      {/* Technology Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 3).map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs urbanist-font font-medium bg-gray-100 text-gray-700"
          >
            {tech.name}
          </span>
        ))}
      </div>

      {/* Project Title */}
      <h3 className="text-xl md:text-2xl nohemi-font font-bold text-gray-900 mb-3 line-clamp-2">
        {project.title}
      </h3>

      {/* Project Description */}
      <p className="text-gray-600 urbanist-font text-base mb-6 line-clamp-3 flex-grow">
        {project.description}
      </p>

      {/* View Project Button */}
      <button
        onClick={handleViewProject}
        className="w-full bg-[#0C4B33] text-white urbanist-font font-semibold py-3 px-6 rounded-xl hover:bg-[#0A3D28] transition-all flex items-center justify-center gap-2"
      >
        View project
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProjectCard;
