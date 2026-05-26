import React from 'react';

function DaySelector({ selectedDay, onSelectDay }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="day-selector">
      {days.map(day => (
        <button
          key={day}
          className={`day-btn ${selectedDay.toLowerCase() === day.toLowerCase() ? 'active' : ''}`}
          onClick={() => onSelectDay(day.toLowerCase())}
        >
          {day.substring(0, 3)}
        </button>
      ))}
    </div>
  );
}

export default DaySelector;
