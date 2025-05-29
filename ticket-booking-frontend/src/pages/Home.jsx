import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import EventList from '../components/events/EventList'

const eventImages = [
  'https://plus.unsplash.com/premium_photo-1661315459644-18297c559777?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D',
  'https://media.istockphoto.com/id/2159341791/photo/multicultural-business-professionals-celebrating-success.jpg?s=2048x2048&w=is&k=20&c=VxhSPntK_wbjNHH5YLdJON6eAMzTeWAFAnMoYfKSJhs=',
]

function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section with Carousel */}
      <div className="relative h-[100vh] w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {eventImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Event ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 z-10"></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay Text */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold animate-pulse drop-shadow-lg">
            Welcome to <span className="text-yellow-400">Event Booking</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium">
            Discover and book tickets for your favorite events!
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Events</h2>
          <EventList />
        </div>
      </div>
    </div>
  )
}

export default Home
