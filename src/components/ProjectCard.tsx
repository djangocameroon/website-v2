import { HomeImages } from "@/assets";
import { Badge } from "./layout";
import { GrArticle } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const ProjectCard = () => {
	return (
		<div className="cursor-pointer bg-white px-6 py-6 max-md:w-[90vw] max-md:h-[500px] w-[625px] h-[700px] border border-gray-400 rounded-[55px] shadow-xl flex flex-col shrink-0">
			<div>
				<img
					src={HomeImages.projectBg}
					alt=""
					className="rounded-[30px]"
				/>
			</div>
			<div className="grow flex justify-between flex-col">
				<div className="md:space-y-9 space-y-5">
					<p className="text-primary text-2xl my-3 urbanist-font font-bold">
						Doing something more interesting and funny with Django
						rather than just python manage.py runserver
					</p>
					<div className="flex justify-start items-center gap-3">
						<Badge>
							<div className="flex justify-center items-center gap-3">
								<GrArticle />
								<p className="urbanist-font">project</p>
							</div>
						</Badge>
					</div>
				</div>

				<Link
					to="#"
					className="w-fit flex items-center gap-x-2 urbanist-font text-xl text-secondary py-1 px-2 font-medium"
				>
					Read More
					<GoArrowUpRight className="w-6 h-6" />
				</Link>
			</div>
		</div>
	);
};

export default ProjectCard;
