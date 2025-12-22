import { BiSearch } from 'react-icons/bi';
import { FILTERS } from '@/data/blogData';

const FilterBar = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <div className="bg-gray-100/80 p-1.5 rounded-full flex items-center gap-1 overflow-x-auto max-w-full">
        
        {FILTERS.map((filter, index) => (
          <button 
            key={index}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
              filter.active 
                ? "bg-[#dcfce7] text-[#166534] shadow-sm border border-green-900"
                : "text-gray-900 hover:text-black hover:bg-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
        <div className="relative w-full sm:w-auto">
            <input 
            type="text" 
            placeholder="Search" 
            className="bg-black text-white pl-5 pr-6 py-2.5 rounded-full text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <BiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      
    </div>
  );
};

export default FilterBar;
