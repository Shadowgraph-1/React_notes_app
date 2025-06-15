import React, { useState, useEffect, useRef, useCallback } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = 'Имя обязательно';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Подтвердите пароль';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(isSignUp ? 'Регистрация:' : 'Вход:', formData);
    setIsLoading(false);
    
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
  };

  const inputClass = (fieldName) => {
    return `auth-input ${errors[fieldName] ? 'error' : ''}`;
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        <div className={`auth-card ${isSignUp ? 'signup-mode' : 'signin-mode'}`}>
          <div className="slider-indicator">
            <div className={`indicator ${isSignUp ? 'signup' : 'signin'}`}></div>
          </div>

          <div className="form-container">
            <div className="forms-wrapper">
              <form className={`auth-form signin-form ${!isSignUp ? 'active' : ''}`} onSubmit={handleSubmit}>
                <div className="form-header animate-item">
                  <h2 className="form-title">Вход в аккаунт</h2>
                  <p className="form-subtitle">Добро пожаловать обратно</p>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClass('email')}
                      required
                    />
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                      </svg>
                    </span>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Пароль"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={inputClass('password')}
                      required
                    />
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 17C10.89 17 10 16.1 10 15C10 13.89 10.89 13 12 13C13.11 13 14 13.89 14 15C14 16.1 13.11 17 12 17ZM18 8C19.1 8 20 8.9 20 10V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V10C4 8.9 4.9 8 6 8H7V6C7 3.24 9.24 1 12 1C14.76 1 17 3.24 17 6V8H18ZM12 3C10.34 3 9 4.34 9 6V8H15V6C15 4.34 13.66 3 12 3Z" fill="currentColor"/>
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`auth-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? <div className="spinner"></div> : 'Войти'}
                </button>

                <div className="form-footer">
                  <p>Нет аккаунта? 
                    <button type="button" className="toggle-button" onClick={toggleMode}>
                      Зарегистрироваться
                    </button>
                  </p>
                </div>
              </form>

              <form className={`auth-form signup-form ${isSignUp ? 'active' : ''}`} onSubmit={handleSubmit}>
                <div className="form-header animate-item">
                  <h2 className="form-title">Создать аккаунт</h2>
                  <p className="form-subtitle">Присоединяйтесь к NotesApp</p>
                </div>

                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      placeholder="Имя"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={inputClass('name')}
                      required
                    />
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 14.9C13.16 14.9 14.1 13.96 14.1 12.8C14.1 11.64 13.16 10.7 12 10.7C10.84 10.7 9.9 11.64 9.9 12.8C9.9 13.96 10.84 14.9 12 14.9ZM8 20V18C8 16.67 9.33 15.4 12 15.4S16 16.67 16 18V20H8Z" fill="currentColor"/>
                      </svg>
                    </span>
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClass('email')}
                      required
                    />
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                      </svg>
                    </span>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Пароль"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={inputClass('password')}
                      required
                    />
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 17C10.89 17 10 16.1 10 15C10 13.89 10.89 13 12 13C13.11 13 14 13.89 14 15C14 16.1 13.11 17 12 17ZM18 8C19.1 8 20 8.9 20 10V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V10C4 8.9 4.9 8 6 8H7V6C7 3.24 9.24 1 12 1C14.76 1 17 3.24 17 6V8H18ZM12 3C10.34 3 9 4.34 9 6V8H15V6C15 4.34 13.66 3 12 3Z" fill="currentColor"/>
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>

                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Подтвердите пароль"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={inputClass('confirmPassword')}
                      required
                    />
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12L11 14L15 10M12 3C7.03 3 3 7.03 3 12S7.03 21 12 21 21 16.97 21 12 16.97 3 12 3Z" fill="currentColor"/>
                      </svg>
                    </span>
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`auth-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? <div className="spinner"></div> : 'Зарегистрироваться'}
                </button>

                <div className="form-footer">
                  <p>Уже есть аккаунт? 
                    <button type="button" className="toggle-button" onClick={toggleMode}>
                      Войти
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;