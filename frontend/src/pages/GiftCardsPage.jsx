import React from 'react';
import '../components/GiftCardsPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function GiftCardsPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="giftcards-container">
      <button onClick={handleGoHome} className="giftcards-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="giftcards-wrapper">
        <div className="giftcards-header">
          <h1 className="giftcards-title">Подарочные карты</h1>
          <p className="giftcards-subtitle">
            Подарите доступ к премиум-функциям
          </p>
        </div>

        <div className="giftcards-section">
          <h2 className="giftcards-section-title">Купить подарочную карту</h2>
          <p className="giftcards-info-text">
            Сделайте отличный подарок друзьям или коллегам! Подарочные карты доступны на различные суммы и сроки действия.
          </p>
          <div className="giftcards-options">
            <div className="giftcards-option">
              <h4 className="giftcards-option-title">$10 - 1 месяц Премиум</h4>
              <button className="giftcards-primary-button">Купить</button>
            </div>
            <div className="giftcards-option">
              <h4 className="giftcards-option-title">$25 - 3 месяца Премиум</h4>
              <button className="giftcards-primary-button">Купить</button>
            </div>
            <div className="giftcards-option">
              <h4 className="giftcards-option-title">$99 - 1 год Премиум</h4>
              <button className="giftcards-primary-button">Купить</button>
            </div>
          </div>

          <h2 className="giftcards-section-title">Активировать подарочную карту</h2>
          <p className="giftcards-info-text">
            У вас есть подарочная карта? Введите код ниже, чтобы активировать ее и получить доступ к премиум-функциям.
          </p>
          <div className="giftcards-form-group">
            <label htmlFor="gift-code" className="giftcards-form-label">Код подарочной карты:</label>
            <input type="text" id="gift-code" className="giftcards-form-input" placeholder="Введите код активации" />
          </div>
          <div className="giftcards-actions">
            <button className="giftcards-primary-button">Активировать</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCardsPage;