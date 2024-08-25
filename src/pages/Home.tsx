import {
  BecomeMember,
  Collaboration,
  EventsSection,
  ProjectsSection,
  YoutubeSection,
  Header,
  Newsletter,
} from '../components/pages/Home-Page-Components';

const Home = () => {
  return (
    <>
      <Header />
      <BecomeMember />
      <div className='px-[6.25rem] mb-20'>
        <YoutubeSection />
        <Collaboration />
      </div>

      <ProjectsSection />
      <div className='px-[6.25rem]'>
        <EventsSection />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
