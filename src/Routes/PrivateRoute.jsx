import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../utility/LoadingSpinner/LoadingSpinner';
import useAuth from '../hooks/useAuth';



const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) return <LoadingSpinner></LoadingSpinner>
    if (user) return children;
    return <Navigate to='/logIn' state={location.pathname}></Navigate>
};

export default PrivateRoute;