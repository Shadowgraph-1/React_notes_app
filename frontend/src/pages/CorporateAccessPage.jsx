import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function CorporateAccessPage() {
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
    maxWidth: '800px',
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

  const featureListStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: '0 0 30px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  };

  const featureItemStyle = {
    backgroundColor: '#ecf0f1',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #27ae60',
    color: '#34495e',
    fontSize: '1em',
  };

  const infoTextStyle = {
    color: '#555',
    fontSize: '1em',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px',
    flexWrap: 'wrap',
  };

  const primaryButtonStyle = {
    padding: '12px 25px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const secondaryButtonStyle = {
    padding: '12px 25px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#bdc3c7',
    color: '#333',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Корпоративный доступ</h1>
          <p style={subtitleStyle}>
            Решения для вашей команды и бизнеса
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Преимущества корпоративного доступа:</h2>
          <ul style={featureListStyle}>
            <li style={featureItemStyle}>Централизованное управление учетными записями</li>
            <li style={featureItemStyle}>Единый вход (SSO) для удобства</li>
            <li style={featureItemStyle}>Приоритетная поддержка 24/7</li>
            <li style={featureItemStyle}>Отчетность и аналитика использования</li>
            <li style={featureItemStyle}>Расширенные возможности безопасности</li>
          </ul>

          <h2 style={sectionTitleStyle}>Как получить корпоративный доступ?</h2>
          <p style={infoTextStyle}>
            Свяжитесь с нашим отделом продаж, чтобы узнать подробнее о корпоративных планах и возможностях. Мы поможем вам выбрать оптимальное решение для вашей компании.
          </p>
          <div style={modalActionsStyle}>
            <button style={primaryButtonStyle}>Запросить демо</button>
            <button style={secondaryButtonStyle}>Связаться с отделом продаж</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorporateAccessPage;