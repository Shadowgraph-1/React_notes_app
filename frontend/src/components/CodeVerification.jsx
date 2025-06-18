import React, { useState } from "react";
import axios from "axios";
import "./CodeVerification.css";

const CodeVerification = ({ tempUserId, onSuccess, onCancel, isLogin, apiBaseUrl, setIsAuthenticated }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = Array(6).fill().map(() => React.createRef());

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError("");

      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    if (enteredCode.length !== 6) {
      setError("Введите 6-значный код");
      return;
    }

    console.log("Отправка запроса:", {
      endpoint: isLogin ? "/api/verify-login-2fa" : "/api/verify-2fa",
      data: { temp_user_id: tempUserId, code: enteredCode },
      url: `${apiBaseUrl}/api/${isLogin ? "verify-login-2fa" : "verify-2fa"}`
    });

    setIsLoading(true);
    try {
      const endpoint = isLogin ? "verify-login-2fa" : "verify-2fa";
      const response = await axios.post(`${apiBaseUrl}/api/${endpoint}`, {
        temp_user_id: tempUserId,
        code: enteredCode,
      });
      console.log("Ответ от сервера:", response.data);

      if (isLogin) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("username", response.data.username);
        setIsAuthenticated(true); // Обновляем состояние авторизации
      }
      onSuccess(response.data.message);
    } catch (error) {
      console.error("Ошибка при запросе:", error.response || error);
      const errorMessage = error.response?.data?.message || "Ошибка сервера";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="code-verification-container">
      <div className="code-verification-card">
        <h2 className="code-verification-title">Введите код подтверждения</h2>
        <p className="code-verification-subtitle">
          Введите 6-значный код, отправленный вам для подтверждения.
        </p>
        <form onSubmit={handleSubmit} className="code-verification-form">
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                className={`code-input ${error ? "error" : ""}`}
                disabled={isLoading}
              />
            ))}
          </div>
          {error && <span className="error-message">{error}</span>}
          <button
            type="submit"
            className={`code-verification-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : "Подтвердить"}
          </button>
          <button
            type="button"
            className="code-verification-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default CodeVerification;