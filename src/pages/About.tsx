import {
  AboutHeader,
  MissionVission,
  Organisers,
  RegionalImpact,
  WhereITStarted,
  MakingTheStory
} from '@/components/pages/About-Page-Components';
import { Newsletter } from '@/components/pages/Home-Page-Components';

const About = () => {
  return (
    <div className='relative'>
      <AboutHeader />
      <div className='w-full md:w-[85%] mx-auto max-md:px-4'>
        <WhereITStarted />
        <MissionVission />
        <RegionalImpact />
        <Organisers />
      </div>
      <MakingTheStory />
      <div className='w-full md:w-[85%] mx-auto max-md:px-4'>
        <Newsletter />
      </div>
    </div>
  );
};


export default About;
