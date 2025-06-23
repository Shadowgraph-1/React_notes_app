import React from 'react';
import '../components/CorporateAccessPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function CorporateAccessPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="corporate-container">
      <button onClick={handleGoHome} className="corporate-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="corporate-wrapper">
        <div className="corporate-header">
          <h1 className="corporate-title">Корпоративный доступ</h1>
          <p className="corporate-subtitle">
            Решения для вашей команды и бизнеса
          </p>
        </div>

        <div className="corporate-section">
          <h2 className="corporate-section-title">Преимущества корпоративного доступа:</h2>
          <ul className="corporate-feature-list">
            <li className="corporate-feature-item">Централизованное управление учетными записями</li>
            <li className="corporate-feature-item">Единый вход (SSO) для удобства</li>
            <li className="corporate-feature-item">Приоритетная поддержка 24/7</li>
            <li className="corporate-feature-item">Отчетность и аналитика использования</li>
            <li className="corporate-feature-item">Расширенные возможности безопасности</li>
          </ul>

          <h2 className="corporate-section-title">Как получить корпоративный доступ?</h2>
          <p className="corporate-info-text">
            Свяжитесь с нашим отделом продаж, чтобы узнать подробнее о корпоративных планах и возможностях. Мы поможем вам выбрать оптимальное решение для вашей компании.
          </p>
          <div className="corporate-actions">
            <button className="corporate-primary-button">Запросить демо</button>
            <button className="corporate-secondary-button">Связаться с отделом продаж</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorporateAccessPage;