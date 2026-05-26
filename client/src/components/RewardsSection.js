import React, { useState, useEffect } from 'react';

function RewardsSection({ userId, onRedeemSuccess }) {
  const [rewards, setRewards] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchRewards();
    fetchDashboard();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await fetch('/api/rewards');
      const data = await response.json();
      setRewards(data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`/api/user/${userId}/dashboard`);
      const data = await response.json();
      setDashboard(data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const handleRedeem = async (rewardId) => {
    try {
      const response = await fetch(`/api/rewards/${rewardId}/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      if (response.ok) {
        fetchRewards();
        fetchDashboard();
        alert('🎉 Reward redeemed!');
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>🎁 Available Rewards</h2>
      
      {dashboard && (
        <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(255, 179, 71, 0.15)', borderRadius: '10px', borderLeft: '4px solid #ffb347' }}>
          <strong>Your Points:</strong> {dashboard.totalPoints} 🏎️
        </div>
      )}

      <div className="rewards-grid">
        {rewards.map(reward => (
          <div key={reward.id} className="reward-card">
            <div className="reward-icon">{reward.icon}</div>
            <div className="reward-name">{reward.name}</div>
            <p style={{ color: '#a8b8d8', fontSize: '12px', marginBottom: '12px' }}>
              {reward.description}
            </p>
            <div className="reward-cost">{reward.pointsCost} pts</div>
            <button
              className="redeem-btn"
              disabled={!dashboard || dashboard.totalPoints < reward.pointsCost}
              onClick={() => handleRedeem(reward.id)}
            >
              {dashboard && dashboard.totalPoints >= reward.pointsCost ? 'Redeem' : 'Not Enough Points'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardsSection;
