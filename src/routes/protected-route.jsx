import { cloneElement, useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '@/auth/auth-context';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return cloneElement(children, { isAuthenticated, user });
};

export default ProtectedRoute;
