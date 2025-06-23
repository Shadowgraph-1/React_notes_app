import React from 'react';
import '../components/AnalyticsPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function AnalyticsPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="analytics-container">
      <button onClick={handleGoHome} className="analytics-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="analytics-wrapper">
        <div className="analytics-header">
          <h1 className="analytics-title">Аналитика</h1>
          <p className="analytics-subtitle">
            Обзор вашей активности и использования
          </p>
        </div>

        <div className="analytics-section">
          <h2 className="analytics-section-title">Статистика заметок</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <span className="analytics-value">150</span>
              <span className="analytics-label">Всего заметок</span>
            </div>
            <div className="analytics-card">
              <span className="analytics-value">30</span>
              <span className="analytics-label">Заметок за месяц</span>
            </div>
            <div className="analytics-card">
              <span className="analytics-value">5</span>
              <span className="analytics-label">Среднее кол-во слов на заметку</span>
            </div>
            <div className="analytics-card">
              <span className="analytics-value">100%</span>
              <span className="analytics-label">Время доступности сервиса</span>
            </div>
          </div>

          <h2 className="analytics-section-title">График активности</h2>
          <div className="analytics-chart-placeholder">
            <p>Здесь будет интерактивный график активности пользователей.</p>
            <svg viewBox="0 0 300 100" className="analytics-chart">
              <polyline fill="none" stroke="#667eea" strokeWidth="2" points="0,80 50,20 100,50 150,30 200,60 250,40 300,70" />
              <text x="0" y="95" className="analytics-chart-text">Янв</text>
              <text x="50" y="95" className="analytics-chart-text">Фев</text>
              <text x="100" y="95" className="analytics-chart-text">Мар</text>
              <text x="150" y="95" className="analytics-chart-text">Апр</text>
              <text x="200" y="95" className="analytics-chart-text">Май</text>
              <text x="250" y="95" className="analytics-chart-text">Июн</text>
              <text x="300" y="95" className="analytics-chart-text">Июл</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;