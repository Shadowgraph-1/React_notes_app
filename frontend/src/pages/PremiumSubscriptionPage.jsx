import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function PremiumSubscriptionPage() {
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
    maxWidth: '1000px',
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
    marginBottom: '30px',
    textAlign: 'center',
  };

  const subscriptionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    justifyContent: 'center',
  };

  const subscriptionCardStyle = {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  };

  const subscriptionCardHighlightStyle = {
    ...subscriptionCardStyle,
    border: '2px solid #3498db',
    boxShadow: '0 8px 25px rgba(52, 152, 219, 0.2)',
    transform: 'scale(1.03)',
  };

  const cardTitleStyle = {
    color: '#2c3e50',
    fontSize: '2em',
    marginBottom: '15px',
  };

  const priceStyle = {
    color: '#27ae60', // Green for price
    fontSize: '2.2em',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const featuresListStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: '0 0 30px 0',
    textAlign: 'left',
    width: '100%',
    flexGrow: 1,
  };

  const featureItemStyle = {
    color: '#555',
    fontSize: '1em',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const checkmarkStyle = {
    marginRight: '10px',
    color: '#27ae60',
    fontWeight: 'bold',
    fontSize: '1.2em',
  };

  const buttonPrimaryStyle = {
    padding: '12px 25px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonSecondaryStyle = {
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
          <h1 style={titleStyle}>Премиум подписка</h1>
          <p style={subtitleStyle}>
            Разблокируйте весь потенциал нашего сервиса
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Наши планы подписки</h2>
          <div style={subscriptionGridStyle}>
            {/* Basic Plan */}
            <div style={subscriptionCardStyle}>
              <h3 style={cardTitleStyle}>Базовый</h3>
              <p style={priceStyle}>Бесплатно</p>
              <ul style={featuresListStyle}>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> 100 заметок</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Базовая поддержка</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Стандартные шаблоны</li>
              </ul>
              <button style={buttonSecondaryStyle} disabled>Текущий план</button>
            </div>

            {/* Premium Plan */}
            <div style={subscriptionCardHighlightStyle}>
              <h3 style={cardTitleStyle}>Премиум</h3>
              <p style={priceStyle}>$9.99/месяц</p>
              <ul style={featuresListStyle}>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Неограниченные заметки</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Приоритетная поддержка</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Все шаблоны</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> API доступ</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Командные заметки</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Расширенная аналитика</li>
              </ul>
              <button style={buttonPrimaryStyle}>Выбрать план</button>
            </div>

            {/* Business Plan */}
            <div style={subscriptionCardStyle}>
              <h3 style={cardTitleStyle}>Бизнес</h3>
              <p style={priceStyle}>$29.99/месяц</p>
              <ul style={featuresListStyle}>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Все из Премиум</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Корпоративный доступ</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> Персональный менеджер</li>
                <li style={featureItemStyle}><span style={checkmarkStyle}>✓</span> SLA гарантии</li>
              </ul>
              <button style={buttonSecondaryStyle}>Связаться для бизнеса</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumSubscriptionPage;