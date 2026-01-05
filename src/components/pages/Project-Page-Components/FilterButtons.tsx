import { ProjectCategory } from "@/types/project";
import SearchBar from "./SearchBar";

interface Filter {
  id: ProjectCategory;
  label: string;
}

interface FilterButtonsProps {
  activeFilter: ProjectCategory;
  onFilterChange: (filter: ProjectCategory) => void;
  searchOpen: boolean;
  onSearchToggle: () => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
}

const filters: Filter[] = [
  { id: "all", label: "Quick peek" },
  { id: "web", label: "Web" },
  { id: "api", label: "Mobile" },
  { id: "tools", label: "API" },
];

const FilterButtons = ({
  activeFilter,
  onFilterChange,
  searchOpen,
  onSearchToggle,
  searchValue,
  onSearchChange,
}: FilterButtonsProps) => {
  const handleSearchClick = () => onSearchToggle();
  return (
    <div className="flex items-center gap-3 flex-wrap justify-center">
      {/* Filters area - fades out when search is open */}
      <div
        className={`flex items-center gap-3 flex-wrap transition-opacity duration-300 ${
          searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-5 py-2.5 rounded-full urbanist-font font-medium text-sm transition-all border-2 ${
              activeFilter === filter.id
                ? "bg-[#CCE2D8] text-[#103E2E] border-[#103E2E]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search input (scales from right to left) */}
      <div className="relative flex items-center">
        <div
          className={`transform origin-right transition-transform duration-300 ease-out overflow-hidden ${
            searchOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        >
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search projects..."
            className="w-72"
            autoFocus={searchOpen}
          />
        </div>

        {/* Search toggle button */}
        <button
          onClick={handleSearchClick}
          aria-pressed={searchOpen}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#121212] text-white urbanist-font font-medium text-sm hover:bg-gray-800 transition-all ml-3 ${
            searchOpen ? "ring-2 ring-white/20" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                searchOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon when open
                  : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" // search icon when closed
              }
            />
          </svg>
          <span className="hidden sm:inline">
            {searchOpen ? "Close" : "Search"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default FilterButtons;