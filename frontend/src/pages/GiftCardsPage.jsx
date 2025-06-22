import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function GiftCardsPage() {
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

  const infoTextStyle = {
    color: '#555',
    fontSize: '1em',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const giftCardOptionsStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '25px',
    marginBottom: '40px',
  };

  // Unique styles for gift cards
  const giftCardOptionStyle = {
    backgroundColor: '#e6f2ff', // Light blue background
    backgroundImage: 'linear-gradient(45deg, #e6f2ff 0%, #d0e7ff 100%)',
    border: '2px solid #85c1e9', // Blue border
    borderRadius: '15px',
    padding: '25px',
    width: '250px',
    textAlign: 'center',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  };

  const giftCardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  };

  const giftCardTitleStyle = {
    color: '#2c3e50',
    fontSize: '1.6em',
    marginBottom: '15px',
    fontWeight: 'bold',
  };

  const buttonPrimaryStyle = {
    padding: '12px 25px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const formLabelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#34495e',
    fontWeight: 'bold',
  };

  const formInputStyle = {
    width: 'calc(100% - 22px)', // Adjust for padding and border
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1.1em',
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Подарочные карты</h1>
          <p style={subtitleStyle}>
            Подарите доступ к премиум-функциям
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Купить подарочную карту</h2>
          <p style={infoTextStyle}>
            Сделайте отличный подарок друзьям или коллегам! Подарочные карты доступны на различные суммы и сроки действия.
          </p>
          <div style={giftCardOptionsStyle}>
            {/* Gift Card 1 */}
            <div
              style={giftCardOptionStyle}
              onMouseOver={e => e.currentTarget.style.transform = giftCardHoverStyle.transform}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <h4 style={giftCardTitleStyle}>$10 - 1 месяц Премиум</h4>
              <button style={buttonPrimaryStyle}>Купить</button>
            </div>
            {/* Gift Card 2 */}
            <div
              style={giftCardOptionStyle}
              onMouseOver={e => e.currentTarget.style.transform = giftCardHoverStyle.transform}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <h4 style={giftCardTitleStyle}>$25 - 3 месяца Премиум</h4>
              <button style={buttonPrimaryStyle}>Купить</button>
            </div>
            {/* Gift Card 3 */}
            <div
              style={giftCardOptionStyle}
              onMouseOver={e => e.currentTarget.style.transform = giftCardHoverStyle.transform}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <h4 style={giftCardTitleStyle}>$99 - 1 год Премиум</h4>
              <button style={buttonPrimaryStyle}>Купить</button>
            </div>
          </div>

          <h2 style={sectionTitleStyle}>Активировать подарочную карту</h2>
          <p style={infoTextStyle}>
            У вас есть подарочная карта? Введите код ниже, чтобы активировать ее и получить доступ к премиум-функциям.
          </p>
          <div style={formGroupStyle}>
            <label htmlFor="gift-code" style={formLabelStyle}>Код подарочной карты:</label>
            <input type="text" id="gift-code" style={formInputStyle} placeholder="Введите код активации" />
          </div>
          <div style={modalActionsStyle}>
            <button style={buttonPrimaryStyle}>Активировать</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCardsPage;