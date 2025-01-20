import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    // email/password user create
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // email/password user LonIn
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // User Profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };
    // Google Login
    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // User Log Out
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("Current User", currentUser);
            if (currentUser) {
                // get token
                const userInfo= {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })

            } else {
                // remove token
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        });
        return () => {
            return unsubscribe();
        };
    }, [axiosPublic])





    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        logInUser,
        logOutUser,
        logInWithGoogle,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;