"use client";

import Image from "next/image";
import { Button } from "@/components/layout";
import { HomeImages } from "@/assets";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, scaleIn, staggerContainer } from "./motion";

const SCROLL_OFFSET = 150;
const factsStagger = staggerContainer(0.1, 0.5);
const FACT_NUMBERS = ["567", "78", "1.5k", "20+"];

const Header = () => {
	const t = useTranslations("HomePage.header");
	const FACTS = FACT_NUMBERS.map((number, index) => ({
		number,
		title: t(`facts.${index + 1}.title`),
		description: t(`facts.${index + 1}.description`),
	}));
	const router = useRouter();
	const handleGetStartedClick = () => {
		const section = document.getElementById("become-member");
		if (!section) return;

		const top = section.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
		window.scrollTo({ top, behavior: "smooth" });
	};

	return (
		<div className="h-full max-md:mt-40 mt-48 mb-12" id="home">
			<div className="flex justify-center w-full max-h-[95vh]">
				<div className="w-full max-w-[900px]">
					<motion.h1
						initial="hidden"
						animate="visible"
						variants={fadeUp}
						className="leading-[1.15] text-primary nohemi-font overflow-hidden text-center text-3xl sm:text-[80px] font-extrabold"
					>
						{t.rich("title", { br: () => <br /> })}
					</motion.h1>
					<motion.p
						initial="hidden"
						animate="visible"
						variants={fadeUp}
						transition={{ delay: 0.15 }}
						className="leading-normal text-center text-xl max-md:text-base urbanist-font tracking-wide mt-3 md:mt-6 w-full px-3 lg:px-0 overflow-hidden mx-auto text-text-color font-regular"
					>
						{t("description")}
					</motion.p>

					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeUp}
						transition={{ delay: 0.3 }}
						className="flex justify-center items-center w-full mt-4 gap-10 max-md:gap-5"
					>
						<Button outline={false} backgroundColor="bg-primary" onClick={handleGetStartedClick}>
							{t("getStarted")}
						</Button>
						<Button outline={true} onClick={() => router.push('/about')}>{t("learnMore")}</Button>
					</motion.div>
				</div>
			</div>

			<motion.div
				initial="hidden"
				animate="visible"
				variants={scaleIn}
				transition={{ delay: 0.4 }}
				className="max-w-[1500px] w-full mx-auto max-md:mt-5"
			>
				<Image
					src={HomeImages.HeaderImage}
					alt=""
					className="rounded-lg object-contain max-md:hidden"
				/>
				<Image
					src={HomeImages.HeaderImageMobile}
					alt=""
					className="rounded-lg object-contain md:hidden"
				/>
			</motion.div>

			<motion.div
				initial="hidden"
				animate="visible"
				variants={factsStagger}
				className="bg-primary dark:bg-primary-foreground max-w-7xl h-56 w-full mx-auto rounded-[32px] relative max-sm:hidden -mt-2.5"
			>
				<Image
					src={HomeImages.curlyGrid}
					alt=""
					className="rounded-lg object-contain"
				/>
				<div className="absolute inset-0 flex justify-between items-center w-full h-full px-12">
					{FACTS.map((fact, index) => (
						<motion.div key={index} variants={fadeUp} className="space-y-2 text-white">
							<div className="relative">
								<h1 className="nohemi-font font-extrabold text-[80px] leading-[85px]">
									{fact.number}
								</h1>
								<h1 className="nohemi-font absolute inset-0 font-extrabold header-number-stats text-[80px] leading-[85px] transform translate-y-[3px] translate-x-[3px]">
									{fact.number}
								</h1>
							</div>
							<div className="flex gap-x-3">
								<div className="w-9 h-9 rounded-lg border border-primary-lighter bg-white/10" />
								<div>
									<h3 className="font-medium nohemi-font text-lg leading-[18px]">
										{fact.title}
									</h3>
									<p className="urbanist-font text-sm">
										{fact.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>

			<motion.div
				initial="hidden"
				animate="visible"
				variants={factsStagger}
				className="bg-primary rounded-2xl sm:hidden grid grid-cols-2 gap-10 p-5 mx-auto -mt-2.5"
			>
				{FACTS.map((fact, index) => (
					<motion.div key={index} variants={fadeUp} className="space-y-2 text-white">
						<div className="relative text-center">
							<h1 className="nohemi-font font-extrabold text-6xl">
								{fact.number}
							</h1>
							<h1 className="nohemi-font absolute inset-0 font-extrabold header-number-stats text-6xl transform translate-y-[3px] translate-x-[3px]">
								{fact.number}
							</h1>
						</div>
						<div className="flex gap-x-3">
							<div className="w-6 h-6 rounded-lg border border-primary-lighter bg-white/10" />
							<div>
								<h3 className="font-medium nohemi-font text-lg leading-[18px]">
									{fact.title}
								</h3>
								<p className="urbanist-font text-sm">
									{fact.description}
								</p>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default Header;