import { Button } from '../../layout';


const Header = () => {
  return (
    <div className='header-bg h-full' id='home'>
      <div className='flex justify-center items-center w-full h-[95vh]  '>
        <div>
          <h1 className='leading-snug px-2 md:px-0 text-primary  overflow-hidden text-center text-3xl sm:text-4xl font-extrabold'>
            The Django Ecosystem <br className='hidden md:block' /> in Cameroon
          </h1>
          <p className='leading-normal text-center text-xl md:text-2xl tracking-wide mt-6 w-full px-3 lg:px-0 overflow-hidden lg:w-[70%] mx-auto text-text-color'>
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
    </div>
  );
}

export default Header