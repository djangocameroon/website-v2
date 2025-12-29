import { useParams, Link } from 'react-router-dom';
import { blogData } from '@/data/blogData';
import { AiOutlineLike, AiOutlineEye, AiOutlineArrowLeft } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { VscAccount } from "react-icons/vsc";

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
        <div className="flex gap-2 mb-6">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold nohemi-font text-gray-900 leading-tight mb-10">
          {post.title}
        </h1>

        {/* Stats Bar */}
        <div className="flex items-center justify-between py-6 border-y border-gray-100 mb-12 text-sm text-gray-500 font-bold">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><AiOutlineLike size={20} className="text-blue-500" /> {post.like} likes</span>
            <span className="flex items-center gap-2"><AiOutlineEye size={20} /> {post.views} views</span>
            <span className="flex items-center gap-2"><BiTimeFive size={20} /> {post.readTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-900">
            <VscAccount size={20} /> {post.author}
          </div>
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