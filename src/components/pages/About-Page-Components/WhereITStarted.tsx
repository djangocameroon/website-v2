import { AboutImages } from '@/assets';
import AnimatedSection from './animated-section';

const WhereITStarted = () => {

  return (
    <AnimatedSection
      className='relative flex max-md:flex-col items-start justify-between gap-10 lg:gap-32 pt-8 md:pb-[134px] pb-10'
    >

      <div className='absolute left-0 inset-y-0 flex w-[0.938rem] max-md:hidden'>
        <div className="flex justify-center flex-[1]">
          <div className="w-[1px] bg-dark"></div>
        </div>
      </div>

      <div className='w-[35%] max-md:w-full'>
        <div className='md:mt-4 md:pl-10 relative'>
          <div className="max-md:hidden absolute left-0 top-4 size-[0.938rem] bg-white rounded-full border-[0.5px] border-text-color  flex justify-center items-center">
            <div className='bg-text-color rounded-full size-[0.688rem] border-0'></div>
          </div>

          <span className='text-sm text-secondary urbanist-font mb-2 inline-block max-md:w-full max-md:text-center'>
            Every Journey Has a First Step
          </span>
          <h3 className='timeline-title text-[1.625rem] leading-[1.875rem] font-semibold nohemi-font max-md:text-center'>
            When & where it all<br />started.
          </h3>
        </div>
      </div>

      <article className='w-full space-y-8'>
        <div className='w-full rounded-[30px] border-secondary border-[5px] overflow-hidden max-h-[350px]'>
          <img src={AboutImages.peopleTogether} alt='' className='object-fill w-full h-full grayscale hover:grayscale-[85%] transition-all' />
        </div>

        <div className='space-y-4'>
          <h2 className='text-[32px] leading-[35px] nohemi-font font-bold'>
            A small team with a simple idea
          </h2>
          <p className='text-text-color text-base urbanist-font'>
            It started with a few Django developers meeting up in Bamenda. We noticed something: there were talented people building things in isolation. No place to ask questions. No one to review code. No way to know what others were working on. So we created a space where Django developers in Cameroon could connect. First meetup had eight people. We talked about projects, shared solutions to problems we'd all hit, and realized we weren't alone. That feeling stuck. More people started showing up. Students learning Django for the first time. Mid-level developers building SaaS products. Senior engineers working at companies across Africa. Everyone had something to share and something to learn. We started organizing workshops. Created project teams where people could contribute to real applications. And we made it clear from day one: this isn't about being the best. It's about getting better together. Today, we're a community of developers across Cameroon. Some of us work remotely for international companies. Others are building startups. A few teach at universities. But we all share the same goal: make Cameroon a place where Django developers can grow, connect, and build things that matter.
          </p>
        </div>
      </article>
    </AnimatedSection>
  );
};

export default WhereITStarted;
