import React from "react";
import useClasses from "../../hooks/useClasses";
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";

const PopulerClasses = () => {
  // Use the custom hook to fetch classes
  const [classes] = useClasses();

  // filter highest enrollment
  const popularClasses = classes
    .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
  .slice(0, 6);
  // console.log(typeof popularClasses[0].enrollmentCount);
  // console.log(popularClasses[0].title, typeof popularClasses[0].enrollmentCount, popularClasses[15].title, typeof popularClasses[15].enrollmentCount);


  return (
    <div className="bg-teal-50">
      <h2 className="text-2xl text-center font-bold md:text-4xl py-10">Top 6 Popular Classes</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        pagination={{ clickable: true }}
        navigation
      >
        {popularClasses.map((classItem) => (
          <SwiperSlide key={classItem._id}>
            <div className="h-80 flex flex-col justify-between mb-5 border-2 border-teal-300 p-3">
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">{classItem.title}</h3>
              <p className="text-sm text-gray-600">{classItem.description}</p>
              <p className="text-sm mt-1">
                <strong>Price:</strong> ${classItem.price}
              </p>
              <p className="text-sm">
                <strong>Enrollments:</strong> {classItem.enrollmentCount}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>



  );
};

export default PopulerClasses;
