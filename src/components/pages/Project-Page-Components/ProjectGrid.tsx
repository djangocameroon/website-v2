import { AnimatePresence, motion } from "framer-motion";
import { ProjectItem } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: ProjectItem[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
              delay: Math.min(index, 6) * 0.05,
            }}
          >
            <ProjectCard project={project} className="h-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGrid;
