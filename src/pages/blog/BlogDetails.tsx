/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { blogApi } from '@/lib/blogApi';
import { BlogPost } from '@/types/blog';;
import { AiOutlineLike, AiOutlineEye, AiOutlineArrowLeft } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { VscAccount } from "react-icons/vsc";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await blogApi.getPostById(id);
        setPost(data);
        setError(null);
        
        // Les vues sont incrémentées automatiquement par le hook useBlogPost
        // Mais on peut aussi le faire manuellement ici si nécessaire
        await blogApi.incrementViews(id);
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-40 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white pt-40 text-center">
        <p className="text-red-500 font-semibold mb-4">Post not found</p>
        <p className="text-gray-600">{error}</p>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to blog
        </Link>
      </div>
    );
  }

  const authorName = typeof post.author === 'object' ? post.author.username : post.author;

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
        <div className="flex items-center justify-between py-6 border-y border-gray-100 mb-12 text-sm text-gray-500 font-bold">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <AiOutlineLike size={20} className="text-blue-500" /> {post.likes} likes
            </span>
            <span className="flex items-center gap-2">
              <AiOutlineEye size={20} /> {post.views} views
            </span>
            <span className="flex items-center gap-2">
              <BiTimeFive size={20} /> {post.read_time} mins read
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-900">
            <VscAccount size={20} /> {authorName}
          </div>
        </div>

        {/* Article Body - Affichage du contenu HTML de l'éditeur */}
        <article className="text-gray-800 leading-relaxed text-lg space-y-10 urbanist-font">
          <div 
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Style pour le contenu du blog */}
        <style >{`
          .blog-content {
            line-height: 1.8;
          }
          .blog-content p {
            margin-bottom: 1.5rem;
          }
          .blog-content img {
            width: 100%;
            border-radius: 2rem;
            margin: 2rem 0;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          }
          .blog-content h1,
          .blog-content h2,
          .blog-content h3 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: bold;
          }
          .blog-content a {
            color: #2563eb;
            text-decoration: underline;
          }
          .blog-content ul,
          .blog-content ol {
            margin: 1rem 0;
            padding-left: 2rem;
          }
          .blog-content code {
            background: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.9em;
          }
        `}</style>
      </main>
    </div>
  );
};

export default BlogDetail;