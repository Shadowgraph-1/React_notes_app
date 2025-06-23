import React from 'react';
import '../components/APIIntegrationPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function APIIntegrationPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="api-container">
      <button onClick={handleGoHome} className="api-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="api-wrapper">
        <div className="api-header">
          <h1 className="api-title">API Интеграция</h1>
          <p className="api-subtitle">
            Подключите ваши сервисы к нашей платформе
          </p>
        </div>

        <div className="api-section">
          <h2 className="api-section-title">Документация API</h2>
          <p className="api-info-text">
            Наш API позволяет вам автоматизировать процессы, синхронизировать данные и расширять функциональность вашего приложения. Ознакомьтесь с подробной документацией по использованию API.
          </p>
          <div className="api-links">
            <a href="#" className="api-primary-button" target="_blank" rel="noopener noreferrer">
              Перейти к документации
            </a>
            <a href="#" className="api-secondary-button" target="_blank" rel="noopener noreferrer">
              Получить ключ API
            </a>
          </div>

          <h2 className="api-section-title">Примеры использования</h2>
          <div className="api-code-example">
            <h3 className="api-code-title">Получение списка заметок</h3>
            <pre className="api-pre">
              <code className="api-code">
                GET /api/v1/notes
                <br />
                Authorization: Bearer YOUR_API_KEY
              </code>
            </pre>
            <p className="api-code-description">Возвращает массив всех заметок пользователя.</p>
          </div>

          <div className="api-code-example">
            <h3 className="api-code-title">Создание новой заметки</h3>
            <pre className="api-pre">
              <code className="api-code">
                POST /api/v1/notes
                <br />
                Content-Type: application/json
                <br />
                <br />
                {`{
  "title": "Новая заметка через API",
  "content": "Это содержимое заметки, созданной программно."
}`}
              </code>
            </pre>
            <p className="api-code-description">Создает новую заметку в учетной записи пользователя.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default APIIntegrationPage;