"use client";

import Image from "next/image";
import { AvatarUsers } from "@/components";
import { HomeImages } from "@/assets";
import { Badge, Button } from "@/components/layout";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";
import { fadeUp, revealOnce, staggerContainer } from "./motion";

const cardsStagger = staggerContainer(0.15);
const badgesStagger = staggerContainer(0.06);
const staggerContainerGrid = staggerContainer(0.08);

const YoutubeSection = () => {
	const { bird, connect, whyJoin } = HomeImages;
	const navigateToYoutube = () => {
		window.open("https://www.youtube.com/@DjangoCameroon", "_blank");
	}
	return (
		<div className="space-y-10">
			<div className="md:py-20 flex justify-center items-start max-md:flex-wrap md:gap-x-36">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={revealOnce}
					variants={fadeUp}
					className="w-full md:max-w-2xl md:mt-11"
				>
					<h2 className="text-primary text-3xl max-md:text-2xl lg:text-[32px] nohemi-font font-bold leading-9">
						Empowering Learning Through YouTube{" "}
						<br className="hidden lg:block" /> Tutorials
					</h2>

					<p className="leading-6 urbanist-font md:mt-4 md:mb-3 my-2">
						Our YouTube channel is your passport to Django
						expertise. Dive into a world of friendly tutorials that
						make web development a breeze. Whether you're starting
						fresh or leveling up, we're here to guide you every step
						of the way. Let's learn, create, and inspire together!
					</p>

					<Button outline={false} backgroundColor="bg-primary" onClick={navigateToYoutube}>
						Consider getting started now
					</Button>

					<motion.div
						variants={badgesStagger}
						initial="hidden"
						whileInView="visible"
						viewport={revealOnce}
						className="flex items-center flex-wrap gap-4"
					>
						<motion.div variants={fadeUp}><Badge>1.3k subscribers</Badge></motion.div>
						<motion.div variants={fadeUp}><Badge>20+ videos</Badge></motion.div>
						<motion.div variants={fadeUp}><Badge>1M+ views</Badge></motion.div>
						<motion.div variants={fadeUp}><Badge>10+ playlists</Badge></motion.div>
						<motion.div variants={fadeUp}><Badge>Source code links</Badge></motion.div>
						<motion.div variants={fadeUp}><Badge>7d/24h active support</Badge></motion.div>
					</motion.div>
				</motion.div>
				<div className="w-full max-md:mt-4">
					<motion.div
						variants={cardsStagger}
						initial="hidden"
						whileInView="visible"
						viewport={revealOnce}
						className="flex flex-col justify-center max-md:items-center items-start gap-y-7"
					>
						<motion.div variants={fadeUp} className="bg-secondary/10 rounded-[30px] space-y-4 p-5 max-w-[500px] w-full">
							<div className="flex items-center gap-5">
								<Image src={whyJoin} alt="" className="w-12 h-auto" />
								<h3 className="text-text-color nohemi-font font-semibold text-2xl">
									Why Joining?
								</h3>
							</div>
							<p className="text-base text-text-color urbanist-font">
								Join Django Cameroon to connect, learn, and grow
								with fellow passionate developers. Together, we
								empower dreams and make coding an inspiring
								journey!
							</p>
							<AvatarUsers />
						</motion.div>

						<motion.div variants={fadeUp} className="bg-secondary/10 rounded-[30px] space-y-4 p-5 md:ml-auto max-w-[500px] w-full">
							<div className="flex items-center gap-5 mb-3">
								<Image src={connect} alt="" className="w-10 h-auto" />
								<p className="text-text-color nohemi-font font-semibold text-2xl">
									Connect & Learn
								</p>
							</div>
							<p className="text-base text-text-color urbanist-font">
								Learn, grow, and code together with fellow
								passionate developers. Together, we empower
								dreams and make coding an inspiring journey!
							</p>
							<Image src={bird} alt="avatars" className="ml-auto" />
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* <div className='relative '>
        <div className='green-backbg z-[1000] overflow-hidden bg-no-repeat py-3 md:py-5 bg-center bg-cover w-full h-full md:px-8 px-2 rounded-lg'>
          <p className='text-2xl md:text-3xl text-white mt-8 font-semibold'>
            Still doubting on where and how to get started with Django? Doubt no
            more!
          </p>
          <div className='flex flex-wrap-reverse lg:flex-nowrap justify-start items-center gap-7'>
            <div className='mt-10 w-full lg:w-[40%]'>
              <div className='w-full'>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    1. Starting my Django journey
                  </p>
                </Link>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    2. Setting up my environment
                  </p>
                </Link>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    3. Django MVT architecture
                  </p>
                </Link>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    4. Models, Views & Templates
                  </p>
                </Link>
                <Link to='/'>
                  <p className='md:text-lg text-white bg-white/30 rounded-lg text-left px-3 md:px-5 font-semibold mb-3 w-full py-3'>
                    5. Basic TODO app
                  </p>
                </Link>
              </div>
              <Link to='/' className=' w-[23em] z-[200] '>
                <div className='flex gap-4 text-white  justify-start rounded-lg items-center py-3 px-5 bg-secondary mb-3 w-full'>
                  <BiSolidMoviePlay size='25' className='text-white' />
                  <p className='text-lg font-semibold  '>See more videos</p>
                </div>
              </Link>
            </div>

            <div className='mt-10 red-bg  rounded-lg flex justify-center items-center py-6 px-10'>
              <Image src={HomeImages.youtubeThumbnail} alt='' />
            </div>
          </div>
        </div>
      </div> */}
			<div className="h-fit">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={revealOnce}
					variants={fadeUp}
					className="text-center mb-7"
				>
					<h2 className="mx-auto w-fit nohemi-font font-bold text-3xl text-balance max-md:hidden">
						Still doubting on where and how to get{" "}
						<br className="" />
						started with Django? Doubt no more!
					</h2>
					<h2 className="mx-auto w-fit nohemi-font font-bold text-3xl text-balance md:hidden">
						Not sure where to begin with Django? Doubt no more!
					</h2>
					<Link
						href="https://www.youtube.com/@DjangoCameroon"
						className="mx-auto w-fit flex items-center gap-x-2 urbanist-font text-xl text-secondary py-1 px-2 border-b border-b-secondary"
					>
						View all Tutorials
						<GoArrowUpRight className="w-6 h-6" />
					</Link>
				</motion.div>
				<div className="relative">
					<motion.div
						variants={staggerContainerGrid}
						initial="hidden"
						whileInView="visible"
						viewport={revealOnce}
						className="grid grid-cols-[repeat(3,_minmax(24rem,_3fr))] max-md:flex max-md:flex-col gap-5"
					>
						<motion.div variants={fadeUp} className="border rounded-[28px] h-[300px] border-secondary bg-secondary-light"></motion.div>
						<motion.div variants={fadeUp} className="border rounded-[28px] h-[300px] border-primary bg-primary-light"></motion.div>
						<motion.div variants={fadeUp} className="border rounded-[28px] h-[300px] border-secondary bg-secondary-light max-md:hidden"></motion.div>
						<motion.div variants={fadeUp} className="border rounded-[28px] h-[300px] border-primary bg-primary-light max-md:hidden"></motion.div>
						<motion.div variants={fadeUp} className="border rounded-[28px] h-[300px] border-secondary bg-secondary-light max-md:hidden"></motion.div>
						<motion.div variants={fadeUp} className="border rounded-[28px] h-[300px] border-primary bg-primary-light max-md:hidden"></motion.div>
					</motion.div>
					<div className="h-[300px] absolute bottom-0 inset-x-0">
						<div className="w-full bg-gradient-to-b absolute bottom-0 left-0 from-transparent to-white via-white   inset-0 z-0" />
						<Button
							outline={false}
							backgroundColor="bg-secondary"
							spacing={false}
							className="mt-[167px] z-20 absolute left-1/2 transform -translate-x-1/2"
						>
							View videos catalogue
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default YoutubeSection;
