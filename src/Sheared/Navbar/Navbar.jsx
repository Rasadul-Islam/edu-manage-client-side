import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const navOptions = <>
        <li><Link to='/' className='hover:font-bold hover:text-teal-500'>Home</Link ></li>
        <li><Link to='/allClasses' className='hover:font-bold hover:text-teal-500'>All Classes</Link ></li>
        <li><Link to='/teachOnEdu' className='hover:font-bold hover:text-teal-500'>Teach on EduLoop</Link ></li>
        
    </>

    return (
        <>
            <div className="navbar bg-teal-50">
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
                    <a className="btn btn-ghost text-xl">
                        <img src="https://i.ibb.co.com/GkLkJyL/Skill-Loop-Logo-removebg-preview.png" alt="Logo" className='w-8 h-8' />
                        <h1 className='font-bold text-teal-500'>EduLoop</h1>
                    </a>
                </div>
                {/* Logo */}
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                {/* Right side button */}
                <div className="navbar-end">
                    <Link to="/logIn" className="btn text-gray-800 bg-teal-400 hover:bg-teal-500">Log In</Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;