<p align="center">
  <img src="frontend/src/assets/logo.jpg" alt="NotesApp Logo" width="150">
</p>

<p align="center">
  <a href="https://github.com/your-username/notesapp"><img src="https://img.shields.io/badge/status-active-brightgreen.svg?style=for-the-badge" alt="Status"></a>
  <a href="https://github.com/your-username/notesapp/releases"><img src="https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge" alt="Version"></a>
  <a href="https://github.com/your-username/notesapp/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License"></a>
  <a href="https://twitter.com/notesapp"><img src="https://img.shields.io/badge/Twitter-@NotesApp-1DA1F2.svg?style=for-the-badge&logo=twitter" alt="Twitter"></a>
</p>

# NotesApp

NotesApp — это современное веб-приложение для управления заметками, созданное для повышения продуктивности пользователей. Приложение позволяет создавать, организовывать и синхронизировать заметки, предоставляя интуитивный интерфейс и мощные функции, такие как категории, теги и офлайн-доступ.

## О проекте

NotesApp предлагает удобный способ ведения заметок с акцентом на простоту, надежность и доступность. Приложение включает в себя главную страницу с информацией о возможностях, блог с новостями и советами, а также раздел контактов для обратной связи. Поддержка тем (светлая и темная) и анимации делают интерфейс привлекательным и современным.

---

## Статус проекта 🚀


Проект находится в активной разработке, текущий прогресс составляет 10%. 

---

## Технологии

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git">
</p>

| Технология | Описание |
|------------|----------|
| **React** | Библиотека для создания пользовательского интерфейса |
| **JavaScript (ES6+)** | Основной язык программирования |
| **HTML5** | Структура веб-страниц |
| **CSS3** | Стилизация с поддержкой светлой и темной тем |
| **Tailwind CSS** | Не используется, вместо этого кастомные стили |
| **Vite** | Сборщик для быстрой разработки и сборки |
| **Git** | Система контроля версий |

---

## Возможности

- **Создание и управление заметками**: Быстрое создание заметок с интуитивным интерфейсом.
- **Организация**: Использование категорий, тегов и приоритетов для структурирования задач.
- **Синхронизация и офлайн-доступ**: Доступ к заметкам в любое время через облако или локально.
- **Темная и светлая темы**: Переключение между темами для комфортной работы.
- **Анимации**: Плавные анимации для карточек, модальных окон и карусели блога.
- **Чат поддержки**: Встроенный чат для общения с поддержкой.
- **Адаптивный дизайн**: Поддержка мобильных устройств и десктопов.

---

## Установка

<p align="center">
  <img src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
</p>

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/Shadowgraph-1/React_notes_app
   ```

2. **Перейдите в директорию проекта**:
   ```bash
   cd notesapp
   ```

3. **Установите зависимости**:
   ```bash
   npm install
   ```

4. **Запустите проект**:
   ```bash
   npm run dev
   ```

5. Откройте приложение в браузере по адресу: `http://localhost:5173`.

---

## Структура проекта

```plaintext
notesapp/
├── backend/                  # Файлы, связанные с бэкендом
├── frontend/                 # Файлы, связанные с фронтендом
├── node_modules/             # Зависимости Node.js (игнорируются Git)
├── public/                   # Статические файлы
│   ├── assets/               # Изображения и другие ресурсы
│   │   ├── blog1.jpg
│   │   ├── blog2.jpg
│   │   ├── blog3.jpg
│   │   ├── blog4.jpg
│   │   ├── blog5.jpg
│   │   ├── logo.jpg 
│   └── favicon.ico
├── src/                      # Исходный код
│   ├── components/           # Компоненты React
│   ├── pages/                # Компоненты страниц
│   │   ├── FirstPage.jsx
│   ├── App.jsx               # Главный компонент приложения
│   ├── index.css             # Глобальные стили
│   ├── main.jsx              # Точка входа
│   └── ...                   # Другие исходные файлы
├── .gitignore                # Игнорируемые файлы
├── eslint.config.js          # Конфигурация ESLint
├── index.html                # Точка входа HTML
├── package-lock.json         # Файл блокировки зависимостей
├── package.json              # Зависимости проекта и скрипты
├── README.md                 # Документация проекта
├── vite.config.js            # Конфигурация Vite
├── .gitignore                # Файл .gitignore
├── README.md                 # Файл README.md
└─  dependencies.json         # Зависимости для React
```

---

## Использование

1. **Главная страница**:
   - Секция «Добро пожаловать» с кнопкой для открытия формы авторизации.
   - Секция «О приложении» с анимированными карточками, демонстрирующими преимущества.
   - Блог с каруселью постов и возможностью просмотра полного содержания.
   - Раздел контактов с информацией для связи.

2. **Авторизация**:
   - Форма входа/регистрации с валидацией полей.
   - Переключение между режимами входа и регистрации.

3. **Чат и поддержка**:
   - Боковая панель с информацией о пользователях и статусом сайта.
   - Встроенный чат для общения с поддержкой.

4. **Переключение темы**:
   - Кнопка в шапке для смены между светлой и темной темами.

---

## Разработка

Для внесения изменений:

1. Создайте новую ветку:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Внесите изменения и закоммитьте:
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```

3. Отправьте изменения в репозиторий:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Создайте Pull Request на GitHub.

---

## Лицензия

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License">
</p>

Проект распространяется под лицензией [MIT](LICENSE).

---

## Контакты

<p align="center">
  <a href="mailto:support@notesapp.com"><img src="https://img.shields.io/badge/Email-litvin4chuk@mail.ru-D14836.svg?style=plastic&logo=gmail" alt="Email"></a>
  <a href="https://twitter.com/notesapp"><img src="https://img.shields.io/badge/Twitter-@PiterKoll-1DA1F2.svg?style=plastic&logo=twitter" alt="Twitter"></a>
  <a href="https://t.me/SGraphP"><img src="https://img.shields.io/badge/Telegram-Join%20Telegram-0088cc.svg?style=plastic&logo=telegram" alt="Telegram"></a>
</p>


<p align="center">
   Если у вас есть вопросы или предложения, свяжитесь со мной через указанные контакты.
</p>