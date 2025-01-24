import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const AdminAllClasses = () => {
    const axiosSecure = useAxiosSecure();

    // const axiosPublic = useAxiosPublic();
    // const [classes, setClasses] = useState([]);

    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        },
    });

    // Approve Class Handler
    const handleApprove = (id) => {
        axiosSecure.patch(`/classes/approve/${id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Class is approve successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    // Reject Class Handler
    const handleReject = (id) => {Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to reverse this action!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, reject it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/classes/reject/${id}`)
                    .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Rejected!",
                            text: `Class has been rejected!`,
                            icon: "success"
                        });
                    }});
                }
                
            });
    };

    return (
        <div className="my-10 px-5">
            <h1 className="text-2xl md:text-4xl font-bold text-center my-5">
                Manage Classes
            </h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-200 p-3">Title</th>
                            <th className="border border-gray-200 p-3">Image</th>
                            <th className="border border-gray-200 p-3">Email</th>
                            <th className="border border-gray-200 p-3">Description</th>
                            <th className="border border-gray-200 p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((cls) => (
                            <tr key={cls._id} className="text-center">
                                <td className="border border-gray-200 p-3">{cls.title}</td>
                                <td className="border border-gray-200 p-3">
                                    <img
                                        src={cls.image}
                                        alt={cls.title}
                                        className="w-16 h-16 object-cover mx-auto"
                                    />
                                </td>
                                <td className="border border-gray-200 p-3">{cls.email}</td>
                                <td className="border border-gray-200 p-3">
                                    {cls.description.slice(0, 50)}...
                                </td>
                                <td className="border border-gray-200 p-3">
                                    <div className="flex justify-center gap-2">
                                        {/* Approve Button */}
                                        <button
                                            onClick={() => handleApprove(cls._id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
                                            disabled={cls.status !== "pending"}
                                        >
                                            Approve
                                        </button>

                                        {/* Reject Button */}
                                        <button
                                            onClick={() => handleReject(cls._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300"
                                            disabled={cls.status !== "pending"}
                                        >
                                            Reject
                                        </button>

                                        {/* Progress Button */}
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                                            disabled={cls.status !== "approved"}
                                            onClick={() => Swal.fire("Class Progress", "Feature Coming Soon!", "info")}
                                        >
                                            Progress
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAllClasses;