import { BecomeMember, Collaboration, ProjectsSection, YoutubeSection, Header, EventsSection } from '../components/pages/Home';

const Home = () => {
  return (
    <>
      <Header/>
      <BecomeMember />
      <YoutubeSection />
      <Collaboration />
      <ProjectsSection />
      <EventsSection/>
    </>
  );
};

export default Home;
