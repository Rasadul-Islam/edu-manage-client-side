import React, { useContext } from 'react';
import signInLottie from '../../assets/lottie/SignIn.json'
import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const LogIn = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";
    const { logInUser, logInWithGoogle } = useContext(AuthContext);

    // Handle Google Sign-In
    const handleGoogleLogIn = async () => {
        try {
            await logInWithGoogle()
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "LogIn Successful",
                showConfirmButton: false,
                timer: 1000
            });
            navigate(from, { replace: true })
        }
        catch (error) {
            // console.log(error)
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "LogIn Faild",
                showConfirmButton: false,
                timer: 1000
            });
        }
    }
    // Handle email and password LogIn
    const handleLogIn= async e=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        try{
            await logInUser(email, password)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "LogIn Successful",
                showConfirmButton: false,
                timer: 1000
              });
            navigate(from, {replace:true})            
        }
        catch(error){
            console.log(error)
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "LogIn Faild",
                text:"Check your Email or Password and try again",
                showConfirmButton: false,
                timer: 2000
              });
        }
    }


    return (
        <div>
            <div className="hero bg-teal-50 min-h-screen mb-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={signInLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-2 border-teal-300 shadow-teal-300 ">
                        {/* top text */}
                        <h1 className='text-xl md:text-4xl font-bold pt-5 px-5'>Log In:</h1>
                        {/* google logIn botton */}
                        <div className="form-control mt-5 px-5">
                            <button
                                onClick={handleGoogleLogIn}
                                className="btn bg-transparent font-semibold text-lg"
                            >
                                <img src="https://i.ibb.co.com/ZdHFgMk/png-clipart-google-google.png" alt="Google Logo" className='w-8 h-8 bg-transparent rounded-full' />
                                <h1>Sign in with Google</h1>
                            </button>
                            <h1 className='divider'>Or</h1>
                        </div>
                        <form onSubmit={handleLogIn} className="px-5 pb-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-5">
                                <input className='btn bg-teal-300 font-bold text-lg' type="submit" value="Log In" />
                            </div>
                            <div className="mt-2">
                                Don't you have an account? <Link to="/register" className="font-bold">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;