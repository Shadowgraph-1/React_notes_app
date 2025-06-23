import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function APIIntegrationPage() {
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

  const infoTextStyle = {
    color: '#555',
    fontSize: '1em',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const apiLinksStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  };

  const primaryButtonStyle = {
    padding: '12px 25px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '1.1em',
    textDecoration: 'none',
    display: 'inline-block',
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
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const codeExampleStyle = {
    backgroundColor: '#2d2d2d',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '25px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  };

  const codeExampleTitleStyle = {
    color: '#61dafb', // React blue
    fontSize: '1.3em',
    marginBottom: '10px',
  };

  const preStyle = {
    backgroundColor: '#1a1a1a',
    color: '#f8f8f2', // Light text for code
    padding: '15px',
    borderRadius: '5px',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    marginBottom: '10px',
    border: '1px solid #444',
  };

  const codeStyle = {
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9em',
  };

  const codeDescriptionStyle = {
    color: '#bbb',
    fontSize: '0.95em',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>API Интеграция</h1>
          <p style={subtitleStyle}>
            Подключите ваши сервисы к нашей платформе
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Документация API</h2>
          <p style={infoTextStyle}>
            Наш API позволяет вам автоматизировать процессы, синхронизировать данные и расширять функциональность вашего приложения. Ознакомьтесь с подробной документацией по использованию API.
          </p>
          <div style={apiLinksStyle}>
            <a href="#" style={primaryButtonStyle} target="_blank" rel="noopener noreferrer">
              Перейти к документации
            </a>
            <a href="#" style={secondaryButtonStyle} target="_blank" rel="noopener noreferrer">
              Получить ключ API
            </a>
          </div>

          <h2 style={sectionTitleStyle}>Примеры использования</h2>
          <div style={codeExampleStyle}>
            <h3 style={codeExampleTitleStyle}>Получение списка заметок</h3>
            <pre style={preStyle}>
              <code style={codeStyle}>
                GET /api/v1/notes
                <br />
                Authorization: Bearer YOUR_API_KEY
              </code>
            </pre>
            <p style={codeDescriptionStyle}>Возвращает массив всех заметок пользователя.</p>
          </div>

          <div style={codeExampleStyle}>
            <h3 style={codeExampleTitleStyle}>Создание новой заметки</h3>
            <pre style={preStyle}>
              <code style={codeStyle}>
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
            <p style={codeDescriptionStyle}>Создает новую заметку в учетной записи пользователя.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default APIIntegrationPage;