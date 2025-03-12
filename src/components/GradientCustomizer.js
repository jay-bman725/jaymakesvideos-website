import React, { useState, useEffect } from 'react';

function GradientCustomizer() {
  const [gradientColors, setGradientColors] = useState({
    color1: localStorage.getItem('gradientColor1') || '#3498db',
    color2: localStorage.getItem('gradientColor2') || '#2ecc71'
  });
  const [direction, setDirection] = useState(
    localStorage.getItem('gradientDirection') || 'to right'
  );
  const [textColor, setTextColor] = useState(
    localStorage.getItem('textColor') || 'black'
  );
  const [showCustomizer, setShowCustomizer] = useState(false);

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

  useEffect(() => {
    const gradient = `linear-gradient(${direction}, ${gradientColors.color1}, ${gradientColors.color2})`;
    document.documentElement.style.setProperty('--page-gradient', gradient);
    document.documentElement.style.setProperty('--text-color', textColor);
    
    localStorage.setItem('gradientColor1', gradientColors.color1);
    localStorage.setItem('gradientColor2', gradientColors.color2);
    localStorage.setItem('gradientDirection', direction);
    localStorage.setItem('textColor', textColor);
  }, [gradientColors, direction, textColor]);

  useEffect(() => {
    const handleGradientToggle = () => {
      setShowCustomizer(true);
    };

    window.addEventListener('gradient-toggle', handleGradientToggle);
    return () => window.removeEventListener('gradient-toggle', handleGradientToggle);
  }, []);

  if (localStorage.getItem('currentTheme') !== 'default') {
    return null;
  }

  const handleColorChange = (colorKey, value) => {
    setGradientColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const toggleCustomizer = () => {
    setShowCustomizer(!showCustomizer);
  };

  if (localStorage.getItem('currentTheme') !== 'default') {
    return null;
  }

  return (
    <>
      {showCustomizer && (
        <div className="gradient-modal-overlay">
          <div className="gradient-modal">
            <h2>Customize Background Gradient</h2>
            <div className="gradient-controls">
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
              <div className="text-color-picker">
                <label>Text Color:</label>
                <div className="text-color-buttons">
                  <button
                    className={`text-color-button ${textColor === 'black' ? 'active' : ''}`}
                    onClick={() => setTextColor('black')}
                    style={{ color: 'black' }}
                  >
                    Black Text
                  </button>
                  <button
                    className={`text-color-button ${textColor === 'white' ? 'active' : ''}`}
                    onClick={() => setTextColor('white')}
                    style={{ color: 'white' }}
                  >
                    White Text
                  </button>
                </div>
              </div>
              <button
                className="close-gradient-modal"
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

export default GradientCustomizer;