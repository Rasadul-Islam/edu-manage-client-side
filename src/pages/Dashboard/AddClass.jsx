import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../utility/LoadingSpinner/LoadingSpinner";

const ClassPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        axiosSecure.get(`/users/${user.email}`)
            .then(res => {
                setCurrentUser(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setLoading(false); 
            });
    }, [user.email, axiosSecure]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const classData = {
            ...formData,
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            status: "pending",
        };

        try {
            const res = await axiosSecure.post("/classes", classData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Class added successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Redirect to My Classes page
                navigate("/dashboard/myClass");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to add class!",
                text: error.message,
            });
        }
    };

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">Add a New Class</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-lg font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter class title"
                        required
                    />
                </div>

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

                {/* Price */}
                <div>
                    <label className="block text-lg font-medium mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter price"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-lg font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter class description"
                        required
                    ></textarea>
                </div>

                {/* Image */}
                <div>
                    <label className="block text-lg font-medium mb-2">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                {/* Add Class Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition"
                >
                    Add Class
                </button>
            </form>
        </div>
    );
};

export default ClassPage;
