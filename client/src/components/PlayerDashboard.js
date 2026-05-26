import React, { useState, useEffect } from 'react';
import DaySelector from './DaySelector';
import QuestCard from './QuestCard';
import RewardsSection from './RewardsSection';
import LeaderboardSection from './LeaderboardSection';
import TimerModal from './TimerModal';

function PlayerDashboard({ user, onLogout }) {
  const [selectedDay, setSelectedDay] = useState(getDayName(new Date()));
  const [quests, setQuests] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [activeTab, setActiveTab] = useState('quests');
  const [timerModal, setTimerModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchQuests();
  }, [selectedDay]);

  function getDayName(date) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  }

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`/api/user/${user.id}/dashboard`);
      const data = await response.json();
      setDashboard(data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const fetchQuests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/quests/${selectedDay}`);
      const data = await response.json();
      setQuests(data);
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTimer = (quest) => {
    setTimerModal({
      quest: quest,
      timeRemaining: quest.duration * 60 // convert to seconds
    });
  };

  const handleCompleteQuest = async (questId, duration) => {
    try {
      const response = await fetch(`/api/quests/${questId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, duration })
      });

      const result = await response.json();
      setTimerModal(null);
      
      showNotification(`🎉 +${result.pointsEarned} points! ${result.bonusPoints > 0 ? `(+${result.bonusPoints} bonus!)` : ''}`);
      
      fetchDashboard();
      
      // Level up celebration
      if (result.newLevel > dashboard.level) {
        showNotification(`🚀 LEVEL UP! You're now Level ${result.newLevel}!`);
      }
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!dashboard || loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>🏎️ Pit Stop</h1>
          <p style={{ color: '#a8b8d8', fontSize: '14px', marginTop: '4px' }}>
            Welcome, {dashboard.username}! 🎮
          </p>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{dashboard.level}</div>
          <div className="stat-label">Level</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dashboard.totalPoints}</div>
          <div className="stat-label">Total Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dashboard.currentStreak}</div>
          <div className="stat-label">🔥 Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dashboard.carCollection?.length || 0}</div>
          <div className="stat-label">Cars Unlocked</div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'quests' ? 'active' : ''}`}
          onClick={() => setActiveTab('quests')}
        >
          📋 Quests
        </button>
        <button 
          className={`tab-btn ${activeTab === 'rewards' ? 'active' : ''}`}
          onClick={() => setActiveTab('rewards')}
        >
          🎁 Rewards
        </button>
        <button 
          className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          🏆 Leaderboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'garage' ? 'active' : ''}`}
          onClick={() => setActiveTab('garage')}
        >
          🚗 Garage
        </button>
      </div>

      {/* QUESTS TAB */}
      {activeTab === 'quests' && (
        <div>
          <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          
          <div className="quests-list">
            {quests.length > 0 ? (
              quests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onStartTimer={() => handleStartTimer(quest)}
                />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', color: '#a8b8d8' }}>
                No quests for {selectedDay.toUpperCase()} yet! 🏁
              </div>
            )}
          </div>
        </div>
      )}

      {/* REWARDS TAB */}
      {activeTab === 'rewards' && (
        <RewardsSection userId={user.id} onRedeemSuccess={fetchDashboard} />
      )}

      {/* LEADERBOARD TAB */}
      {activeTab === 'leaderboard' && (
        <LeaderboardSection currentUser={user} />
      )}

      {/* GARAGE TAB */}
      {activeTab === 'garage' && (
        <div className="sidebar-card">
          <div className="sidebar-title">🚗 Your Car Collection</div>
          <div className="car-collection">
            {dashboard.carCollection && dashboard.carCollection.length > 0 ? (
              dashboard.carCollection.map((car, idx) => (
                <div key={idx} className="car-item">
                  <span>{car}</span>
                  <span className="car-icon">🏎️</span>
                </div>
              ))
            ) : (
              <p style={{ color: '#a8b8d8', fontSize: '12px' }}>Start earning points to unlock cars!</p>
            )}
          </div>
          <div style={{ marginTop: '16px', fontSize: '12px', color: '#a8b8d8', padding: '12px', background: 'rgba(255, 179, 71, 0.1)', borderRadius: '8px', borderLeft: '3px solid #ffb347' }}>
            <strong>Coming Soon:</strong> More cars available as you earn more points!
          </div>
        </div>
      )}

      {/* TIMER MODAL */}
      {timerModal && (
        <TimerModal
          quest={timerModal.quest}
          onComplete={(duration) => handleCompleteQuest(timerModal.quest.id, duration)}
          onCancel={() => setTimerModal(null)}
        />
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div className="notification">{notification}</div>
      )}
    </div>
  );
}

export default PlayerDashboard;
