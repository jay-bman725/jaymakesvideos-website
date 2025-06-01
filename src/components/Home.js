import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeMessages from '../assets/welcome.json';
import Cookies from 'js-cookie';

function Home() {
  const navigate = useNavigate();
  const [isDefaultTheme, setIsDefaultTheme] = useState(false);

  useEffect(() => {
    // Check initial theme state
    const checkTheme = () => {
      const currentTheme = Cookies.get('theme') || 'default';
      setIsDefaultTheme(currentTheme === 'default');
    };

    // Check theme on mount
    checkTheme();

    // Listen for theme changes
    const handleThemeChange = () => {
      checkTheme();
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const handleThemeToggle = () => {
    const event = new Event('theme-toggle');
    window.dispatchEvent(event);
  };

  const handleThemeCustomize = () => {
    const event = new Event('theme-customize');
    window.dispatchEvent(event);
  };

  return (
    <div className="page-container home-page">
      <h1>🏳️‍🌈 Welcome to JayMakesVideos! 🏳️‍🌈</h1>
      <div style={{
        background: 'linear-gradient(45deg, #e60026, #ff8c00, #ffed00, #008026, #004cff, #732982)',
        padding: '1rem',
        borderRadius: '15px',
        margin: '1rem 0',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
      }}>
        🏳️‍🌈 HAPPY PRIDE MONTH 2025! 🏳️‍🌈<br/>
        Celebrating love, diversity, and equality for all! 💖
      </div>
      <p>{welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}</p>
      <p style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '1rem',
        borderRadius: '10px',
        fontStyle: 'italic',
        border: '2px solid rgba(255,255,255,0.3)'
      }}>
        🌈 This month we celebrate the LGBTQ+ community and everyone who fights for love and equality! 
        Love is love, and everyone deserves to be their authentic self! 🌈
      </p>
      
      <div className="nav-buttons">
        <button 
          className="nav-button content-btn pride-flag-border"
          onClick={() => navigate('/content')}
        >
          🎥 My Content
        </button>
        <button 
          className="nav-button discord-btn pride-flag-border"
          onClick={() => navigate('/discord')}
        >
          💬 Join Discord
        </button>
        <button 
          className="nav-button pride-flag-border"
          onClick={() => navigate('/about')}
        >
          🏳️‍🌈 About Me
        </button>
        <button 
          className="nav-button pride-flag-border"
          onClick={() => navigate('/sitemap')}
        >
          🗺️ Site Map
        </button>
        <button 
          className="nav-button theme-btn pride-flag-border"
          onClick={handleThemeToggle}
        >
          🎨 Change Theme
        </button>
        {isDefaultTheme && (
          <button 
            className="nav-button theme-btn pride-flag-border"
            onClick={handleThemeCustomize}
          >
            ✨ Customize Website Theme
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;