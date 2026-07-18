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
  // {
  //   label: "Product",
  //   link: "/product"
  // },
  {
    label: "Blog",
    link: "/blog"
  },
] as const;

export const socialLinks = {
  github: "https://github.com/djangocameroon",
  twitter: "https://x.com/DjangoCameroon",
  linkedin: "https://linkedin.com/company/djangocameroon",
  youtube: "https://www.youtube.com/@DjangoCameroon"
} as const;

// Used to resolve the uploads playlist via the YouTube Data API (forHandle).
export const youtubeChannelHandle = "DjangoCameroon";

export const SocialMediaPlatform = {
  TWITTER: "Twitter (X)",
  LINKEDIN: "LinkedIn",
  GITHUB: "GitHub",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  YOUTUBE: "YouTube",
  TIKTOK: "TikTok",
  WHATSAPP: "WhatsApp",
  TELEGRAM: "Telegram",
} as const;

