import React from 'react';
import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';

const AdminVolunteerRoute = ({children}) => {
    const [role, isLoading] = useRole() 
    if (isLoading) {
        return <span className="loading  flex items-center justify-center  loading-ring loading-lg"></span>
      }
    
     if(role==='admin' || role ==='volunteer') return children

    return <Navigate to={'/dashboard'} />

};

export default AdminVolunteerRoute;