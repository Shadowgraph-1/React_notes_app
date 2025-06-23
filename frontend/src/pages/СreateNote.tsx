import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// Icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="4" x2="10" y2="4"/>
    <line x1="14" y1="20" x2="5" y2="20"/>
    <path d="M15 4L9 20"/>
  </svg>
);

const UnderlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
    <line x1="4" y1="20" x2="20" y2="20"/>
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3
  
  // Note states
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);
  const [tags, setTags] = useState(["Работа", "Личное"]);
  const [newTag, setNewTag] = useState("");
  
  // Chat states
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatMessagesEndRef = useRef(null);
  
  // Dashboard states
  const [dashboardData, setDashboardData] = useState({
    activityData: [10, 15, 8, 20, 12, 25, 18],
    newNotesToday: 15,
    trendingTags: [
      { name: "Проекты", trend: 5 },
      { name: "Идеи", trend: -2 },
      { name: "Списки", trend: 3 },
      { name: "Обучение", trend: 1 },
      { name: "Исследования", trend: -1 },
    ],
    avgNoteTime: 2.5,
    activeUsers: 124,
    mostPopularNote: "Изучение React Hooks",
    syncStatus: "Работает",
    serverLoad: 35,
    unreadNotifications: 3,
  });

  const avatars = useMemo(() => ({
    "Вы": "#8b5cf6",
    "Анна": "#ec4899",
    "Петр": "#3b82f6",
    "Маша": "#facc15",
    "Бот": "#10b981",
  }), []);

  // Handlers
  const handleAddTag = useCallback(() => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag("");
    }
  }, [newTag, tags]);

  const handleRemoveTag = useCallback((tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);

  const handleSaveNote = useCallback(() => {
    if (noteTitle.trim() || noteContent.trim()) {
      const noteData = {
        title: noteTitle,
        content: noteContent,
        color: selectedColor,
        tags: tags,
        timestamp: new Date().toLocaleString(),
      };
      
      console.log("Note saved:", noteData);
      
      // Update dashboard data
      setDashboardData(prev => ({
        ...prev,
        activityData: [
          ...prev.activityData.slice(1), 
          prev.activityData[prev.activityData.length - 1] + Math.floor(Math.random() * 5) - 2
        ].map(val => Math.max(0, val)),
        newNotesToday: prev.newNotesToday + 1
      }));
      
      // Show success message
      alert("Заметка сохранена (см. консоль)");
    } else {
      alert("Заметка пуста!");
    }
  }, [noteTitle, noteContent, selectedColor, tags]);

  const handleClearNote = useCallback(() => {
    setNoteTitle("");
    setNoteContent("");
    setTags([]);
    setSelectedColor(NOTE_COLORS[0]);
  }, []);

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSendMessage = useCallback(() => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now(),
        user: "Вы",
        message: chatInput.trim(),
        avatarColor: avatars["Вы"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { thumbsup: 0, heart: 0, laugh: 0 }
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatInput("");
    }
  }, [chatInput, avatars]);

  const handleReactionClick = useCallback((messageId, reactionType) => {
    setChatMessages(prevMessages => {
      return prevMessages.map(msg => {
        if (msg.id === messageId) {
          const newReactions = { ...msg.reactions };
          if (msg.userReaction && msg.userReaction === reactionType) {
            newReactions[reactionType] = Math.max(0, (newReactions[reactionType] || 0) - 1);
            return { ...msg, reactions: newReactions, userReaction: null };
          } else {
            if (msg.userReaction && newReactions[msg.userReaction]) {
              newReactions[msg.userReaction] = Math.max(0, newReactions[msg.userReaction] - 1);
            }
            newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
            return { ...msg, reactions: newReactions, userReaction: reactionType };
          }
        }
        return msg;
      });
    });
  }, []);

  const handleEmojiClick = useCallback(() => {
    alert("Панель эмодзи (симуляция) - здесь будет выбор смайликов!");
  }, []);

  const scrollToBottom = useCallback(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, scrollToBottom]);

  useEffect(() => {
    const botNames = ["Анна", "Петр", "Маша"];
    const botMessages = [
      "Привет всем! Как дела?",
      "Отличный день для заметок!",
      "Кто-нибудь работал сегодня над своими проектами?",
      "У меня столько идей, нужно их записать!",
      "Не забудьте про дедлайн завтра!",
      "Этот дашборд выглядит круто!",
      ":happy: Рад всех видеть!",
      ":thumbsup: Согласен!",
      ":fire: Это огонь!",
      "Мне нравится новая функция реакций!",
      "Просто проверяю, как работает чат.",
    ];

    const addBotMessage = () => {
      const randomUser = botNames[Math.floor(Math.random() * botNames.length)];
      const randomMessage = botMessages[Math.floor(Math.random() * botMessages.length)];
      const newMessage = {
        id: Date.now() + Math.random(),
        user: randomUser,
        message: randomMessage,
        avatarColor: avatars[randomUser],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { thumbsup: 0, heart: 0, laugh: 0 }
      };
      setChatMessages(prev => [...prev, newMessage]);
    };

    const messageInterval = setInterval(addBotMessage, 7000);
    return () => clearInterval(messageInterval);
  }, [avatars]);

  useEffect(() => {
    const simulateReactions = () => {
      setChatMessages(prevMessages => {
        return prevMessages.map(msg => {
          if (Math.random() < 0.3) {
            const newReactions = { ...msg.reactions };
            const reactionTypes = ["thumbsup", "heart", "laugh"];
            const randomReactionType = reactionTypes[Math.floor(Math.random() * reactionTypes.length)];
            newReactions[randomReactionType] = (newReactions[randomReactionType] || 0) + 1;
            return { ...msg, reactions: newReactions };
          }
          return msg;
        });
      });
    };

    const reactionInterval = setInterval(simulateReactions, 3000);
    return () => clearInterval(reactionInterval);
  }, []);

  useEffect(() => {
    const updateDashboard = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        activityData: [
          ...prev.activityData.slice(1),
          prev.activityData[prev.activityData.length - 1] + Math.floor(Math.random() * 3) - 1
        ].map(val => Math.max(5, val)),
        newNotesToday: prev.newNotesToday + Math.floor(Math.random() * 2),
        avgNoteTime: Math.max(1, parseFloat((prev.avgNoteTime + (Math.random() * 0.5 - 0.25)).toFixed(1))),
        trendingTags: prev.trendingTags.map(tag => ({
          ...tag,
          trend: tag.trend + (Math.random() > 0.5 ? 1 : -1)
        })),
        activeUsers: Math.max(50, prev.activeUsers + Math.floor(Math.random() * 5) - 2),
        mostPopularNote: Math.random() > 0.5 ? "Изучение React Hooks" : "План на неделю",
        syncStatus: Math.random() > 0.1 ? "Работает" : "Ошибка на сайте",
        serverLoad: Math.min(100, Math.max(10, prev.serverLoad + Math.floor(Math.random() * 5) - 2)),
        unreadNotifications: Math.max(0, prev.unreadNotifications + Math.floor(Math.random() * 2) - 1),
      }));
    }, 5000);

    return () => clearInterval(updateDashboard);
  }, []);

  return (
    <div className="create-note-container">
      <div className="aurora-background">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="aurora-dot" />
        ))}
      </div>

      <div className="fixed-header-buttons">
        <button className="header-btn" onClick={handleGoHome} aria-label="На главную">
          <Icons.HomeIcon /> На главную
        </button>
        <ThemeToggle />
      </div>

      <div className="main-layout-grid">
        {/* Dashboard Panel */}
        <aside className="column-panel dashboard-panel">
          <DashboardPanel dashboardData={dashboardData} />
        </aside>

        {/* Note Editor Panel */}
        <main className="column-panel note-editor-panel">
          <NoteEditor
            noteTitle={noteTitle}
            setNoteTitle={setNoteTitle}
            noteContent={noteContent}
            setNoteContent={setNoteContent}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            tags={tags}
            newTag={newTag}
            setNewTag={setNewTag}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onSaveNote={handleSaveNote}
            onClearNote={handleClearNote}
          />
        </main>

        {/* Chat Panel */}
        <aside className="column-panel chat-panel">
          <ChatPanel
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSendMessage={handleSendMessage}
            onReactionClick={handleReactionClick}
            onEmojiClick={handleEmojiClick}
            chatMessagesEndRef={chatMessagesEndRef}
          />
        </aside>
      </div>
    </div>
  );
};

// Dashboard Panel Component
const DashboardPanel = ({ dashboardData }) => {
  const {
    activityData,
    newNotesToday,
    trendingTags,
    avgNoteTime,
    activeUsers,
    mostPopularNote,
    syncStatus,
    serverLoad,
    unreadNotifications
  } = dashboardData;

  return (
    <>
      <h3 className="section-header">
        <Icons.StatsIcon />
        Дашборд активности
      </h3>
      <div className="dashboard-content">
        {/* Notes Statistics */}
        <div className="dashboard-group">
          <h4 className="section-header">
            <Icons.NotesIcon />
            Статистика заметок
          </h4>
          <div className="dashboard-grid">
            <div className="dashboard-widget small-widget">
              <div className="widget-header">
                <Icons.NotesIcon />
                Новых заметок
              </div>
              <div className="widget-value">{newNotesToday}</div>
              <div className="widget-chart-container">
                <svg width="100%" height="100%" viewBox="0 0 30 30">
                  <circle cx="15" cy="15" r="12" fill="var(--toolbar-btn-bg)" stroke="var(--border-light)" strokeWidth="3"/>
                  <path d={generatePieChartPath(newNotesToday % 10, 10, 15)} fill="url(#sparklineGradient)"/>
                </svg>
              </div>
            </div>
            <div className="dashboard-widget small-widget">
              <div className="widget-header">
                <Icons.TrendUpIcon />
                Эффективность
              </div>
              <div className="widget-value">
                {avgNoteTime < 2 ? 'Отлично!' : (avgNoteTime < 3.5 ? 'Хорошо' : 'Средне')}
              </div>
              <div className="widget-text-info">
                Среднее время: {avgNoteTime} мин
              </div>
            </div>
            <div className="dashboard-widget small-widget">
              <div className="widget-header">
                <Icons.NotesIcon />
                Популярная
              </div>
              <div className="widget-value widget-popular-note">
                {mostPopularNote}
              </div>
              <div className="widget-text-info">Больше упоминаний</div>
            </div>
          </div>
        </div>

        {/* User Activity */}
        <div className="dashboard-group">
          <h4 className="section-header">
            <Icons.ActivityIcon />
            Активность
          </h4>
          <div className="dashboard-grid">
            <div className="dashboard-widget">
              <div className="widget-header">
                <Icons.UserIcon />
                Активность сегодня
              </div>
              <div className="widget-value">{activityData[activityData.length - 1]}</div>
              <div className="widget-sparkline-container">
                <svg width="100%" height="100%" viewBox="0 0 100 30">
                  <defs>
                    <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent-purple)" />
                      <stop offset="100%" stopColor="var(--text-primary)" />
                    </linearGradient>
                  </defs>
                  <path className="sparkline-path" d={generateSparklinePath(activityData, 100, 30)} />
                  <circle cx="99" cy={30 - (activityData[activityData.length - 1] - Math.min(...activityData)) * (30 / (Math.max(...activityData) - Math.min(...activityData) || 1))} r="2" fill="var(--accent-purple)" />
                </svg>
              </div>
            </div>
            <div className="dashboard-widget small-widget">
              <div className="widget-header">
                <Icons.UserIcon />
                Пользователи
              </div>
              <div className="widget-value">{activeUsers}</div>
              <div className="widget-text-info">Онлайн</div>
            </div>
          </div>
        </div>

        {/* Trending Tags */}
        <div className="dashboard-group trending-tags-group">
          <h4 className="section-header">
            <Icons.TagIcon />
            Трендовые теги
          </h4>
          <div className="trending-tags-container">
            <div className="trending-tags-grid">
              {trendingTags
                .sort((a, b) => b.trend - a.trend)
                .slice(0, 6)
                .map(tag => (
                  <div key={tag.name} className="dashboard-widget small-widget">
                    <div className="widget-header">
                      {tag.name}
                      <Icons.TrendUpIcon />
                    </div>
                    <div 
                      className="widget-value"
                      style={{ 
                        fontSize: '0.9rem',
                        color: tag.trend > 0 ? '#10b981' : (tag.trend < 0 ? '#ef4444' : 'var(--text-secondary)')
                      }}
                    >
                      {tag.trend > 0 ? '+' : ''}{tag.trend}%
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="dashboard-group">
          <h4 className="section-header">
            <Icons.GlobeIcon />
            Статус системы
          </h4>
          <div className="dashboard-grid">
            <div className="dashboard-widget small-widget">
              <div className="widget-header">
                <Icons.GlobeIcon />
                Синхронизация
              </div>
              <div 
                className="widget-value"
                style={{ 
                  fontSize: '0.9rem',
                  color: syncStatus === "Работает" ? '#10b981' : '#ef4444'
                }}
              >
                {syncStatus}
              </div>
            </div>
            <div className="dashboard-widget small-widget">
              <div className="widget-header">
                <Icons.UploadIcon />
                Нагрузка
              </div>
              <div className="widget-value">{serverLoad}%</div>
            </div>
            <div className="dashboard-widget small-widget">
              <div className="widget-header">
                <Icons.BellIcon />
                Уведомления
              </div>
              <div className="widget-value">{unreadNotifications}</div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bottom-aligned-section">
          <h4 className="section-header">
            <Icons.LinkIcon />
            Быстрые ссылки
          </h4>
          <ul className="quick-links-list">
            <li><a href="#"><Icons.NotesIcon />Все заметки</a></li>
            <li><a href="#"><Icons.TagIcon />Управление тегами</a></li>
            <li><a href="#"><Icons.UserIcon />Настройки профиля</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

// Note Editor Component
const NoteEditor = ({
  noteTitle,
  setNoteTitle,
  noteContent,
  setNoteContent,
  selectedColor,
  setSelectedColor,
  tags,
  newTag,
  setNewTag,
  onAddTag,
  onRemoveTag,
  onSaveNote,
  onClearNote
}) => {
  return (
    <>
      <h3 className="section-header">
        <Icons.NotesIcon />
        Новая заметка
      </h3>
      
      <input
        type="text"
        className="note-title-input"
        placeholder="Заголовок заметки..."
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        aria-label="Заголовок заметки"
      />
      
      <div className="toolbar">
        <button className="toolbar-btn" aria-label="Жирный">
          <Icons.BoldIcon />
        </button>
        <button className="toolbar-btn" aria-label="Курсив">
          <Icons.ItalicIcon />
        </button>
        <button className="toolbar-btn" aria-label="Подчеркнутый">
          <Icons.UnderlineIcon />
        </button>
        <button className="toolbar-btn" aria-label="Вставить ссылку">
          <Icons.LinkIcon />
        </button>
      </div>
      
      <textarea
        className="note-content-textarea"
        placeholder="Начни писать свою заметку здесь..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        aria-label="Содержимое заметки"
      />

      <div className="options-section">
        <div className="option-group">
          <span className="option-label">
            <Icons.PaletteIcon />
            Цвет заметки
          </span>
          <div className="color-picker">
            {NOTE_COLORS.map((color, index) => (
              <div className="color-swatch-wrapper" key={index}>
                <input
                  type="radio"
                  id={`color-${index}`}
                  name="note-color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                  aria-label={`Выбрать цвет ${color}`}
                />
                <label
                  htmlFor={`color-${index}`}
                  style={{ 
                    backgroundColor: color,
                    borderColor: color === "#FFFFFF" ? "var(--border-light)" : "transparent"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="option-group">
          <span className="option-label">
            <Icons.TagIcon />
            Теги
          </span>
          <div className="tags-container">
            {tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
                <button onClick={() => onRemoveTag(tag)} aria-label={`Удалить тег ${tag}`}>
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            className="tag-input"
            placeholder="Добавить тег..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAddTag()}
            aria-label="Добавить новый тег"
          />
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="btn btn-primary" onClick={onSaveNote}>
          Сохранить заметку
        </button>
        <button className="btn btn-secondary" onClick={onClearNote}>
          Очистить
        </button>
      </div>
    </>
  );
};

// Chat Panel Component
const ChatPanel = ({
  chatMessages,
  chatInput,
  setChatInput,
  onSendMessage,
  onReactionClick,
  onEmojiClick,
  chatMessagesEndRef
}) => {
  return (
    <>
      <h3 className="section-header">
        <Icons.ChatIcon />
        Чат сообщества
      </h3>
      
      <div className="chat-messages">
        {chatMessages.length === 0 ? (
          <p className="text-muted">Чат пуст, начни общение!</p>
        ) : (
          chatMessages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.user === "Вы" ? "chat-message-own" : ""}`}>
              <div className="chat-avatar" style={{ backgroundColor: msg.avatarColor }} />
              <div className="chat-content">
                <strong>{msg.user}</strong>
                <p dangerouslySetInnerHTML={parseEmojis(msg.message)} />
                <div className="chat-reactions">
                  <button
                    className={`reaction-btn ${msg.userReaction === 'thumbsup' ? 'liked' : ''}`}
                    onClick={() => onReactionClick(msg.id, 'thumbsup')}
                    aria-label="Like message"
                  >
                    <Icons.ThumbsUpIcon filled={msg.userReaction === 'thumbsup'} />
                    {msg.reactions.thumbsup > 0 && msg.reactions.thumbsup}
                  </button>
                  <button
                    className={`reaction-btn ${msg.userReaction === 'heart' ? 'heart' : ''}`}
                    onClick={() => onReactionClick(msg.id, 'heart')}
                    aria-label="Love message"
                  >
                    <Icons.HeartIcon filled={msg.userReaction === 'heart'} />
                    {msg.reactions.heart > 0 && msg.reactions.heart}
                  </button>
                  <button
                    className={`reaction-btn ${msg.userReaction === 'laugh' ? 'laugh' : ''}`}
                    onClick={() => onReactionClick(msg.id, 'laugh')}
                    aria-label="Laugh at message"
                  >
                    <Icons.LaughIcon filled={msg.userReaction === 'laugh'} />
                    {msg.reactions.laugh > 0 && msg.reactions.laugh}
                  </button>
                  <span className="note-meta">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={chatMessagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Напиши в чат..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
          aria-label="Сообщение в чат"
        />
        <button className="emoji-button" onClick={onEmojiClick} aria-label="Открыть панель эмодзи">
          <Icons.EmojiIcon />
        </button>
        <button className="chat-send-btn" onClick={onSendMessage} aria-label="Отправить сообщение">
          <Icons.SendIcon />
        </button>
      </div>
    </>
  );
};

export default CreateNote;