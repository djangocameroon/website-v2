"use client";

import { useTranslations } from "next-intl";
import { ProjectStats as ProjectStatsType } from "@/types/project";

interface ProjectStatsProps {
  stats: ProjectStatsType;
}

const ProjectStats = ({ stats }: ProjectStatsProps) => {
  const t = useTranslations("ProjectsPage.stats");
  const statsData = [
    {
      value: `${stats.totalProjects}+`,
      label: t("openSource"),
    },
    {
      value: `${(stats.totalStars / 1000).toFixed(1)}k+`,
      label: t("stars"),
    },
    {
      value: `${stats.activeContributors}+`,
      label: t("contributors"),
    },
    {
      value: `${stats.totalContributions}+`,
      label: t("contributions"),
    },
  ];

  return (
    <div className="bg-[#0C4B33] rounded-3xl p-8 md:p-12 shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statsData.map((stat, index) => (
          <div key={index} className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              {stat.value}
            </h2>
            <p className="urbanist-font text-sm md:text-base opacity-90">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStats;
