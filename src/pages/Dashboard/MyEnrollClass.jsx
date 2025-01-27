import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';


const MyEnrollClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [enrollClass, setEnrollClass] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/myEnrollClass/${user.email}`)
            .then(res => {
                // console.log(res.data);
                setEnrollClass(res.data);
            })
    }, [])

    return (
        <div>
            <h1 className='text-center text-2xl my-10 font-bold'>My Enroll Class</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrollClass.map(cls => (
                    <div
                        key={cls._id}
                        className="card bg-white shadow-xl rounded-2xl p-4 flex flex-col justify-between"
                    >
                        <img
                            src={cls.image}
                            alt={cls.title}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <h2 className="text-lg font-bold mt-4">{cls.title}</h2>
                        <p className="text-gray-600">Posted by: {cls.classCreator}</p>
                        <Link
                            to={`/dashboard/myEnrollClass/${cls.classId}`} state={{classTitle: cls.title, instractor:cls.classCreator} }
                        >
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Continue
                            </button>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default MyEnrollClass;
