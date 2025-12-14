import { Badge } from "@/components/layout";
import { ProjectCategory } from "@/types/project";
import { FaCode, FaLayerGroup } from "react-icons/fa";
import { ReactNode } from "react";

interface Filter {
  id: ProjectCategory;
  label: string;
  icon: ReactNode;
}

interface FilterButtonsProps {
  activeFilter: ProjectCategory;
  onFilterChange: (filter: ProjectCategory) => void;
}

const filters: Filter[] = [
  { id: "all", label: "All Projects", icon: <FaLayerGroup /> },
  { id: "web", label: "Web Apps", icon: <FaCode /> },
  { id: "api", label: "APIs & Backends", icon: <FaCode /> },
  { id: "tools", label: "Tools & Libraries", icon: <FaCode /> },
];

const FilterButtons = ({
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) => {
  return (
    <div className="flex justify-center items-center gap-4 flex-wrap">
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          backgroundColor={
            activeFilter === filter.id ? "bg-secondary" : "bg-secondary/10"
          }
          className={`cursor-pointer transition-all ${
            activeFilter === filter.id ? "text-white" : "text-secondary"
          }`}
          outline={activeFilter !== filter.id}
        >
          <div
            className="flex items-center gap-2 px-2"
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.icon}
            <span className="font-medium">{filter.label}</span>
          </div>
        </Badge>
      ))}
    </div>
  );
};

export default FilterButtons;
