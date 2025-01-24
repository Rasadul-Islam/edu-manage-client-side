import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();
    // Fetch teacher requests
    const { data: teacherRequests = [], isLoading, refetch } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacherRequests');
            return res.data;
        },
    });

    // make teacher approve
    const handleApprove = request => {
        axiosSecure.patch(`/teacher/approver/${request._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${request.name} is an Teacher Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    // teacher request rejects
    const handleReject = request => {


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to reverse this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/teacher/reject/${request._id}`)
                .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Rejected!",
                        text: `${request.name} has been rejected!`,
                        icon: "success"
                    });
                }});
            }
            
        });
        
    }




    // Loading state
    if (isLoading) {
        return <p>Loading teacher requests...</p>;
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-center mb-5">Teacher Requests</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Experience</th>
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherRequests.map((request) => (
                            <tr key={request._id}>
                                <td className="border px-4 py-2">
                                    <img
                                        src={request.image}
                                        alt={request.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="border px-4 py-2">{request.name}</td>

                                <td className="border px-4 py-2">{request.experience}</td>
                                <td className="border px-4 py-2">{request.title}</td>
                                <td className="border px-4 py-2">{request.category}</td>
                                <td className="border px-4 py-2">{request.status}</td>
                                <td className="border flex-col px-4 py-2 md:flex gap-2">
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                                        onClick={() => handleApprove(request)}
                                        disabled={request.status !== 'pending'}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                                        onClick={() => handleReject(request)}
                                        disabled={request.status !== 'pending'}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;
