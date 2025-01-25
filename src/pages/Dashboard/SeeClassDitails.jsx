import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SeeClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [classDetails, setClassDetails] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Class details and related data load
  useEffect(() => {
    axiosSecure.get(`/classDetails/${id}`).then((res) => {
      setClassDetails(res.data.classDetails);
      setAssignments(res.data.assignments || []);
      setTotalSubmissions(res.data.totalSubmissions || 0);
    });
  }, [id, axiosSecure]);

  // Handle create assignment
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const deadline = form.deadline.value;
    const description = form.description.value;

    axiosSecure.post(`/assignments`, {
      classId: id,
      title,
      deadline,
      description,
    })
    .then((res) => {
      if (res.data.insertedId) {
        Swal.fire("Success", "Assignment created successfully!", "success");
        setAssignments([...assignments, { title, deadline, description }]);
        setIsModalOpen(false);
      }
    })
    .catch((error) => {
      Swal.fire("Error", "Failed to create assignment!", "error");
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Class Progress</h2>

      {/* Class Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Enrollment Card */}
        <div className="bg-teal-100 p-6 shadow-md rounded-md text-center">
          <h3 className="text-xl font-bold mb-2">Total Enrollment</h3>
          <p className="text-3xl font-bold text-teal-700">{classDetails.enrollmentCount || 0}</p>
        </div>

        {/* Total Assignments Card */}
        <div className="bg-blue-100 p-6 shadow-md rounded-md text-center">
          <h3 className="text-xl font-bold mb-2">Total Assignments</h3>
          <p className="text-3xl font-bold text-blue-700">{assignments.length}</p>
        </div>

        {/* Total Assignment Submissions Card */}
        <div className="bg-green-100 p-6 shadow-md rounded-md text-center">
          <h3 className="text-xl font-bold mb-2">Total Submissions</h3>
          <p className="text-3xl font-bold text-green-700">{totalSubmissions}</p>
        </div>
      </div>

      {/* Class Assignment Section */}
      <div className="mt-8 text-center border-t-2 py-5 bg-teal-50">
        <h3 className="text-2xl font-semibold mb-4">Class Assignments</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
        >
          Create Assignment
        </button>

        <div className="mt-4 text-left">
        <ul className="list-disc pl-5 ">
              {assignments.map((assignment, index) => (
                <li key={index} className="mb-2">
                  <p className="font-bold">{assignment.title}</p>
                  <p>Deadline: {assignment.deadline}</p>
                  <p>{assignment.description}</p>
                </li>
              ))}
            </ul>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Create Assignment</h3>
            <form onSubmit={handleCreateAssignment}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deadline" className="block text-sm font-semibold mb-1">
                  Assignment Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-semibold mb-1">
                  Assignment Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="w-full px-3 py-2 border rounded-md"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                >
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeClassDetails;
