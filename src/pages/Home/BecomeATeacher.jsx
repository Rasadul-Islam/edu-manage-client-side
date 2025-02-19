import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BecomeATeacher = () => {
    const navigate = useNavigate();

    const handleJoinNow = () => {
        navigate('/register-teacher'); // Navigate to teacher registration page
    };

    return (
        <section
      className="relative bg-fixed bg-cover bg-center mb-10 py-24 text-white"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/7SmCNNJ/Untitled-design.png')`, // Replace with your image URL
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-lg max-w-4xl mx-auto text-center">
        <h2 className="text-4xl text-teal-100 font-bold mb-6">Inspire the Next Generation</h2>
        <p className="text-lg mb-8">
          Are you passionate about teaching? Join us to transform education and
          empower learners worldwide. Flexible schedules, limitless impact, and
          tools to thrive await you.
        </p>
        <Link to='/teachOnEdu'>
        <button className="px-6 py-3 bg-teal-300 text-black font-bold rounded-lg shadow-md hover:bg-yellow-500 transition">
          Become a Teacher
        </button>
        </Link>
      </div>
    </section>
    );
};

export default BecomeATeacher;