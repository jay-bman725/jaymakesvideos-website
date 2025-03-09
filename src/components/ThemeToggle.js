import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(Cookies.get('theme') || 'default');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [failedTheme, setFailedTheme] = useState(null);

  const loadThemeFile = async (themeName) => {
    try {
      if (themeName !== 'default') {
        await import(`../themes/${themeName}.css`);
        console.log(`Theme '${themeName}' loaded successfully`);
      } else {
        console.log('Using default theme from App.css');
      }
      setShowErrorModal(false);
      setFailedTheme(null);
    } catch (error) {
      console.error('Error loading theme:', error);
      setFailedTheme(themeName);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    const savedTheme = Cookies.get('theme');
    if (!savedTheme) {
      setShowModal(true);
    } else {
      loadThemeFile(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    Cookies.set('theme', newTheme, { expires: 365 });
    loadThemeFile(newTheme);
    setShowModal(false);
    window.location.reload(); // Add page refresh when theme changes
  };

  const handleRetry = () => {
    loadThemeFile(failedTheme);
  };

  const handleUseDefault = () => {
    const defaultTheme = 'default';
    setTheme(defaultTheme);
    Cookies.set('theme', defaultTheme, { expires: 365 });
    setShowErrorModal(false);
  };

  const handleChooseAnother = () => {
    setShowErrorModal(false);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <div className="theme-modal-overlay">
          <div className="theme-modal">
            <h2>Choose Your Theme</h2>
            <p>Select your preferred theme for the website:</p>
            <div className="theme-buttons">
              <button
                className="theme-button dark"
                onClick={() => handleThemeChange('dark')}
              >
                Dark Mode
              </button>
              <button
                className="theme-button light"
                onClick={() => handleThemeChange('light')}
              >
                Light Mode
              </button>
              <button
                className="theme-button default"
                onClick={() => handleThemeChange('default')}
              >
                Default Theme
              </button>
            </div>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="theme-modal-overlay">
          <div className="theme-modal">
            <h2>Theme Loading Error</h2>
            <p>Failed to load the '{failedTheme}' theme. Would you like to:</p>
            <div className="theme-buttons">
              <button
                className="theme-button retry"
                onClick={handleRetry}
              >
                Retry Loading
              </button>
              <button
                className="theme-button default"
                onClick={handleUseDefault}
              >
                Use Default Theme
              </button>
              <button
                className="theme-button choose-another"
                onClick={handleChooseAnother}
              >
                Choose Another Theme
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className={`theme-toggle ${theme === 'light' ? 'light' : 'dark'}`}
        onClick={() => handleThemeChange(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </>
  );
};

export default ThemeToggle;