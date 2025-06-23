import React from 'react';
import '../components/TeamNotesPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function TeamNotesPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const teamNotes = [
    { id: 1, title: "Протокол совещания", content: "Обсуждение нового проекта, распределение задач.", author: "Анна", date: "2025-06-20" },
    { id: 2, title: "Идеи для маркетинга", content: "Новые кампании, идеи для контента в соцсетях.", author: "Иван", date: "2025-06-19" },
    { id: 3, title: "Еженедельный отчет", content: "Обзор прогресса по всем активным проектам.", author: "Елена", date: "2025-06-18" },
  ];

  return (
    <div className="teamnotes-container">
      <button onClick={handleGoHome} className="teamnotes-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="teamnotes-wrapper">
        <div className="teamnotes-header">
          <h1 className="teamnotes-title">Командные заметки</h1>
          <p className="teamnotes-subtitle">
            Совместная работа над проектами и идеями
          </p>
        </div>

        <div className="teamnotes-section">
          <div className="teamnotes-notes-header">
            <h2 className="teamnotes-notes-title">Доступные заметки команды</h2>
            <span className="teamnotes-notes-count">{teamNotes.length}</span>
          </div>

          {teamNotes.length === 0 ? (
            <div className="teamnotes-empty-state">
              <div className="teamnotes-empty-state-icon">👥</div>
              <p>Пока нет командных заметок</p>
            </div>
          ) : (
            <div className="teamnotes-notes-grid">
              {teamNotes.map(note => (
                <div key={note.id} className="teamnotes-note-card">
                  <div className="teamnotes-note-card-header">
                    <h3 className="teamnotes-note-card-title">{note.title}</h3>
                    <div className="teamnotes-note-actions">
                      <button className="teamnotes-action-button" title="Просмотреть">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="teamnotes-note-content">{note.content}</p>
                  <div className="teamnotes-note-date">
                    Автор: {note.author} | Дата: {note.date}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="teamnotes-actions">
            <button className="teamnotes-primary-button">Создать новую командную заметку</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamNotesPage;