import React from 'react';
import { AiOutlineLike, AiOutlineEye, AiOutlineArrowUp } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';

interface BlogCardProps {
  image: string;
  tags: string[];
  title: string;
  like: string;
  views: string;
  readTime: string;
  author: string;
}

const BlogCard: React.FC<BlogCardProps & { id: number }> = ({ id, image, tags, title, like, views, readTime, author }) => {
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

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight line-clamp-2">
          {title}
        </h3>

        {/* Meta Stats */}
        <div className="mt-auto flex items-center gap-6 text-[12px] text-gray-500 font-semibold mb-6 border-b border-gray-50 pb-6">
            <span className="flex items-center gap-1.5"><AiOutlineLike size={14} className="text-blue-500" /> {like} likes</span>
            <span className="flex items-center gap-1.5"><AiOutlineEye size={14} /> {views} views</span>
            <span className="flex items-center gap-1.5"><BiTimeFive size={14} /> {readTime} read</span>
            <span className="flex items-center gap-1.5 ml-auto text-gray-800"><VscAccount size={14} /> {author}</span>
        </div>

        {/* Button */}
        <Link to={`/blog/${id}`} className="mt-auto">
          <button className="w-full bg-[#13322b] hover:bg-[#0d241f] text-white py-3 rounded-xl flex items-center justify-between px-6 text-xs font-bold transition-all">
            Read more
            <AiOutlineArrowUp size={14} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;