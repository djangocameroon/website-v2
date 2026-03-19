/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { blogApi } from '@/lib/blogApi';
import { BlogPost } from '@/types/blog';;
import { AiOutlineLike, AiFillLike, AiOutlineEye, AiOutlineArrowLeft } from 'react-icons/ai';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { MdEdit, MdDelete } from 'react-icons/md';
import { VscAccount } from "react-icons/vsc";
import { LuTimer } from 'react-icons/lu';
import { useAuth } from '@/components/contexts/auth-context';
import toast from 'react-hot-toast';
import { useBlogLike } from '@/hooks/useBlogLike';
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user: authUser } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await blogApi.getPostBySlug(slug);
        setPost(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      // Les vues sont incrémentées automatiquement par le hook useBlogPost
      // Mais on peut aussi le faire manuellement ici si nécessaire
      blogApi.incrementViews(post.id).catch(() => { });
    }

  }, [post])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  const {
    toggle,
    liked: isBlogLiked,
    count: likeCount,
  } = useBlogLike(post);

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


  const authorName = post.author?.username || "Anonymous";
  const isAuthor = post?.author?.username === authUser?.username;




  const handleEditClick = () => {
    navigate(`/blog/${post.slug}/edit`);
  };

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;
    try {
      await blogApi.deletePost(post.id);
      toast.success('Blog deleted successfully');
      navigate('/blog');
    } catch {
      toast.error('Failed to delete blog');
    }
  };


  const handleOnLike = async () => {
    if (!isAuthenticated) {
      toast.custom((t) => (
        <div className={`bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <span className="font-medium">You need to be logged in to like posts.</span>
          <a href={"/auth/login" + `?redirect=${encodeURIComponent(window.location.pathname)}`} className="text-blue-600 hover:underline font-semibold">
            Log in
          </a>
        </div>
      ));
      return;
    }
    toggle();
  };

  return (
    <>
      <BlogDetailMetadata post={post} />
      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">

          {/* Back Link + Author Actions */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/blog" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group">
              <AiOutlineArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold">Back to blog</span>
            </Link>

            {/* Author Menu - Only visible to post author */}
            {isAuthor && (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Post actions"
                >
                  <HiEllipsisVertical size={24} className="text-gray-600" />
                </button>

                {showMenu && (
                  <div
                    className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-max"
                    ref={menuRef}
                  >
                    <button
                      onClick={handleEditClick}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors first:rounded-t-lg text-sm font-medium"
                    >
                      <MdEdit size={18} />
                      Edit post
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors last:rounded-b-lg text-sm font-medium border-t border-gray-100"
                    >
                      <MdDelete size={18} />
                      Delete post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

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
          <div className="flex max-md:flex-col gap-x-8 max-md:gap-y-4 py-4 border-y border-dark mb-12 text-dark">
            <div className="flex items-center md:gap-8 max-md:justify-between urbanist-font font-medium text-lg">
              <span className="flex items-center gap-2">
                {isBlogLiked && isAuthenticated ?
                  <AiFillLike
                    onClick={handleOnLike}
                    size={24}
                    fill="#103E2E"
                    className="max-md:w-4 max-md:h-4 shrink-0 active:scale-95 transition-transform"
                  />
                  :
                  <AiOutlineLike
                    onClick={handleOnLike}
                    size={24}
                    className="max-md:w-4 max-md:h-4 shrink-0 active:scale-95 transition-transform"
                  />
                } {likeCount} like{(likeCount !== 1) ? 's' : ''}
              </span>
              <span className="flex items-center gap-2">
                <AiOutlineEye size={24} className="max-md:w-4 max-md:h-4 shrink-0" /> {post.views} view{post.views !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-2">
                <LuTimer size={24} className="max-md:w-4 max-md:h-4 shrink-0" /> {post.read_time} min{post.read_time > 1 ? 's' : ''} read
              </span>
            </div>
            <div className="flex items-center gap-2 flex-[1] justify-end">
              <VscAccount size={24} className="max-md:w-4 max-md:h-4 shrink-0" /> {authorName}
            </div>
          </div>

          {/* Article Body - Affichage du contenu HTML de l'éditeur */}
          <BlogContent htmlContent={post.content} />

          {/* Style pour le contenu du blog */}
          <style >{`
          .blog-content {
            line-height: 1.8;
            font-family: "urbanist";
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
        `}</style>
        </main>
      </div>
    </>
  );
}

const BlogContent = ({ htmlContent }: { htmlContent: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
        block.classList.add('relative');

        if (!block.querySelector('.copy-button')) {
          const copyButton = document.createElement('button');
          copyButton.className =
            'copy-button absolute top-[18px] right-[18px] cursor-pointer flex items-center text-white justify-center bg-white bg-opacity-0 border border-white rounded size-8 border-opacity-20 hover:bg-opacity-10 hover:border-opacity-40 active:scale-95';

          const setSVG = (element: HTMLElement, svgString: string) => {
            element.innerHTML = svgString;
          };

          const copyIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
          `;

          const checkIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          `;

          copyButton.addEventListener('click', () => {
            const codeText = block.textContent || '';
            navigator.clipboard
              .writeText(codeText)
              .then(() => {
                setSVG(copyButton, checkIcon);
                toast.custom((t) => (
                  <div
                    className={`bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 ${
                      t.visible ? 'animate-enter' : 'animate-leave'
                    }`}
                  >
                    <span className="font-medium">Code copied to clipboard!</span>
                  </div>
                ));
                setTimeout(() => {
                  setSVG(copyButton, copyIcon);
                }, 2000);
              })
              .catch(() => {
                toast.custom((t) => (
                  <div
                    className={`bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 ${
                      t.visible ? 'animate-enter' : 'animate-leave'
                    }`}
                  >
                    <span className="font-medium">Failed to copy code.</span>
                  </div>
                ));
              });
          });

          setSVG(copyButton, copyIcon);
          block.appendChild(copyButton);
        }
      });
    }
  }, [htmlContent]);

  return (
    <article className="leading-relaxed text-lg space-y-10 urbanist-font">
      <div
        ref={contentRef}
        className="blog-content prose prose-lg max-w-none md:font-medium"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}

const BlogDetailMetadata = ({ post }: { post: BlogPost }) => {
  // Generate SEO-friendly description from content (first 160 chars)
  const generateDescription = (htmlContent: string): string => {
    const plainText = htmlContent
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
    return plainText.substring(0, 160);
  };

  const metaDescription = generateDescription(post.content);
  const canonicalUrl = `${window.location.origin}/blog/${post.slug}`;
  const publishedDate = new Date(post.created_at).toISOString();
  const authorName = post.author?.username || "Anonymous";
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{post.title} | Blog - Django Cameroon</title>
      <meta name="title" content={`${post.title} | Blog - Django Cameroon`} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={post.tags.join(', ')} />
      <meta name="author" content={authorName} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={post.cover_image} />
      <meta property="og:image:alt" content={post.title} />
      <meta property="og:site_name" content="Django Cameroon Blog" />

      {/* Article Meta Tags */}
      <meta property="article:published_time" content={publishedDate} />
      <meta property="article:author" content={authorName} />
      {post.tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={post.cover_image} />
      <meta name="twitter:creator" content={`@${authorName}`} />

      {/* Additional Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": metaDescription,
          "image": post.cover_image,
          "author": {
            "@type": "Person",
            "name": authorName
          },
          "datePublished": publishedDate,
          "articleBody": post.content.replace(/<[^>]*>/g, ''),
          "keywords": post.tags.join(', '),
          "wordCount": post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
          "url": canonicalUrl,
          "timeRequired": `PT${post.read_time}M`,
          "interactionStatistic": [
            {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/LikeAction",
              "userInteractionCount": post.likes
            },
            {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/ViewAction",
              "userInteractionCount": post.views
            }
          ]
        })}
      </script>
    </Helmet>
  )
}

export default BlogDetail;