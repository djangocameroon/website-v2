import { BlogImages } from '@/assets';

export const AVAILABLE_TAGS = [
  "Beginner", 
  "Python", 
  "Django", 
  "AI", 
  "ML", 
  "Real-Time",
  "Tutorial",
  "Community"
];

// 2. On peut aussi définir les filtres de navigation
export const FILTERS = [
    { label: "Latest", active: true },
    { label: "Most Read", active: false },
    { label: "Most Viewed", active: false },
];

export const BLOG_POSTS = [
  {
    id: 1,
    image: BlogImages.post1,
    tags: ["Beginner", "Python", "Django"], 
    title: "From Beginner to Pro: A Comprehensive Guide to Building Feature-Rich Web Applications with Django - Your One-Stop Shop for Mastering the Python Framework",
    like: "234 likes",
    views: "432 views",
    readTime: "2 mins read",
    author: "Jeol Fah",
  },
  {
    id: 2,
    image: BlogImages.post2,
    tags: ["AI", "ML", "Real-Time"],
    title: "Django for the Modern Web: Integrating Cutting-Edge Technologies Like Machine Learning, Real-Time Messaging, and Single-Page Applications",
    like: "59 likes",
    views: "324 views",
    readTime: "7 mins read",
    author: "Anonymous",
  },
  {
    id: 3,
    image: BlogImages.post3,
    tags: ["Beginner", "Python", "Django"], 
    title: "From Beginner to Pro: A Comprehensive Guide to Building Feature-Rich Web Applications with Django - Your One-Stop Shop for Mastering the Python Framework",
    like: "234 likes",
    views: "432 views",
    readTime: "2 mins read",
    author: "Jeol Fah",
  },
];