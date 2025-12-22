// import {
//   ProjectHeader,
//   SearchBar,
//   FilterButtons,
//   ProjectStats,
//   ProjectGrid,
//   Pagination,
//   ProjectCTA,
// } from "@/components/pages/Project-Page-Components";
// import { mockProjects, mockProjectStats } from "@/data/mockProjects";
// import { useProjectFilter } from "@/hooks/useProjectFilter";

// const Project = () => {
//   const {
//     searchQuery,
//     activeFilter,
//     currentPage,
//     paginatedProjects,
//     totalPages,
//     totalFiltered,
//     handleSearchChange,
//     handleFilterChange,
//     setCurrentPage,
//   } = useProjectFilter(mockProjects);

//   return (
//     <div
//       id="project"
//       className="overflow-x-hidden mx-auto w-[90%] max-w-[1400px] mt-32 mb-20 space-y-12"
//     >
//       <ProjectHeader />

//       <ProjectStats stats={mockProjectStats} />

//       <div className="space-y-6">
//         <SearchBar
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search projects by name, technology, or description..."
//         />
//         <FilterButtons
//           activeFilter={activeFilter}
//           onFilterChange={handleFilterChange}
//         />
//       </div>

//       <ProjectGrid projects={paginatedProjects} totalProjects={totalFiltered} />

//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       )}

//       <ProjectCTA />
//     </div>
//   );
// };

// export default Project;
import React from 'react';
import { Button } from '@/components/layout/button'; 
import ProjectCard from '@/components/ProjectCard';
import { VscGithubAlt } from "react-icons/vsc"; 

const Projects = () => {
  
  const projectsData = [
    { id: 1, title: "This project's name #1", image: "" },
    { id: 2, title: "This project's name #2", image: "" },
    { id: 3, title: "This project's name #3", image: "" },
  ];

  return (
    <section className="bg-[#050A1E] min-h-screen text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 max-w-2xl">
          <p className="text-[#4175FC] font-medium mb-4">Get busy with us.</p>
          <h1 className="text-5xl md:text-7xl font-bold font-urbanist leading-tight mb-8">
            We build <span className="text-gray-400">Open Source</span> #Projects.
          </h1>
          
          <Button 
            outline={false} 
            className="bg-[#4175FC] hover:bg-blue-600 flex items-center gap-2 py-4 px-8 rounded-xl text-lg transition-all"
          >
            <VscGithubAlt className="text-2xl" />
            View organization on GitHub
          </Button>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard 
              key={project.id} 
              title={project.title} 
              image={project.image} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;