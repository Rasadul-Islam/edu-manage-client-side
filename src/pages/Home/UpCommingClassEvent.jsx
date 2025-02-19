import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpCommingClassEvent = () => {
  const events = [
    {
      id: 1,
      title: 'Advanced Web Development Bootcamp',
      description: 'Master web development with modern tools and frameworks.',
      date: '2025-02-10T10:00:00',
      imageUrl: 'https://i.ibb.co.com/z55tnG6/software-developer-6521720-1280.jpg',
    },
    {
      id: 2,
      title: 'Digital Marketing Essentials',
      description: 'Learn the fundamentals of digital marketing and SEO.',
      date: '2025-03-01T09:00:00',
      imageUrl: 'https://i.ibb.co.com/rdRdt0T/digital-marketing-5816304-1280.jpg',
    },
    {
      id: 3,
      title: 'Graphic Design for Beginners',
      description: 'Get started with graphic design using industry-standard software.',
      date: '2025-02-20T14:00:00',
      imageUrl: 'https://i.ibb.co.com/jWKn6pB/tiger-2430625-1280.jpg',
    },
  ];

  const calculateTimeLeft = (eventDate) => {
    const currentDate = new Date();
    const eventDateObj = new Date(eventDate);
    const timeLeft = eventDateObj - currentDate;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  };

  // State to manage the countdown timer
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = events.map((event) => ({
        id: event.id,
        timeLeft: calculateTimeLeft(event.date),
      }));
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-teal-600 mb-8">
          Don't Miss Out! Upcoming Classes & Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative h-[550px] pb-10">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-gray-600 mt-4">{event.description}</p>
                <div className="mt-6">
                  <p className="text-teal-500 font-medium text-xl">
                    Time Left: {timeLeft[event.id]?.timeLeft ? (
                      <span>{`${timeLeft[event.id]?.timeLeft?.days}d ${timeLeft[event.id]?.timeLeft?.hours}h ${timeLeft[event.id]?.timeLeft?.minutes}m`}</span>
                    ) : (
                      'Event started'
                    )}
                  </p>
                </div>
                {/* <a href={`/class/${event.id}`} className="mt-6 inline-block text-center py-2 px-4 bg-teal-600 text-white rounded-lg">
                  Register Now
                </a> */}
                <Link to={`/class/${event.id}`} className="absolute bottom-0 right-0 left-0 text-center py-4 bg-teal-400 text-black font-bold rounded-lg">
                Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpCommingClassEvent;
