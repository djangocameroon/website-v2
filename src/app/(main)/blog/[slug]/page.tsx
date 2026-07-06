import { cache } from "react";
import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { blogApi } from "@/lib/blogApi";
import BlogDetailClient from "./blog-detail-client";

const SITE_URL = process.env.SITE_URL ?? "https://djangocameroon.org";

// Deduplicates the fetch between generateMetadata and the page render.
const getPost = cache((slug: string) => blogApi.getPostBySlug(slug));

// Generate SEO-friendly description from content (first 160 chars)
const generateDescription = (htmlContent: string): string => {
  const plainText = htmlContent
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
  return plainText.substring(0, 160);
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPost(slug);
    const metaDescription = generateDescription(post.content);
    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
    const publishedDate = new Date(post.created_at).toISOString();
    const authorName = post.author?.username || "Anonymous";

    return {
      title: `${post.title} | Blog - Django Cameroon`,
      description: metaDescription,
      keywords: post.tags,
      authors: [{ name: authorName }],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: "article",
        url: canonicalUrl,
        title: post.title,
        description: metaDescription,
        images: post.cover_image ? [{ url: post.cover_image, alt: post.title }] : undefined,
        siteName: "Django Cameroon Blog",
        publishedTime: publishedDate,
        authors: [authorName],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: metaDescription,
        images: post.cover_image ? [post.cover_image] : undefined,
        creator: `@${authorName}`,
      },
    };
  } catch {
    return { title: "Blog - Django Cameroon" };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  let jsonLd: object | null = null;
  try {
    const post = await queryClient.fetchQuery({
      queryKey: queryKeys.post(slug),
      queryFn: () => getPost(slug),
    });

    const metaDescription = generateDescription(post.content);
    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
    const authorName = post.author?.username || "Anonymous";

    jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: metaDescription,
      image: post.cover_image,
      author: {
        "@type": "Person",
        name: authorName,
      },
      datePublished: new Date(post.created_at).toISOString(),
      articleBody: post.content.replace(/<[^>]*>/g, ''),
      keywords: post.tags.join(', '),
      wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
      url: canonicalUrl,
      timeRequired: `PT${post.read_time}M`,
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: post.likes,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/ViewAction",
          userInteractionCount: post.views,
        },
      ],
    };
  } catch {
    // Post fetch failed on the server — the client component renders the
    // not-found state after retrying.
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogDetailClient slug={slug} />
    </HydrationBoundary>
  );
}
