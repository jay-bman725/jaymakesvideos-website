import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ThemeToggle = () => {
  // Pride Month 2025 - Only Pride theme available
  console.log('🏳️‍🌈 Pride Month 2025 - Celebrating love, diversity, and inclusion! 🏳️‍🌈');
  
  const [theme, setTheme] = useState('pride');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [failedTheme, setFailedTheme] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const loadThemeFile = async (themeName) => {
    try {
      // Force pride theme for Pride Month 2025
      if (themeName !== 'pride') {
        themeName = 'pride';
      }
      
      await import(`../themes/${themeName}.css`);
      console.log(`🏳️‍🌈 Pride theme loaded successfully - Happy Pride Month! 🏳️‍🌈`);
      
      setShowErrorModal(false);
      setFailedTheme(null);
      // Set theme in localStorage for other components to access
      localStorage.setItem('currentTheme', themeName);
    } catch (error) {
      console.error('Error loading pride theme:', error);
      setFailedTheme(themeName);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    // Force pride theme for Pride Month 2025
    const prideTheme = 'pride';
    setTheme(prideTheme);
    Cookies.set('theme', prideTheme, { expires: 365 });
    loadThemeFile(prideTheme);
    
    // Don't show theme selection modal - pride theme is the only option
    setShowModal(false);
  }, []);

  const handleThemeChange = (newTheme) => {
    // Force pride theme for Pride Month 2025
    const prideTheme = 'pride';
    setTheme(prideTheme);
    Cookies.set('theme', prideTheme, { expires: 365 });
    loadThemeFile(prideTheme);
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
    // Force pride theme for Pride Month 2025
    const prideTheme = 'pride';
    setTheme(prideTheme);
    Cookies.set('theme', prideTheme, { expires: 365 });
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
            <div className="pride-celebration">
              <h2>🏳️‍🌈 Happy Pride Month 2025! 🏳️‍🌈</h2>
              <p>This June, we're celebrating love, diversity, and inclusion with our special Pride theme!</p>
              <p>This is the only theme available this month as we honor the LGBTQ+ community.</p>
            </div>
            <div className="theme-buttons">
              <button
                className="theme-button pride"
                onClick={() => handleThemeChange('pride')}
                data-active={theme === 'pride'}
              >
                🏳️‍🌈 Pride Theme 🏳️‍🌈
              </button>
            </div>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="theme-modal-overlay">
          <div className="theme-modal">
            <h2>🏳️‍🌈 Pride Theme Loading 🏳️‍🌈</h2>
            <p>Having trouble loading the Pride theme? Let's try again!</p>
            <div className="theme-buttons">
              <button
                className="theme-button retry"
                onClick={handleRetry}
              >
                🔄 Retry Pride Theme
              </button>
              <button
                className="theme-button pride"
                onClick={handleUseDefault}
              >
                🏳️‍🌈 Use Pride Theme
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ThemeToggle;