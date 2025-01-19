import React from 'react';
import { FaHome, FaHouseUser } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='w-64'>
            <ul className='h-screen p-5 flex flex-col gap-2 menu menu-lg dropdown-content bg-teal-100  z-[1] mt-3 shadow'>
                <li><NavLink to='/' className='flex gap-2 items-center hover:font-bold hover:text-black py-3 capitalize'>
                    <FaHome></FaHome>
                    <h1>Home</h1>
                </NavLink></li>
                <li><NavLink to='/dashboard/myClass' className='flex gap-2 items-center hover:font-bold hover:text-black py-3 capitalize'>
                    <SiGoogleclassroom />
                    My enroll class</NavLink></li>
                <li><NavLink to='/dashboard/profile' className='flex gap-2 items-center hover:font-bold hover:text-black py-3 capitalize'>
                    <FaHouseUser></FaHouseUser>
                    Profile</NavLink></li>
            </ul>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;