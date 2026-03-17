import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const projectCategories = [
    'Quick peek',
    'Web',
    'Mobile',
    'API',
    'AI/ML'
]

export const EventCategories = ['Quick peek', 'Workshop', 'Talk', 'Online', 'In-person'];


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navLinks = [
  {
    label: "About",
    link: "/about"
  },
  {
    label: "Events",
    link: "/events"
  },
  {
    label: "Projects",
    link: "/projects"
  },
  {
    label: "Product",
    link: "/product"
  },
  {
    label: "Blog",
    link: "/blog"
  },
]

export const socialLinks = {
  github: "https://github.com/djangocameroon",
  twitter: "https://x.com/DjangoCameroon",
  linkedin: "https://linkedin.com/company/djangocameroon",
  youtube: "https://www.youtube.com/@DjangoCameroon"
} as const;

export const SECRET_KEY = 'a-very-secret-key-123';
export const SAVED_AUTH_INFO_KEY = 'dj-auth';