import React from 'react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function SupportPage() {
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
    maxWidth: '800px',
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

  const faqItemStyle = {
    backgroundColor: '#ecf0f1',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    borderLeft: '4px solid #3498db',
  };

  const faqQuestionStyle = {
    color: '#2c3e50',
    fontSize: '1.2em',
    marginBottom: '5px',
  };

  const faqAnswerStyle = {
    color: '#34495e',
    fontSize: '1em',
    lineHeight: '1.5',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const formGroupStyle = {
    marginBottom: '10px',
  };

  const formLabelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#34495e',
    fontWeight: 'bold',
  };

  const formInputStyle = {
    width: 'calc(100% - 20px)',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1em',
  };

  const formTextareaStyle = {
    width: 'calc(100% - 20px)',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1em',
    minHeight: '100px',
    resize: 'vertical',
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '20px',
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

  return (
    <div style={containerStyle}>
      <button onClick={handleGoHome} style={homeButtonStyle}>
        <HomeIcon />
        На главную
      </button>

      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Поддержка</h1>
          <p style={subtitleStyle}>
            Мы здесь, чтобы помочь вам!
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Часто задаваемые вопросы</h2>
          <div style={faqItemStyle}>
            <h3 style={faqQuestionStyle}>Как сбросить пароль?</h3>
            <p style={faqAnswerStyle}>Вы можете сбросить свой пароль, перейдя по ссылке "Забыли пароль?" на странице входа.</p>
          </div>
          <div style={faqItemStyle}>
            <h3 style={faqQuestionStyle}>Как связаться со службой поддержки?</h3>
            <p style={faqAnswerStyle}>Вы можете отправить нам сообщение через форму ниже или по электронной почте support@example.com.</p>
          </div>
          <div style={faqItemStyle}>
            <h3 style={faqQuestionStyle}>Могу ли я обновить свою подписку?</h3>
            <p style={faqAnswerStyle}>Да, вы можете обновить или изменить свою подписку в разделе "Премиум подписка" вашего личного кабинета.</p>
          </div>

          <h2 style={sectionTitleStyle}>Связаться с нами</h2>
          <form style={formStyle}>
            <div style={formGroupStyle}>
              <label htmlFor="name" style={formLabelStyle}>Ваше имя:</label>
              <input type="text" id="name" style={formInputStyle} placeholder="Введите ваше имя" />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="email" style={formLabelStyle}>Ваш email:</label>
              <input type="email" id="email" style={formInputStyle} placeholder="Введите ваш email" />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="message" style={formLabelStyle}>Сообщение:</label>
              <textarea id="message" style={formTextareaStyle} placeholder="Опишите вашу проблему или вопрос" rows="5"></textarea>
            </div>
            <div style={modalActionsStyle}>
                <button type="submit" style={primaryButtonStyle}>Отправить сообщение</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;