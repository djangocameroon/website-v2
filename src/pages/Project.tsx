import {
  ProjectHeader,
  FilterButtons,
  ProjectGrid,
  LoadMoreButton,
} from "@/components/pages/Project-Page-Components";
import { mockProjects } from "@/data/mockProjects";
import { useProjectFilter } from "@/hooks/useProjectFilter";
import { useState } from "react";
import { Newsletter } from "@/components/pages/Home-Page-Components";

const Project = () => {
  const {
    searchQuery,
    activeFilter,
    paginatedProjects,
    totalFiltered,
    handleFilterChange,
    handleSearchChange,
  } = useProjectFilter(mockProjects);

  const [searchOpen, setSearchOpen] = useState(false);

  const [itemsToShow, setItemsToShow] = useState(9);
  const displayedProjects = paginatedProjects.slice(0, itemsToShow);

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 9);
  };

  return (
    <div id="project" className="overflow-x-hidden">
      
      <ProjectHeader featuredProjects={mockProjects} />

      {/* Main Content Area - White Background */}
      <div className="bg-white pt-12 pb-20">
        <div className="mx-auto w-[90%] max-w-[1400px] space-y-12">
          {/* Filters Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              searchOpen={searchOpen}
              onSearchToggle={() => setSearchOpen((s) => !s)}
              searchValue={searchQuery}
              onSearchChange={(q) => handleSearchChange(q)}
            />
          </div>

          {/* Projects Grid */}
          <ProjectGrid
            projects={displayedProjects}
            totalProjects={totalFiltered}
          />

          {/* Load More Button */}
          <LoadMoreButton
            showing={displayedProjects.length}
            total={totalFiltered}
            onLoadMore={handleLoadMore}
          />

          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Project;
