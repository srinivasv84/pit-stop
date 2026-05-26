import React, { useState, useEffect } from 'react';

function TimerModal({ quest, onComplete, onCancel }) {
  const [timeRemaining, setTimeRemaining] = useState(quest.duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    const elapsedTime = (quest.duration * 60) - timeRemaining;
    onComplete(Math.floor(elapsedTime / 60));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>⏱️ Timer</h2>
        <p style={{ color: '#a8b8d8', marginBottom: '20px' }}>{quest.name}</p>
        
        <div className="timer-display">{formatTime(timeRemaining)}</div>
        
        <p style={{ color: '#a8b8d8', fontSize: '12px', marginBottom: '20px' }}>
          Target: {quest.duration} minutes
        </p>

        <div className="modal-buttons">
          <button
            className="modal-btn primary"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? '⏸️ Pause' : '▶️ Start'}
          </button>
          <button
            className="modal-btn secondary"
            onClick={onCancel}
          >
            ❌ Cancel
          </button>
        </div>

        {!isRunning && timeRemaining < (quest.duration * 60) && (
          <button
            style={{ 
              width: '100%', 
              marginTop: '10px',
              padding: '10px',
              background: 'rgba(76, 175, 80, 0.2)',
              border: '1px solid #4caf50',
              color: '#4caf50',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
            onClick={handleComplete}
          >
            ✓ Complete Now
          </button>
        )}
      </div>
    </div>
  );
}

export default TimerModal;
