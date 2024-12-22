import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.init";


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
        logOutUser
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