import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
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

  const extensionsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
    justifyContent: 'center',
  };

  const extensionCardStyle = {
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const extensionTitleStyle = {
    color: '#2c3e50',
    fontSize: '1.5em',
    marginBottom: '10px',
  };

  const extensionDescriptionStyle = {
    color: '#34495e',
    fontSize: '0.95em',
    lineHeight: '1.5',
    flexGrow: 1,
    marginBottom: '15px',
  };

  const extensionStatusStyle = {
    fontSize: '0.9em',
    color: '#555',
    marginBottom: '10px',
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Доступно': return '#27ae60'; // Green
      case 'Установлено': return '#2980b9'; // Blue
      case 'Скоро': return '#f39c12'; // Orange
      default: return '#555';
    }
  };

  const statusTextStyle = (status) => ({
    fontWeight: 'bold',
    color: getStatusColor(status),
  });

  const buttonPrimaryStyle = {
    padding: '10px 18px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '0.9em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonSecondaryStyle = {
    padding: '10px 18px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#bdc3c7',
    color: '#333',
    fontSize: '0.9em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonDisabledStyle = {
    padding: '10px 18px',
    borderRadius: '5px',
    border: '1px solid #eee',
    backgroundColor: '#e0e0e0',
    color: '#999',
    fontSize: '0.9em',
    cursor: 'not-allowed',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Расширения</h1>
          <p style={subtitleStyle}>
            Расширьте функциональность вашего аккаунта
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Доступные расширения</h2>
          <div style={extensionsGridStyle}>
            {extensions.map(ext => (
              <div key={ext.id} style={extensionCardStyle}>
                <h3 style={extensionTitleStyle}>{ext.name}</h3>
                <p style={extensionDescriptionStyle}>{ext.description}</p>
                <div style={extensionStatusStyle}>
                  Статус: <span style={statusTextStyle(ext.status)}>{ext.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
                    {ext.status === "Доступно" && <button style={buttonPrimaryStyle}>Установить</button>}
                    {ext.status === "Установлено" && <button style={buttonSecondaryStyle}>Удалить</button>}
                    {ext.status === "Скоро" && <button style={buttonDisabledStyle} disabled>Скоро</button>}
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