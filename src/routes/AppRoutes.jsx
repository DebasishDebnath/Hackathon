import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';

const AppRoutes = ({ user, teamData, onLogin, onRegister, onLogout }) => {
  return (
    <Routes>
      {/* Login Route */}
      <Route 
        path="/login" 
        element={
          user ? <Navigate to="/dashboard" replace /> : 
          <LoginPage onLogin={onLogin} />
        } 
      />

      {/* Register Route */}
      <Route 
        path="/register" 
        element={
          user ? <Navigate to="/dashboard" replace /> : 
          <RegisterPage onRegister={onRegister} />
        } 
      />

      {/* Dashboard Route */}
      <Route 
        path="/dashboard" 
        element={
          !user ? <Navigate to="/login" replace /> :
          <Dashboard user={user} teamData={teamData} onLogout={onLogout} />
        } 
      />

      {/* Default Route - Redirect to Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch All Route - Redirect to Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;