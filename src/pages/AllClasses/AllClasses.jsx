import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("default");

  // Fetch classes data
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allClasses");
      return res.data;
    },
  });

  // Handle sorting
  const sortedClasses = [...classes].sort((a, b) => {
    if (sortType === "price-asc") return a.price - b.price;
    if (sortType === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="px-5">
      <Helmet>
        <title>EduLoop | All Classes</title>
      </Helmet>
      <h1 className="text-center font-bold text-2xl md:text-4xl my-5 text-teal-500">All Classes</h1>

      {/* Sort Button */}
      <div className="flex justify-end mb-5 ">
        <select
          className="p-2 border border-teal-300 rounded-lg shadow-lg shadow-teal-200 cursor-pointer"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="default">Sort by Price</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10">
        {sortedClasses.length > 0 ? (
          sortedClasses.map((classItem) => (
            <div key={classItem._id} className="p-5 shadow-lg rounded-lg bg-white">
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{classItem.title}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Posted By:</span> {classItem.name}
              </p>
              <p className="font-bold text-lg mb-1">Price: ${classItem.price}</p>
              <p className="text-gray-600 mb-2">{classItem.description.slice(0, 60)}...</p>
              <p className="text-sm text-gray-500 mb-3">
                Enrolled: {classItem.enrollmentCount} students
              </p>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 w-full"
                onClick={() => navigate(`/allClasses/enroll-class/${classItem._id}`)}
              >
                Enroll
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 text-center text-gray-500">
            No classes available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClasses;
