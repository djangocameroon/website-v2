import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search projects...",
}: SearchBarProps) => {
  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="relative">
        <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-gray-300 focus:border-secondary focus:outline-none urbanist-font text-base"
        />
      </div>
    </div>
  );
};

export default SearchBar;
