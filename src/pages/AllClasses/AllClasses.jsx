import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();


    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allClasses');
            return res.data;
        },

    });


    return (
        <div>
            <Helmet>
                <title> EduLoop | All Classes</title>
            </Helmet>
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
                                <h2 className="text-xl font-semibold mb-2">{classItem.title}</h2>
                                <p className="text-gray-600 mb-2">{classItem.description}</p>
                                <p className="font-bold text-lg mb-2">
                                    Price: ${classItem.price}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Enrolled: {classItem.enrollmentCount} students
                                </p>
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