"use client";

import { useMemo, useState } from "react";
import { HiOutlineCodeBracket, HiOutlineFaceFrown } from "react-icons/hi2";
import {
  ProjectHeader,
  ProjectsFilterBar,
  ProjectGrid,
  LoadMoreButton,
} from "@/components/pages/Project-Page-Components";
import { useProjects } from "@/hooks/useProjects";
import { Newsletter } from "@/components/pages/Home-Page-Components";

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 6;
const MAX_TAG_OPTIONS = 8;
const SKELETON_COUNT = 6;

const ProjectCardSkeleton = () => (
  <div className="w-full animate-pulse overflow-hidden rounded-[30px] border-[1.5px] border-primary/10">
    <div className="aspect-[16/10] w-full bg-primary/10" />
    <div className="flex flex-col gap-3 px-5 py-5">
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-full bg-primary/10" />
        <div className="h-6 w-20 rounded-full bg-primary/10" />
      </div>
      <div className="h-6 w-3/4 rounded-full bg-primary/10" />
      <div className="h-16 w-full rounded-2xl bg-primary/10" />
      <div className="h-11 w-full rounded-xl bg-primary/10" />
    </div>
  </div>
);

const ProjectsClient = () => {
  const { projects, loading, error, refetch } = useProjects();

  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [itemsToShow, setItemsToShow] = useState(INITIAL_COUNT);

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.is_featured),
    [projects]
  );

  const tagOptions = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });
    const topTags = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_TAG_OPTIONS)
      .map(([tag]) => tag);
    return ["All", ...topTags];
  }, [projects]);

  const hasActiveFilters = search.trim() !== "" || tagFilter !== "All";

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      if (tagFilter !== "All" && !project.tags.includes(tagFilter)) return false;

      if (query) {
        const haystack = [project.title, project.description, ...project.tags]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [projects, tagFilter, search]);

  // Reset pagination when filters change, derived during render (no effect)
  // to avoid an extra cascading commit — see React docs on adjusting state on prop change.
  const filterKey = `${search}|${tagFilter}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setItemsToShow(INITIAL_COUNT);
  }

  const displayedProjects = filteredProjects.slice(0, itemsToShow);

  const clearFilters = () => {
    setSearch("");
    setTagFilter("All");
  };

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + LOAD_MORE_COUNT);
  };

  return (
    <div id="project" className="overflow-x-hidden">
      <ProjectHeader featuredProjects={featuredProjects} />

      {/* Main Content Area - White Background */}
      <div className="bg-white pt-12 pb-20">
        <div className="w-full md:w-[85%] mx-auto max-md:px-4 space-y-12">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-grey urbanist-font">
                Something went wrong loading projects. {error}
              </p>
              <button
                onClick={() => refetch()}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white nohemi-font transition-transform duration-300 hover:-translate-y-0.5"
              >
                Try again
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <HiOutlineCodeBracket className="size-10 text-primary/40" />
              <p className="text-grey urbanist-font">
                No projects published yet. Check back soon!
              </p>
            </div>
          ) : (
            <>
              <ProjectsFilterBar
                search={search}
                onSearchChange={setSearch}
                tagOptions={tagOptions}
                tagFilter={tagFilter}
                onTagFilterChange={setTagFilter}
              />

              {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-20 text-center">
                  <HiOutlineFaceFrown className="size-10 text-primary/40" />
                  <p className="text-grey urbanist-font">
                    No projects match your filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white nohemi-font transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <ProjectGrid projects={displayedProjects} />

                  {!hasActiveFilters && (
                    <LoadMoreButton
                      showing={displayedProjects.length}
                      total={filteredProjects.length}
                      onLoadMore={handleLoadMore}
                    />
                  )}
                </>
              )}
            </>
          )}

          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default ProjectsClient;
