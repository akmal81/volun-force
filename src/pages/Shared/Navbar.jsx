import { NavLink } from "react-router-dom";
import logo from '../../assets/Logo/Logo.png'
import { useContext } from "react";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";



const Navbar = () => {

    const { user, logOutUser } = useContext(AuthContext)

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allPosts'>All volunteer Need posts</NavLink></li>
    </>

    const authLinks = <>

        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
    </>

    const dropdownLinks = <>
        <li><NavLink to='addPost'>Add Volunteer need Post</NavLink></li>
        <li><NavLink to='managePost'>Manage My Posts</NavLink></li>
    </>

    const handlelogOutUser =()=>{
        logOutUser()
        .then(()=>{
            toast.success('Log out successfull !!')
        })
        .catch(err => {
            const errorCode = err.code;
            const errorMessage = err.message;
            toast.error('Something went worng Please try again!!')
        })

    }

    return (
        <div className="navbar bg-base-100">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <img src={logo} className="" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    {
                        user && user.email ? <button onClick={handlelogOutUser}>Log out</button> : authLinks
                    }
                </ul>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {
                            user && user.email? <img
                            alt=""
                            src={user?.photoURL} />:<CgProfile className="w-full h-full" />

                            }
                           
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {dropdownLinks}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;