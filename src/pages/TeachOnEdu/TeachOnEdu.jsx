import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../utility/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';

const TeachOnEdu = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        experience: "",
        category: "",
    });
    // Fetch the current user's data
    useEffect(() => {
        axiosSecure.get(`/users/${user.email}`)
            .then((res) => {
                setCurrentUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
                setLoading(false);
            });
    }, [user.email, axiosSecure]);
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const teacherData = {
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            image: currentUser?.photoURL || "",
            title: formData.title,
            experience: formData.experience,
            category: formData.category,
            status: "pending",
        };
        try {
            const res = await axiosSecure.post("/teacherRequests", teacherData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Request submitted successfully!",
                    text: "Admin will review your request soon.",
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to submit request!",
                text: error.message,
            });
        }
    };
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (currentUser?.role === "teacher") {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">
                    You are already a teacher!
                </h2>
                <p className="text-gray-600">Thank you for being part of our teaching community.</p>
            </div>
            
        );
    }

    return (
        <div>
            <Helmet>
                <title>EduLoop | Teach on EduLoop</title>
            </Helmet>
            <div className="max-w-3xl mx-auto p-6 bg-teal-50 shadow-lg shadow-teal-200 my-10 rounded-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">Apply to Teach</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-lg font-medium mb-2">Name</label>
                    <input
                        type="text"
                        value={currentUser?.name || ""}
                        className="w-full p-3 border rounded-md bg-gray-100"
                        readOnly
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-lg font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={currentUser?.email || ""}
                        className="w-full p-3 border rounded-md bg-gray-100"
                        readOnly
                    />
                </div>
                {/* Image */}
                <div>
                    <label className="block text-lg font-medium mb-2">Image</label>
                    <input
                        type="email"
                        value={currentUser?.photoURL || ""}
                        className="w-full p-3 border rounded-md bg-gray-100"
                        readOnly
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-lg font-medium mb-2">Experience Level</label>
                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        required
                    >
                        <option value="">Select Experience Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="mid-level">Mid-Level</option>
                        <option value="experienced">Experienced</option>
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-lg font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter your title"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-lg font-medium mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Programming Languages">Programming Languages</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition"
                >
                    Submit for Review
                </button>
            </form>
        </div>
        </div>
    );
};

export default TeachOnEdu;