import { NavLink } from "react-router-dom";
import logo from '../../assets/Logo/Logo.png'
import { useContext } from "react";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";
import ToggleTheme from "../../utils/ToggleTheme";

import './css/style.css'




const Navbar = () => {

    const { user, logOutUser } = useContext(AuthContext)


    const links = <>
        <li><NavLink to='/' className='font-medium text-base hover:text-primary'>Home</NavLink></li>
        <li><NavLink to='/allPosts' className='font-medium text-base hover:text-primary'>All volunteer Need posts</NavLink></li>
    </>

    const authLinks = <>

        <li><NavLink to='/login' className="px-4 py-2 bg-primary text-white font-semibold border rounded-lg ">Login</NavLink></li>
        {/* <li><NavLink to='/register' className='font-medium text-base hover:text-primary'>Register</NavLink></li> */}
    </>

    const dropdownLinks = <>
        <li><NavLink to='/addPost'>Add Volunteer need Post</NavLink></li>
        <li><NavLink to='/managePost'>Manage My Posts</NavLink></li>
        {
            user && user?.email &&
            <li><NavLink to='/myVolunteerRequest'>My Volunteer Request</NavLink></li>
        }
    </>
    const handlelogOutUser = () => {
        logOutUser()
            .then(() => {
                toast.success('Log out successfull !!')
            })
            .catch(err => {
                const errorCode = err.code;
                const errorMessage = err.message;
                toast.error('Something went worng Please try again!!')
            })
    }
    return (
        <div className="navbar bg-base-100 py-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                        className="  dropdown-content bg-base-100 rounded-xl z-50 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img src={logo} className="w-32 md:w-auto" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu-horizontal gap-8 px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end md:gap-4 justify-end">
                <div className="form-control">
                    <input onClick={ToggleTheme}
                        type="checkbox"
                        className="toggle bg-primary border-primary "
                        defaultChecked />
                </div>
                {

                }

                <div className="dropdown dropdown-end z-50">
                    {
                        user && user?.email ?
                            <div className="tooltiphover relative">
                                <div tabIndex={0} role="button"
                                    className="btn gap-2 tooltiphover btn-circle avatar" data-tip="hello">
                                    <div className="w-10 rounded-full tooltiphover">
                                        <img
                                            alt='fdas'
                                            className="w-full h-full tooltiphover"
                                            src={user?.auth.currentUser.photoURL} />

                                    </div>
                                    <p className="font-light text-sm">MyProfile</p>
                                </div>
                                <p className="absolute
                                            -bottom-14
                                            left-1/2
                                            -translate-x-1/2
                                            -translate-y-1/2 
                                            shadow-md
                                            tooltip
                                            text-base
                                         text-primary
                                        bg-white">{user?.displayName}</p>
                            </div>
                            :
                            <div tabIndex={0} role="button" className='font-medium text-base hover:text-primary hidden md:block'>My Profile</div>
                    }
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {dropdownLinks}
                    </ul>
                </div>
                <ul className="menu menu-horizontal px-1">
                    {
                        user && user?.email ?
                            <button onClick={handlelogOutUser}
                                type="button" className="px-4 py-2 bg-primary text-white font-semibold border rounded-lg "
                            >Logout</button>
                            : authLinks
                    }
                </ul>
            </div>

        </div>
    );
};

export default Navbar;