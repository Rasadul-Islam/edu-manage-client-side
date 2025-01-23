import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth"; // Custom hook to get current user info
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // Assume this hook provides the logged-in user's details
    const [isEditing, setIsEditing] = useState(false); // Track if the user is editing
    const [updatedData, setUpdatedData] = useState({}); // Store updated user data

    const { data: currentUser = {}, refetch } = useQuery({
        queryKey: ["currentUser", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        onSuccess: (data) => setUpdatedData(data),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axiosSecure.patch(`/users/${currentUser._id}`, updatedData);
            setIsEditing(false);
            Swal.fire({
                icon: "success",
                title: "Update successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Not Save Your Data!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="">
            <h2 className="text-4xl text-center">Profile</h2>
            <div className="w-3/5 mx-auto rounded-lg p-5 border-2 border-teal-200 shadow-xl shadow-teal-200 text-xl mt-5">
                {isEditing ? (
                    <>
                        <div className="flex flex-col">
                            <p className="text-center text-2xl mb-10">Edit Now</p>
                            <label>
                                <strong>PhotoURL :</strong>
                                <input
                                    className="border-2 rounded-lg px-1 bg-teal-100 ml-2"
                                    type="url"
                                    name="photoURL"
                                    defaultValue={updatedData.photoURL || currentUser.photoURL}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                <strong>Name:</strong>
                                <input
                                    className="border-2 rounded-lg px-1 bg-teal-100 ml-2"
                                    type="text"
                                    name="name"
                                    defaultValue={updatedData.name || currentUser.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                <strong>Phone:</strong>
                                <input
                                    className="border-2 rounded-lg px-1 bg-teal-100 ml-2"
                                    type="number"
                                    name="phone"
                                    defaultValue={updatedData.phone || currentUser.phone}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                <strong>Email:</strong>
                                <input className="bg-gray-300 rounded-lg px-1 ml-2"
                                    type="email"
                                    name="email"
                                    defaultValue={currentUser.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                <strong>Role:</strong>
                                <span className="bg-gray-300 rounded-lg px-2 ml-2">{currentUser.role}</span>
                            </label>
                            <br />
                            <div className="flex gap-5 justify-center items-center">
                                <button className="border-2 border-teal-400 bg-teal-50 rounded-lg px-4 " onClick={handleSave}>Save</button>
                                <button className="border-2 border-teal-400 bg-teal-50 rounded-lg px-4 " onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            <p className="flex justify-center items-center ">
                                <img src={currentUser.photoURL || 'https://i.ibb.co.com/61HT020/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDIz-LTAx-L3-Jt-Nj-A5-LXNvb-Glka-WNvbi13-LTAw-Mi1w-Ln-Bu.jpg'} alt={currentUser.name} className="w-32 h-32 rounded-full border-2 border-teal-200 shadow-lg shadow-teal-200" />
                            </p>
                            <p>
                                <strong>Name:</strong> {currentUser.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {currentUser.email}
                            </p>
                            <p className="flex items-center gap-2">
                                <strong>Phone:</strong> {currentUser.phone || <FaEdit  onClick={() => setIsEditing(true)} className="cursor-pointer text-gray-500"/>}
                            </p>
                            <p>
                                <strong>Role:</strong> {currentUser.role}
                            </p>
                            <button className="border-2 border-teal-400 bg-teal-50 rounded-lg px-4 w-fit" onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
