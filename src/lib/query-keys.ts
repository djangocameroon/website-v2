import { BlogFilters } from "@/types/blog";
import { EventFilters } from "@/types/events";

export const queryKeys = {
  posts: (filters?: BlogFilters) => ["posts", filters ?? {}] as const,
  post: (slug: string) => ["post", slug] as const,
  tags: () => ["tags"] as const,
  events: (filters?: EventFilters) => ["events", filters ?? {}] as const,
  event: (idOrSlug: string) => ["event", idOrSlug] as const,
  eventRegistration: (eventId: string) => ["event-registration", eventId] as const,
  projects: () => ["projects"] as const,
  youtubeVideos: (handle: string) => ["youtube-videos", handle] as const,
};
