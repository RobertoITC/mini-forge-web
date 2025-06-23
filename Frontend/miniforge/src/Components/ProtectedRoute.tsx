import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import type {JSX} from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();
    if (loading) return null;          // or spinner
    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;