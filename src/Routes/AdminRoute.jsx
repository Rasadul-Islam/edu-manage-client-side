import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../utility/LoadingSpinner/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (user && isAdmin) {
        return children
    };
    return <Navigate to='/logIn' state={location.pathname}></Navigate>
};

export default AdminRoute;