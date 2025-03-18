import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component, role = 'user', redirectTo = '/signin', ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // Loading state for authorization check

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    // Determine the endpoint based on the role
    const endpoint = role === 'vendor' ? 'vendor/authenticate' : 'auth/authenticate';

    // Check if the user is authenticated and the role matches
    axios.get(`http://localhost:7002/api/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` }, 
    })
      .then(response => {
        setIsAuthorized(true);
      })
      .catch(error => {
        // Handle different error cases, e.g., token expiration or invalid token
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token'); // Remove invalid token
        }
        setIsAuthorized(false);
      });
  }, [role]); // Rerun effect when role changes

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Show loading state while checking
  }

  return isAuthorized ? <Component {...rest} /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
