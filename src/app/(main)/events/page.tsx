import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { eventsApi } from "@/lib/eventsApi";
import EventsClient from "./events-client";

export const metadata: Metadata = {
  title: "Events | Django Cameroon",
  description:
    "Workshops, talks and meetups from the Django Cameroon community — online and in person.",
};

export default async function EventsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.events({ page: 1 }),
    queryFn: () => eventsApi.getAllEvents({ page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventsClient />
    </HydrationBoundary>
  );
}
