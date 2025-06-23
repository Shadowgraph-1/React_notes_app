import React from 'react';
import '../components/NoteTemplatesPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function NoteTemplatesPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const templates = [
    { id: 1, title: "План на день", description: "Структура для ежедневного планирования." },
    { id: 2, title: "Протокол встречи", description: "Шаблон для записи ключевых моментов совещаний." },
    { id: 3, title: "Список дел", description: "Простой шаблон для отслеживания задач." },
    { id: 4, title: "Конспект лекции", description: "Организуйте свои учебные заметки." },
    { id: 5, title: "Идеи для блога", description: "Фиксируйте и развивайте свои творческие идеи." },
  ];

  return (
    <div className="notetemplates-container">
      <button onClick={handleGoHome} className="notetemplates-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="notetemplates-wrapper">
        <div className="notetemplates-header">
          <h1 className="notetemplates-title">Шаблоны заметок</h1>
          <p className="notetemplates-subtitle">
            Быстро создавайте заметки с помощью готовых структур
          </p>
        </div>

        <div className="notetemplates-section">
          <div className="notetemplates-notes-grid">
            {templates.map(template => (
              <div key={template.id} className="notetemplates-note-card">
                <h3 className="notetemplates-note-title">{template.title}</h3>
                <p className="notetemplates-note-content">{template.description}</p>
                <div className="notetemplates-actions">
                  <button className="notetemplates-primary-button">Использовать шаблон</button>
                </div>
              </div>
            ))}
          </div>
          <div className="notetemplates-empty-state">
            <div className="notetemplates-empty-state-icon">✨</div>
            <p>Новые шаблоны добавляются регулярно!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteTemplatesPage;