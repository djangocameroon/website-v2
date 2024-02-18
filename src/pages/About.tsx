import {
  AboutHeader,
  JoinUsNow,
  MissionVission,
  Organisers,
  WhereITStarted,
} from '../components/pages/About-Page-Components';

const About = () => {
  return (
    <div className='relative'>
      <AboutHeader/>
      <div className='w-full md:w-[85%] mx-auto'>
        <div className='my-10 w-full ml-auto flex flex-col gap-10'>
            <WhereITStarted />
            <MissionVission />
            <Organisers />
        </div>
        <JoinUsNow />
      </div>
    </div>
  );
};

export default About;
