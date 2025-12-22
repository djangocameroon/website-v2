
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import {AuthImages} from '@/assets'


import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './Carousel.css'

const slider = [
    {
        id:1,
        title: "Perks",
        description: "Being part of this community for over 5 years already made me realised that knowledge is everywhere but opportunity isn’t. Se we created an environment for each other’s sake.",
        url: AuthImages.Login
      },
    {
        id:2,
        title: "Perks",
        description: "Being part of this community for over 5 years already made me realised that knowledge is everywhere but opportunity isn’t. Se we created an environment for each other’s sake.",
        url: AuthImages.Login
    },
    {
        id:3,
        title: "Perks",
        description: "Being part of this community for over 5 years already made me realised that knowledge is everywhere but opportunity isn’t. Se we created an environment for each other’s sake.",
        url: AuthImages.Login
    },
    {
        id:4,
        title: "Perks",
        description: "Being part of this community for over 5 years already made me realised that knowledge is everywhere but opportunity isn’t. Se we created an environment for each other’s sake.",
        url: AuthImages.Login
    },
    {
        id:4,
        title: "Perks",
        description: "Being part of this community for over 5 years already made me realised that knowledge is everywhere but opportunity isn’t. Se we created an environment for each other’s sake.",
        url: AuthImages.Login
    },


]

const Carousel = () => {
  return (
    <div className='carousel'>

        <Swiper
            className='myswiper'
            modules={[Pagination, EffectCoverflow, Autoplay]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 3,
                slideShadows: true
            }}
            loop={true}
            pagination={{clickable: true}}
            slidesPerView={1}

            autoplay={{
                delay: 2000,
                disableOnInteraction: false
            }}
        >
            {
                slider.map(data => (
                    <SwiperSlide key={data.id} style={{ backgroundImage: `url(${data.url})` }} className=" rounded-[20px] overflow-hidden myswiper-slider text-2xl relative">
                        <div className={' bg-gradient-to-b from-transparent from-20% to-secondary absolute left-0 top-0 w-full h-full'}></div>
                        <div className={'absolute bottom-28 text-2xl'}>
                            <h2 className={'text-4xl text-white'}>{data.title}</h2>
                            <p className={'text-white text-2xl w-full font-bold '}>{data.description}</p>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}

export default Carousel