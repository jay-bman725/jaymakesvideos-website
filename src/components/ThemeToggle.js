import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ThemeToggle = () => {
  // Console log message about default theme
  console.log('Developer note: You can switch to the default theme by running: document.cookie = "theme=default" in the console and refreshing the page');
  
  // Force Pride theme for Pride Month celebration! 🏳️‍🌈
  const [theme, setTheme] = useState('pride');
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
    // Force Pride theme for Pride Month! 🏳️‍🌈
    const prideTheme = 'pride';
    Cookies.set('theme', prideTheme, { expires: 365 });
    loadThemeFile(prideTheme);
    setTheme(prideTheme);
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
            <h2>🏳️‍🌈 Pride Month Celebration! 🏳️‍🌈</h2>
            <p>This June, we're celebrating Pride Month with our special Pride theme! Choose your preferred Pride celebration:</p>
            <div className="theme-buttons">
              <button
                className="theme-button pride"
                onClick={() => handleThemeChange('pride')}
                data-active={theme === 'pride'}
                style={{
                  background: 'linear-gradient(45deg, #e60026, #ff8c00, #ffed00, #008026, #004cff, #732982)',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                🏳️‍🌈 Pride Theme (Default)
              </button>
              <button
                className="theme-button dark"
                onClick={() => handleThemeChange('dark')}
                data-active={theme === 'dark'}
              >
                Dark Mode (With Pride Elements)
              </button>
              <button
                className="theme-button light"
                onClick={() => handleThemeChange('light')}
                data-active={theme === 'light'}
              >
                Light Mode (With Pride Elements)
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