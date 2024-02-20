import { AboutImages } from '../../../assets';


const MissionVission = () => {
  return (
    <section className='flex items-start justify-between gap-10 lg:gap-32 px-4 sm:pl-10 border-none sm:border-solid  border-l-2 border-gray-200 ml-3 py-16'>
      <div className='w-[30%]  hidden sm:block  '>
        <div className='absolute left-[0%] md:left-[7.5%] bg-primary h-6 w-6 rounded-full border-4 border-gray-400'></div>
        <span className='text-sm text-secondary font-semibold '>
          As a community we have
        </span>
        <h2 className='timeline-title text-xl my-4 text-gray-700 font-bold'>
          A Mission and a Vision
        </h2>
      </div>
      <div className='w-full'>
        <article className='flex w-full flex-wrap   pb-8 items-center justify-start gap-10'>
          <div className='max-w-[25rem] p-4  border-4 border-dotted transition-all border-secondary hover:bg-secondary/10 hover:border-4 hover:border-solid hover:border-transparent'>
            <h3 className='font-semibold text-xl md:text-2xl py-3'>
              A community with a <br />{' '}
              <span className='text-secondary'>#vision</span>{' '}
            </h3>
            <p className='text-sm'>
              Lorem ipsum dolor sit amet consectetur. Pulvinar et sapien cursus
              pellentesque consectetur dictumst auctor sit massa. At bibendum
              convallis dignissim vitae sagittis sed sagittis diam. Mi ac
              facilisis amet tincidunt. Magna amet non mattis donec. Elementum
              ullamcorper amet massa integer eget rhoncus a. Mattis donec ut
              massa egestas
            </p>
          </div>
          <div className='max-w-[25rem] p-4  border-4 border-dotted transition-all border-secondary hover:bg-secondary/10 hover:border-4 hover:border-solid hover:border-transparent'>
            <h3 className='font-semibold text-xl md:text-2xl py-3'>
              A community with a{' '}
              <span className='text-secondary'>#mission</span>{' '}
            </h3>
            <p className='text-sm'>
              Lorem ipsum dolor sit amet consectetur. Pulvinar et sapien cursus
              pellentesque consectetur dictumst auctor sit massa. At bibendum
              convallis dignissim vitae sagittis sed sagittis diam. Mi ac
              facilisis amet tincidunt. Magna amet non mattis donec. Elementum
              ullamcorper amet massa integer eget rhoncus a. Mattis donec ut
              massa egestas
            </p>
          </div>
        </article>
        <section className='flex items-start gap-8 mt-8 flex-wrap lg:flex-nowrap'>
          <article className='w-full lg:w-[40%] '>
            <h3 className='font-semibold text-xl py-3'>
              A community with a{' '}
              <span className='text-secondary'>#mission</span>{' '}
            </h3>
            <p className='text-lg'>
              Lorem ipsum dolor sit amet consectetur. Pulvinar et sapien cursus
              pellentesque consectetur dictumst auctor sit massa. At bibendum
              convallis dignissim vitae sagittis sed sagittis diam. Mi ac
              facilisis amet tincidunt. Magna amet non mattis donec. Elementum
              ullamcorper amet massa integer eget rhoncus a. Mattis donec ut
              massa egestas
            </p>
          </article>
          <article className='w-full lg:w-[60%] grid-container'>
            <div className='relative img1'>
              <div className='absolute bottom-4 left-5'>
                <div className='cursor-pointer bg-secondary flex justify-center items-center rounded-full text-white text-sm py-1 px-5'>
                  Bafoussam
                </div>
              </div>
              <img src={AboutImages.house1} alt='' />
            </div>
            <div className='relative img2 w-full h-6'></div>
            <div className='relative img3'>
              <div className='absolute bottom-2 left-5'>
                <div className='cursor-pointer bg-secondary flex justify-center items-center rounded-full text-white text-sm py-1 px-5'>
                  Buea
                </div>
              </div>
              <img src={AboutImages.house2} alt='' />
            </div>
            <div className='relative img4'>
              <div className='absolute bottom-2 left-5'>
                <div className='cursor-pointer bg-secondary flex justify-center items-center rounded-full text-white text-sm py-1 px-5'>
                  Yaounde
                </div>
              </div>
              <img src={AboutImages.landscape1} alt='' />
            </div>
            <div className='relative img5'>
              <div className='absolute bottom-4 left-5'>
                <div className='cursor-pointer bg-secondary flex justify-center items-center rounded-full text-white text-sm py-1 px-5'>
                  Bamenda
                </div>
              </div>
              <img src={AboutImages.landscape2} alt='' />
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

export default MissionVission;