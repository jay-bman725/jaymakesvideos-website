import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function ThemeCustomizer() {
  const [gradientColors, setGradientColors] = useState({
    color1: localStorage.getItem('gradientColor1') || '#3498db',
    color2: localStorage.getItem('gradientColor2') || '#2ecc71'
  });
  const [direction, setDirection] = useState(
    localStorage.getItem('gradientDirection') || 'to right'
  );
  const [textColor, setTextColor] = useState(
    localStorage.getItem('textColor') || '#333333'
  );
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(Cookies.get('theme') || 'default');

  const directions = [
    { label: '→', value: 'to right' },
    { label: '↘', value: 'to right bottom' },
    { label: '↓', value: 'to bottom' },
    { label: '↙', value: 'to left bottom' },
    { label: '←', value: 'to left' },
    { label: '↖', value: 'to left top' },
    { label: '↑', value: 'to top' },
    { label: '↗', value: 'to right top' }
  ];

  // Check current theme
  useEffect(() => {
    const handleThemeChange = () => {
      const theme = Cookies.get('theme') || 'default';
      setCurrentTheme(theme);
    };

    // Listen for theme changes
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  // Initialize text color on first load - only if default theme
  useEffect(() => {
    if (currentTheme === 'default') {
      const savedTextColor = localStorage.getItem('textColor') || '#333333';
      document.documentElement.style.setProperty('--text-color', savedTextColor);
    }
  }, [currentTheme]);

  // Apply gradient settings - only if default theme
  useEffect(() => {
    if (currentTheme === 'default') {
      const gradient = `linear-gradient(${direction}, ${gradientColors.color1}, ${gradientColors.color2})`;
      document.documentElement.style.setProperty('--page-gradient', gradient);
      
      localStorage.setItem('gradientColor1', gradientColors.color1);
      localStorage.setItem('gradientColor2', gradientColors.color2);
      localStorage.setItem('gradientDirection', direction);
    }
  }, [gradientColors, direction, currentTheme]);

  // Apply text color settings - only if default theme
  useEffect(() => {
    if (currentTheme === 'default') {
      document.documentElement.style.setProperty('--text-color', textColor);
      localStorage.setItem('textColor', textColor);
    }
  }, [textColor, currentTheme]);

  useEffect(() => {
    const handleThemeCustomize = () => {
      setShowCustomizer(true);
    };

    window.addEventListener('theme-customize', handleThemeCustomize);
    return () => window.removeEventListener('theme-customize', handleThemeCustomize);
  }, []);

  // Don't render if not using default theme
  if (currentTheme !== 'default') {
    return null;
  }

  const handleColorChange = (colorKey, value) => {
    setGradientColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
  };

  const toggleCustomizer = () => {
    setShowCustomizer(!showCustomizer);
  };

  return (
    <>
      {showCustomizer && (
        <div className="theme-modal-overlay">
          <div className="theme-modal">
            <h2>Customize Website Theme</h2>
            <div className="theme-controls">
              <h3>Background Gradient</h3>
              <div className="color-pickers">
                <div className="color-picker">
                  <label>Color 1:</label>
                  <input
                    type="color"
                    value={gradientColors.color1}
                    onChange={(e) => handleColorChange('color1', e.target.value)}
                  />
                </div>
                <div className="color-picker">
                  <label>Color 2:</label>
                  <input
                    type="color"
                    value={gradientColors.color2}
                    onChange={(e) => handleColorChange('color2', e.target.value)}
                  />
                </div>
              </div>
              <div className="direction-picker">
                <label>Direction:</label>
                <div className="direction-buttons">
                  {directions.map((dir) => (
                    <button
                      key={dir.value}
                      className={`direction-button ${direction === dir.value ? 'active' : ''}`}
                      onClick={() => setDirection(dir.value)}
                      title={dir.value}
                    >
                      {dir.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <h3>Text Color</h3>
              <div className="text-color-options">
                <button
                  className={`text-color-button ${textColor === '#FFFFFF' ? 'active' : ''}`}
                  onClick={() => handleTextColorChange('#FFFFFF')}
                  style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                >
                  White Text
                </button>
                <button
                  className={`text-color-button ${textColor === '#000000' ? 'active' : ''}`}
                  onClick={() => handleTextColorChange('#000000')}
                  style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
                >
                  Black Text
                </button>
                <div className="custom-text-color">
                  <label>Custom:</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => handleTextColorChange(e.target.value)}
                  />
                </div>
              </div>
              
              <button
                className="close-theme-modal"
                onClick={toggleCustomizer}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ThemeCustomizer;