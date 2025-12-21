import { AboutImages } from '@/assets';
import AnimatedSection from './animated-section';

const RegionalImpact = () => {
    return (
        <AnimatedSection className='relative flex max-md:flex-col items-start justify-between gap-10 lg:gap-32 md:pb-[6.25rem] pb-10'>
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
                        From Local Actions to Global Impact
                    </span>
                    <h3 className='timeline-title text-[1.625rem] leading-[1.875rem] font-semibold nohemi-font max-md:text-center'>
                        Regional Impact
                    </h3>
                </div>
            </div>

            <div className='w-full max-md:flex-col flex gap-x-5 items-stretch'>
                <section className='flex items-start gap-8 flex-wrap lg:flex-nowrap'>
                    <article className='w-full lg:w-[40%] md:mt-[2.375rem] space-y-4'>
                        <h3 className='font-bold  nohemi-font text-[2rem] leading-[2.188rem]'>
                            The impact of our <span className='text-secondary font-bold nohemi-font'>#actions</span>{' '} - nation wide.
                        </h3>
                        <p className='text-lg urbanist-font'>
                            Lorem ipsum dolor sit amet consectetur. Auctor elit pretium aenean felis. Et sed consequat eleifend sapien dignissim id eu. Et hendrerit purus vitae diam quis. Purus morbi fusce tincidunt sit sit non ut.
                            Sem non velit mi sit facilisi. Volutpat nullam elit posuere in massa. Magna nunc venenatis vulputate aliquet lorem bibendum. Condimentum nisl mauris integer neque. Sit a maecenas tellus nibh arcu sit.
                            Velit eleifend in ullamcorper id ultrices nibh. Amet sed nibh feugiat elit rhoncus non non. Neque nunc aliquam sagittis fusce posuere odio potenti amet. Leo quisque at pellentesque tincidunt nulla malesuada vitae faucibus. Ut at semper eget et nisi convallis. Ut viverra non pellentesque morbi enim phasellus duis. Vulputate libero sed in amet rhoncus.
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
                            <img src={AboutImages.house2} alt='' className='object' />
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
        </AnimatedSection>
    );
}

export default RegionalImpact;