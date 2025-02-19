import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const PopulerClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [populerClass, setPopulerClass] = useState([]);
  const navigate= useNavigate();

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
    const currentIndex = swiper.activeIndex;
    const backgroundPosition = -(currentIndex * 50); 
    document.querySelector('.swiper-container').style.backgroundPosition = `${backgroundPosition}px center`;
  };
  const handleEnroll=((id)=>{
    navigate(`/allClasses/enroll-class/${id}`);
})

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
      <h1 className="text-2xl p-4 rounded-lg md:text-4xl font-bold text-center mb-5 bg-white bg-opacity-100 w-fit mx-auto">Popular Classes</h1>
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
        onSlideChange={handleSlideChange}
      >
        {populerClass.map((classItem) => (
          <SwiperSlide key={classItem._id}>
            <div className="flex flex-col justify-between p-5 shadow-lg rounded-lg bg-white bg-opacity-80 h-[450px]">
              {/* Image */}
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* Title */}
              <h2 className="text-xl font-semibold mb-2">{classItem.title}</h2>

              {/* Description with ellipsis */}
              <p className="text-gray-600 mb-2 line-clamp-2">
                {classItem.description}
              </p>

              {/* Price */}
              <p className="font-bold text-lg mb-2">Price: ${classItem.price}</p>

              {/* Enrollment Count */}
              <p className="text-sm text-gray-500 mb-4">
                Enrolled: {classItem.enrollmentCount} students
              </p>

              {/* See Details Button */}
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 w-full"
                onClick={() => handleEnroll(classItem._id)}
              >
                See Ditails
              </button>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopulerClasses;
