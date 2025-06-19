import { Navigate } from 'react-router-dom';
import { getToken } from '../api/token';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = getToken();
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
