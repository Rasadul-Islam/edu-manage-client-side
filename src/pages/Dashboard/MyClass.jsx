import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyClasses = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    // Fetch teacher's classes
    useEffect(() => {
        axiosSecure.get(`/classes/${user.email}`)
            .then((res) => {
                setClasses(res.data);
            })
            .catch((error) => {
                console.error("Error fetching classes:", error);
            });
    }, []);

    // Handle class delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't keep this class!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/classes/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        setClasses(classes.filter((cls) => cls._id !== id));
                        Swal.fire("Deleted!", "Your class has been deleted.", "success");
                    }
                });
            }
        });
    };

    // Handle class update (navigate to update page)
    const handleUpdate = (id) => {
        navigate(`/dashboard/update-class/${id}`);
    };

    // Handle "See Details"
    const handleSeeDetails = (id) => {
        navigate(`/dashboard/my-class/${id}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">My Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                    <div key={cls._id} className="bg-white p-4 shadow-md rounded-md">
                        <img src={cls.image} alt={cls.title} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
                        <p><strong>Name:</strong> {cls.name}</p>
                        <p><strong>Email:</strong> {cls.email}</p>
                        <p><strong>Price:</strong> ${cls.price}</p>
                        <p><strong>Description:</strong> {cls.description}</p>
                        <p>
                            <strong>Status:</strong>{" "}
                            <span
                                className={`font-semibold ${
                                    cls.status === "approved" ? "text-green-600" : "text-yellow-600"
                                }`}
                            >
                                {cls.status}
                            </span>
                        </p>
                        <div className="mt-4 flex justify-between">
                            {/* Update Button */}
                            <button
                                onClick={() => handleUpdate(cls._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Update
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(cls._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>

                            {/* See Details Button */}
                            <button
                                onClick={() => handleSeeDetails(cls._id)}
                                disabled={cls.status !== "approved"}
                                className={`${
                                    cls.status === "approved"
                                        ? "bg-teal-500 hover:bg-teal-600"
                                        : "bg-gray-400 cursor-not-allowed"
                                } text-white px-4 py-2 rounded-md`}
                            >
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClasses;
