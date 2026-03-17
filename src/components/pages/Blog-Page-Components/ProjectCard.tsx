import React, { useEffect } from 'react';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { GoArrowUpRight } from 'react-icons/go';
import { LuTimer } from 'react-icons/lu';
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
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
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      className="flex flex-col group p-7 max-md:p-4 space-y-8 max-md:space-y-4 h-[50rem] max-md:h-auto md:min-w-[650px] max-md:w-full"
      ref={ref}
      initial="hidden"
      animate={controls}
      exit="hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut'
          }
        },
      }}
    >
      <div className="relative h-[25rem] max-md:h-52 w-full overflow-hidden rounded-3xl max-md:rounded-2xl border border-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-grow px-2 max-md:px-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2.5 max-md:gap-2 mb-4 max-md:mb-3">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-4 max-md:px-3 py-1 max-md:py-0.5 urbanist-font font-medium uppercase tracking-[0%] text-base max-md:text-xs text-blue-600 bg-[#D9E7FF] rounded-[10px] max-md:rounded-lg border border-secondary">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl max-md:text-lg font-semibold text-gray-900 mb-4 max-md:mb-3 leading-tight line-clamp-4 max-md:line-clamp-3 nohemi-font">
          {title}
        </h3>

        {/* Meta Stats */}
        <div className="flex max-md:flex-col items-center max-md:items-start gap-6 max-md:gap-3 text-[12px] font-semibold border-b border-gray-50 pb-4 max-md:pb-3 mb-4 max-md:mb-3">
          <div className="flex items-center max-md:flex-wrap gap-6 max-md:gap-3 max-md:w-full">
            <span className="flex items-center gap-[0.5rem] urbanist-font font-medium text-xl max-md:text-sm">
              <AiOutlineLike size={24} className="max-md:w-4 max-md:h-4" /> {like} likes
            </span>
            <span className="flex items-center gap-[0.5rem] urbanist-font font-medium text-xl max-md:text-sm">
              <AiOutlineEye size={24} className="max-md:w-4 max-md:h-4" /> {views} views
            </span>
            <span className="flex items-center gap-[0.5rem] urbanist-font font-medium text-xl max-md:text-sm">
              <LuTimer size={24} className="max-md:w-4 max-md:h-4" /> {readTime} mins read
            </span>
          </div>
          <span className="flex items-center gap-[0.5rem] ml-auto max-md:ml-0 text-gray-800 urbanist-font font-medium text-xl max-md:text-sm">
            <VscAccount size={24} className="max-md:w-4 max-md:h-4" /> {author}
          </span>
        </div>

        {/* Button */}
        <Link to={`/blog/${id}`} className="mt-auto">
          <button className="w-full bg-primary hover:bg-primary/90 active:scale-105 text-white py-5 max-md:py-3.5 rounded-xl max-md:rounded-lg flex items-center justify-between px-7 max-md:px-5 transition-all border-primary border-[1.5px]">
            <span className="inline-flex items-center mx-auto nohemi-font text-[18px] max-md:text-sm  font-medium">
              Read more
              <GoArrowUpRight size={24} className="max-md:size-4 ml-2.5" />
            </span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;