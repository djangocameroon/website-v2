import {
  ProjectHeader,
  FilterButtons,
  ProjectGrid,
  Pagination,
} from "@/components/pages/Project-Page-Components";
import { ProjectNavbar } from "@/components/layout/navbar";
import { mockProjects } from "@/data/mockProjects";
import { useProjectFilter } from "@/hooks/useProjectFilter";

const Project = () => {
  const {
    activeFilter,
    currentPage,
    paginatedProjects,
    totalPages,
    totalFiltered,
    handleFilterChange,
    setCurrentPage,
  } = useProjectFilter(mockProjects);

  return (
    <div id="project" className="overflow-x-hidden">
      <ProjectNavbar />
      <ProjectHeader featuredProjects={mockProjects} />

      {/* Main Content Area - White Background */}
      <div className="bg-white pt-40 pb-20">
        <div className="mx-auto w-[90%] max-w-[1400px] space-y-12">
          {/* Search and Filters Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Projects Grid */}
          <ProjectGrid
            projects={paginatedProjects}
            totalProjects={totalFiltered}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
