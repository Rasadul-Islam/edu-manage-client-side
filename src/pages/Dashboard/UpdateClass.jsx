import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateClass = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    console.log(formData);
    // Fetch the class data
    useEffect(() => {
        axiosSecure
            .get(`/updateClasses/${id}`)
            .then((res) => {
                setFormData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching class data:", error);
            });
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosSecure.patch(`/classes/${id}`, formData);
            // _id remove from frontEnd
            // const res = await axiosSecure.patch(`/classes/${id}`, {
            //     title: formData.title,
            //     description: formData.description,
            //     email: formData.email,
            //     image: formData.image,
            //     name: formData.name,
            //     price: formData.price,
            //     status: formData.status,
            // });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Class updated successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/dashboard/myClass");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to update class!",
                text: error.message,
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">Update Class</h2>
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

                {/* Update Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition"
                >
                    Update Class
                </button>
            </form>
        </div>
    );
};

export default UpdateClass;
