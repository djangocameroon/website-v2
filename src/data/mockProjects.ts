import { Project, ProjectStats } from "@/types/project";
import { HomeImages } from "@/assets";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Django E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with Django, featuring payment integration, inventory management, and analytics dashboard.",
    image: HomeImages.projectBg,
    githubUrl: "https://github.com/djangocameroon/ecommerce-platform",
    liveUrl: "https://demo-ecommerce.djangocameroon.com",
    stars: 234,
    technologies: [
      { name: "Django", color: "#0C4B33" },
      { name: "Python", color: "#3776AB" },
      { name: "PostgreSQL", color: "#336791" },
    ],
    category: "web",
    contributors: 12,
  },
  {
    id: "2",
    title: "REST API Boilerplate",
    description:
      "A production-ready Django REST framework boilerplate with JWT authentication, permissions, and comprehensive documentation.",
    image: HomeImages.projectBg,
    githubUrl: "https://github.com/djangocameroon/drf-boilerplate",
    stars: 189,
    technologies: [
      { name: "Django", color: "#0C4B33" },
      { name: "DRF", color: "#A30000" },
    ],
    category: "api",
    contributors: 8,
  },
  {
    id: "3",
    title: "Django CMS Tool",
    description:
      "A flexible content management system built on Django, perfect for blogs, news sites, and portfolio websites.",
    image: HomeImages.projectBg,
    githubUrl: "https://github.com/djangocameroon/cms-tool",
    liveUrl: "https://cms-demo.djangocameroon.com",
    stars: 156,
    technologies: [
      { name: "Django", color: "#0C4B33" },
      { name: "Python", color: "#3776AB" },
    ],
    category: "other",
    contributors: 5,
  },
  {
    id: "4",
    title: "Social Media Analytics",
    description:
      "Track and analyze social media metrics with this Django-powered analytics platform featuring real-time data visualization.",
    image: HomeImages.projectBg,
    githubUrl: "https://github.com/djangocameroon/social-analytics",
    liveUrl: "https://analytics.djangocameroon.com",
    stars: 298,
    technologies: [
      { name: "Django", color: "#0C4B33" },
      { name: "Celery", color: "#37814A" },
      { name: "Redis", color: "#DC382D" },
    ],
    category: "web",
    contributors: 15,
  },
  {
    id: "5",
    title: "API Gateway Service",
    description:
      "Microservices API gateway built with Django, handling authentication, rate limiting, and service routing.",
    image: HomeImages.projectBg,
    githubUrl: "https://github.com/djangocameroon/api-gateway",
    stars: 142,
    technologies: [
      { name: "Django", color: "#0C4B33" },
      { name: "Docker", color: "#2496ED" },
    ],
    category: "api",
    contributors: 6,
  },
  {
    id: "6",
    title: "Django CLI Toolkit",
    description:
      "Command-line tools and utilities to supercharge your Django development workflow with automation and scaffolding.",
    image: HomeImages.projectBg,
    githubUrl: "https://github.com/djangocameroon/cli-toolkit",
    stars: 201,
    technologies: [
      { name: "Django", color: "#0C4B33" },
      { name: "Python", color: "#3776AB" },
    ],
    category: "other",
    contributors: 10,
  },
];

export const mockProjectStats: ProjectStats = {
  totalProjects: 45,
  totalStars: 2300,
  activeContributors: 30,
  totalContributions: 150,
};
