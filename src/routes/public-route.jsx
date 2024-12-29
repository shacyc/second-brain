// PublicRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '@/auth/auth-context';

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
