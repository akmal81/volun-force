import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.init";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ( {children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // registration

    const registerUser =(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login

    const loginUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // social login

    const socialLogin=()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // logout

    const logOutUser = ()=>{
        setLoading(true);
        return signOut(auth)
    }

    // observer

    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth, currentuser=>{
            setUser(currentuser);
            setLoading(false);
        })
        return ()=> {unsubscribe()}
    },[])

    const authInformation = {
        user,
        loading,
        registerUser,
        loginUser,
        logOutUser,
        socialLogin
    }

    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );

};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}



export default AuthProvider;