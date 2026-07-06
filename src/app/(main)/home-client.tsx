"use client";

import { MotionConfig } from "framer-motion";
import {
	BecomeMember,
	Collaboration,
	EventsSection,
	ProjectsSection,
	YoutubeSection,
	Header,
	Newsletter,
} from "@/components/pages/Home-Page-Components";

const HomeClient = () => {
	return (
		<MotionConfig reducedMotion="user">
			<div className="overflow-hidden mx-auto w-[90%] space-y-20 mb-5">
				<Header />
				<BecomeMember />
				<YoutubeSection />
				<Collaboration />

				<ProjectsSection />
				<EventsSection />
				<Newsletter />
			</div>
		</MotionConfig>
	);
};

export default HomeClient;
