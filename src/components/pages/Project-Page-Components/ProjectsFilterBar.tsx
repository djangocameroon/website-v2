"use client";

import { motion } from "framer-motion";
import { BiSearch, BiX } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/constants";

interface ProjectsFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  tagOptions: string[];
  tagFilter: string;
  onTagFilterChange: (value: string) => void;
}

const ProjectsFilterBar = ({
  search,
  onSearchChange,
  tagOptions,
  tagFilter,
  onTagFilterChange,
}: ProjectsFilterBarProps) => {
  const t = useTranslations("ProjectsPage.filter");
  const tc = useTranslations("Common");
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 flex flex-col gap-5 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6 max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-3 rounded-full border border-primary/15 bg-primary/5 px-4 py-3 transition-colors duration-200 focus-within:border-primary/40">
        <BiSearch className="size-5 shrink-0 text-primary/60" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full bg-transparent text-sm text-dark outline-none placeholder:text-grey urbanist-font"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label={tc("clearSearch")}
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-primary/60 transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <BiX className="size-4" />
          </button>
        )}
      </div>

      {tagOptions.length > 1 && (
        <div className="flex flex-col gap-3 border-t border-primary/10 pt-4 sm:flex-row sm:items-center">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-grey urbanist-font">
            {t("tagsLabel")}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onTagFilterChange(tag)}
                aria-pressed={tagFilter === tag}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium urbanist-font transition-colors duration-200",
                  tagFilter === tag
                    ? "text-white"
                    : "text-primary hover:text-primary/70"
                )}
              >
                {tagFilter === tag && (
                  <motion.span
                    layoutId="project-tag-pill"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
                <span className="relative">{tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsFilterBar;
