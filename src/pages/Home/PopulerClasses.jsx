import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const PopulerClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [populerClass, setPopulerClass] = useState([]);

  useEffect(() => {
    // Fetch popular classes
    axiosPublic.get('/populerClasses')
      .then(res => {
        setPopulerClass(res.data);
      })
      .catch(err => {
        console.error("Error fetching popular classes:", err);
      });
  }, []);

  const handleSlideChange = (swiper) => {
    // Get the current slide index and adjust the background position accordingly
    const currentIndex = swiper.activeIndex;
    const backgroundPosition = -(currentIndex * 50); // Adjust '50' to control the movement speed
    document.querySelector('.swiper-container').style.backgroundPosition = `${backgroundPosition}px center`;
  };

  return (
      
      <div
        className="relative bg-fixed bg-cover bg-center mb-10 py-10 text-black px-10"
        style={{
          backgroundImage: 'url("https://i.ibb.co.com/2q9sXJm/class-5976481-1280.jpg")',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-2xl p-4 rounded-xl md:text-4xl font-bold text-center mb-5 bg-white bg-opacity-100 w-fit mx-auto">Popular Classes</h1>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSlideChange={handleSlideChange} // Trigger parallax effect on slide change
        >
          {populerClass.map((classItem) => (
            <SwiperSlide key={classItem._id}>
              <div className="flex flex-col justify-between p-5 shadow-lg rounded-md bg-white bg-opacity-80 h-[450px] ">
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{classItem.title}</h2>
                <p className="text-gray-600 mb-2">{classItem.description}</p>
                <p className="font-bold text-lg mb-2">Price: ${classItem.price}</p>
                <p className="text-sm text-gray-500">
                  Enrolled: {classItem.enrollmentCount} students
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
};

export default PopulerClasses;
