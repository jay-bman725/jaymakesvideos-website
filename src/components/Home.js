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

  const handleGradientToggle = () => {
    const event = new Event('gradient-toggle');
    window.dispatchEvent(event);
  };

  return (
    <div className="page-container home-page">
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
          className="nav-button discord-btn"
          onClick={() => navigate('/bsky')}
        >
          Follow My Bluesky
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
            className="nav-button gradient-btn"
            onClick={handleGradientToggle}
          >
            Customize Gradient
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;