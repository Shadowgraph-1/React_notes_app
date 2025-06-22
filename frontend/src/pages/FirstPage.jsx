import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "../components/FirstPage.css";
import "../components/SidebarAndSupport.css";
import AuthPage from "../components/AuthPage";
import BlogCarousel from "../components/BlogCarousel";

// Данные для карточек
const CARD_DATA = [
  {
    id: "card1",
    title: "Быстрота",
    content: "Создавайте заметки за секунды с интуитивным интерфейсом, экономя время на повседневных задачах.",
  },
  {
    id: "card2",
    title: "Организация",
    content: "Управляйте задачами легко с помощью категорий, тегов и приоритетов, чтобы всегда оставаться впереди.",
  },
  {
    id: "card3",
    title: "Доступность",
    content: "Доставайте заметки в любой момент благодаря синхронизации через облако и офлайн-доступу.",
  },
  {
    id: "card4",
    title: "Простота",
    content: "Интуитивный интерфейс для всех — начинайте использовать приложение сразу без настроек.",
  },
  {
    id: "card5",
    title: "Надежность",
    content: "Храните данные в безопасности с автоматическим резервным копированием и защитой паролем.",
  },
];

// Данные для контактов
const CONTACT_DATA = [
  {
    id: "contact1",
    title: "Электронная почта",
    description: "Напишите нам для поддержки или вопросов.",
    link: "mailto:support@notesapp.com",
    linkText: "support@notesapp.com",
  },
  {
    id: "contact2",
    title: "Телефон",
    description: "Свяжитесь с нами по телефону в рабочее время.",
    link: "tel:+1234567890",
    linkText: "+1 (234) 567-890",
  },
  {
    id: "contact3",
    title: "Социальные сети",
    description: "Следите за нами в соцсетях для новостей.",
    link: "https://twitter.com/notesapp",
    linkText: "@NotesApp",
  },
];

// Моковые данные для чатов
const CHAT_CONTACTS = [
  { id: "chat1", name: "Alex" },
  { id: "chat2", name: "Maria" },
  { id: "chat3", name: "John" },
];

// Хук для наблюдения за пересечением элементов
const useIntersectionObserver = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".section, .animate-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("has-animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
};

// Компонент боковой панели
const Sidebar = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [userCounts, setUserCounts] = useState({ online: 42, offline: 18 });
  const [showChats, setShowChats] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const chatWindowRef = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCounts({
        online: 30 + Math.floor(Math.random() * 20),
        offline: 10 + Math.floor(Math.random() * 15),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat?.messages]);

  const handleItemClick = (popupId) => {
    setActivePopup(activePopup === popupId ? null : popupId);
    setShowChats(false);
  };

  const handleChatSelect = (contact) => {
    setSelectedChat({
      contact,
      messages: [{ id: 1, text: `Привет, ${contact.name}!`, sender: "support" }],
    });
    setActivePopup(null);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div
          className="sidebar-item"
          onClick={() => handleItemClick("users")}
          aria-label="Пользователи"
          aria-expanded={activePopup === "users"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="var(--text-primary)" />
          </svg>
          <span className="tooltip">Пользователи</span>
          {activePopup === "users" && (
            <div className="popup users-popup">
              <h4>Пользователи</h4>
              <p>Онлайн: {userCounts.online}</p>
              <p>Оффлайн: {userCounts.offline}</p>
            </div>
          )}
        </div>
        <div
          className="sidebar-item"
          onClick={() => {
            setShowChats(!showChats);
            setActivePopup(null);
          }}
          aria-label="Чаты"
          aria-expanded={showChats}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="var(--text-primary)" />
          </svg>
          <span className="tooltip">Чаты</span>
        </div>
        <div
          className="sidebar-item"
          onClick={() => handleItemClick("status")}
          aria-label="Статус сайта"
          aria-expanded={activePopup === "status"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="var(--text-primary)" />
          </svg>
          <span className="tooltip">Статус сайта</span>
          {activePopup === "status" && (
            <div className="popup status-popup">
              <h4>Статус сайта</h4>
              <div className="status-bar green">Работает</div>
              <div className="status-bar yellow">Неполадки</div>
              <div className="status-bar red">Не работает</div>
            </div>
          )}
        </div>
      </div>
      {showChats && (
        <div className="chat-window active" ref={chatWindowRef}>
          <div className="chat-window-header">
            <h4>Чаты</h4>
            <button className="chat-window-close" onClick={() => setShowChats(false)} aria-label="Закрыть">
              ×
            </button>
          </div>
          {selectedChat ? (
            <div className="chat-content">
              <div className="chat-messages">
                {selectedChat.messages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={chatMessagesRef} />
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Сообщение..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      setSelectedChat((prev) => ({
                        ...prev,
                        messages: [
                          ...prev.messages,
                          { id: prev.messages.length + 1, text: e.target.value, sender: "user" },
                        ],
                      }));
                      e.target.value = "";
                      setTimeout(() => {
                        setSelectedChat((prev) => ({
                          ...prev,
                          messages: [
                            ...prev.messages,
                            { id: prev.messages.length + 1, text: "Ответ...", sender: "support" },
                          ],
                        }));
                      }, 1000);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = chatWindowRef.current.querySelector("input");
                    if (input.value.trim()) {
                      setSelectedChat((prev) => ({
                        ...prev,
                        messages: [
                          ...prev.messages,
                          { id: prev.messages.length + 1, text: input.value, sender: "user" },
                        ],
                      }));
                      input.value = "";
                      setTimeout(() => {
                        setSelectedChat((prev) => ({
                          ...prev,
                          messages: [
                            ...prev.messages,
                            { id: prev.messages.length + 1, text: "Ответ...", sender: "support" },
                          ],
                        }));
                      }, 1000);
                    }
                  }}
                >
                  →
                </button>
              </div>
              <button
                className="chat-back-button"
                onClick={() => setSelectedChat(null)}
                aria-label="Вернуться к списку контактов"
              >
                Назад
              </button>
            </div>
          ) : (
            <div className="chat-contacts">
              {CHAT_CONTACTS.map((contact) => (
                <div key={contact.id} className="chat-contact" onClick={() => handleChatSelect(contact)}>
                  {contact.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Компонент чата поддержки
const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ id: 1, text: "Здравствуйте! Чем помочь?", sender: "support" }]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { id: prev.length + 1, text: message, sender: "user" }]);
    setMessage("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: prev.length + 1, text: "Скоро ответим.", sender: "support" }]);
    }, 1000);
  };

  return (
    <div className="support-chat-container">
      <div className="support-button" onClick={() => setIsOpen(!isOpen)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
            fill="var(--button-text-light-bg)"
          />
        </svg>
      </div>
      <div className={`support-chat ${isOpen ? "open" : ""}`}>
        <div className="support-chat-header">
          <h3>Поддержка</h3>
          <button className="support-chat-close" onClick={() => setIsOpen(false)} aria-label="Закрыть">
            ×
          </button>
        </div>
        <div className="support-chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="support-chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Сообщение..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>→</button>
        </div>
      </div>
    </div>
  );
};

// Компонент карточки для секции "О нас"
const Card = React.memo(({ card, index, isMobile, onMouseMove, onMouseLeave }) => (
  <div
    id={`card-${card.id}`}
    className={`card-header ${card.isDealt ? "dealt" : ""}`}
    style={{ animationDelay: `${index * 1.2}s` }}
    onMouseMove={!isMobile ? (e) => onMouseMove(e, card.id) : undefined}
    onMouseLeave={!isMobile ? () => onMouseLeave(card.id) : undefined}
    onClick={() => {
      const cardElement = document.getElementById(`card-${card.id}`);
      if (cardElement) {
        cardElement.classList.add("bounce");
        setTimeout(() => cardElement.classList.remove("bounce"), 300);
      }
    }}
  >
    <h3 className="card-title">{card.title}</h3>
    <p className="card-text">{card.content}</p>
  </div>
));

// Компонент контактной карточки
const ContactCard = React.memo(({ contact }) => (
  <div className="contact-card">
    <h3>{contact.title}</h3>
    <p>{contact.description}</p>
    <a href={contact.link} rel="noopener noreferrer">
      {contact.linkText}
    </a>
  </div>
));

// Главный компонент
const HomeStart = () => {
  const [showClickMe, setShowClickMe] = useState(true);
  const [dealtCards, setDealtCards] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showAuth, setShowAuth] = useState(false);

  useIntersectionObserver();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickMe = useCallback(() => {
    setShowClickMe(false);
    CARD_DATA.forEach((card, index) => {
      setTimeout(() => setDealtCards((prev) => [...prev, card.id]), index * 1200);
    });
  }, []);

  const handleMouseMove = useCallback((e, cardId) => {
    if (isMobile) return;
    const card = document.getElementById(`card-${cardId}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxTilt = 15;
    const tiltX = -(y / rect.height) * maxTilt;
    const tiltY = (x / rect.width) * maxTilt;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }, [isMobile]);

  const handleMouseLeave = useCallback((cardId) => {
    if (isMobile) return;
    const card = document.getElementById(`card-${cardId}`);
    if (card) card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }, [isMobile]);

  return (
    <main>
      <div className="welcome-container" id="home">
        <section className="welcome-section section">
          <div className="welcome-header animate-item">
            <h2>Добро пожаловать в NotesApp</h2>
          </div>
          <div className="section-content animate-item">
            <p>Организуй свои мысли и задачи с помощью быстрого и удобного приложения для заметок.</p>
          </div>
          <div className="cta-button animate-item">
            <button className="start-button" onClick={() => setShowAuth(true)}>Начать</button>
          </div>
        </section>
      </div>

      {showAuth && (
        <div 
          className={`auth-section ${showAuth ? 'active' : ''}`}
          onClick={() => setShowAuth(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AuthPage />
          </div>
        </div>
      )}

      <div className="start-with-app" id="about">
        <section className="start-section section">
          <div className="start-header animate-item">
            <h2>Начни день с хорошей заметки!</h2>
          </div>
          <div className="section-content animate-item">
            <p>Возможность простого, но очень мощного инструмента для ваших целей.</p>
          </div>
          <div className="cards-style">
            {showClickMe ? (
              <div className="card-header click-me animate-item" onClick={handleClickMe}>
                <h3>Нажми на меня</h3>
              </div>
            ) : (
              CARD_DATA.map((card, index) => (
                <Card
                  key={card.id}
                  card={{ ...card, isDealt: dealtCards.includes(card.id) }}
                  index={index}
                  isMobile={isMobile}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                />
              ))
            )}
          </div>
        </section>
      </div>

      <div className="blog-container" id="blog">
        <section className="blog-section section">
          <div className="blog-header animate-item">
            <h2>Наш блог</h2>
          </div>
          <div className="blog-content animate-item">
            <p>Присоединяйся к нашему новостному блогу прямо сейчас</p>
            <BlogCarousel />
          </div>
        </section>
      </div>

      <div className="contacts-container" id="contacts">
        <section className="contacts-section section">
          <div className="contacts-header animate-item">
            <h2>Контакты</h2>
          </div>
          <div className="contacts-content animate-item">
            <p>Свяжитесь с нами любым удобным способом</p>
            <div className="contacts-grid">
              {CONTACT_DATA.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <Sidebar />
      <SupportChat />
    </main>
  );
};

export default HomeStart;