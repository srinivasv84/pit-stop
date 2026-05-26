import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const user = await response.json();
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'player') {
      onLogin({
        id: 'advay',
        username: 'Advay',
        role: 'player',
        token: 'token-advay'
      });
    } else {
      onLogin({
        id: 'parent',
        username: 'Parent',
        role: 'parent',
        token: 'token-parent'
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">🏎️ Pit Stop</h1>
        <p className="login-subtitle">Your Daily Quest Adventure</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="divider">Or use demo account</div>

        <div className="demo-buttons">
          <button
            onClick={() => handleDemoLogin('player')}
            className="demo-btn player-demo"
          >
            🎮 Play as Advay
          </button>
          <button
            onClick={() => handleDemoLogin('parent')}
            className="demo-btn parent-demo"
          >
            👨‍👩‍👧 Play as Parent
          </button>
        </div>

        <p className="login-hint">
          Demo: Advay / parent-pit-stop
        </p>
      </div>
    </div>
  );
}

export default Login;
