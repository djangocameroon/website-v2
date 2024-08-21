import { Button } from '../../layout';
import { HomeImages } from '../../../assets';


const Header = () => {
  return (
    <div className='h-full md:mt-48 mb-12' id='home'>
      <div className='flex justify-center w-full max-h-[95vh]  '>
        <div className='w-full max-w-[900px]'>
          <h1 className='leading-[1.15] px-2 md:px-0 text-primary nohemi-font overflow-hidden text-center text-3xl sm:text-[80px] font-extrabold'>
            The Django Ecosystem <br className='hidden md:block' /> in Cameroon
          </h1>
          <p className='leading-normal text-center text-xl urbanist-font tracking-wide mt-6 w-full px-3 lg:px-0 overflow-hidden mx-auto text-text-color font-regular'>
            Fueling Innovation, Forging Connections. We're a dynamic community
            of developers in Cameroon, passionate about Django! Empowering
            dreams and pioneer change through technology
          </p>

          <div className='flex justify-center items-center w-full mt-4 gap-10'>
            <Button outline={false} backgroundColor='bg-primary'>
              Get Started
            </Button>
            <Button outline={true}>Learn more</Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] w-full mx-auto">
        <img src={HomeImages.HeaderImage} alt='' className='rounded-lg object-contain' />
      </div>

      <div className='bg-primary max-w-7xl h-56 w-full mx-auto rounded-[32px] relative'>
        <img src={HomeImages.curlyGrid} alt='' className='rounded-lg object-contain' />
        <div className="absolute inset-0 flex justify-between items-center w-full h-full px-12">

          <div className='space-y-2 text-white'>
            <div className='relative'>
              <h1 className='nohemi-font font-extrabold text-[80px] leading-[85px]'>567</h1>
              <h1 className='nohemi-font absolute inset-0 font-extrabold header-number-stats text-[80px] leading-[85px] transform translate-y-[3px] translate-x-[3px]'>567</h1>
            </div>
            
            <div className="flex gap-x-3">
              <div className='w-9 h-9 rounded-lg border border-primary-lighter bg-white/10' />
              <div>
                <h3 className='font-medium nohemi-font text-lg leading-[18px]'>Fact #1</h3>
                <p className='urbanist-font text-sm'>Small Description</p>
              </div>
            </div>
          </div>

          <div className='space-y-2 text-white'>
            <div className='relative'>
              <h1 className='nohemi-font font-extrabold text-[80px] leading-[85px]'>78</h1>
              <h1 className='nohemi-font absolute inset-0 font-extrabold header-number-stats text-[80px] leading-[85px] transform translate-y-[3px] translate-x-[3px]'>78</h1>
            </div>
            
            <div className="flex gap-x-3">
              <div className='w-9 h-9 rounded-lg border border-primary-lighter bg-white/10' />
              <div>
                <h3 className='font-medium nohemi-font text-lg leading-[18px]'>Fact #2</h3>
                <p className='urbanist-font text-sm'>Small Description</p>
              </div>
            </div>
          </div>

          <div className='space-y-2 text-white'>
            <div className='relative'>
              <h1 className='nohemi-font font-extrabold text-[80px] leading-[85px]'>1.5k</h1>
              <h1 className='nohemi-font absolute inset-0 font-extrabold header-number-stats text-[80px] leading-[85px] transform translate-y-[3px] translate-x-[3px]'>1.5k</h1>
            </div>
            
            <div className="flex gap-x-3">
              <div className='w-9 h-9 rounded-lg border border-primary-lighter bg-white/10' />
              <div>
                <h3 className='font-medium nohemi-font text-lg leading-[18px]'>Fact #3</h3>
                <p className='urbanist-font text-sm'>Small Description</p>
              </div>
            </div>
          </div>

          <div className='space-y-2 text-white'>
            <div className='relative'>
              <h1 className='nohemi-font font-extrabold text-[80px] leading-[85px]'>20+</h1>
              <h1 className='nohemi-font absolute inset-0 font-extrabold header-number-stats text-[80px] leading-[85px] transform translate-y-[3px] translate-x-[3px]'>20+</h1>
            </div>
            
            <div className="flex gap-x-3">
              <div className='w-9 h-9 rounded-lg border border-primary-lighter bg-white/10' />
              <div>
                <h3 className='font-medium nohemi-font text-lg leading-[18px]'>Fact #4</h3>
                <p className='urbanist-font text-sm'>Small Description</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Header