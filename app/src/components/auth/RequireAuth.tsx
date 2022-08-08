import {useLocation, Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RequireAuth = () => {
    const {authState} = useAuth();
    const location = useLocation();

    return (
        authState.isLoggedIn ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth;