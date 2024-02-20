import { AboutImages } from '../../../assets';

const WhereITStarted = () => {
  return (
    <section className='flex items-start justify-between gap-10 lg:gap-32 px-4 sm:px-0 sm:pl-10 border-none sm:border-solid border-l-2 border-gray-200 ml-3 py-8'>
      <div className='w-[35%] hidden sm:block '>
        <div className='absolute left-0 md:left-[7.5%] bg-primary h-6 w-6 rounded-full border-4 border-gray-400'></div>
        <span className='text-sm text-secondary font-semibold'>
          Lorem ipsum subtitle
        </span>
        <h2 className='timeline-title text-xl my-4 text-gray-700 font-bold'>
          Where & where it all started.
        </h2>
      </div>
      <article className='w-full'>
        <div className='w-full'>
          <img src={AboutImages.peopleTogether} alt='' />
        </div>
        <div>
          <h2 className='text-3xl pt-8 pb-4 font-semibold'>
            Lorem ipsum very big first title
          </h2>
          <p className='text-text-color text-base'>
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
    </section>
  );
};

export default WhereITStarted;
