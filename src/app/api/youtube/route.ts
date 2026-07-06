import { NextRequest, NextResponse } from "next/server";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
// Cache upstream YouTube responses for an hour — this data changes at most a
// few times a week and the API quota is limited (10k units/day).
const REVALIDATE_SECONDS = 3600;

interface RawPlaylistItem {
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
}

interface VideoStatsMap {
    [videoId: string]: { views: number; likes: number };
}

async function getUploadsPlaylistId(
    { channelId, handle }: { channelId: string | null; handle: string | null },
    apiKey: string
): Promise<string> {
    const params = new URLSearchParams({ part: "contentDetails", key: apiKey });
    if (channelId) params.set("id", channelId);
    if (handle) params.set("forHandle", handle);

    const res = await fetch(`${YOUTUBE_API_BASE}/channels?${params.toString()}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
        throw new Error(`Failed to resolve channel (${res.status})`);
    }

    const data = await res.json();
    const playlistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!playlistId) {
        throw new Error("Channel has no uploads playlist");
    }
    return playlistId;
}

async function getPlaylistVideoIds(playlistId: string, apiKey: string): Promise<RawPlaylistItem[]> {
    const params = new URLSearchParams({
        part: "snippet",
        playlistId,
        maxResults: "24",
        key: apiKey,
    });

    const res = await fetch(`${YOUTUBE_API_BASE}/playlistItems?${params.toString()}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch playlist items (${res.status})`);
    }

    const data = await res.json();
    return (data.items ?? []).map((item: { snippet?: Record<string, unknown> }) => {
        const snippet = item.snippet ?? {};
        const resourceId = snippet.resourceId as { videoId?: string } | undefined;
        const thumbnails = (snippet.thumbnails ?? {}) as Record<string, { url?: string }>;
        const thumbnail =
            thumbnails.maxres?.url ??
            thumbnails.high?.url ??
            thumbnails.medium?.url ??
            thumbnails.default?.url ??
            "";

        return {
            videoId: resourceId?.videoId ?? "",
            title: (snippet.title as string) ?? "",
            description: (snippet.description as string) ?? "",
            thumbnail,
            publishedAt: (snippet.publishedAt as string) ?? "",
        };
    });
}

async function getVideoStats(videoIds: string[], apiKey: string): Promise<VideoStatsMap> {
    if (videoIds.length === 0) return {};

    const params = new URLSearchParams({
        part: "statistics",
        id: videoIds.join(","),
        key: apiKey,
    });

    const res = await fetch(`${YOUTUBE_API_BASE}/videos?${params.toString()}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch video stats (${res.status})`);
    }

    const data = await res.json();
    const stats: VideoStatsMap = {};
    for (const item of data.items ?? []) {
        stats[item.id] = {
            views: Number(item.statistics?.viewCount ?? 0),
            likes: Number(item.statistics?.likeCount ?? 0),
        };
    }
    return stats;
}

function extractHashtags(description: string): string[] {
    const matches = description?.match(/#\w+/g) ?? [];
    return Array.from(new Set(matches.map((tag) => tag.slice(1))));
}

function isShort(v: RawPlaylistItem): boolean {
    const haystack = `${v.title || ""} ${v.description || ""}`.toLowerCase();
    return /#shorts\b/.test(haystack) || /shorts\b/.test(haystack);
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const channelId = url.searchParams.get("channelId");
    const handle = url.searchParams.get("handle");
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!channelId && !handle) {
        return NextResponse.json({ status: false, message: "Missing channelId or handle parameter" }, { status: 400 });
    }

    if (!apiKey) {
        return NextResponse.json({
            status: false,
            message: "Missing YouTube API key",
        }, { status: 500 });
    }

    try {
        const playlistId = await getUploadsPlaylistId({ channelId, handle }, apiKey);
        const items = await getPlaylistVideoIds(playlistId, apiKey);
        const stats = await getVideoStats(
            items.map(v => v.videoId).filter(Boolean),
            apiKey
        );

        const videos = items
        .filter(v => v.videoId)
        .filter(v => !isShort(v))
        .map(v => ({
            videoId: v.videoId,
            title: v.title,
            description: v.description,
            thumbnail: v.thumbnail,
            publishedAt: v.publishedAt,
            views: stats[v.videoId]?.views ?? 0,
            likes: stats[v.videoId]?.likes ?? 0,
            tags: extractHashtags(v.description),
        }))
        return NextResponse.json({ status: true, videos });
    } catch (error) {
        console.error("Error fetching YouTube data:", error);
        return NextResponse.json({ status: false, message: "Error fetching YouTube data" }, { status: 500 });
    }

}
