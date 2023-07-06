import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { RootState } from '../store/store';

function PrivateRoute({ element, ...rest }: any) {
    const { authToken } = useSelector((state: RootState) => state.authState)
    return (
        authToken ? element : <Navigate to="/login" /> // no Route component here
    );
}

export default PrivateRoute
