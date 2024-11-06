import { Link } from "react-router-dom";
import { ProjectCard } from "@/components";
import { GoArrowUpRight } from "react-icons/go";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useRef } from "react";

const ProjectsSection = () => {
	const scrollableContainer = useRef<HTMLDivElement | null>(null);


	const handleDirectionClick = (direction: "left" | "right") => {
		if (scrollableContainer && scrollableContainer.current)
			if (direction === "left")
				scrollableContainer.current.scrollLeft -= 300; // Adjust the scroll speed here
			else scrollableContainer.current.scrollLeft += 300;
	};

	return (
		<div className="mt-16 lg:mt-0">
			<div className="mb-[1.875rem]">
				<p className="text-center text-grey mb-1 md:mb-2 text-xl urbanist-font font-medium">
					Still confused?
				</p>
				<h3 className="text-center text-primary text-3xl max-md:text-2xl font-bold noheli-font">
					Latest Projects & Articles <br className="md:hidden" /> From
					The Crew
				</h3>
				<Link
					to="#"
					className="mx-auto w-fit flex items-center gap-x-2 urbanist-font text-xl max-md:text-base text-secondary py-1 px-2 border-b border-b-secondary"
				>
					View all projects & articles
					<GoArrowUpRight className="w-6 h-6" />
				</Link>
			</div>
			<div className="relative">
				<div
					className="overflow-x-scroll overflow-y-hidden projects-slider"
					ref={scrollableContainer}
				>
					<div className="flex gap-x-12 mb-20">
						<ProjectCard />
						<ProjectCard />
						<ProjectCard />
						<ProjectCard />
					</div>
				</div>
				<div className="flex justify-end gap-x-2 mb-4 absolute overflow-hidden bottom-1 right-0">
					<button
						className="text-secondary border-[1.5px] border-secondary rounded-2xl md:p-2.5 p-2 bg-secondary/10"
						onClick={() => handleDirectionClick("left")}
					>
						<LuArrowLeft className="w-6 h-6" />
					</button>
					<button
						className="text-secondary border-[1.5px] border-secondary rounded-2xl md:p-2.5 p-2 bg-secondary/10"
						onClick={() => handleDirectionClick("right")}
					>
						<LuArrowRight className="w-6 h-6 text-secondary" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProjectsSection;
