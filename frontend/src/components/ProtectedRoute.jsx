import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    ("token of user", token)
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute