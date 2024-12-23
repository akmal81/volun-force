import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerAnimation from "../../assets/lotti/register.json";
import Lottie from "lottie-react";
import AuthContext from "../../provider/AuthContext";
import { updateProfile } from "firebase/auth";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import SocialLogin from "../Shared/SocialLogin";
import { Helmet } from "react-helmet";



const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const fromWhere = location.state?.from || '/' ;

    const handleRegistration = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photo.value;

        
        if(!name||!email||!password||!photoUrl){
            toast.error('Please Fill All the Field');
            return
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
           Swal.fire("Password must be at least 6 characters long, contain at least one uppercase letter, and one lowercase letter.");
            return
        }

        registerUser(email, password)
            .then(result => {
                const user = result.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photoUrl
                }

                );
            })
            .then(() => {
                Swal.fire('User Created successfully!!');
                navigate(fromWhere, { replace: true });
            }
            )
            .catch(err => {
                const errorCode = err.code;
                const errorMessage = err.message;
                toast.error('Something Went Worng!! Please Try again')
            })

    }



    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
            <title>New User Registration | VF</title>
        </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="bg-white rounded-lg">
                    <Lottie animationData={registerAnimation}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegistration} className="card-body">
                        <h1 className="text-5xl font-bold">Register now</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>

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
                                onClick={(e) => {e.preventDefault();setShow(!show)}}
                                className="absolute bottom-4 right-4">
                                {
                                    show ?
                                        <FaRegEyeSlash />
                                        :
                                        <FaRegEye />
                                }
                            </button>


                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="url" name="photo" placeholder="photoUrl" className="input input-bordered" required />
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
                            <Link to='/login' className="px-2 text-red-700 hover:font-bold">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;