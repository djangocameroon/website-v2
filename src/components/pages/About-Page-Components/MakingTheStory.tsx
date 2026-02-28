import { AboutImages } from '@/assets/images'
import AnimatedSection from './animated-section';

const MakingTheStory = () => {
    return (
        <AnimatedSection className='w-screen lg:h-screen relative lg:mb-[100px] mb-8 max-lg:px-4'>
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <img src={AboutImages.makingstorybanner} alt='Making the Story Banner' className='max-xl:hidden w-full h-full' />
            </div>

            {/* Banner text section */}
            <div className='text-center space-y-2 z-10 absolute left-0 right-0 top-[190px] max-lg:static max-lg:mt-8'>
                <span className="text-secondary urbanist-font text-xl font-medium inline-block">No worries</span>
                <h2 className="nohemi-font font-bold text-[2rem] leading-[2.188rem]">The story doesn&apos;t ends here.</h2>
            </div>

            {/* Main heading and description section */}
            <div className='text-center space-y-2 z-10 lg:w-[50%] lg:mx-auto absolute inset-x-0 bottom-[70px] max-lg:static max-lg:mt-8'>
                <h1 className="nohemi-font text-[5rem] max-lg:text-[3rem] leading-[5.313rem] max-lg:leading-[3.313rem] font-extrabold inline-block">We are the ones making the story.</h1>
                <p className="urbanist-font">
                    This community isn't finished. We're still figuring things out. Still learning what works and what doesn't. But that's the point. We're building something together, and there's room for more people to help shape where it goes. If you write Django code in Cameroon, you belong here. Simple as that.
                </p>
            </div>
        </AnimatedSection>
    )
}

export default MakingTheStory;