"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlineCodeBracket, HiOutlineStar } from "react-icons/hi2";
import { cn } from "@/utils/constants";
import { ProjectItem } from "@/types/project";

interface ProjectCardProps {
  project: ProjectItem;
  className?: string;
}

const ProjectImagePlaceholder = () => (
  <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary/50">
    <HiOutlineCodeBracket className="size-10 text-white/50" />
  </div>
);

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const hasLinks = Boolean(project.github_link || project.demo_link);

  return (
    <div
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-[30px] border-[1.5px] border-primary shadow-outline shadow-xl transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProjectImagePlaceholder />
        )}

        {project.is_featured && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white urbanist-font shadow-md">
            <HiOutlineStar className="size-3.5" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary urbanist-font"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="line-clamp-2 text-xl font-semibold text-primary nohemi-font md:text-2xl">
          {project.title}
        </h3>

        <p className="line-clamp-3 flex-1 text-sm text-grey urbanist-font md:text-base">
          {project.description}
        </p>

        {hasLinks && (
          <div className="mt-auto flex items-center gap-3 pt-2">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white urbanist-font transition-colors duration-200 hover:bg-primary/90"
              >
                <FaGithub className="size-4 shrink-0" />
                Code
              </a>
            )}
            {project.demo_link && (
              <a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title}`}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border-[1.5px] border-primary px-4 py-3 text-sm font-semibold text-primary urbanist-font transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                Live demo
                <GoArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
