import React from "react";
import useClasses from "../../hooks/useClasses";
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";

const PopulerClasses = () => {
  // Use the custom hook to fetch classes
  const [classes] = useClasses();
// filter highest enrollment
  const popularClasses = classes
    .sort((a, b) => b.enrollmentCount - a.enrollmentCount) 
    .slice(0, 4);

  return (
    <div>
      {/* <h2>Top 6 Popular Classes</h2>
      <div className="grid grid-cols-3 gap-5">
        {popularClasses.map((classItem) => (
          <div key={classItem._id} className="border-2 border-teal-300 p-3">
            <img src={classItem.image} alt={classItem.title} className="w-full h-40 object-cover"/>
            <h3>{classItem.title}</h3>
            <p>{classItem.description}</p>
            <p><strong>Price:</strong> ${classItem.price}</p>
            <p><strong>Enrollments:</strong> {classItem.enrollmentCount}</p>
          </div>
        ))}
      </div> */}
      <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
    </div>
  );
};

export default PopulerClasses;
