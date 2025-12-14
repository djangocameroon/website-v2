import {
  ProjectHeader,
  SearchBar,
  FilterButtons,
  ProjectStats,
  ProjectGrid,
  Pagination,
  ProjectCTA,
} from "@/components/pages/Project-Page-Components";
import { mockProjects, mockProjectStats } from "@/data/mockProjects";
import { useProjectFilter } from "@/hooks/useProjectFilter";

const Project = () => {
  const {
    searchQuery,
    activeFilter,
    currentPage,
    paginatedProjects,
    totalPages,
    totalFiltered,
    handleSearchChange,
    handleFilterChange,
    setCurrentPage,
  } = useProjectFilter(mockProjects);

  return (
    <div
      id="project"
      className="overflow-x-hidden mx-auto w-[90%] max-w-[1400px] mt-32 mb-20 space-y-12"
    >
      <ProjectHeader />

      <div className="space-y-6">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search projects by name, technology, or description..."
        />
        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      <ProjectStats stats={mockProjectStats} />

      <ProjectGrid projects={paginatedProjects} totalProjects={totalFiltered} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <ProjectCTA />
    </div>
  );
};

export default Project;
