import React from 'react';
import { FaChalkboardTeacher, FaHome, FaHouseUser, FaUsers } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../utility/LoadingSpinner/LoadingSpinner';

const Dashboard = () => {
 const [role, isRoleLoading]=useRole()

  if (isRoleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="flex w-full">
      {/* Dashboard Sidebar */}
      <ul className="w-64 md:w-1/5 h-screen min-h-fit p-5 flex flex-col gap-2 menu menu-lg dropdown-content bg-teal-100 z-[1] shadow">
        {/* Home Button */}
        <li>
          <NavLink
            to="/"
            className="flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize"
          >
            <FaHome />
            <h1>Home</h1>
          </NavLink>
        </li>

        {/* Routes based on role */}
        {role === 'admin' && (
          <>
            <li>
              <NavLink
                to="/dashboard/teacherRequest"
                className="flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize"
              >
                <FaChalkboardTeacher />
                <h1>Teacher Request</h1>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/users"
                className="flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize"
              >
                <FaUsers />
                <h1>Users</h1>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/adimAllClasses"
                className="flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize"
              >
                <SiGoogleclassroom />
                <h1>All Classes</h1>
              </NavLink>
            </li>
          </>
        )}

        {role === 'teacher' && (
          <>
            <li>
              <NavLink
                to="/dashboard/addClass"
                className="flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize"
              >
                <SiGoogleclassroom />
                <h1>Add Class</h1>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myClass"
                className="flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize"
              >
                <SiGoogleclassroom />
                <h1>My Class</h1>
              </NavLink>
            </li>
          </>
        )}

        {role === 'student' && (
          <>
            <li>
              <NavLink
                to="/dashboard/myEnrollClass"
                className="flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize"
              >
                <SiGoogleclassroom />
                <h1>My Enroll Class</h1>
              </NavLink>
            </li>
          </>
        )}

        {/* Profile: Common for all users */}
        <li>
          <NavLink
            to="/dashboard/profile"
            className="flex gap-2 items-center hover:text-gray-900 text-gray-500 py-3 capitalize"
          >
            <FaHouseUser />
            <h1>Profile</h1>
          </NavLink>
        </li>
      </ul>

      {/* Content */}
      <div className="flex-1 w-1/2 md:w-4/5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
