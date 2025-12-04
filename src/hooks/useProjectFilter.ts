import { useState, useMemo } from "react";
import { Project, ProjectCategory } from "@/types/project";

export const useProjectFilter = (projects: Project[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

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

  // Paginate projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Reset to page 1 when filters change
  const handleFilterChange = (filter: ProjectCategory) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return {
    searchQuery,
    activeFilter,
    currentPage,
    paginatedProjects,
    totalPages,
    totalFiltered: filteredProjects.length,
    handleSearchChange,
    handleFilterChange,
    setCurrentPage,
  };
};
