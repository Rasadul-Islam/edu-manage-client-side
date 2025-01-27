import React, { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useLocation, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EnrollClassDetails = () => {
    const axiosSecure =useAxiosSecure();
    const [assignments, setAssignments]=useState([]);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [showTERModal, setShowTERModal] = useState(false);
    const {id} = useParams();
    // console.log("classId",id);

    useEffect(()=>{
        axiosSecure.get(`/assignments/${id}`)
        .then(res=>{
            // console.log(res.data);
            setAssignments(res.data);
        })

    },[id])



    const handleTERSubmit = () => {
        console.log("Feedback:", feedback);
        console.log("Rating:", rating);

        // Close the modal after submission
        setShowTERModal(false);

        // Reset feedback and rating
        setFeedback('');
        setRating(0);

        // Optionally, send this data to the server
        // Example:
        // axios.post('/api/feedback', { rating, feedback, classId: id })
        //     .then(response => console.log('Feedback submitted:', response.data))
        //     .catch(error => console.error('Error submitting feedback:', error));
    };






    return (
        <div className="p-4">
            <div className='mb-10 pb-5 border-b-2'>
                {/* TER (Teaching Evaluation Report) Button */}
                <button
                    onClick={() => setShowTERModal(true)}
                    className="flex gap-2 items-center bg-green-500 text-white px-3 py-2 rounded hover:bg-green-700 transition duration-300"
                >
                    <IoAddCircleOutline className='w-5 h-5' />
                    Teacher Evaluation
                </button>
            </div>

            {/* Table displaying assignments */}
            <h3 className="text-xl font-semibold mb-4">Assignments: {assignments.length}</h3>
            <table className="min-w-full border-collapse mb-6 table-zebra">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b"></th>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Deadline</th>
                        <th className="py-2 px-4 border-b">Submission</th>
                    </tr>
                </thead>
                <tbody>
                {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
                <tr key={assignment._id}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{assignment.title}</td>
                    <td className="py-2 px-4 border-b">{assignment.description}</td>
                    <td className="py-2 px-4 border-b">{new Date(assignment.deadline).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">
                        <button className="bg-blue-500 text-white px-3 py-2 rounded">Submit</button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                    No assignment published
                </td>
            </tr>
        )}
                </tbody>
            </table>
            

            {/* TER Modal */}
            {showTERModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h4 className="text-xl font-semibold mb-4">Teaching Evaluation Report</h4>
                        <textarea
                            placeholder="Enter your feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        ></textarea>
                        <div className="mb-4">
                            <ReactStars
                                count={5}
                                value={rating}
                                onChange={setRating}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleTERSubmit}
                                className="bg-teal-300 px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Send
                            </button>
                            <button
                                onClick={() => setShowTERModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrollClassDetails;