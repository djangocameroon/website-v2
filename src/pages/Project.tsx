import { ProjectCard } from "@/components";
import { Badge } from "@/components/layout";
import { useState } from "react";
import { FaCode, FaLayerGroup } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

const Project = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: "All Projects", icon: <FaLayerGroup /> },
    { id: "web", label: "Web Apps", icon: <FaCode /> },
    { id: "api", label: "APIs & Backends", icon: <FaCode /> },
    { id: "tools", label: "Tools & Libraries", icon: <FaCode /> },
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
          Community Projects
        </h1>
        <p className="text-text-color urbanist-font text-lg md:text-xl max-w-3xl mx-auto">
          Explore open-source Django projects built by the Django Cameroon
          community. Star, contribute, and collaborate on amazing projects!
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
              placeholder="Search projects by name, technology, or description..."
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
      <div className="bg-[#0C4B33] rounded-3xl p-8 md:p-12 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              45+
            </h2>
            <p className="urbanist-font text-sm md:text-base opacity-90">
              Open Source Projects
            </p>
          </div>
          <div className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              2.3k+
            </h2>
            <p className="urbanist-font text-sm md:text-base opacity-90">
              GitHub Stars
            </p>
          </div>
          <div className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              30+
            </h2>
            <p className="urbanist-font text-sm md:text-base opacity-90">
              Active Contributors
            </p>
          </div>
          <div className="text-center text-white space-y-2">
            <h2 className="nohemi-font text-4xl md:text-5xl font-extrabold">
              150+
            </h2>
            <p className="urbanist-font text-sm md:text-base opacity-90">
              Total Contributions
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-primary nohemi-font text-2xl md:text-3xl font-bold">
            Featured Projects
          </h2>
          <p className="text-text-color urbanist-font text-sm md:text-base">
            Showing <span className="font-bold text-secondary">12</span> of{" "}
            <span className="font-bold">45</span> projects
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12 justify-items-center">
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
      <div className="bg-[#0C4B33] rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-lg">
        <h2 className="text-white nohemi-font text-3xl md:text-4xl font-bold">
          Have a Django Project?
        </h2>
        <p className="text-white/90 urbanist-font text-lg max-w-2xl mx-auto">
          Share your open-source Django project with the community. Let's build
          amazing things together and inspire others!
        </p>
        <button className="bg-white text-[#0C4B33] urbanist-font font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg">
          Submit Your Project
        </button>
      </div>
    </div>
  );
};

export default Project;
