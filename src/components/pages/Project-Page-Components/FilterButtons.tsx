import { ProjectCategory } from "@/types/project";

interface Filter {
  id: ProjectCategory;
  label: string;
}

interface FilterButtonsProps {
  activeFilter: ProjectCategory;
  onFilterChange: (filter: ProjectCategory) => void;
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
}: FilterButtonsProps) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-5 py-2.5 rounded-full urbanist-font font-medium text-sm transition-all ${
            activeFilter === filter.id
              ? "bg-[#CCE2D8] text-[#103E2E] border-2 border-[#103E2E]"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
      <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] text-white urbanist-font font-medium text-sm hover:bg-gray-800 transition-all">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>
    </div>
  );
};

export default FilterButtons;
