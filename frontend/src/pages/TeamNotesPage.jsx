import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
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

  const notesHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
  };

  const notesTitleStyle = {
    color: '#34495e',
    fontSize: '1.8em',
    margin: 0,
  };

  const notesCountStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '50%',
    padding: '5px 10px',
    fontSize: '0.9em',
    fontWeight: 'bold',
  };

  const emptyStateStyle = {
    padding: '40px',
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.2em',
    marginTop: '20px',
  };

  const emptyStateIconStyle = {
    fontSize: '3em',
    marginBottom: '15px',
  };

  const notesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
    justifyContent: 'center',
  };

  const noteCardStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
  };

  const noteCardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const noteCardTitleStyle = {
    color: '#2c3e50',
    fontSize: '1.4em',
    margin: 0,
    flexGrow: 1,
  };

  const noteActionsStyle = {
    display: 'flex',
    gap: '8px',
  };

  const actionButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#3498db',
    padding: '5px',
    borderRadius: '3px',
    transition: 'background-color 0.2s ease',
  };

  const noteContentStyle = {
    color: '#34495e',
    fontSize: '0.95em',
    lineHeight: '1.5',
    marginBottom: '15px',
    flexGrow: 1,
  };

  const noteDateStyle = {
    fontSize: '0.85em',
    color: '#7f8c8d',
    textAlign: 'right',
  };

  const primaryButtonStyle = {
    padding: '12px 25px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '2rem',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Командные заметки</h1>
          <p style={subtitleStyle}>
            Совместная работа над проектами и идеями
          </p>
        </div>

        <div style={sectionStyle}>
          <div style={notesHeaderStyle}>
            <h2 style={notesTitleStyle}>Доступные заметки команды</h2>
            <span style={notesCountStyle}>{teamNotes.length}</span>
          </div>

          {teamNotes.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={emptyStateIconStyle}>👥</div>
              <p>Пока нет командных заметок</p>
            </div>
          ) : (
            <div style={notesGridStyle}>
              {teamNotes.map(note => (
                <div key={note.id} style={noteCardStyle}>
                  <div style={noteCardHeaderStyle}>
                    <h3 style={noteCardTitleStyle}>{note.title}</h3>
                    <div style={noteActionsStyle}>
                        <button style={actionButtonStyle} title="Просмотреть">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                  </div>
                  <p style={noteContentStyle}>{note.content}</p>
                  <div style={noteDateStyle}>
                    Автор: {note.author} | Дата: {note.date}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={modalActionsStyle}>
            <button style={primaryButtonStyle}>Создать новую командную заметку</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamNotesPage;