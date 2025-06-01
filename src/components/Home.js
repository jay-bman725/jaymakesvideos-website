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
      {/* Pride Month 2025 Celebration Banner */}
      <div className="pride-celebration" style={{ 
        margin: '0 0 2rem 0',
        padding: '1.5rem',
        textAlign: 'center',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.15)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h2 style={{ 
          margin: '0 0 1rem 0', 
          fontSize: '1.8rem',
          background: 'linear-gradient(45deg, #e40303, #ff8c00, #ffed00, #008018, #004cff, #732982)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'prideText 3s ease-in-out infinite alternate',
          textShadow: 'none'
        }}>
          🏳️‍🌈 Happy Pride Month 2025! 🏳️‍🌈
        </h2>
        <p style={{ 
          margin: '0 0 1rem 0',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}>
          This June, we celebrate love, diversity, and inclusion in all its beautiful forms!
        </p>
        <p style={{ 
          margin: 0,
          fontSize: '0.95rem',
          opacity: 0.9
        }}>
          Our website is proudly displaying the Pride theme throughout the month to honor and support the LGBTQ+ community. 
          Love is love! 💖
        </p>
      </div>

      <h1>Welcome to JayMakesVideos!</h1>
      <p>{welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}</p>
      
      <div className="nav-buttons">
        <button 
          className="nav-button content-btn"
          onClick={() => navigate('/content')}
        >
          My Content
        </button>
        <button 
          className="nav-button discord-btn"
          onClick={() => navigate('/discord')}
        >
          Join Discord
        </button>
        <button 
          className="nav-button"
          onClick={() => navigate('/about')}
        >
          About Me
        </button>
        <button 
          className="nav-button"
          onClick={() => navigate('/sitemap')}
        >
          Site Map
        </button>
        <button 
          className="nav-button theme-btn"
          onClick={handleThemeToggle}
        >
          Change Theme
        </button>
        {isDefaultTheme && (
          <button 
            className="nav-button theme-btn"
            onClick={handleThemeCustomize}
          >
            Customize Website Theme
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;