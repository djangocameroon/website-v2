#!/usr/bin/env node
// Regenerates dist/sitemap.xml with the app's static routes plus every
// published blog post and event fetched live from the API. Runs as a
// "postbuild" step so the sitemap in dist/ always reflects current content —
// public/sitemap.xml is only the static fallback Vite copies before this runs.
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SITE_URL = (process.env.SITE_URL ?? "https://djangocameroon.org").replace(/\/$/, "");
const API_URL =
  (process.env.VITE_PUBLIC_API_URL ?? "http://localhost:8912").replace(/\/$/, "") + "/api/v1";
const OUT_FILE = path.resolve(process.cwd(), "dist/sitemap.xml");
const PAGE_SIZE = 100;

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },
  { path: "/events", changefreq: "daily", priority: "0.8" },
  { path: "/projects", changefreq: "monthly", priority: "0.6" },
];

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

// Some blog/event slugs in the DB carry a leading slash — strip it so we
// don't emit double-slash URLs like /blog//my-test-blog-1.
const normalizeSlug = (slug) => slug.replace(/^\/+/, "");

async function getPublishedBlogSlugs() {
  const slugs = [];
  for (let page = 1; ; page += 1) {
    const body = await fetchJson(
      `${API_URL}/posts/?is_published=true&page=${page}&page_size=${PAGE_SIZE}`
    );
    for (const post of body.data ?? []) slugs.push(normalizeSlug(post.slug));
    if (page >= (body.pagination?.total_pages ?? 1)) break;
  }
  return slugs;
}

async function getPublishedEventSlugs() {
  const slugs = [];
  for (let page = 1; ; page += 1) {
    const body = await fetchJson(`${API_URL}/events/?page=${page}`);
    for (const event of body.data ?? []) {
      if (event.published) slugs.push(normalizeSlug(event.slug));
    }
    if (page >= (body.pagination?.total_pages ?? 1)) break;
  }
  return slugs;
}

function urlEntry(loc, { lastmod, changefreq, priority } = {}) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  const now = new Date().toISOString();
  const entries = STATIC_ROUTES.map((route) =>
    urlEntry(`${SITE_URL}${route.path}`, { lastmod: now, ...route })
  );

  try {
    const [blogSlugs, eventSlugs] = await Promise.all([
      getPublishedBlogSlugs(),
      getPublishedEventSlugs(),
    ]);
    blogSlugs.forEach((slug) =>
      entries.push(urlEntry(`${SITE_URL}/blog/${slug}`, { lastmod: now, changefreq: "monthly", priority: "0.7" }))
    );
    eventSlugs.forEach((slug) =>
      entries.push(urlEntry(`${SITE_URL}/events/${slug}`, { lastmod: now, changefreq: "monthly", priority: "0.7" }))
    );
  } catch (err) {
    console.warn(
      `[sitemap] Could not fetch dynamic routes from ${API_URL} — writing static routes only.\n[sitemap] ${err.message}`
    );
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.join("\n"),
    "</urlset>",
    "",
  ].join("\n");

  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, xml, "utf-8");
  console.log(`[sitemap] Wrote ${entries.length} URLs to ${OUT_FILE}`);
}

main();
