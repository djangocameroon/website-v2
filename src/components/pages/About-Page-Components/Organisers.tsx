import { IoLogoLinkedin } from "react-icons/io";
import { AboutImages } from "@/assets";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";

const Organisers = () => {

  const OrganisersTeam = [
    {
      image: AboutImages.steve,
      name:' Steve Yonkeu',
      linkedin:'https://linkedin.com/in/yokwejuste',
      github:'https://github.com/yokwejuste'
    },
    {
      image:AboutImages.manka,
      name:' Manka\'a Che',
      linkedin:'https://www.linkedin.com/in/mankaa-che',
      github:'https://github.com/mankaache'
    },
    {
      image:AboutImages.hawa,
      name:'Hawawou Oumarou',
      linkedin:'https://linkedin.com/in/hawawou-oumarou-2b1b831b4',
      github:'https://github.com/Hawawou'
    },

    {
      image:AboutImages.edmond,
      name:'Edmond Makolle',
      linkedin:'https://linkedin.com/in/edmond-ghislain-makolle-99716b1a2',
      github:'https://github.com/Edmond22-prog'
    },
    {
      image:AboutImages.etiane,
      name:'Lukong Etiane ',
      linkedin:'https://www.linkedin.com/in/lukong-etiane-73b079229',
      github:'https://github.com/LL-Etiane'
    },
    {
      image:AboutImages.velda,
      name:'Manka Velda',
      linkedin:'https://linkedin.com/in/manka-manjong',
      github:'https://github.com/Mankavelda'
    },
    {
      image:AboutImages.olga,
      name:'Ngala Olga',
      linkedin:'https://www.linkedin.com/in/ngala-olga-855a7b271',
      github:'https://github.com/olgangala2'
    },
    {
      image:AboutImages.ariane,
      name:'Ariane Djeupang',
      linkedin:'https://linkedin.com/in/ariane-djeupang',
      github:'https://github.com/Arya-AD'
    },
    {
      image:AboutImages.christian,
      name:'Ndongmo Christian ',
      linkedin:'https://linkedin.com/in/ndongmo-christian-4a5537226',
      github:'https://github.com/ndongchrist'
    },
    {
      image:AboutImages.leo,
      name:'Leo Youmbi',
      linkedin:'https://linkedin.com/in/youmbi-lordson',
      github:'https://github.com/Leo-Youmbi'
    },
    {
      image:AboutImages.joel,
      name:'Dejon Fah Joël',
      linkedin:'https://linkedin.com/in/joelfah',
      github:'https://github.com/Joel-Fah'
    },
   
   
  ]

  return (
    <section className='flex items-start justify-between gap-10 lg:gap-32 px-4 sm:pl-6 border-none sm:border-solid  border-l-2 border-gray-200 ml-3 py-16'>
      <div className='w-[98%] lg:w-[70%]  hidden sm:block  '>
        <div className='absolute left-[0%] md:left-[7.5%] bg-primary h-6 w-6 rounded-full border-4 border-gray-400'></div>
        <span className='text-sm text-secondary font-semibold'>
          The brains behind the initiative
        </span>
        <h2 className='timeline-title text-xl my-4 text-gray-700 font-bold'>
          Our Organizers
        </h2>
      </div>
      <article>
        <h2 className='font-semibold text-center sm:text-left text-3xl'>
          Just a bunch of nerds.{' '}
        </h2>
        <p className='text-center sm:text-left text-text-color text-xl'>
          meet our organizers
        </p>
        <div className='flex lg:gap-3 flex-wrap items-center w-full justify-center sm:justify-start my-8 sm:my-12 overflow-hidden'>
          {
            OrganisersTeam.map((organiser, index) => (
              <div key={index} className='relative group/card hover:scale-105 transition-all py-7 px-1 lg:px-3 rounded-lg w-full sm:w-auto'>
                <div className=" hidden md:block absolute top-2 left-0  rounded-lg bg-secondary shadow-inner w-full sm:w-52 sm:h-52"></div>
                  <div className='relative border-4 border-primary  rounded-xl w-full sm:w-52 sm:h-52'>
                    <img src={organiser.image} alt="" className=' w-full h-full' />
                  </div>
                  <div className=" mt-2 flex justify-between items-start flex-col">
                    <p className="uppercase font-semibold text-lg">{organiser.name}</p>
                    <div className="group/item flex gap-3 sm:gap-1 items-center overflow-hidden pr-2">
                        <Link to={organiser.linkedin} className="text-secondary group-hover/item:scale-110  transition-all">
                          <IoLogoLinkedin size='25' />
                        </Link>
                        <Link to={organiser.github} className="text-secondary group-hover/item:scale-110  transition-all">
                          <FaGithub size='23'/>
                        </Link>
                    </div>
                  </div>
              </div>
            ))
          }
          
          
        </div>
      </article>
    </section>
  );
}

export default Organisers