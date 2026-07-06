import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { blogApi } from "@/lib/blogApi";
import BlogClient from "./blog-client";

export const metadata: Metadata = {
  title: "Blog | Django Cameroon",
  description:
    "Articles, tutorials and stories from the Django Cameroon community.",
};

export default async function BlogPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts(),
    queryFn: () => blogApi.getAllPosts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogClient />
    </HydrationBoundary>
  );
}
