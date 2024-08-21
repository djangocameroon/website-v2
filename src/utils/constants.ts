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
