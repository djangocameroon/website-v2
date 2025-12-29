"use client";

import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

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
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <div className="inline-flex items-center bg-white rounded-full shadow-sm border border-gray-200 p-1">
        
        {filters.map((filter) => (
          <button 
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-7 py-2.5 rounded-full font-normal text-[15px] transition-all duration-200 ${
              activeFilter === filter
                ? "bg-[#dcfce7] text-[#166534] shadow-sm border border-green-900"
                : "text-gray-900 hover:text-black hover:bg-white"
            }`}
          >
            {filter}
          </button>
        ))}

        {/* Séparateur vertical */}
        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Barre de recherche */}
        <div
          className={`flex items-center gap-3 bg-black text-white rounded-full px-5 py-2.5 transition-all duration-300 ${
            searchExpanded ? "w-80" : "w-28"
          }`}
        >
          <BiSearch className="w-[18px] h-[18px] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setSearchExpanded(true)}
            onBlur={() => !searchQuery && setSearchExpanded(false)}
            className="bg-transparent border-none outline-none text-[15px] placeholder-gray-300 w-full font-normal"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
