import { Button } from '../../layout';


const JoinUsNow = () => {
  return (
    <>
      <h2 className='text-center font-semibold text-3xl py-4 px-10'>Join us and make the story <br className='hidden md:block' /> one to remember.</h2>
      <p className='text-center text-base w-full md:w-[60%] mx-auto px-10'>
        Lorem ipsum dolor sit amet consectetur. Euismod sit porttitor amet sed
        ac faucibus. Tincidunt at in nulla feugiat massa sit nunc. Pretium eget
        amet fermentum diam fringilla elementum nunc cursus consequat. Hac
        fermentum nullam felis mauris rhoncus. Arcu facilisi aliquet mollis
        pretium tincidunt quam egestas in. Nulla sapien tempus in arcu diam sed
        nunc sed. Nulla faucibus pellentesque condimentum consequat diam.
      </p>

      <div className='get-started bg-image-styles h-full bg-contain my-10 py-40 md:py-80 pb-20 px-5  sm:px-10 rounded-lg'>
        <p className='text-xl md:text-3xl w-[80%] md:px-0 md:w-[40%] font-semibold text-white'>
          Not that it’s now or never but don’t miss such opportunity
        </p>
        <div className='flex md:flex-row flex-col items-start md:items-center gap-10 mt-8 '>
          <Button outline={false} backgroundColor='bg-white'>
            <p className='text-primary py-1'>Join the community</p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default JoinUsNow