import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <span className="loading-lg text-blue-500">Loading</span>
        </div>
    }

    if (user && user.uid) {
        return children;
    }

     return <Navigate to={'/login'} state={location.pathname} replace></Navigate>
};

export default PrivateRoute;