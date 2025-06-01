import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function ThemeCustomizer() {
  // Pride Month 2025 - Theme customization disabled
  // Only the Pride theme is available during Pride Month
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('pride');

  // Check current theme
  useEffect(() => {
    const handleThemeChange = () => {
      const theme = 'pride'; // Force pride theme
      setCurrentTheme(theme);
    };

    // Listen for theme changes
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  // Always return the pride celebration message during Pride Month
  return (
    <div className="pride-celebration" style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 1000,
      padding: '1rem',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
        🏳️‍🌈 Pride Month 2025
      </h4>
      <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>
        Theme customization is disabled this month. We're celebrating with our special Pride theme!
      </p>
    </div>
  );
}

export default ThemeCustomizer;