import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import PlayerDashboard from './components/PlayerDashboard';
import ParentDashboard from './components/ParentDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div className="loading">🏎️ Loading Pit Stop...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      {user.role === 'player' ? (
        <PlayerDashboard user={user} onLogout={handleLogout} />
      ) : (
        <ParentDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
