import { BecomeMember, Collaboration, ProjectsSection, YoutubeSection, Header } from '../components/pages/Home';

const Home = () => {
  return (
    <>
      <Header/>
      <BecomeMember />
      <div className='w-[90%] mx-auto'>
         <YoutubeSection />
        <Collaboration />
        <ProjectsSection />
        {/* <EventsSection/>  */}
         {/* <Newsletter/>  */}
      </div>
      
    </>
  );
};

export default Home;
