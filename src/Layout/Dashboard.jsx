import React from 'react';
import { FaChalkboardTeacher, FaHome, FaHouseUser, FaUsers } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {

    // Todo: admin comes from database 
    const isAdmin = true;
    return (
        <div className='flex w-full'>
            {/* Dashboard Side bar */}
            <ul className='w-64 md:w-1/5 h-screen min-h-fit p-5 flex flex-col gap-2 menu menu-lg dropdown-content bg-teal-100  z-[1] shadow'>
                <li><NavLink to='/' className='flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize'>
                    <FaHome></FaHome>
                    <h1>Home</h1>
                </NavLink></li>
                {
                    isAdmin ?
                        <>
                            {/* 1st navlink */}
                            <li><NavLink to='/dashboard/teacherRequest' className='flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize'>
                                <FaChalkboardTeacher></FaChalkboardTeacher>
                                <h1>Teacher Request</h1>
                            </NavLink></li>
                            {/* 2nd Navlink */}
                            <li><NavLink to='/dashboard/users' className='flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize'>
                                <FaUsers></FaUsers>
                                <h1>Users</h1>
                            </NavLink></li>
                            {/* 3rd Navlink */}
                            <li><NavLink to='/dashboard/allClasses' className='flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize'>
                                <SiGoogleclassroom />
                                <h1>All classes</h1>
                            </NavLink></li>
                        </>
                        :
                        <>

                        </>
                }


                {/* All students NavLinks */}
                <li><NavLink to='/dashboard/myClass' className='flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize'>
                    <SiGoogleclassroom />
                    My enroll class</NavLink></li>
                <li><NavLink to='/dashboard/profile' className='flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize'>
                    <FaHouseUser></FaHouseUser>
                    Profile</NavLink></li>
            </ul>
            <div className='flex-1 w-1/2 md:w-4/5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;