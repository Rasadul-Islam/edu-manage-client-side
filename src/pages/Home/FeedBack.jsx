import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Swiper } from 'swiper/react';


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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Teacher Feedback</h2>
            
            {feedbacks.length > 0 ? (
                <Swiper {...settings}>
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="p-6 border rounded-lg shadow-md bg-white">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={feedback.image || 'https://via.placeholder.com/150'}
                                    alt={feedback.name}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h4 className="text-lg font-semibold">{feedback.name}</h4>
                                    <p className="text-sm text-gray-500">{feedback.title}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"{feedback.feedback}"</p>
                            <div className="mt-4 flex justify-center">
                                <span className="text-yellow-500 font-semibold">
                                    {"★".repeat(feedback.rating) + "☆".repeat(5 - feedback.rating)}
                                </span>
                            </div>
                        </div>
                    ))}
                </Swiper>
            ) : (
                <p className="text-center text-gray-500">No feedback available</p>
            )}
           
        </div>
    );
};

export default FeedBack;
