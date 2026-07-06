import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { eventsApi } from "@/lib/eventsApi";
import { projectsApi } from "@/lib/projectsApi";
import { blogApi } from "@/lib/blogApi";
import HomeClient from "./home-client";

// Filters must match the ones used by the client sections so the
// dehydrated cache hydrates into the same query keys.
const HOME_EVENTS_FILTERS = { upcoming: true, page_size: 7 };
const HOME_BLOG_FILTERS = { ordering: "-created_at", page_size: 12 } as const;

export default async function HomePage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.events(HOME_EVENTS_FILTERS),
      queryFn: () => eventsApi.getAllEvents(HOME_EVENTS_FILTERS),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.projects(),
      queryFn: () => projectsApi.getAllProjects(),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.posts(HOME_BLOG_FILTERS),
      queryFn: () => blogApi.getAllPosts(HOME_BLOG_FILTERS),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
