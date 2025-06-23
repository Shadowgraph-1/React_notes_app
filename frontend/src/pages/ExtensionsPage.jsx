import React from 'react';
import '../components/ExtensionsPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function ExtensionsPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const extensions = [
    { id: 1, name: "Google Drive Sync", description: "Автоматическая синхронизация заметок с Google Drive.", status: "Доступно" },
    { id: 2, name: "Evernote Import", description: "Импортируйте свои заметки из Evernote.", status: "Доступно" },
    { id: 3, name: "Slack Notifications", description: "Получайте уведомления о важных заметках в Slack.", status: "Скоро" },
    { id: 4, name: "Markdown Support", description: "Расширенная поддержка форматирования Markdown.", status: "Установлено" },
  ];

  return (
    <div className="extensions-container">
      <button onClick={handleGoHome} className="extensions-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="extensions-wrapper">
        <div className="extensions-header">
          <h1 className="extensions-title">Расширения</h1>
          <p className="extensions-subtitle">
            Расширьте функциональность вашего аккаунта
          </p>
        </div>

        <div className="extensions-section">
          <h2 className="extensions-section-title">Доступные расширения</h2>
          <div className="extensions-grid">
            {extensions.map(ext => (
              <div key={ext.id} className="extensions-card">
                <h3 className="extensions-card-title">{ext.name}</h3>
                <p className="extensions-description">{ext.description}</p>
                <div className="extensions-status">
                  Статус: <span className="extensions-status-text" data-status={ext.status}>{ext.status}</span>
                </div>
                <div className="extensions-button-container">
                  {ext.status === "Доступно" && <button className="extensions-primary-button">Установить</button>}
                  {ext.status === "Установлено" && <button className="extensions-secondary-button">Удалить</button>}
                  {ext.status === "Скоро" && <button className="extensions-disabled-button" disabled>Скоро</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExtensionsPage;