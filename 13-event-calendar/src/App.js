import React, { useState } from 'react';
import './App.css';

const App = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [validationError, setValidationError] = useState('');


  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

 
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

 
  const calendarCells = [];
  for (let i = 0; i < 42; i++) {
    const dayNumber = i - firstDay + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      calendarCells.push({
        day: dayNumber,
        dateStr: formatDate(currentYear, currentMonth, dayNumber),
      });
    } else {
      calendarCells.push(null);
    }
  }


  const isToday = (year, month, day) => {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };


  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };


  const openModal = () => {
    setIsModalOpen(true);
    setValidationError('');
    setNewEventTitle('');
    setNewEventDate('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setValidationError('');
  };

  const handleSaveEvent = () => {
    if (!newEventTitle.trim()) {
      setValidationError('Please enter event title');
      return;
    }
    if (!newEventDate) {
      setValidationError('Please select event date');
      return;
    }
   
    const newEvent = {
      id: Date.now() + Math.random().toString(36).substr(2, 5),
      title: newEventTitle.trim(),
      date: newEventDate,
    };
    setEvents([...events, newEvent]);
    closeModal();
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };


  const getEventsForDate = (dateStr) => {
    return events.filter(event => event.date === dateStr);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="app" data-testid="calendar-container">
      {/* Header with navigation and month/year */}
      <div className="header">
        <button
          data-testid="prev-month-btn"
          onClick={goToPreviousMonth}
          className="nav-btn"
        >
          &lt;
        </button>
        <h2 data-testid="month-year-display">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          data-testid="next-month-btn"
          onClick={goToNextMonth}
          className="nav-btn"
        >
          &gt;
        </button>
      </div>

      {/* Add Event Button */}
      <button data-testid="add-event-btn" onClick={openModal} className="add-event-btn">
        + Add Event
      </button>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}

        {/* Calendar cells */}
        {calendarCells.map((cell, index) => {
          if (!cell) {
            return <div key={index} className="day-cell empty"></div>;
          }
          const { day, dateStr } = cell;
          const dayEvents = getEventsForDate(dateStr);
          const isTodayFlag = isToday(currentYear, currentMonth, day);
        

          return (
            <div
              key={index}
              className={`day-cell ${isTodayFlag ? 'today' : ''}`}
            >
              <span className="day-number">{day}</span>
              <div className="events">
                {dayEvents.map(event => (
                  <div key={event.id} data-testid="event-item" className="event-item">
                    <span>{event.title}</span>
                    <button
                      data-testid="d-elete-event-btn"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="delete-event-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal" data-testid="event-modal">
            <button
              data-testid="close-modal-btn"
              className="close-modal-btn"
              onClick={closeModal}
            >
              ×
            </button>
            <h3>Add Event</h3>

            {validationError && (
              <div data-testid="validation-error" className="validation-error">
                {validationError}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">Event Title:</label>
              <input
                id="title"
                type="text"
                data-testid="event-title-input"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Enter event title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Event Date:</label>
              <input
                id="date"
                type="date"
                data-testid="event-date-input"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                data-testid="save-event-btn"
                onClick={handleSaveEvent}
                className="save-btn"
              >
                Save Event
              </button>
              <button onClick={closeModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
