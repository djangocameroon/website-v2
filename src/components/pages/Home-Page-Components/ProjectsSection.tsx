"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { HiOutlineFaceFrown } from "react-icons/hi2";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/pages/Project-Page-Components";
import ArticleCard from "./ArticleCard";
import { useProjects } from "@/hooks/useProjects";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogFilters } from "@/types/blog";
import { useTranslations } from "next-intl";
import { fadeUp, revealOnce } from "./motion";

const LATEST_ARTICLES_COUNT = 3;
const SKELETON_COUNT = 4;

// Static reference so useBlogPosts' effect doesn't refetch on every render.
const HOME_BLOG_FILTERS: BlogFilters = { ordering: "-created_at", page_size: 12 };

const CardSkeleton = () => (
  <div className="h-[380px] w-full max-w-96 shrink-0 animate-pulse overflow-hidden rounded-[30px] border-[1.5px] border-primary/10">
    <div className="aspect-[16/10] w-full bg-primary/10" />
    <div className="flex flex-col gap-3 px-5 py-4">
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-full bg-primary/10" />
        <div className="h-6 w-20 rounded-full bg-primary/10" />
      </div>
      <div className="h-5 w-3/4 rounded-full bg-primary/10" />
      <div className="h-11 w-full rounded-xl bg-primary/10" />
    </div>
  </div>
);

const ProjectsSection = () => {
  const t = useTranslations("HomePage.projects");
  const scrollableContainer = useRef<HTMLDivElement | null>(null);

  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { posts, loading: postsLoading, error: postsError } = useBlogPosts(HOME_BLOG_FILTERS);

  const loading = projectsLoading || postsLoading;
  const hasError = projectsError !== null && postsError !== null;

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.is_featured),
    [projects]
  );

  const latestArticles = useMemo(
    () =>
      [...posts]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, LATEST_ARTICLES_COUNT),
    [posts]
  );

  const isEmpty = !loading && featuredProjects.length === 0 && latestArticles.length === 0;

  const handleDirectionClick = (direction: "left" | "right") => {
    if (scrollableContainer && scrollableContainer.current)
      if (direction === "left")
        scrollableContainer.current.scrollLeft -= 300; // Adjust the scroll speed here
      else scrollableContainer.current.scrollLeft += 300;
  };

  return (
    <div className="mt-16 lg:mt-0">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealOnce}
        variants={fadeUp}
        className="mb-[1.875rem]"
      >
        <p className="text-center text-grey mb-1 md:mb-2 text-xl urbanist-font font-medium">
          {t("intro")}
        </p>
        <h3 className="text-center text-primary text-3xl max-md:text-2xl font-bold nohemi-font">
          {t.rich("title", { br: () => <br className="md:hidden" /> })}
        </h3>
        <p className="mx-auto w-fit flex items-center gap-x-2 urbanist-font text-xl max-md:text-base text-secondary py-1 px-2 border-b border-b-secondary">
          <span>{t("viewAll")}</span>
          <Link href="/projects" className="hover:font-semibold">
            {t("projectsLink")}
          </Link>
          <span>{t("and")}</span>
          <Link href="/blog" className="hover:font-semibold">
            {t("articlesLink")}
          </Link>
          <GoArrowUpRight className="w-6 h-6" />
        </p>
      </motion.div>

      {isEmpty || hasError ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <HiOutlineFaceFrown className="size-10 text-primary/40" />
          <p className="text-grey urbanist-font">
            {t("empty")}
          </p>
        </div>
      ) : (
        <div className="relative">
          <div
            className="overflow-x-scroll overflow-y-hidden projects-slider"
            ref={scrollableContainer}
          >
            <div className="flex gap-x-8 mb-20 items-stretch">
              {loading &&
                Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}

              {!loading &&
                featuredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={revealOnce}
                    variants={fadeUp}
                    className="shrink-0"
                  >
                    <ProjectCard project={project} className="h-[380px] w-96" />
                  </motion.div>
                ))}

              {!loading &&
                latestArticles.map((post) => (
                  <motion.div
                    key={post.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={revealOnce}
                    variants={fadeUp}
                    className="shrink-0"
                  >
                    <ArticleCard post={post} className="h-[380px] w-96" />
                  </motion.div>
                ))}
            </div>
          </div>
          <div className="flex justify-end gap-x-2 mb-4 absolute overflow-hidden bottom-1 right-0">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={t("scrollLeft")}
              className="text-secondary border-[1.5px] border-secondary rounded-2xl md:p-2.5 p-2 bg-secondary/10"
              onClick={() => handleDirectionClick("left")}
            >
              <LuArrowLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={t("scrollRight")}
              className="text-secondary border-[1.5px] border-secondary rounded-2xl md:p-2.5 p-2 bg-secondary/10"
              onClick={() => handleDirectionClick("right")}
            >
              <LuArrowRight className="w-6 h-6 text-secondary" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
