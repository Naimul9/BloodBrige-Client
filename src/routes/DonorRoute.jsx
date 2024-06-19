
import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';

// eslint-disable-next-line react/prop-types
const DonorRoute = ({children}) => {


    const [role, isLoading] = useRole()  
    
    if(role==='donor') return children


    return <Navigate to={'/dashboard'} />
};

export default DonorRoute;