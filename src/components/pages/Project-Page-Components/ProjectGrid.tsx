import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  totalProjects: number;
}

const ProjectGrid = ({ projects, totalProjects }: ProjectGridProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-primary nohemi-font text-2xl md:text-3xl font-bold">
          Featured Projects
        </h2>
        <p className="text-text-color urbanist-font text-sm md:text-base">
          Showing{" "}
          <span className="font-bold text-secondary">{projects.length}</span> of{" "}
          <span className="font-bold">{totalProjects}</span> projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12 justify-items-center">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
