import { cache } from "react";
import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { eventsApi } from "@/lib/eventsApi";
import EventDetailClient from "./event-detail-client";

const PLACEHOLDER_THUMBNAIL = 'https://placehold.co/1920x1080';

// Deduplicates the fetch between generateMetadata and the page render.
const getEvent = cache((idOrSlug: string) => eventsApi.getEventByIdOrSlug(idOrSlug));

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const event = await getEvent(id);
    return {
      title: `${event.title} | Events - Django Cameroon`,
      description: event.description.slice(0, 160),
      openGraph: {
        images: [event.thumbnail || PLACEHOLDER_THUMBNAIL],
      },
    };
  } catch {
    return { title: "Events - Django Cameroon" };
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient
    .prefetchQuery({
      queryKey: queryKeys.event(id),
      queryFn: () => getEvent(id),
    })
    .catch(() => {
      // Client renders the not-found state.
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventDetailClient id={id} />
    </HydrationBoundary>
  );
}
