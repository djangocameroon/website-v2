import { AboutImages } from '@/assets';
import { cn } from '@/utils/constants';

const AboutHeaderImage = () => {

  return (
    <div className='absolute inset-0'>
      <img src={AboutImages.rocket} alt='' className='object-cover size-full' />
    
    </div>
  );
}

export const RoundMarker = ({ className = "" }: { className?: string }) => {
  return (
    <div className={cn(`relative size-[0.938rem] bg-[#010723] rounded-full border-[0.5px] border-white flex justify-center items-center ${className}`)}>
      <div className='bg-white rounded-full size-[0.688rem] border-0'></div>
    </div>
  )
}

const AboutHeader = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const onTitleMouseOver = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    // console.log(target.dataset);
    const text = target.dataset.text || "";
    let i = 0;

    const interval = setInterval(() => {
      target.textContent = text
        .split("")
        .map((char, index) =>
          index < i
            ? char
            : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");

      // console.log(target.textContent);
      i++;

      if (i > text.length) clearInterval(interval);
    }, 80);

  }
  return (
    <section className='h-screen w-full relative blue-bg'>
      <AboutHeaderImage />

      <div className='flex lg:hidden justify-center items-center w-full h-full '>
        <div className='w-full flex flex-col justify-center items-center'>
          <span className='text-xl text-secondary font-semibold urbanist-font'>
            Welcome to the verse of
          </span>
          <h2 className='text-4xl text-center pb-6 text-white my-4 font-bold nohemi-font'>
            Django Cameroon
          </h2>
          <p className='text-center px-10 text-white urbanist-font'>
            We are a vibrant community of Django developers in Cameroon, united by our passion for building amazing web applications. Join us as we learn, share knowledge, and create innovative solutions together while fostering the next generation of tech talent in Africa.
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
            <div className='w-[35%] space-y-[0.625rem]'>
              <span className='text-xl text-secondary font-bold urbanist-font'>
                Welcome to the verse of
              </span>
              <h2 className='text-[5rem] leading-[5.313rem] text-white font-extrabold nohemi-font line-clamp-2 scramble' style={{ letterSpacing: '-0%' }}>
                <span onMouseOver={onTitleMouseOver} data-text="Django">Django</span> <span onMouseOver={onTitleMouseOver} data-text="Cameroon">Cameroon</span>
              </h2>
              <p className='text-white leading-7 urbanist-font'>
                We are a vibrant community of Django developers in Cameroon, united by our passion for building amazing web applications. Join us as we learn, share knowledge, and create innovative solutions together while fostering the next generation of tech talent in Africa.
              </p>
            </div>
            <div className='mt-[3.125rem]'>
              <button
                className="rounded-2xl text-white nohemi-font bg-secondary duration-500 active:scale-105 font-medium text-xl transition-all py-5 px-7"
              >
                Let&apos;s gooo!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;
