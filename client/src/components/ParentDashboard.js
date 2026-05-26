import React, { useState, useEffect } from 'react';

function ParentDashboard({ user, onLogout }) {
  const [childProgress, setChildProgress] = useState(null);
  const [rewardName, setRewardName] = useState('');
  const [rewardCost, setRewardCost] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildProgress();
  }, []);

  const fetchChildProgress = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/parent/${user.id}/child-progress`);
      const data = await response.json();
      setChildProgress(data);
    } catch (error) {
      console.error('Error fetching child progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReward = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/parent/${user.id}/approve-reward`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: 'advay',
          rewardName,
          pointsCost: parseInt(rewardCost),
          description
        })
      });

      if (response.ok) {
        setRewardName('');
        setRewardCost('');
        setDescription('');
        alert('✅ Reward approved!');
      }
    } catch (error) {
      console.error('Error approving reward:', error);
    }
  };

  if (loading || !childProgress) {
    return <div className="loading">Loading parent dashboard...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>👨‍👩‍👧 Parent Dashboard</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <div className="parent-dashboard">
        {/* CHILD PROGRESS */}
        <div className="child-card">
          <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>
            📊 {childProgress.childName}'s Progress
          </h2>

          <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '20px' }}>
            <div className="stat-card">
              <div className="stat-value">{childProgress.level}</div>
              <div className="stat-label">Current Level</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{childProgress.totalPoints}</div>
              <div className="stat-label">Total Points</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{childProgress.weeklyStats?.pointsEarned || 0}</div>
              <div className="stat-label">This Week</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{childProgress.weeklyStats?.questsCompleted || 0}</div>
              <div className="stat-label">Quests Done</div>
            </div>
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#ffb347' }}>🏎️ Car Collection</h3>
          <div style={{ marginBottom: '20px' }}>
            {childProgress.carCollection && childProgress.carCollection.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {childProgress.carCollection.map((car, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 179, 71, 0.2)',
                      border: '1px solid rgba(255, 179, 71, 0.5)',
                      color: '#ffb347',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    🏎️ {car}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: '#a8b8d8', fontSize: '12px' }}>No cars unlocked yet</p>
            )}
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#ffb347' }}>📝 Recent Activity</h3>
          <div className="activity-log">
            {childProgress.recentActivity && childProgress.recentActivity.length > 0 ? (
              childProgress.recentActivity.map((activity, idx) => (
                <div key={idx} className="activity-item">
                  <strong>+{activity.pointsEarned} pts</strong> - {activity.questName}
                  {activity.bonusPoints > 0 && <span> 🎁 +{activity.bonusPoints} bonus!</span>}
                  <div className="activity-time">
                    {new Date(activity.completedAt).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#a8b8d8', fontSize: '12px' }}>No activity yet</p>
            )}
          </div>
        </div>

        {/* PARENT CONTROLS */}
        <div className="child-card">
          <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>⚙️ Parent Controls</h2>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#ffb347' }}>
              ✨ Create Custom Reward
            </h3>
            <form onSubmit={handleApproveReward}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
                  Reward Name
                </label>
                <input
                  type="text"
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                  placeholder="e.g., Trip to F1 Museum"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
                  Points Required
                </label>
                <input
                  type="number"
                  value={rewardCost}
                  onChange={(e) => setRewardCost(e.target.value)}
                  placeholder="e.g., 2000"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #e94560 0%, #ffb347 100%)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ✅ Approve Reward
              </button>
            </form>
          </div>

          <div style={{
            padding: '12px',
            background: 'rgba(76, 175, 80, 0.15)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#a8b8d8'
          }}>
            <strong>💡 Tip:</strong> Use the form above to create custom rewards that Advay can unlock. Popular examples: Extra gaming time, movie night, special dinner, F1 merchandise, etc.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
