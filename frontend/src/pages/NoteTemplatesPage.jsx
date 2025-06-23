import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
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

  const noteTitleStyle = {
    color: '#2c3e50',
    fontSize: '1.4em',
    marginBottom: '10px',
  };

  const noteContentStyle = {
    color: '#34495e',
    fontSize: '0.95em',
    lineHeight: '1.5',
    flexGrow: 1,
    marginBottom: '15px',
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '1rem',
  };

  const primaryButtonSmallStyle = {
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '0.9em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const emptyStateStyle = {
    padding: '40px',
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.2em',
    marginTop: '2rem',
  };

  const emptyStateIconStyle = {
    fontSize: '3em',
    marginBottom: '15px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Шаблоны заметок</h1>
          <p style={subtitleStyle}>
            Быстро создавайте заметки с помощью готовых структур
          </p>
        </div>

        <div style={sectionStyle}>
          <div style={notesGridStyle}>
            {templates.map(template => (
              <div key={template.id} style={noteCardStyle}>
                <h3 style={noteTitleStyle}>{template.title}</h3>
                <p style={noteContentStyle}>{template.description}</p>
                <div style={modalActionsStyle}>
                  <button style={primaryButtonSmallStyle}>Использовать шаблон</button>
                </div>
              </div>
            ))}
          </div>
          <div style={emptyStateStyle}>
            <div style={emptyStateIconStyle}>✨</div>
            <p>Новые шаблоны добавляются регулярно!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteTemplatesPage;