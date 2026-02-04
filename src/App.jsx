import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData, team) => {
    setUser(userData);
    setTeamData(team);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
  };

  const handleLogout = () => {
    setUser(null);
    setTeamData(null);
    setTermsAccepted(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50">
        <AppRoutes
          user={user}
          teamData={teamData}
          termsAccepted={termsAccepted}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onAcceptTerms={handleAcceptTerms}
          onLogout={handleLogout}
        />
      </div>
    </Router>
  );
}

export default App;