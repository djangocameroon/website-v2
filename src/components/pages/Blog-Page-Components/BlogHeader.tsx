import { BlogImages } from '@/assets';

const BlogHeader = () => {
  return (
    <div className="relative overflow-hidden"
      style={{ 
      backgroundImage: `url(${BlogImages.star}), linear-gradient(to bottom, #020818, #000733)` 
    }}>
      <div className="max-w-7xl h-screen mx-auto px-6 pt-32 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 pb-20 z-10">
          <p className="text-blue-400 text-sm font-medium mb-3 tracking-wide">
            Feed yourself with knowledge from experts
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
            Trending insights <br />
            <span className="text-gray-600">from our </span>#Blog
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
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
      </div>
    </div>
  );
};

export default BlogHeader;
