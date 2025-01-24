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

  return (
    <div className="my-10 bg-teal-50 px-5 py-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center my-5">Popular 6 Classes</h1>
      <div>
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
        >
          {populerClass.map((classItem) => (
            <SwiperSlide key={classItem._id}>
              <div className="p-5 shadow-lg rounded-md bg-white">
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
    </div>
  );
};

export default PopulerClasses;
