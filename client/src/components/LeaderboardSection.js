import React, { useState, useEffect } from 'react';

function LeaderboardSection({ currentUser }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/users/leaderboard/weekly');
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>🏆 Weekly Leaderboard</h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Weekly Points</th>
              <th>Total Points</th>
              <th>Level</th>
              <th>🔥 Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={index} style={{ background: player.username === currentUser.username ? 'rgba(255, 179, 71, 0.15)' : '' }}>
                <td>
                  <span className="rank-badge">{index + 1}</span>
                </td>
                <td>
                  <strong>{player.username}</strong>
                  {player.username === currentUser.username && ' (You)'}
                </td>
                <td>{player.weeklyPoints}</td>
                <td>{player.totalPoints}</td>
                <td style={{ color: '#ffb347', fontWeight: '600' }}>Lvl {Math.floor(player.totalPoints / 1000) + 1}</td>
                <td>{player.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardSection;
