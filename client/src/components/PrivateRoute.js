import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
const PrivateRoute = ({ Component }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    return isAuthenticated ? (
        <Component />
    ) : (
        <Navigate to={location.pathname} replace />
    );
};
export default PrivateRoute;


