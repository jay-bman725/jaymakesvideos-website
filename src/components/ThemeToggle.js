import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(Cookies.get('theme') || 'default');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [failedTheme, setFailedTheme] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const loadThemeFile = async (themeName) => {
    try {
      if (themeName !== 'default') {
        // If switching from default theme, remove custom gradient/text settings
        if (localStorage.getItem('currentTheme') === 'default') {
          // Reset to default styles when switching from default theme with customizations
          document.documentElement.style.removeProperty('--page-gradient');
          document.documentElement.style.removeProperty('--text-color');
        }
        await import(`../themes/${themeName}.css`);
        console.log(`Theme '${themeName}' loaded successfully`);
      } else {
        // When switching to default, apply any saved custom settings
        const gradient = localStorage.getItem('gradientDirection')
          ? `linear-gradient(${localStorage.getItem('gradientDirection')}, ${localStorage.getItem('gradientColor1') || '#3498db'}, ${localStorage.getItem('gradientColor2') || '#2ecc71'})`
          : 'linear-gradient(to right, #3498db, #2ecc71)';
        
        document.documentElement.style.setProperty('--page-gradient', gradient);
        
        const savedTextColor = localStorage.getItem('textColor') || '#333333';
        document.documentElement.style.setProperty('--text-color', savedTextColor);
        
        console.log('Using default theme from App.css with custom settings');
      }
      setShowErrorModal(false);
      setFailedTheme(null);
      // Set theme in localStorage for other components to access
      localStorage.setItem('currentTheme', themeName);
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
    
    // Dispatch theme change event for other components
    const themeChangeEvent = new Event('theme-change');
    window.dispatchEvent(themeChangeEvent);
    
    window.location.reload();
  };

  const handleRetry = () => {
    loadThemeFile(failedTheme);
  };

  const handleUseDefault = () => {
    const defaultTheme = 'default';
    setTheme(defaultTheme);
    Cookies.set('theme', defaultTheme, { expires: 365 });
    setShowErrorModal(false);
    
    // Dispatch theme change event for other components
    const themeChangeEvent = new Event('theme-change');
    window.dispatchEvent(themeChangeEvent);
  };

  const handleChooseAnother = () => {
    setShowErrorModal(false);
    setShowModal(true);
  };

  useEffect(() => {
    const handleThemeToggle = () => {
      setShowModal(true);
    };

    window.addEventListener('theme-toggle', handleThemeToggle);
    return () => window.removeEventListener('theme-toggle', handleThemeToggle);
  }, []);

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
                data-active={theme === 'dark'}
              >
                Dark Mode
              </button>
              <button
                className="theme-button light"
                onClick={() => handleThemeChange('light')}
                data-active={theme === 'light'}
              >
                Light Mode
              </button>
              <div 
                className="theme-button-container"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  className="theme-button default"
                  onClick={() => handleThemeChange('default')}
                  data-active={theme === 'default'}
                >
                  Default Theme
                </button>
                {showTooltip && (
                  <div className="theme-tooltip">
                    Select the default theme to customize the website theme!
                  </div>
                )}
              </div>
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
                Retry
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

    </>
  );
};

export default ThemeToggle;