import { Link } from 'react-router-dom';
import { ProjectCard } from '../..';
import { GoArrowUpRight } from 'react-icons/go';

const ProjectsSection = () => {
  return (
    <div className='mt-16 lg:mt-0'>
      <div className='mb-[1.875rem]'>
        <p className='text-center text-grey mb-2 text-xl urbanist-font font-medium'>
          Still confused?
        </p>
        <h3 className='text-center text-primary text-3xl font-bold noheli-font'>
          Latest Projects & Articles From The Crew
        </h3>
        <Link to="#" className='mx-auto w-fit flex items-center gap-x-2 urbanist-font text-xl text-secondary py-1 px-2 border-b border-b-secondary'>
            View all projects & articles
            <GoArrowUpRight className='w-6 h-6' />
        </Link>
      </div>
      {/* <div className=''>
        <div className='mt-10 flex justify-center items-center overflow-auto gap-8'>
          <button className='whitespace-nowrap md:text-lg rounded-full bg-secondary/20 border border-secondary cursor-pointer text-secondary flex justify-center items-center py-2 px-10 md:px-4'>
            Quick Peek
          </button>
          <button className='whitespace-nowrap md:text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-10 md:px-4'>
            Web
          </button>
          <button className='whitespace-nowrap md:text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-10 md:px-4'>
            Mobile
          </button>
          <button className='whitespace-nowrap md:text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-10 md:px-4'>
            API
          </button>
          <button className='whitespace-nowrap md:text-lg rounded-full text-text-color  cursor-pointer flex justify-center items-center py-2 px-10 md:px-4'>
            AI/ML
          </button>
        </div> */}
      {/* </div> */}
      <div className='flex overflow-x-scroll gap-x-12 projects-slider'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectsSection;
