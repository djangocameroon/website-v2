"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/utils/constants";
import { YoutubeVideo } from "@/types/youtube";

interface VideoCardProps {
  video: YoutubeVideo;
  accent?: "primary" | "secondary";
  className?: string;
}

const VideoCard = ({ video, accent = "secondary", className }: VideoCardProps) => {
  const t = useTranslations("HomePage.videoCard");
  const locale = useLocale();
  const compactNumberFormatter = new Intl.NumberFormat(locale, { notation: "compact" });
  const relativeTimeFormatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const formatRelativeTime = (dateString: string) => {
    const diffDays = Math.round((new Date(dateString).getTime() - Date.now()) / 86_400_000);
    if (Math.abs(diffDays) < 1) return t("today");
    if (Math.abs(diffDays) < 30) return relativeTimeFormatter.format(diffDays, "day");
    const diffMonths = Math.round(diffDays / 30);
    if (Math.abs(diffMonths) < 12) return relativeTimeFormatter.format(diffMonths, "month");
    return relativeTimeFormatter.format(Math.round(diffMonths / 12), "year");
  };

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("watchAria", { title: video.title })}
      className={cn(
        "group relative flex h-[300px] w-full shrink-0 overflow-hidden rounded-[28px] border transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        accent === "secondary" ? "border-secondary focus-visible:ring-secondary" : "border-primary focus-visible:ring-primary",
        className
      )}
    >
      {video.thumbnail ? (
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={cn("size-full", accent === "secondary" ? "bg-secondary-light" : "bg-primary-light")} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
        <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
          <FaPlay className="ml-1 size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold text-white nohemi-font">
          {video.title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 urbanist-font">
          <span className="flex items-center gap-1.5">
            <LuEye className="size-4" aria-hidden="true" />
            {t("views", { count: compactNumberFormatter.format(video.views) })}
          </span>
          <span className="flex items-center gap-1.5">
            <AiOutlineLike className="size-4" aria-hidden="true" />
            {compactNumberFormatter.format(video.likes)}
          </span>
          <span>{formatRelativeTime(video.publishedAt)}</span>
        </div>
      </div>
    </a>
  );
};

export default VideoCard;
