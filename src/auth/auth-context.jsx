import { createContext } from "react";
import { firebase } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(firebase.auth);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: user ? true : false }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};