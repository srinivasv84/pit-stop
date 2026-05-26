import React from 'react';

function QuestCard({ quest, onStartTimer }) {
  const getCategoryEmoji = (category) => {
    const emojis = {
      mindfulness: '🧘',
      sketching: '🎨',
      study: '📚',
      sports: '⚽',
      music: '🎹',
      morning: '🌅',
      wind_down: '🌙'
    };
    return emojis[category] || '📋';
  };

  return (
    <div className="quest-card">
      <div className="quest-header">
        <div>
          <div className="quest-name">{getCategoryEmoji(quest.category)} {quest.name}</div>
          <div className="quest-desc">{quest.desc}</div>
          <span className="quest-time">⏰ {quest.time}</span>
        </div>
        <div className="quest-points">{quest.points} pts</div>
      </div>
      
      <div className="quest-actions">
        <button className="start-timer-btn" onClick={onStartTimer}>
          ⏱️ Start ({quest.duration}m)
        </button>
        <button className="complete-btn">
          ✓ Mark Done
        </button>
      </div>
    </div>
  );
}

export default QuestCard;
