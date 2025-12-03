import { ProjectCard } from "@/components";
import { Badge } from "@/components/layout";
import { useState } from "react";
import { GrArticle } from "react-icons/gr";
import { FaCode, FaLayerGroup } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

const Project = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: "All Projects", icon: <FaLayerGroup /> },
    { id: "articles", label: "Articles", icon: <GrArticle /> },
    { id: "projects", label: "Projects", icon: <FaCode /> },
  ];

  return (
    <div
      id="project"
      className="overflow-x-hidden mx-auto w-[90%] max-w-[1400px] mt-32 mb-20 space-y-12"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-block">
          <Badge backgroundColor="bg-secondary/10">
            <div className="flex items-center gap-2">
              <FaLayerGroup className="text-secondary" />
              <span className="text-secondary font-medium">
                Explore Our Work
              </span>
            </div>
          </Badge>
        </div>
        <h1 className="text-primary nohemi-font text-4xl md:text-6xl font-extrabold">
          Projects & Articles
        </h1>
        <p className="text-text-color urbanist-font text-lg md:text-xl max-w-3xl mx-auto">
          Discover innovative projects, insightful articles, and technical
          resources crafted by the Django Cameroon community
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects and articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-gray-300 focus:border-secondary focus:outline-none urbanist-font text-base"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              backgroundColor={
                activeFilter === filter.id ? "bg-secondary" : "bg-secondary/10"
              }
              className={`cursor-pointer transition-all ${
                activeFilter === filter.id ? "text-white" : "text-secondary"
              }`}
              outline={activeFilter !== filter.id}
            >
              <div
                className="flex items-center gap-2 px-2"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.icon}
                <span className="font-medium">{filter.label}</span>
              </div>
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              45+
            </h2>
            <p className="urbanist-font text-sm md:text-base">Total Projects</p>
          </div>
          <div className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              120+
            </h2>
            <p className="urbanist-font text-sm md:text-base">
              Articles Published
            </p>
          </div>
          <div className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              30+
            </h2>
            <p className="urbanist-font text-sm md:text-base">Contributors</p>
          </div>
          <div className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              5k+
            </h2>
            <p className="urbanist-font text-sm md:text-base">
              Community Members
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-primary nohemi-font text-2xl md:text-3xl font-bold">
            Featured Projects
          </h2>
          <p className="text-text-color urbanist-font text-sm md:text-base">
            Showing <span className="font-bold text-secondary">12</span> results
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-12">
          <button className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-600 urbanist-font font-medium hover:border-secondary hover:text-secondary transition-all">
            Previous
          </button>
          <button className="px-4 py-2 rounded-lg bg-secondary text-white urbanist-font font-medium">
            1
          </button>
          <button className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-600 urbanist-font font-medium hover:border-secondary hover:text-secondary transition-all">
            2
          </button>
          <button className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-600 urbanist-font font-medium hover:border-secondary hover:text-secondary transition-all">
            3
          </button>
          <button className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-600 urbanist-font font-medium hover:border-secondary hover:text-secondary transition-all">
            Next
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center space-y-6 border-2 border-primary/10">
        <h2 className="text-primary nohemi-font text-3xl md:text-4xl font-bold">
          Want to Contribute?
        </h2>
        <p className="text-text-color urbanist-font text-lg max-w-2xl mx-auto">
          Share your Django projects and articles with the community. Help
          others learn and grow together!
        </p>
        <button className="bg-secondary text-white urbanist-font font-bold text-lg px-8 py-4 rounded-full hover:bg-secondary/90 transition-all shadow-lg">
          Submit Your Project
        </button>
      </div>
    </div>
  );
};

export default Project;
