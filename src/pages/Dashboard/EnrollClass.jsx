import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoadingSpinner from '../../utility/LoadingSpinner/LoadingSpinner';

const EnrollClass = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [classDetails, setClassDetails] = useState(null);

    useEffect(() => {
        // Fetch class details by ID
        axiosPublic
            .get(`/enrollClass/${id}`)
            .then((res) => {
                setClassDetails(res.data);
            })
            .catch((err) => {
                console.error("Error fetching class details:", err);
            });
    }, [id]);

    if (!classDetails) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    const { _id, title, name, image, description, price, enrollmentCount } = classDetails;

    return (
        <div className="max-w-3xl mx-auto my-10 px-5">
            <div className="shadow-lg rounded-lg bg-white p-5">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-60 object-cover rounded-lg mb-5"
                />
                <h1 className="text-3xl font-bold mb-3">{title}</h1>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Posted By:</span> {name}
                </p>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="font-bold text-lg mb-2">Price: ${price}</p>
                <p className="text-sm text-gray-500 mb-5">
                    Enrolled: {enrollmentCount} students
                </p>
                <Link to='/enroll-class/payment' state={{ classDetails}}>
                    <button className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                        Pay
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default EnrollClass;
