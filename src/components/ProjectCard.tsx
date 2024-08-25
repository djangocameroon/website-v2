import { HomeImages } from '../assets';
import { Badge } from './layout';
import { GrArticle } from 'react-icons/gr';
import { FaArrowRightLong } from 'react-icons/fa6';

const ProjectCard = () => {
  return (
    <div className='cursor-pointer bg-white px-6 pt-6 w-[625px] h-[700px] border border-gray-400 rounded-[55px] shadow-xl shrink-0'>
      <div>
        <img src={HomeImages.projectBg} alt='' className='rounded-[30px]' />
      </div>
      <div>
        <p className='text-primary text-2xl mt-3 mb-3 urbanist-font font-bold'>
          Doing something more interesting and funny with Django rather than
          just python manage.py runserver
        </p>
        <div className='flex justify-start items-center gap-3'>
          <Badge>
            <div className='flex justify-center items-center gap-3'>
              <GrArticle />
              <p>Project</p>
            </div>
          </Badge>
        </div>
        <div className='flex justify-start items-center gap-3 mt-10'>
          <p className='text-text-color/80 text-sm font-bold'>Read More</p>
          <FaArrowRightLong className='text-sm text-text-color' />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
