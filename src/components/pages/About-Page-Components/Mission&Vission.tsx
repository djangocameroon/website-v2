import AnimatedSection from './animated-section';

const MissionVission = () => {

  return (
    <AnimatedSection
      className='relative flex max-md:flex-col items-start justify-between gap-10 lg:gap-32 md:pb-[134px] pb-10'
    >
      <div className='absolute left-0 inset-y-0 flex w-[0.938rem] max-md:hidden'>
        <div className="flex justify-center flex-[1]">
          <div className="w-[1px] bg-dark"></div>
        </div>
        <div className="max-md:hidden absolute left-0 top-12 size-[0.938rem] bg-white rounded-full border-[0.5px] border-text-color  flex justify-center items-center">
          <div className='bg-text-color rounded-full size-[0.688rem] border-0'></div>
        </div>
      </div>

      <div className='w-[35%] max-md:w-full'>
        <div className='md:pl-10 relative'>
          <span className='text-sm text-secondary urbanist-font mb-2 inline-block max-md:w-full max-md:text-center'>
            Driven
          </span>
          <h3 className='timeline-title text-[1.625rem] leading-[1.875rem] font-semibold nohemi-font max-md:text-center'>
            A vision, {" "}<br className="max-md:hidden" />
            A mission.
          </h3>
        </div>
      </div>

      <div className='w-full max-md:flex-col flex gap-x-5 items-stretch max-md:gap-y-4'>
        <div className='bg-secondary/10 hover:bg-secondary/15 transition-all w-full p-5 space-y-4'>
          <h2 className="nohemi-font font-bold text-3xl">A community with a <br className="max-md:hidden" /><span className='text-secondary nohemi-font'>#vision</span></h2>
          <p className='urbanist-font'>
            We see a Cameroon where Django developers don't work in isolation. Where asking for help is normal. Where sharing knowledge is expected. Where junior developers get real guidance from people who've been there.<br />
            We want to build the kind of tech community we wished existed when we started. One that's practical, not performative. Where people collaborate on actual projects, not just talk about them. Where success means helping others succeed too.
          </p>
        </div>

        <div className='hover:bg-secondary/5 transition-all w-full p-5 space-y-4 max-md:border max-md:border-secondary max-md:border-dashed'>
          <h2 className="nohemi-font font-bold text-3xl">A community for the <br className="max-md:hidden" /><span className='text-secondary nohemi-font'>#missions</span></h2>
          <p className='urbanist-font'>
            We run monthly meetups where people present what they're building. We organize workshops on Django best practices, testing, deployment, and scaling. We maintain open source projects where members can contribute and learn.<br />
            We connect experienced developers with those just starting out. We help people find jobs and freelance opportunities. And we keep building spaces where Cameroonian developers can grow their skills and their careers.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default MissionVission;