import React from 'react';
import '../components/SupportPage.css';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

function SupportPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="support-container">
      <button onClick={handleGoHome} className="support-home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="support-wrapper">
        <div className="support-header">
          <h1 className="support-title">Поддержка</h1>
          <p className="support-subtitle">
            Мы здесь, чтобы помочь вам!
          </p>
        </div>

        <div className="support-section">
          <h2 className="support-section-title">Часто задаваемые вопросы</h2>
          <div className="support-faq-item">
            <h3 className="support-faq-question">Как сбросить пароль?</h3>
            <p className="support-faq-answer">Вы можете сбросить свой пароль, перейдя по ссылке "Забыли пароль?" на странице входа.</p>
          </div>
          <div className="support-faq-item">
            <h3 className="support-faq-question">Как связаться со службой поддержки?</h3>
            <p className="support-faq-answer">Вы можете отправить нам сообщение через форму ниже или по электронной почте support@example.com.</p>
          </div>
          <div className="support-faq-item">
            <h3 className="support-faq-question">Могу ли я обновить свою подписку?</h3>
            <p className="support-faq-answer">Да, вы можете обновить или изменить свою подписку в разделе "Премиум подписка" вашего личного кабинета.</p>
          </div>

          <h2 className="support-section-title">Связаться с нами</h2>
          <div className="support-form">
            <div className="support-form-group">
              <label htmlFor="name" className="support-form-label">Ваше имя:</label>
              <input type="text" id="name" className="support-form-input" placeholder="Введите ваше имя" />
            </div>
            <div className="support-form-group">
              <label htmlFor="email" className="support-form-label">Ваш email:</label>
              <input type="email" id="email" className="support-form-input" placeholder="Введите ваш email" />
            </div>
            <div className="support-form-group">
              <label htmlFor="message" className="support-form-label">Сообщение:</label>
              <textarea id="message" className="support-form-textarea" placeholder="Опишите вашу проблему или вопрос" rows="5"></textarea>
            </div>
            <div className="support-actions">
              <button type="submit" className="support-primary-button">Отправить сообщение</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;