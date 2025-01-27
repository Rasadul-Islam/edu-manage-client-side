import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EduLoopOverView = () => {
    const [overview, setOverview] = useState({ totalUsers: 0, totalClasses: 0, totalEnrollments: 0 });
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const { data } = await axiosSecure.get('/overview');
                setOverview(data);
            } catch (error) {
                console.error("Error fetching overview data:", error);
            }
        };
        fetchOverview();
    }, [axiosSecure]);

    return (
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between px-5 py-10">


            {/* Left Side: Cards */}
            <div className="grid gap-5 w-full lg:w-1/2">
                <div className="p-5 bg-white shadow-lg rounded-lg text-center shadow-teal-400 ">
                    <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
                    <p className="text-4xl font-bold text-teal-600">{overview.totalUsers}</p>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-lg text-center shadow-teal-400 ">
                    <h2 className="text-xl font-semibold text-gray-800">Total Classes</h2>
                    <p className="text-4xl font-bold text-teal-600">{overview.totalClasses}</p>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-lg text-center shadow-teal-400 ">
                    <h2 className="text-xl font-semibold text-gray-800">Total Enrollments</h2>
                    <p className="text-4xl font-bold text-teal-600">{overview.totalEnrollments}</p>
                </div>
            </div>

            {/* Right Side: Image */}
            <div className="w-full lg:w-1/2 flex justify-center shadow-lg shadow-teal-400 m-10 rounded-lg">
            <img src="https://i.ibb.co.com/ykqY1J6/notebook-2178656-1280.jpg" alt="Over View image" className='rounded-lg' />
            </div>
        </div>
    );
};

export default EduLoopOverView;
