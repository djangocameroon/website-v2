import {
	BecomeMember,
	Collaboration,
	EventsSection,
	ProjectsSection,
	YoutubeSection,
	Header,
	Newsletter,
} from "@/components/pages/Home-Page-Components";

const Home = () => {
	return (
		<div className="overflow-x-hidden mx-auto w-[90%] space-y-20 mb-5">
			<Header />
			<BecomeMember />
			<YoutubeSection />
			<Collaboration />
			{/* <div className="mx-auto w-[90%] mb-20"></div> */}

			<ProjectsSection />
			<EventsSection />
			<Newsletter />
			{/* <div className="mx-auto w-[90%]"></div> */}
		</div>
	);
};

export default Home;
