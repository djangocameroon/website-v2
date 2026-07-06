import type { MetadataRoute } from "next";

const SITE_URL = (process.env.SITE_URL ?? "https://djangocameroon.org").replace(/\/$/, "");
const API_URL =
  (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8912").replace(/\/$/, "") +
  "/api/v1";
const PAGE_SIZE = 100;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
  { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/events`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.6 },
];

async function fetchJson(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

// Some blog/event slugs in the DB carry a leading slash — strip it so we
// don't emit double-slash URLs like /blog//my-test-blog-1.
const normalizeSlug = (slug: string) => slug.replace(/^\/+/, "");

async function getPublishedBlogSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  for (let page = 1; ; page += 1) {
    const body = await fetchJson(
      `${API_URL}/posts/?is_published=true&page=${page}&page_size=${PAGE_SIZE}`
    );
    for (const post of body.data ?? []) slugs.push(normalizeSlug(post.slug));
    if (page >= (body.pagination?.total_pages ?? 1)) break;
  }
  return slugs;
}

async function getPublishedEventSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  for (let page = 1; ; page += 1) {
    const body = await fetchJson(`${API_URL}/events/?page=${page}`);
    for (const event of body.data ?? []) {
      if (event.published) slugs.push(normalizeSlug(event.slug));
    }
    if (page >= (body.pagination?.total_pages ?? 1)) break;
  }
  return slugs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    ...route,
    lastModified: now,
  }));

  try {
    const [blogSlugs, eventSlugs] = await Promise.all([
      getPublishedBlogSlugs(),
      getPublishedEventSlugs(),
    ]);
    blogSlugs.forEach((slug) =>
      entries.push({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    );
    eventSlugs.forEach((slug) =>
      entries.push({
        url: `${SITE_URL}/events/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    );
  } catch (err) {
    console.warn(
      `[sitemap] Could not fetch dynamic routes from ${API_URL} — serving static routes only.`,
      err instanceof Error ? err.message : err
    );
  }

  return entries;
}
