import type { Metadata } from "next";
import BlogEditClient from "./blog-edit-client";

export const metadata: Metadata = {
  title: "Edit post | Blog - Django Cameroon",
  robots: { index: false },
};

export default async function BlogEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogEditClient slug={slug} />;
}
