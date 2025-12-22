import {
  ProjectHeader,
  FilterButtons,
  ProjectGrid,
  LoadMoreButton,
  CommunityCTA,
  ProjectNewsletter,
} from "@/components/pages/Project-Page-Components";
import { ProjectNavbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mockProjects } from "@/data/mockProjects";
import { useProjectFilter } from "@/hooks/useProjectFilter";
import { useState } from "react";

const Project = () => {
  const { activeFilter, paginatedProjects, totalFiltered, handleFilterChange } =
    useProjectFilter(mockProjects);

  const [itemsToShow, setItemsToShow] = useState(9);
  const displayedProjects = paginatedProjects.slice(0, itemsToShow);

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 9);
  };

  return (
    <div id="project" className="overflow-x-hidden">
      <ProjectNavbar />
      <ProjectHeader featuredProjects={mockProjects} />

      {/* Main Content Area - White Background */}
      <div className="bg-white pt-28 pb-20">
        <div className="mx-auto w-[90%] max-w-[1400px] space-y-12">
          {/* Filters Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
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

          {/* Community CTA */}
          <CommunityCTA />

          {/* Newsletter Section */}
          <ProjectNewsletter />
        </div>
      </div>
    </div>
  );
};

export default Project;
