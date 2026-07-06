import type { Metadata } from "next";
import BlogAddClient from "./blog-add-client";

export const metadata: Metadata = {
  title: "New post | Blog - Django Cameroon",
  robots: { index: false },
};

export default function BlogAddPage() {
  return <BlogAddClient />;
}
