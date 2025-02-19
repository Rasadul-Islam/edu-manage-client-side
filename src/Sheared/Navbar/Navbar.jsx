import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FiLogOut } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // Fetch current user data
    const { data: currentUser = {} } = useQuery({
        queryKey: ["currentUser", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensure the query runs only if the user is logged in
    });

    const navOptions = <>
        <li><Link to='/' className='hover:font-bold hover:text-teal-500'>Home</Link ></li>
        <li><Link to='/allClasses' className='hover:font-bold hover:text-teal-500'>All Classes</Link ></li>
        <li><Link to='/teachOnEdu' className='hover:font-bold hover:text-teal-500'>Teach on EduLoop</Link ></li>

    </>
    // User LogOut function
    const handleLogOut = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You want to Log Out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Log Out!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                logOutUser();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out Success",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "You are Stay Here!",
                    icon: "error"
                });
            }
        });
    }

    return (
        <div className='bg-teal-100 sticky top-0 z-40'>
            <div className="navbar container mx-auto max-w-7xl">
                {/* button section */}
                <div className="navbar-start">
                    <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-teal-50 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">
                        <img src="https://i.ibb.co.com/GkLkJyL/Skill-Loop-Logo-removebg-preview.png" alt="Logo" className='w-8 h-8' />
                        <h1 className='font-bold text-teal-500'>EduLoop</h1>
                    </Link>
                </div>
                {/* Logo */}
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1 text-lg">
                        {navOptions}
                    </ul>
                </div>
                {/* Right side button */}
                <div className="navbar-end">
                    {user ? <>
                        {/* Have User LogIn */}
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className=" m-1 border-2 border-teal-400 rounded-full">
                                {/* User Avatar */}
                                <img
                                    src={currentUser?.photoURL || "https://i.ibb.co/61HT020/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDIz-LTAx-L3-Jt-Nj-A5-LXNvb-Glka-WNvbi13-LTAw-Mi1w-Ln-Bu.jpg"}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full bg-gray-200"
                                />
                            </div>
                            {/* Dropdown button */}
                            <ul tabIndex={0} className="dropdown-content  menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                                <li className='font-bold  py-2 text-center text-base'>{currentUser.name || 'User'}</li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button
                                    onClick={handleLogOut}
                                    className="hover:bg-red-400 hover:font-bold"
                                >
                                    Logout <FiLogOut />
                                </button></li>
                            </ul>
                        </div>
                    </>
                        :
                        <>
                            {/* Not LogIn user */}
                            <Link to="/logIn" className="btn text-gray-800 bg-teal-400 hover:bg-teal-500">Log In</Link>
                            <Link to="/register" className="btn text-gray-800 bg-teal-400 hover:bg-teal-500">Register</Link>
                        </>
                    }

                </div>
            </div >
        </div>
    );
};

export default Navbar;