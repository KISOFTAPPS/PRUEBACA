import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { NavBar } from "../views/panel/components/NavBar";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? <><NavBar /><Outlet /></> : <Navigate to="/login" />;
};

export default PrivateRoute;
