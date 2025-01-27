import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const navigate= useNavigate();


    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allClasses');
            return res.data;
        },

    });
    const handleEnroll=((id)=>{
        navigate(`/allClasses/enroll-class/${id}`);
    })


    return (
        <div className='px-5'>
            <Helmet>
                <title> EduLoop | All Classes</title>
            </Helmet>
            <h1 className='text-center font-bold text-2xl md:text-4xl my-5'>All Classes</h1>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                
                {classes.length > 0 ? (
                    classes.map((classItem) => (
                        <div key={classItem._id}>
                            <div className="p-5 shadow-lg rounded-md bg-white">
                                <img
                                    src={classItem.image}
                                    alt={classItem.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h2 className="text-xl font-semibold mb-1">{classItem.title}</h2>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-semibold">Posted By:</span> {classItem.name}
                                </p>
                                <p className="font-bold text-lg mb-1">Price: ${classItem.price}</p>
                                <p className="text-gray-600 mb-2">
                                    {classItem.description.slice(0, 60)}...
                                </p>
                                <p className="text-sm text-gray-500 mb-3">
                                    Enrolled: {classItem.enrollmentCount} students
                                </p>
                                <button
                                    className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 w-full"
                                    onClick={() => handleEnroll(classItem._id)}
                                >
                                    Enroll
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        No classes available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllClasses;