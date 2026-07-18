"use client";

import { BiSearch } from "react-icons/bi";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

const SearchBar = ({
  value,
  onChange,
  placeholder,
  className = "",
  autoFocus = false,
}: SearchBarProps) => {
  const t = useTranslations("ProjectsPage.searchBar");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder ?? t("placeholder")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-gray-300 focus:border-secondary focus:outline-none urbanist-font text-base"
        />
      </div>
    </div>
  );
};

export default SearchBar;
