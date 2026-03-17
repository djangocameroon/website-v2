// import { ProjectCategory } from "@/types/project";
// import SearchBar from "./SearchBar";

// interface Filter {
//   value: ProjectCategory;
//   title: string;
// }

// interface FilterButtonsProps {
//   activeFilter: ProjectCategory;
//   onFilterChange: (filter: ProjectCategory) => void;
//   searchOpen: boolean;
//   onSearchToggle: () => void;
//   searchValue: string;
//   onSearchChange: (v: string) => void;
// }

// const filters = [
//   { id: "all", label: "Quick peek" },
//   { id: "web", label: "Web" },
//   { id: "api", label: "Mobile" },
//   { id: "tools", label: "API" },
//   { id: "tools", label: "AI/ML" },
// ];

// const FilterButtons = ({
//   activeFilter,
//   onFilterChange,
//   searchOpen,
//   onSearchToggle,
//   searchValue,
//   onSearchChange,
// }: FilterButtonsProps) => {
//   return (
//     <div className="flex items-center justify-center gap-6 border border-gray-100 rounded-full px-6 py-3 shadow-lg bg-white">
//       {/* Filters */}
//       {!searchOpen && (
//         <>
//           <div className="flex items-center gap-2">
//             {filters.map((filter) => (
//               <button
//                 key={filter.value}
//                 onClick={() => onFilterChange(filter.value)}
//                 className={`px-5 py-2.5 rounded-full urbanist-font font-medium text-sm transition-all border-2 whitespace-nowrap ${
//                   activeFilter === filter.value
//                     ? "bg-[#CCE2D8] text-[#103E2E] border-[#103E2E]"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                 }`}
//               >
//                 {filter.title}
//               </button>
//             ))}
//           </div>

//           {/* Divider */}
//           <div className="h-6 w-[1.75px] bg-gray-900 mx-2"></div>
//         </>
//       )}

//       {/* Search */}
//       <div className="flex items-center gap-0">
//         {searchOpen && (
//           <SearchBar
//             value={searchValue}
//             onChange={onSearchChange}
//             placeholder="Search projects..."
//             className="w-72"
//             autoFocus
//           />
//         )}

//         <button
//           onClick={() => onSearchToggle()}
//           className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#121212] text-white urbanist-font font-medium text-sm hover:bg-gray-800 transition-all"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d={
//                 searchOpen
//                   ? "M6 18L18 6M6 6l12 12"
//                   : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               }
//             />
//           </svg>
//           <span className="hidden sm:inline urbanist-font font-medium ">
//             {searchOpen ? "Close" : "Search"}
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterButtons;
