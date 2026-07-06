import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { projectsApi } from "@/lib/projectsApi";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects | Django Cameroon",
  description:
    "Explore projects built by the Django Cameroon community — web apps, APIs, and open-source tools.",
};

export default async function ProjectsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.projects(),
    queryFn: () => projectsApi.getAllProjects(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsClient />
    </HydrationBoundary>
  );
}
