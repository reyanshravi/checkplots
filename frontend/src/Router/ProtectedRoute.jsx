import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component, redirectTo = '/vendor/signin', ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // Loading state for authorization check

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    // Check if the user is authenticated and a vendor
    axios.get('http://localhost:7002/api/vendor/authenticate', {
      headers: { Authorization: `Bearer ${token}` }, // Use `Bearer` before the token for convention
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
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Show loading state while checking
  }

  return isAuthorized ? <Component {...rest} /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
