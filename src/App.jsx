import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [teamData, setTeamData] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData, team) => {
    setUser(userData);
    setTeamData(team);
  };

  const handleLogout = () => {
    setUser(null);
    setTeamData(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50">
        <AppRoutes
          user={user}
          teamData={teamData}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
        />
      </div>
    </Router>
  );
}

export default App;