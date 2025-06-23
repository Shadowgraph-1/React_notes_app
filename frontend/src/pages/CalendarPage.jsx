import React from 'react';
import '../components/CalendarPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function CalendarPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="calendar-container">
      <button onClick={handleGoHome} className="calendar-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="calendar-wrapper">
        <div className="calendar-header">
          <h1 className="calendar-title">Календарь</h1>
          <p className="calendar-subtitle">
            Ваши события и расписание
          </p>
        </div>

        <div className="calendar-section">
          <div className="calendar-grid">
            <div className="calendar-day">
              <span className="calendar-day-number">20</span>
              <span className="calendar-day-event">Встреча с командой</span>
            </div>
            <div className="calendar-day">
              <span className="calendar-day-number">21</span>
              <span className="calendar-day-event">Дедлайн проекта</span>
            </div>
            <div className="calendar-day-today">
              <span className="calendar-day-number-today">22</span>
              <span className="calendar-day-event-today">Сегодня</span>
            </div>
            <div className="calendar-day">
              <span className="calendar-day-number">23</span>
              <span className="calendar-day-event">Совещание</span>
            </div>
            <div className="calendar-day">
              <span className="calendar-day-number">24</span>
              <span className="calendar-day-event">Подготовка отчета</span>
            </div>
            <div className="calendar-day">
              <span className="calendar-day-number">25</span>
              <span className="calendar-day-event">Запуск новой фичи</span>
            </div>
            <div className="calendar-day">
              <span className="calendar-day-number">26</span>
              <span className="calendar-day-event">Отпуск</span>
            </div>
          </div>
          <p className="calendar-empty-state">
            Здесь будет интерактивный календарь.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;