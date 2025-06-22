import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function CalendarPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const containerStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  const homeButtonStyle = {
    alignSelf: 'flex-start',
    marginBottom: '20px',
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    color: '#333',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const wrapperStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '30px',
    maxWidth: '900px',
    width: '100%',
    textAlign: 'center',
  };

  const headerStyle = {
    marginBottom: '30px',
    borderBottom: '1px solid #eee',
    paddingBottom: '20px',
  };

  const titleStyle = {
    color: '#2c3e50',
    fontSize: '2.5em',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    color: '#7f8c8d',
    fontSize: '1.1em',
  };

  const sectionStyle = {
    marginBottom: '30px',
    textAlign: 'left',
  };

  const sectionTitleStyle = {
    color: '#34495e',
    fontSize: '1.8em',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const calendarGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
    justifyContent: 'center',
  };

  const calendarDayStyle = {
    backgroundColor: '#ecf0f1',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100px',
    justifyContent: 'space-between',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  };

  const calendarDayTodayStyle = {
    ...calendarDayStyle,
    backgroundColor: '#3498db',
    color: 'white',
    border: '1px solid #2980b9',
    boxShadow: '0 2px 8px rgba(52, 152, 219, 0.3)',
  };

  const dayNumberStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#2c3e50',
  };

  const dayNumberTodayStyle = {
    ...dayNumberStyle,
    color: 'white',
  };

  const dayEventStyle = {
    fontSize: '0.85em',
    color: '#555',
    textAlign: 'center',
    marginTop: '5px',
  };

  const dayEventTodayStyle = {
    ...dayEventStyle,
    color: 'white',
  };

  const emptyStateParagraphStyle = {
    color: '#7f8c8d',
    fontSize: '1.2em',
    padding: '20px',
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Календарь</h1>
          <p style={subtitleStyle}>
            Ваши события и расписание
          </p>
        </div>

        <div style={sectionStyle}>
          <div style={calendarGridStyle}>
            {/* Пример ячеек календаря */}
            <div style={calendarDayStyle}>
              <span style={dayNumberStyle}>20</span>
              <span style={dayEventStyle}>Встреча с командой</span>
            </div>
            <div style={calendarDayStyle}>
              <span style={dayNumberStyle}>21</span>
              <span style={dayEventStyle}>Дедлайн проекта</span>
            </div>
            <div style={calendarDayTodayStyle}>
              <span style={dayNumberTodayStyle}>22</span>
              <span style={dayEventTodayStyle}>Сегодня</span>
            </div>
            <div style={calendarDayStyle}>
              <span style={dayNumberStyle}>23</span>
              <span style={dayEventStyle}>Совещание</span>
            </div>
            <div style={calendarDayStyle}>
              <span style={dayNumberStyle}>24</span>
              <span style={dayEventStyle}>Подготовка отчета</span>
            </div>
            <div style={calendarDayStyle}>
              <span style={dayNumberStyle}>25</span>
              <span style={dayEventStyle}>Запуск новой фичи</span>
            </div>
             <div style={calendarDayStyle}>
              <span style={dayNumberStyle}>26</span>
              <span style={dayEventStyle}>Отпуск</span>
            </div>
          </div>
          <p style={emptyStateParagraphStyle}>
            Здесь будет интерактивный календарь.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;