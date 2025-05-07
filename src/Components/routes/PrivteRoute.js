import React from 'react';
import { Navigate } from 'react-router-dom';
import MainContainer from '../layout/MainContainer';

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated()
    ? <MainContainer>{children}</MainContainer>
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;
