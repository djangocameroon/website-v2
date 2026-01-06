"use client";

import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { motion } from "framer-motion";

type FilterType = "Latest" | "Most Liked" | "Most Viewed";

interface FilterBarProps {
  onFilterChange?: (filter: FilterType) => void;
  onSearchChange?: (query: string) => void;
}

const FilterBar = ({ onFilterChange, onSearchChange }: FilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);

  const filters: FilterType[] = ["Latest", "Most Liked", "Most Viewed"];

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 max-sm:px-4 max-sm:py-6 flex flex-col items-center justify-center gap-4">
      <div
        className="inline-flex max-sm:flex-col items-center rounded-full max-sm:rounded-2xl border p-2.5 max-sm:p-3 gap-x-4 max-sm:gap-x-0 max-sm:gap-y-3 w-full max-w-fit max-sm:max-w-full"
        style={{
          boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        {/* Filter buttons container */}
        <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-center max-sm:flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`relative px-4 py-2.5 max-sm:px-3 max-sm:py-2 rounded-full transition-all duration-200 max-sm:text-sm ${
                activeFilter === filter
                  ? "text-primary"
                  : "text-gray-900 hover:text-black"
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className="absolute inset-0 bg-[#CCE2D8] rounded-[6.25rem] shadow-sm border border-primary"
                />
              )}
              <span className="relative block urbanist-font font-medium whitespace-nowrap">
                {filter}
              </span>
            </button>
          ))}
        </div>

        {/* Vertical separator - hidden on mobile */}
        <div className="w-[1.5px] bg-[#5F6368] h-8 max-sm:hidden"></div>
        
        {/* Horizontal separator - visible only on mobile */}
        <div className="hidden max-sm:block w-full h-[1.5px] bg-[#5F6368]"></div>

        {/* Search bar */}
        <div
          className={`flex items-center gap-2.5 bg-black text-white rounded-[6.25rem] px-4 py-2.5 max-sm:py-2 transition-all duration-300 max-sm:w-full ${
            searchExpanded ? "w-80 max-sm:w-full" : "w-28 max-sm:w-full"
          }`}
        >
          <BiSearch className="size-[18px] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setSearchExpanded(true)}
            onBlur={() => !searchQuery && setSearchExpanded(false)}
            className="bg-transparent border-none outline-none placeholder-gray-300 w-full font-normal placeholder:font-medium urbanist-font max-sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
