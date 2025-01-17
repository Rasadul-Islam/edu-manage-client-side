import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import registerLottie from '../../assets/lottie/SignUp.json';
import Swal from 'sweetalert2';
// import AuthContext from '../../context/AuthContext/AuthContext';

const Register = () => {
    // const { createUser, updateUserProfile } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        // Password validation
        const uppercaseCheck = /[A-Z]/.test(password);
        const lowercaseCheck = /[a-z]/.test(password);
        const lengthCheck = password.length >= 6;

        if (!uppercaseCheck) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must contain at least one uppercase letter.",
            });
            return;
        }
        if (!lowercaseCheck) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must contain at least one lowercase letter.",
            });
            return;
        }
        if (!lengthCheck) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must be at least 6 characters long.",
            });
            return;
        }

        // try {
        //     const result = await createUser(email, password);
        //     await updateUserProfile(name, photoURL); // Update user profile with name and photo
        //     Swal.fire({
        //         icon: "success",
        //         title: "Registration successful!",
        //         showConfirmButton: false,
        //         timer: 1500,
        //     });
        //     // console.log("User created successfully:", result.user);
        // } catch (error) {
        //     console.error("Error creating user:", error);
        //     Swal.fire({
        //         icon: "error",
        //         title: "Registration Failed",
        //         text: error.message,
        //     });
        // }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center bg-teal-50 gap-10 p-5">
            <div className="w-96 mt-20">
                <Lottie animationData={registerLottie}></Lottie>
            </div>
            <div className="card bg-base-100 shadow-teal-300 w-full max-w-sm shrink-0 shadow-2xl p-10 my-20">
                <form onSubmit={(e) => handleRegister(e)} className="">
                    <h1 className="text-2xl font-bold mb-5">Register:</h1>
                    <div className="form-control">
                        <label className="text-lg font-semibold mb-2">Name</label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="text-lg font-semibold mb-2">Email</label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="text-lg font-semibold mb-2">Photo URL</label>
                        <input type="url" name="photoURL" placeholder="Enter Photo URL" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="text-lg font-semibold mb-2">Password</label>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="Register" className="btn bg-teal-400 border-2 border-gray-400 font-bold text-lg" />
                    </div>
                    <h1 className="mt-5">
                        Already have an account? <Link to="/login" className="font-bold">LogIn.</Link>
                    </h1>
                </form>
            </div>
        </div>
    );
};

export default Register;
