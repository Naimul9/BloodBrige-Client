
import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';

// eslint-disable-next-line react/prop-types
const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole() 
    if (isLoading) {
        return <span className="loading  flex items-center justify-center  loading-ring loading-lg"></span>
      }
    
     if(role==='admin') return children

     return <Navigate to="/login"></Navigate>

};

export default AdminRoute;