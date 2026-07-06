"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { GoArrowUpRight } from "react-icons/go";
import { LuTimer } from "react-icons/lu";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { cn } from "@/utils/constants";
import { BlogPost } from "@/types/blog";

interface ArticleCardProps {
  post: BlogPost;
  className?: string;
}

const ArticleImagePlaceholder = () => (
  <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary/50">
    <HiOutlineNewspaper className="size-10 text-white/50" />
  </div>
);

const ArticleCard = ({ post, className }: ArticleCardProps) => {
  // BlogSerializer prefixes slug with "/" (e.g. "/my-post"); the detail route
  // is /blog/:slug, so concatenating without an extra separator avoids "//".
  const href = `/blog${post.slug}`;

  return (
    <div
      className={cn(
        "group flex h-full w-full max-w-96 shrink-0 flex-col overflow-hidden rounded-[30px] border-[1.5px] border-primary shadow-outline shadow-xl transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ArticleImagePlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary urbanist-font"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="line-clamp-2 text-xl font-semibold text-primary nohemi-font md:text-2xl">
          {post.title}
        </h3>

        <div className="mt-auto flex flex-wrap items-center gap-4 text-xs text-grey urbanist-font">
          <span className="flex items-center gap-1.5">
            <AiOutlineLike className="size-4" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1.5">
            <AiOutlineEye className="size-4" />
            {post.views}
          </span>
          <span className="flex items-center gap-1.5">
            <LuTimer className="size-4" />
            {post.read_time} min read
          </span>
        </div>

        <Link
          href={href}
          className="flex w-fit items-center gap-x-2 py-1 text-lg font-medium text-secondary urbanist-font transition-colors duration-200 hover:text-secondary/80"
        >
          Read article
          <GoArrowUpRight className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
