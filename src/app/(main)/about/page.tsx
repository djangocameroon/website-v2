import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { projectsApi } from "@/lib/projectsApi";
import {
  AboutHeader,
  MissionVission,
  Organisers,
  RegionalImpact,
  WhereITStarted,
  MakingTheStory
} from '@/components/pages/About-Page-Components';
import { Newsletter } from '@/components/pages/Home-Page-Components';

export const metadata: Metadata = {
  title: "About | Django Cameroon",
  description:
    "Learn about the Django Cameroon community — our story, mission, regional impact and the organisers behind it.",
};

export default async function AboutPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.projects(),
    queryFn: () => projectsApi.getAllProjects(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='relative'>
        <AboutHeader />
        <div className='w-full md:w-[85%] mx-auto max-md:px-4'>
          <WhereITStarted />
          <MissionVission />
          <RegionalImpact />
          <Organisers />
        </div>
        <MakingTheStory />
        <div className='w-full md:w-[85%] mx-auto max-md:px-4'>
          <Newsletter />
        </div>
      </div>
    </HydrationBoundary>
  );
}
