import Lottie from 'lottie-react';
import React from 'react';
import notfound from '../../assets/lottie/NotFound.json' 
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center w-3/4 mx-auto my-20 bg-gray-300 p-5 rounded-xl'>
            <div className="w-48 md:w-60">
                <Lottie animationData={notfound}></Lottie>
            </div>
            <h1 className='text-4xl md:text-6xl font-extrabold text-red-400 my-5'>
                Oops!
            </h1>
            <h2 className='text-3xl md:text-4xl my-2 capitalize'>404 - page not found</h2>
            <p className='my-2'>The page you are looking for might have been removed <br/> had its name changed or is temporarily unavailable</p>
            <Link to='/' className='btn uppercase font-bold text-lg mt-5 bg-teal-300 border-none'>Go to homepage</Link>
        </div>
    );
};

export default ErrorPage;