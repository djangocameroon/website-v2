import React from 'react';
import { ThumbsUp,Clock, Eye, ArrowUpRight } from 'lucide-react';
import { VscAccount } from "react-icons/vsc";

interface BlogCardProps {
  image: string;
  tags: string[];
  title: string;
  like: string;
  views: string;
  readTime: string;
  author: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, tags, title, like, views, readTime, author }) => {
  return (
    <div className="flex flex-col h-full group bg-white">
      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl mb-5 border border-gray-100 shadow-sm">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="flex flex-col flex-grow px-2">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        {/* Title : Augmenté à text-xl ou 2xl car la carte est plus large */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight line-clamp-2">
          {title}
        </h3>

        {/* Meta Stats */}
        <div className="mt-auto flex items-center gap-6 text-[12px] text-gray-500 font-semibold mb-6 border-b border-gray-50 pb-6">
            <span className="flex items-center gap-1.5"><ThumbsUp size={14} className="text-blue-500" /> {like}</span>
            <span className="flex items-center gap-1.5"><Eye size={14} /> {views}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {readTime}</span>
            <span className="flex items-center gap-1.5 ml-auto text-gray-800"><VscAccount size={14} /> {author}</span>
        </div>

        {/* Button */}
        <button className="w-full bg-[#13322b] hover:bg-[#0d241f] text-white py-4 rounded-2xl flex items-center justify-between px-8 text-sm font-bold transition-all transform active:scale-[0.98]">
          Read more
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;