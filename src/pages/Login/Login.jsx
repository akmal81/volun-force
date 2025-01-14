import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnimation from "../../assets/lotti/login.json";
import Lottie from "lottie-react";
import AuthContext from "../../provider/AuthContext";

import toast from "react-hot-toast";
import SocialLogin from "../Shared/SocialLogin";
import { Helmet } from "react-helmet";
import axios from "axios";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    const fromWhere = location?.state|| '/';
    

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(result => {
                
                const user = { email: email }
                
                axios.post(`${import.meta.env.VITE_api_url}/jwt`, user, {withCredentials: true})
                .then(res=>{
                    console.log(res.data)
                })
                toast.success('Login Successful!!');
                navigate(fromWhere, { replace: true });
               
            })
            .catch(err => {
                const errorCode = err.code;
                // console.log(errorCode)
                toast.error(errorCode);
            })

    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet><title>Login | VF</title></Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="bg-white rounded-lg w-1/3">
                    <Lottie animationData={loginAnimation}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-5xl font-bold">Login</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Your Email" className="input input-bordered" required />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={show ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required />

                            <button
                                onClick={(e) => { e.preventDefault(); setShow(!show) }}
                                className="absolute bottom-4 right-4">
                                {
                                    show ?
                                        <FaRegEyeSlash />
                                        :
                                        <FaRegEye />
                                }
                            </button>


                        </div>

                        <div className="form-control mt-6">
                            <button className="btn  bg-primary text-white">Register</button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="flex items-center justify-center">

                        <SocialLogin></SocialLogin>
                    </div>
                    <div>
                        <p className="text-center pb-8">Already have an account
                            <Link to='/register' className="px-2 text-red-700 hover:font-bold">Registration</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;