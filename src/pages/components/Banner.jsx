// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slider from './Slider'

import bgimg1 from '../../assets/slider/slide1.png'
import bgimg2 from '../../assets/slider/slide2.png'
import bgimg3 from '../../assets/slider/slide3.png'

export default function Carousel() {
  return (
    <div className='container px-6 py-10 mx-auto rounded-xl'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slider
            image={bgimg1}
            text='Make a Difference Today: Join Our Volunteer Community'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            image={bgimg2}
            text='Your Help Matters: Volunteer and Create Positive Change'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            image={bgimg3}
            text='Empower Others: Volunteer and Support Your Community'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
