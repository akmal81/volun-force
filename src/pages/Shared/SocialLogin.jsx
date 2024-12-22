import { useContext } from 'react';
import AuthContext from '../../provider/AuthContext';
import toast from 'react-hot-toast';

import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';


const SocialLogin = () => {
    const {socialLogin} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()

    const fromWhere = location.state?.from || '/' ;

    

    const handleSocialLogin =()=>{
        socialLogin()
        .then(result => {
            const user = result.user;

            // Update profile if photoURL is missing
            if (!user.photoURL) {
                updateProfile(user, {
                    photoURL: user.photoURL // Set a fallback or retrieve from provider
                }).then(() => {
                    toast.success('Login Successful!!');
                    navigate(fromWhere, { replace: true });
                });
            } else {
                toast.success('Login Successful!!');
                navigate(fromWhere, { replace: true });
            }
        })
        .catch(err => {
            toast.error(err.message)
        })
    }

    return (
        <div>
            <button onClick={handleSocialLogin} className='btn'>
            <FcGoogle  className='text-2xl'/>
                Google with Login</button>
        </div>
    );
};

export default SocialLogin;