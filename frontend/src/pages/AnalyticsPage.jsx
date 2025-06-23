import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function AnalyticsPage() {
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

  const analyticsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
    justifyContent: 'center',
  };

  const analyticsCardStyle = {
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '120px',
  };

  const analyticsValueStyle = {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: '5px',
  };

  const analyticsLabelStyle = {
    fontSize: '1em',
    color: '#555',
    textAlign: 'center',
  };

  const chartPlaceholderStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center',
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const simpleChartStyle = {
    width: '100%',
    maxWidth: '600px',
    height: '150px',
    marginTop: '20px',
  };

  const chartTextStyle = {
    fontSize: '0.7em',
    fill: '#6b7280',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Аналитика</h1>
          <p style={subtitleStyle}>
            Обзор вашей активности и использования
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Статистика заметок</h2>
          <div style={analyticsGridStyle}>
            <div style={analyticsCardStyle}>
              <span style={analyticsValueStyle}>150</span>
              <span style={analyticsLabelStyle}>Всего заметок</span>
            </div>
            <div style={analyticsCardStyle}>
              <span style={analyticsValueStyle}>30</span>
              <span style={analyticsLabelStyle}>Заметок за месяц</span>
            </div>
            <div style={analyticsCardStyle}>
              <span style={analyticsValueStyle}>5</span>
              <span style={analyticsLabelStyle}>Среднее кол-во слов на заметку</span>
            </div>
            <div style={analyticsCardStyle}>
              <span style={analyticsValueStyle}>100%</span>
              <span style={analyticsLabelStyle}>Время доступности сервиса</span>
            </div>
          </div>

          <h2 style={sectionTitleStyle}>График активности</h2>
          <div style={chartPlaceholderStyle}>
            <p style={{color: '#7f8c8d'}}>Здесь будет интерактивный график активности пользователей.</p>
            <svg viewBox="0 0 300 100" style={simpleChartStyle}>
                <polyline fill="none" stroke="#667eea" strokeWidth="2" points="0,80 50,20 100,50 150,30 200,60 250,40 300,70" />
                <text x="0" y="95" style={chartTextStyle}>Янв</text>
                <text x="50" y="95" style={chartTextStyle}>Фев</text>
                <text x="100" y="95" style={chartTextStyle}>Мар</text>
                <text x="150" y="95" style={chartTextStyle}>Апр</text>
                <text x="200" y="95" style={chartTextStyle}>Май</text>
                <text x="250" y="95" style={chartTextStyle}>Июн</text>
                <text x="300" y="95" style={chartTextStyle}>Июл</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;