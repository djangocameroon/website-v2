import { AboutImages } from '@/assets';
import AnimatedSection from './animated-section';
import { cn } from '@/utils/constants';

const RegionalImpact = () => {
    const regions = [
        { name: 'Bafoussam', image: AboutImages.house1 },
        { name: 'Buea', image: AboutImages.house2 },
        { name: 'Yaounde', image: AboutImages.landscape1 },
        { name: 'Bamenda', image: AboutImages.landscape2 },
    ] as const;
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
                    <article className='w-full lg:w-[60%] flex gap-4 max-lg:flex-col'>
                        {Array.from({ length: 2 }).fill(null).map((_, id) => {
                            const colIndex = id + 1;
                            return (
                                <div className={'w-full space-y-4' + (colIndex === 2 ? ' mt-20' : '')} key={colIndex}>
                                    {regions.slice(colIndex * 2 - 2, colIndex * 2).map((region, index) => (
                                        <div key={index} className={cn(`relative img${index + 1} rounded-[30px] border-secondary border-[3px] w-full h-[500px] overflow-hidden`, {
                                            "lg:h-[395px]": (colIndex - 1) * 2 + index === 0 || (colIndex - 1) * 2 + index === 3,
                                            "lg:h-[580px]": (colIndex - 1) * 2 + index === 1 || (colIndex - 1) * 2 + index === 2,
                                        })}>
                                            <div className='absolute bottom-4 left-5 z-10'>
                                                <div className='cursor-pointer bg-secondary flex justify-center items-center rounded-full text-white text-sm py-1 px-5'>
                                                    {region.name}
                                                </div>
                                            </div>
                                            <img src={region.image} alt={region.name} className='object-cover w-full h-full grayscale transition-all hover:grayscale-0' />
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </article>
                </section >
            </div >
        </AnimatedSection >
    );
}

export default RegionalImpact;