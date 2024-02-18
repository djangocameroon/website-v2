import { AboutImages } from '../../../assets';

const AboutHeader = () => {
  return (
    <section className='h-screen bg-secondary/5 w-full relative bg-gradient-to-b from-[#6486e4] to-[#020935]'>
      <div className='flex lg:hidden justify-center items-center w-full h-full '>
        <div className='w-full flex flex-col justify-center items-center'>
          <span className='text-xl text-secondary font-semibold'>
            Welcome to the verse of
          </span>
          <h2 className='text-4xl text-center pb-6 text-white my-4 font-bold'>
            Django Cameroon
          </h2>
          <p className='text-center px-10'>
            Lorem ipsum dolor sit amet consectetur. Mauris semper odio velit
            suspendisse diam. Imperdiet phasellus pharetra viverra eget. Urna
            nulla dapibus nibh tellus bibendum id. Venenatis laoreet aliquam eu
            neque in. In sit leo fermentum amet orci odio. Purus dolor mattis.
          </p>
        </div>
      </div>

      <div className='hidden lg:block absolute bottom-0 left-[7.3rem]'>
        <div className='flex  pl-10 border-l-2 border-gray-200 ml-3 '>
          <div className='w-[35%] '>
            <div className='absolute z-40  left-0 bg-primary h-6 w-6 rounded-full border-4 border-gray-400'></div>
            <span className='text-base text-secondary font-semibold'>
              Welcome to the verse of
            </span>
            <h2 className='text-4xl text-white my-4 font-bold'>
              Django <br /> Cameroon
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Mauris semper odio velit
              suspendisse diam. Imperdiet phasellus pharetra viverra eget. Urna
              nulla dapibus nibh tellus bibendum id. Venenatis laoreet aliquam
              eu neque in. In sit leo fermentum amet orci odio. Purus dolor
              mattis.
            </p>
          </div>
          <div className='lg:block hidden'>
            <img src={AboutImages.rocket} alt='' className='' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;
