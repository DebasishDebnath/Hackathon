import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TermsPage from '../pages/TermsPage';
import Dashboard from '../pages/Dashboard';

const AppRoutes = ({ user, teamData, termsAccepted, onLogin, onRegister, onAcceptTerms, onLogout }) => {
  return (
    <Routes>
      {/* Login Route */}
      <Route 
        path="/login" 
        element={
          user ? <Navigate to="/terms" replace /> : 
          <LoginPage onLogin={onLogin} />
        } 
      />

      {/* Register Route */}
      <Route 
        path="/register" 
        element={
          user ? <Navigate to="/terms" replace /> : 
          <RegisterPage onRegister={onRegister} />
        } 
      />

      {/* Terms & Conditions Route */}
      <Route 
        path="/terms" 
        element={
          !user ? <Navigate to="/login" replace /> :
          termsAccepted ? <Navigate to="/dashboard" replace /> :
          <TermsPage onAccept={onAcceptTerms} />
        } 
      />

      {/* Dashboard Route */}
      <Route 
        path="/dashboard" 
        element={
          !user || !termsAccepted ? <Navigate to="/login" replace /> :
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