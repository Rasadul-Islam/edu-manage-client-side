import React from 'react';
import signInLottie from '../../assets/lottie/SignIn.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div>
            <div className="hero bg-teal-50 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={signInLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-2 border-teal-300 shadow-teal-300 ">
                        {/* top text */}
                        <h1 className='text-xl md:text-4xl font-bold pt-5 px-5'>Sign In:</h1>
                        {/* google logIn botton */}
                        <div className="form-control mt-5 px-5">
                            <button
                                className="btn bg-transparent font-semibold text-lg"
                            >
                                <img src="https://i.ibb.co.com/ZdHFgMk/png-clipart-google-google.png" alt="Google Logo" className='w-8 h-8 bg-transparent rounded-full' />
                                <h1>Sign in with Google</h1>
                            </button>
                            <h1 className='divider'>Or</h1>
                        </div>
                        <form className="px-5 pb-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-teal-300">Login</button>
                            </div>
                            <span className="mt-5">
                                Don't you have an account? <Link to="/signUp" className="font-bold">Sign Up</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;