import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const OverviewPage = () => {
    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const { data } = await axiosSecure.get('/overview');
                setOverview(data);
            } catch (error) {
                console.error("Error fetching overview data:", error);
                setError("Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchOverview();
    }, [axiosSecure]);

    // Chart Data
    const chartData = [
        { name: 'Users', value: overview?.totalUsers || 0 },
        { name: 'Classes', value: overview?.totalClasses || 0 },
        { name: 'Enrollments', value: overview?.totalEnrollments || 0 }
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className="px-5 py-10">
            <h1 className="text-center font-bold text-2xl md:text-4xl mb-5">📊 Overview</h1>

            {/* Loading State */}
            {loading && <p className="text-center text-gray-500">Loading...</p>}

            {/* Error State */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Overview Data */}
            {overview && (
                <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
                    
                    {/* Stats Cards */}
                    <div className="grid gap-5 w-full lg:w-1/2">
                        <div className="p-5 bg-white shadow-lg rounded-lg text-center shadow-teal-400">
                            <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
                            <p className="text-4xl font-bold text-teal-600">{overview.totalUsers}</p>
                        </div>
                        <div className="p-5 bg-white shadow-lg rounded-lg text-center shadow-teal-400">
                            <h2 className="text-xl font-semibold text-gray-800">Total Classes</h2>
                            <p className="text-4xl font-bold text-teal-600">{overview.totalClasses}</p>
                        </div>
                        <div className="p-5 bg-white shadow-lg rounded-lg text-center shadow-teal-400">
                            <h2 className="text-xl font-semibold text-gray-800">Total Enrollments</h2>
                            <p className="text-4xl font-bold text-teal-600">{overview.totalEnrollments}</p>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-lg font-semibold text-center mb-3">📈 Data Visualization</h2>

                        {/* Bar Chart */}
                        <div className="bg-white p-5 shadow-lg rounded-lg shadow-teal-400">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#00C49F" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white p-5 shadow-lg rounded-lg mt-5 shadow-teal-400">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OverviewPage;
