
import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';

// eslint-disable-next-line react/prop-types
const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()  
    
     if(role==='admin') return children

    return <Navigate to={'/dashboard'} />

};

export default AdminRoute;