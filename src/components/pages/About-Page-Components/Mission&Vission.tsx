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
            Lorem ipsum dolor sit amet consectetur. Pulvinar et sapien cursus pellentesque consectetur dictumst auctor sit massa. At bibendum convallis dignissim vitae sagittis sed sagittis diam. Mi ac facilisis amet tincidunt. Magna amet non mattis donec. Elementum ullamcorper amet massa integer eget rhoncus a. Mattis donec ut massa egestas fringilla in id. Lacus vitae id erat ligula at et tristique habitant. Fringilla turpis convallis gravida in et. Sapien natoque eu cum adipiscing nulla.<br />
            Nisl et aliquam aliquet felis nunc suspendisse. Quisque in suspendisse in diam condimentum quam amet. Tincidunt a neque ullamcorper est nec. Dictum id pellentesque donec ultrices vulputate faucibus sit. Feugiat rhoncus potenti pretium et mi.
          </p>
        </div>

        <div className='hover:bg-secondary/5 transition-all w-full p-5 space-y-4 max-md:border max-md:border-secondary max-md:border-dashed'>
          <h2 className="nohemi-font font-bold text-3xl">A community for the <br className="max-md:hidden" /><span className='text-secondary nohemi-font'>#missions</span></h2>
          <p className='urbanist-font'>
            Lorem ipsum dolor sit amet consectetur. Amet ut sagittis blandit tincidunt pretium bibendum fermentum facilisis ipsum. Sit amet viverra imperdiet at facilisis amet porta vitae. Nisi ornare nec ullamcorper malesuada. Mauris est sed aliquam dignissim. Non ac quis volutpat urna leo at elementum. Pretium turpis malesuada tristique et. Viverra morbi magna pellentesque augue. Suscipit sed parturient vitae consequat quis porttitor risus volutpat.<br />
            Purus et at sit commodo. At tristique enim in faucibus lacus in massa amet. Diam risus turpis enim platea ut viverra convallis sagittis urna. Commodo curabitur ipsum sed malesuada nunc morbi risus vel. Urna sit egestas sed cras nec quis a. Vulputate.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default MissionVission;