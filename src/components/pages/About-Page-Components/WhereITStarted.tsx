import { AboutImages } from '@/assets';
import AnimatedSection from './animated-section';

const WhereITStarted = () => {

  return (
    <AnimatedSection
      className='relative flex max-md:flex-col items-start justify-between gap-10 lg:gap-32 pt-8 md:pb-[134px] pb-10'
    >

      <div className='absolute left-0 inset-y-0 flex w-[0.938rem] max-md:hidden'>
        <div className="flex justify-center flex-[1]">
          <div className="w-[1px] bg-dark"></div>
        </div>
      </div>

      <div className='w-[35%] max-md:w-full'>
        <div className='md:mt-4 md:pl-10 relative'>
          <div className="max-md:hidden absolute left-0 top-4 size-[0.938rem] bg-white rounded-full border-[0.5px] border-text-color  flex justify-center items-center">
            <div className='bg-text-color rounded-full size-[0.688rem] border-0'></div>
          </div>

          <span className='text-sm text-secondary urbanist-font mb-2 inline-block max-md:w-full max-md:text-center'>
            Every Journey Has a First Step
          </span>
          <h3 className='timeline-title text-[1.625rem] leading-[1.875rem] font-semibold nohemi-font max-md:text-center'>
            When & where it all<br />started.
          </h3>
        </div>
      </div>

      <article className='w-full space-y-8'>
        <div className='w-full'>
          <img src={AboutImages.peopleTogether} alt='' />
        </div>

        <div className='space-y-4'>
          <h2 className='text-[32px] leading-[35px] nohemi-font font-bold'>
            Lorem ipsum very big first title
          </h2>
          <p className='text-text-color text-base urbanist-font'>
            Lorem ipsum dolor sit amet consectetur. Fusce dolor at id quis nam
            sit morbi egestas. Urna nulla proin id nulla tortor risus ut in.
            Orci nisl purus nec eu justo diam aliquet faucibus tristique.
            Aliquam sit eros mauris amet lacus vulputate non. Massa vitae at
            tempor auctor libero purus urna. Risus suspendisse at tristique ut
            vitae enim vehicula iaculis arcu. Dictum convallis sed mauris mauris
            eget tincidunt vel suspendisse. Elementum pretium adipiscing sed
            mauris pellentesque sed mi posuere id. Elementum semper duis et
            volutpat eu. Faucibus sit eu magna dui turpis facilisis tincidunt
            purus vel. Venenatis lorem turpis nullam id mauris vel dignissim.
            Pharetra ac sit ullamcorper vitae fusce neque. Ut duis fermentum
            facilisis bibendum facilisis. Mi rhoncus sed a donec dapibus lectus.
            Ullamcorper dictumst elementum lectus nunc magna vitae. At mus
            libero ac sollicitudin. Eget condimentum tincidunt at aliquam purus
            quam massa cras. Cras bibendum diam velit suscipit parturient
            feugiat. Neque lacus platea eu ipsum. Risus non imperdiet egestas
            maecenas egestas pellentesque ultrices sem. Senectus quis lectus
            purus hac. Bibendum et adipiscing scelerisque nunc velit mauris
            tortor. Venenatis sit vitae pellentesque orci velit urna vitae
            senectus. Felis amet id sapien purus. Nunc sed vulputate libero
            morbi ut in tortor. Mattis tristique pellentesque risus in enim dui
            dis in nibh. Elit eu morbi tempor lacinia eu mi velit nulla. Odio
            turpis urna.
          </p>
        </div>
      </article>
    </AnimatedSection>
  );
};

export default WhereITStarted;
