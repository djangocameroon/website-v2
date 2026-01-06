import { useState, useMemo } from "react";
import { Project, ProjectCategory } from "@/types/project";

export const useProjectFilter = (projects: Project[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (project) => project.category === activeFilter
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) =>
            tech.name.toLowerCase().includes(query)
          )
      );
    }

    return filtered;
  }, [projects, activeFilter, searchQuery]);

  const handleFilterChange = (filter: ProjectCategory) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return {
    searchQuery,
    activeFilter,
    paginatedProjects: filteredProjects,
    totalFiltered: filteredProjects.length,
    handleSearchChange,
    handleFilterChange,
  };
};
