import { AboutImages, BlogImages } from '@/assets';
import { cn } from '@/utils/constants';

const BlogHeaderImage = () => {
  return (
    <div className='absolute inset-0'>
      <div className="relative size-full">
        <div className="absolute inset-0 -z-30">
          <img src={AboutImages.aboutbackground} alt='' className='object-cover size-full' />
        </div>
        <div className="absolute inset-0 -z-20">
          <img src={BlogImages.plane} alt='' className='object-cover size-full' />
        </div>
      </div>

    </div>
  );
}

const RoundMarker = ({ className = "" }: { className?: string }) => {
  return (
    <div className={cn(`relative size-[0.938rem] bg-[#010723] rounded-full border-[0.5px] border-white flex justify-center items-center ${className}`)}>
      <div className='bg-white rounded-full size-[0.688rem] border-0'></div>
    </div>
  )
}

const BlogHeader = () => {
  return (
    <section className='h-screen w-full relative'>
      <BlogHeaderImage />

      {/* <div className="max-w-7xl h-screen mx-auto px-6 pt-32 flex flex-col md:flex-row items-center justify-between"> */}
      {/* Text Content */}
      {/* <div className="md:w-1/2 pb-20 z-10">
          <p className="text-blue-400 text-sm urbanist-font font-medium mb-3 tracking-wide">
            Feed yourself with knowledge from experts
          </p>
          <h1 className="text-5xl md:text-6xl nohemi-font font-bold text-white mb-6 leading-[1.1]">
            Trending insights <br />
            <span className="text-gray-600">from our </span>#Blog
          </h1>
          <p className="text-gray-100 text-sm md:text-base urbanist-font max-w-md mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Mauris semper odio velit
            suspendisse diam. Imperdiet phasellus pharetra viverra eget. Urna
            nulla dapibus nibh tellus bibendum id. Venenatis laoreet aliquam eu
            neque in. In sit leo fermentum amet orci odio. Purus dolor mattis.
          </p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
            <img src={BlogImages.article} alt='' className='size-5 font-bold' />
            Submit an article
          </button>
        </div>
        <div className="md:w-1/2 flex pb-0 relative mt-auto md:mt-auto z-10">
          <img src={BlogImages.plane} alt='' className='size-4/5' />
        </div>
      </div> */}

      <div className='flex lg:hidden justify-center items-center w-full h-full '>
        <div className='w-full flex flex-col justify-center items-center'>
          <span className='text-xl text-secondary font-semibold urbanist-font text-center'>
            Feed yourself with knowledge from experts
          </span>
          <h2 className='text-4xl text-center pb-6 text-white my-4 font-bold nohemi-font'>
            Trending insights <span className='text-[#808396] nohemi-font'>from our</span> #Blog
          </h2>
          <p className='text-center px-10 text-white urbanist-font'>
            Lorem ipsum dolor sit amet consectetur. Mauris semper odio velit
            suspendisse diam. Imperdiet phasellus pharetra viverra eget. Urna
            nulla dapibus nibh tellus bibendum id. Venenatis laoreet aliquam eu
            neque in. In sit leo fermentum amet orci odio. Purus dolor mattis.
          </p>
        </div>
      </div>

      <div className='hidden lg:block absolute top-[13.375rem]  bottom-0'>
        {/* <div className='hidden lg:block absolute top-[13.375rem] left-[7.3rem] bottom-0'> */}
        <div className="mx-auto size-full md:w-[85%] relative">
          <div className='absolute left-0 inset-y-0 flex flex-col'>
            <RoundMarker className='-top-[0.5px]' />
            <div className="flex justify-center flex-[1]">
              <div className="w-0 border-l-[1px] bg-white"></div>
            </div>

          </div>
          <div className='pl-10 pt-12 border-gray-200'>
            <div className='w-[55%] space-y-[0.625rem]'>
              <span className='text-xl text-secondary font-bold urbanist-font'>
                Feed yourself with knowledge from experts
              </span>
              <h2 className='text-[5rem] leading-[5.313rem] text-white font-extrabold nohemi-font line-clamp-2' style={{ letterSpacing: '-0%' }}>
                Trending insights <span className='text-[#808396] nohemi-font'>from our</span> #Blog
              </h2>
              <p className='text-white leading-7 urbanist-font'>
                Lorem ipsum dolor sit amet consectetur. Mauris semper odio velit
                suspendisse diam. Imperdiet phasellus pharetra viverra eget. Urna
                nulla dapibus nibh tellus bibendum id. Venenatis laoreet aliquam
                eu neque in. In sit leo fermentum amet orci odio. Purus dolor
                mattis.
              </p>
            </div>
            <div className='mt-[3.125rem]'>
              <button
                className="rounded-2xl text-white nohemi-font bg-secondary hover:bg-secondary/80 duration-500 active:scale-105 font-medium text-xl transition-all py-5 px-7 flex"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2.5'>
                  <g clip-path="url(#clip0_2207_1682)">
                    <path d="M22 14V8.5M6 13V6C6 4.34315 7.34315 3 9 3H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16.9922 4H19.9922M19.9922 4H22.9922M19.9922 4V1M19.9922 4V7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 21H6C3.79086 21 2 19.2091 2 17C2 14.7909 3.79086 13 6 13H17H18C15.7909 13 14 14.7909 14 17C14 19.2091 15.7909 21 18 21C20.2091 21 22 19.2091 22 17V14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2207_1682">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                Submit an article
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default BlogHeader;
