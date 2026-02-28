import { useParams, Link } from 'react-router-dom';
import { blogData } from '@/data/blogData';
import { AiOutlineLike, AiOutlineEye, AiOutlineArrowLeft } from 'react-icons/ai';
import { VscAccount } from "react-icons/vsc";
import { LuTimer } from 'react-icons/lu';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogData.find((item) => item.id == Number(id));

  if (!post) return <div className="pt-40 text-center">Post not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">

        {/* Back Link */}
        <Link to="/blog" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors group">
          <AiOutlineArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to blog</span>
        </Link>

        {/* Header Content */}
        <div className="flex gap-2.5 mb-6">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-4 max-md:px-3 py-1 max-md:py-0.5 urbanist-font font-medium uppercase tracking-[0%] text-base max-md:text-xs text-blue-600 bg-[#D9E7FF] rounded-[10px] max-md:rounded-lg border border-secondary">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold nohemi-font text-gray-900 leading-tight mb-10">
          {post.title}
        </h1>

        {/* Stats Bar */}
        <div className="flex items-center justify-between py-6 border-y border-dark mb-12 text-sm font-semibold">
          <div className="flex items-center max-md:flex-wrap gap-6 max-md:gap-3 max-md:w-full">
            <span className="flex items-center gap-[0.5rem] urbanist-font font-medium text-xl max-md:text-sm">
              <AiOutlineLike size={24} className="max-md:size-4" /> {post.like} likes
            </span>
            <span className="flex items-center gap-[0.5rem] urbanist-font font-medium text-xl max-md:text-sm">
              <AiOutlineEye size={24} className="max-md:size-4" /> {post.views} views
            </span>
            <span className="flex items-center gap-[0.5rem] urbanist-font font-medium text-xl max-md:text-sm">
              <LuTimer size={24} className="max-md:size-4" /> {post.readTime} mins read
            </span>
          </div>
          <span className="flex items-center gap-[0.5rem] md:ml-auto urbanist-font font-medium text-xl max-md:text-sm">
            <VscAccount size={24} className="max-md:w-4 max-md:h-4" /> {post.author}
          </span>
        </div>

        {/* Article Body */}
        <article className="text-gray-800 leading-relaxed text-lg space-y-10 urbanist-font">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left ">
            {post.description.part1}
          </p>

          <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl my-16 border border-gray-100">
            <img
              src={post.description.middleImage}
              alt="Content visual"
              className="w-full h-full object-cover"
            />
          </div>

          <p>{post.description.part2}</p>
        </article>
      </main>
    </div>
  );
};
export default BlogDetail;