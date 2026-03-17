import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const BlogAddHeader = () => {
  return (
    <div className="mb-10">
      <Link to="/blog" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors group">
        <AiOutlineArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold">Back to blog</span>
      </Link>
    </div>
  );
};