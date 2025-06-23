import { useState, useEffect, useRef } from "react";
import "./Header.css";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light"); // Установка начальной темы
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("main > div[id]");
      let currentActive = "#home";
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (window.scrollY >= section.offsetTop - 70) {
          currentActive = "#" + section.id;
          break;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    console.log("Theme switched to:", newTheme); // Отладка
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAnchorClick = (section) => (e) => {
    e.preventDefault();
    document.querySelector(section).scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  return (
    <>
      <header className="header-main">
        <div className="header-logo">
          <img src="/logo.jpg" alt="NotesApp Logo" className="logo-img" />
          <h1 className="animated-text">NotesApp</h1>
        </div>
        <button
          ref={buttonRef}
          className={`cta-btn-menu ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          <span className="text">Возможности</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`global-navigation__header-link-item-caret ${isMenuOpen ? "rotate" : ""}`}
          >
            <path
              d="M3 4L3 6.5L8 11.5L13 6.5L13 4L8 9L3 4Z"
              fill="white"
            ></path>
          </svg>
        </button>
        <div className={`theme-toggle-slider ${theme === "dark" ? "active" : ""}`} onClick={toggleTheme} aria-label="Переключить тему">
          <div className="slider-knob">
            <svg className="sun sun-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" fill="currentColor"/>
              <g stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.5" y1="4.5" x2="6.5" y2="6.5"/>
                <line x1="17.5" y1="17.5" x2="19.5" y2="19.5"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.5" y1="19.5" x2="6.5" y2="17.5"/>
                <line x1="17.5" y1="6.5" x2="19.5" y2="4.5"/>
              </g>
            </svg>
            <svg className="moon moon-icon" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7 0-1.94.73-3.71 1.93-5.04.19-.25.57-.28.81-.08.24.19.27.57.08.81A6.98 6.98 0 0 0 5 12c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7c-1.93 0-3.71.73-5.04 1.93-.25.19-.28.57-.08.81.19.24.57.27.81.08A6.98 6.98 0 0 1 12 5c3.87 0 7 3.13 7 7s-3.13 7-7 7z" fill="#d3d3d3"/>
              <circle cx="15" cy="9" r="1.5" fill="#ffcc00" />
              <circle cx="10" cy="14" r="1" fill="#ffcc00" />
            </svg>
          </div>
        </div>
        <div
          ref={menuRef}
          className={`cta-main-menu ${isMenuOpen ? "open" : ""}`}
        >
          <div className="menu-content">
            <div className="user-content">
              <ul className="user-column">
                <h3 className="menu-item">Для пользователей</h3>
                <li className="menu-item"><a href="/personal-acc">Личный кабинет</a></li>
                <li className="menu-item"><a href="/create-note">Заметки</a></li>
                <li className="menu-item"><a href="/calendar">Календарь</a></li>
                <li className="menu-item"><a href="/support">Поддержка</a></li>
              </ul>
              <ul className="company-column">
                <h3 className="menu-item">Для компаний</h3>
                <li className="menu-item"><a href="/corporate-access">Корпоративный доступ</a></li>
                <li className="menu-item"><a href="/api-integration">API интеграция</a></li>
                <li className="menu-item"><a href="/team-notes">Командные заметки</a></li>
                <li className="menu-item"><a href="/analytics">Аналитика</a></li>
              </ul>
              <ul className="shop-column">
                <h3 className="menu-item">Магазин</h3>
                <li className="menu-item"><a href="/premium-subscription">Премиум подписка</a></li>
                <li className="menu-item"><a href="/note-templates">Шаблоны заметок</a></li>
                <li className="menu-item"><a href="/extensions">Расширения</a></li>
                <li className="menu-item"><a href="/gift-cards">Подарочные карты</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <nav className={`nav-menu ${isScrolled ? "visible" : "hidden"}`}>
        <a
          href="#home"
          onClick={handleAnchorClick("#home")}
          className={`nav-link ${activeSection === "#home" ? "active" : ""}`}
        >
          Главная
        </a>
        <a
          href="#about"
          onClick={handleAnchorClick("#about")}
          className={`nav-link ${activeSection === "#about" ? "active" : ""}`}
        >
          О приложении
        </a>
        <a
          href="#blog"
          onClick={handleAnchorClick("#blog")}
          className={`nav-link ${activeSection === "#blog" ? "active" : ""}`}
        >
          Блог
        </a>
        <a
          href="#contacts"
          onClick={handleAnchorClick("#contacts")}
          className={`nav-link ${activeSection === "#contacts" ? "active" : ""}`}
        >
          Контакты
        </a>
      </nav>
    </>
  );
}

export default Header;