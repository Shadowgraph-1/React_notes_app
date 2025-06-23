import React, { useState, useEffect } from "react";
import "../components/PersonalAcc.css";

// SVG иконки
const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"/>
    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

function PersonalAccount() {
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: "Планы на неделю", 
      content: "Закончить проект по веб-разработке\nВстреча с командой в понедельник\nИзучить новые технологии: React Hooks\nПодготовить презентацию для клиента", 
      date: "2025-06-18" 
    },
    { 
      id: 2, 
      title: "Список покупок", 
      content: "Продукты:\n• Молоко 2% жирности\n• Хлеб черный\n• Яйца куриные (десяток)\n• Фрукты: яблоки, бананы\n• Овощи для салата\n• Крупы: гречка, рис", 
      date: "2025-06-17" 
    },
    { 
      id: 3, 
      title: "Идеи для улучшения проекта", 
      content: "Функционал:\n• Добавить темную тему для интерфейса\n• Улучшить мобильную версию\n• Оптимизировать загрузку данных\n• Добавить систему уведомлений\n• Интеграция с календарем", 
      date: "2025-06-16" 
    },
    { 
      id: 4, 
      title: "Книги к прочтению", 
      content: "Список литературы для развития:\n• 'Чистый код' - Роберт Мартин\n• 'JavaScript: полное руководство'\n• 'React в действии'\n• 'Алгоритмы и структуры данных'\n• 'Паттерны проектирования'", 
      date: "2025-06-15" 
    },
    { 
      id: 5, 
      title: "Программа тренировок", 
      content: "Недельный план:\nПонедельник: Кардио 30 мин\nВторник: Силовая тренировка\nСреда: Йога и растяжка\nЧетверг: Бег 5 км\nПятница: Плавание\nВыходные: Активный отдых", 
      date: "2025-06-14" 
    },
  ]);

  const [viewNote, setViewNote] = useState(null);
  const [editNote, setEditNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || "Пользователь");
  }, []);

  const handleView = (note) => {
    setViewNote(note);
    setEditNote(null);
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setViewNote(null);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editContent.trim()) {
      setNotes(notes.map(note => 
        note.id === editNote.id 
          ? { 
              ...note, 
              title: editTitle.trim(), 
              content: editContent.trim(), 
              date: new Date().toISOString().split('T')[0] 
            }
          : note
      ));
      setEditNote(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  const handleCancelEdit = () => {
    setEditNote(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleDelete = (noteId) => {
    if (window.confirm("Вы уверены, что хотите удалить эту заметку?")) {
      setNotes(notes.filter(note => note.id !== noteId));
      if (viewNote && viewNote.id === noteId) setViewNote(null);
      if (editNote && editNote.id === noteId) setEditNote(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const closeModal = () => {
    setViewNote(null);
    setEditNote(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleGoHome = () => {
    // Здесь можно использовать React Router для навигации
    // Для примера используем window.location
    window.location.href = '/';
  };

  return (
    <div className="personal-account-container">
      {/* Кнопка домой */}
      <button onClick={handleGoHome} className="home-button">
        <HomeIcon />
        На главную
      </button>

      <div className="account-wrapper">
        {/* Заголовок */}
        <div className="account-header">
          <h1 className="account-title">Личный кабинет</h1>
          <p className="account-subtitle">
            Добро пожаловать, {username}!
          </p>
        </div>

        {/* Секция заметок */}
        <div className="notes-section">
          <div className="notes-header">
            <h2 className="notes-title">Ваши заметки</h2>
            <span className="notes-count">{notes.length}</span>
          </div>

          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <p>У вас пока нет заметок</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-header">
                    <h3 className="note-title">{note.title}</h3>
                    <div className="note-actions">
                      <button 
                        onClick={() => handleView(note)}
                        className="action-btn view"
                        title="Просмотреть"
                      >
                        <ViewIcon />
                      </button>
                      <button 
                        onClick={() => handleEdit(note)}
                        className="action-btn edit"
                        title="Редактировать"
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => handleDelete(note.id)}
                        className="action-btn delete"
                        title="Удалить"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                  <p className="note-content">{note.content}</p>
                  <div className="note-date">
                    Создано: {formatDate(note.date)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно просмотра */}
      {viewNote && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{viewNote.title}</h3>
              <button onClick={closeModal} className="close-btn">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div className="view-content">{viewNote.content}</div>
              <div className="view-date">
                Создано: {formatDate(viewNote.date)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно редактирования */}
      {editNote && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Редактировать заметку</h3>
              <button onClick={closeModal} className="close-btn">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="edit-title" className="form-label">
                  Заголовок:
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="form-input"
                  placeholder="Введите заголовок заметки"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-content" className="form-label">
                  Содержание:
                </label>
                <textarea
                  id="edit-content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="form-textarea"
                  placeholder="Введите содержание заметки"
                  rows="8"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={handleCancelEdit} className="btn btn-secondary">
                Отмена
              </button>
              <button onClick={handleSaveEdit} className="btn btn-primary">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalAccount;