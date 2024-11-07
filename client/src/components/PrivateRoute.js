import { useAuth } from "./AuthContext";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);

    if (isAuthenticated) {
        console.log("ghif");
        return <Component />;
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;
