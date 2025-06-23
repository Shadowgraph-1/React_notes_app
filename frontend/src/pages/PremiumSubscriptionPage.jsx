import React from 'react';
import '../components/PremiumSubscriptionPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function PremiumSubscriptionPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="premium-container">
      <button onClick={handleGoHome} className="premium-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="premium-wrapper">
        <div className="premium-header">
          <h1 className="premium-title">Премиум подписка</h1>
          <p className="premium-subtitle">
            Разблокируйте весь потенциал нашего сервиса
          </p>
        </div>

        <div className="premium-section">
          <h2 className="premium-section-title">Наши планы подписки</h2>
          <div className="premium-subscription-grid">
            <div className="premium-subscription-card">
              <h3 className="premium-card-title">Базовый</h3>
              <p className="premium-price">Бесплатно</p>
              <ul className="premium-features-list">
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> 100 заметок</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Базовая поддержка</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Стандартные шаблоны</li>
              </ul>
              <button className="premium-secondary-button" disabled>Текущий план</button>
            </div>

            <div className="premium-subscription-card premium-subscription-card-highlight">
              <h3 className="premium-card-title">Премиум</h3>
              <p className="premium-price">$9.99/месяц</p>
              <ul className="premium-features-list">
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Неограниченные заметки</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Приоритетная поддержка</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Все шаблоны</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> API доступ</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Командные заметки</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Расширенная аналитика</li>
              </ul>
              <button className="premium-primary-button">Выбрать план</button>
            </div>

            <div className="premium-subscription-card">
              <h3 className="premium-card-title">Бизнес</h3>
              <p className="premium-price">$29.99/месяц</p>
              <ul className="premium-features-list">
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Все из Премиум</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Корпоративный доступ</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> Персональный менеджер</li>
                <li className="premium-feature-item"><span className="premium-checkmark">✓</span> SLA гарантии</li>
              </ul>
              <button className="premium-secondary-button">Связаться для бизнеса</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumSubscriptionPage;