import { useAuth } from "./AuthContext";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Component />;
    } else {
        <Navigate to="/" />;
    }
};

export default PrivateRoute;
