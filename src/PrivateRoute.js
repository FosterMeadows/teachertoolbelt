import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // User is not authenticated; redirect to login
    return <Navigate to="/login" />;
  }

  // User is authenticated; render the requested component
  return children;
};

export default PrivateRoute;
