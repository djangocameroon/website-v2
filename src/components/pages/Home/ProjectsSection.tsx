import { ProjectCard } from '../../../components';

const ProjectsSection = () => {
  return (
    <div className='w-[85%] mx-auto h-screen'>
      <div>
        <p className='text-center text-text-color/70 mb-2 text-xl'>
          {' '}
          Still confused?
        </p>
        <h3 className='text-center text-primary text-4xl font-semibold'>
          Latest Projects & Articles From The Crew
        </h3>
      </div>
      <div className=''>
        <div className='mt-10 flex justify-center items-center gap-8'>
          <button className='text-lg rounded-full bg-secondary/20 border border-secondary cursor-pointer text-secondary flex justify-center items-center py-2 px-4'>
            Quick Peek
          </button>
          <button className='text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-4'>
            Web
          </button>
          <button className='text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-4'>
            Mobile
          </button>
          <button className='text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-4'>
            API
          </button>
          <button className='text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-4'>
            AI/ML
          </button>
        </div>
      </div>
      <div className='flex flex-wrap justify-start items-center gap-4 mt-10'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}

export default ProjectsSection