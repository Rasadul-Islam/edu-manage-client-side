import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';


const FeedBack = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/feedback')
            .then(res => {
                setFeedbacks(res.data);
            })
            .catch(err => {
                console.error('Error fetching feedback:', err);
            });
    }, []);


    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Teacher Feedback</h2>

            {feedbacks.length > 0 ? (
                <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                modules={[Navigation, Pagination, Autoplay]}
                className="mySwiper"
                >
                    {feedbacks.map((feedback) => (
                        <SwiperSlide key={feedback._id} className="p-6">
                            <div className="p-6 border rounded-lg shadow-lg shadow-teal-300 bg-white flex flex-col justify-center items-center">
                                <div className="flex flex-col justify-center items-center gap-4 mb-4">
                                    <img
                                        src={feedback.image}
                                        alt={feedback.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold capitalize">Student Name: {feedback.name}</h4>
                                        <p className="text-sm text-gray-500">Class Title : {feedback.classTitle}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic">"{feedback.feedback}"</p>
                                <div className="mt-4 flex justify-center">
                                    <span className="text-yellow-500 font-semibold">
                                        {"★".repeat(feedback.rating) + "☆".repeat(5 - feedback.rating)}
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-center text-gray-500">No feedback available</p>
            )}
        </div>
    );
};

export default FeedBack;
