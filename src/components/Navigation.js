import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Define navigation links
  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Content', path: '/content', icon: '📺' },
    { name: 'YouTube', path: '/youtube', icon: '🎥' },
    { name: 'Twitch', path: '/twitch', icon: '🎮' },
    { name: 'Videos', path: '/videos', icon: '📹' },
    { name: 'Discord', path: '/discord', icon: '💬' },
    { name: 'Bluesky', path: '/bsky', icon: '🔵' },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide on StartPage
  if (location.pathname === '/homepage') {
    return null;
  }

  return (
    <nav className="main-navigation" ref={menuRef}>
      <button 
        className={`nav-menu-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="menu-icon"></span>
      </button>
      
      <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => {
                navigate(link.path);
                setIsMenuOpen(false);
              }}
              aria-current={location.pathname === link.path ? 'page' : undefined}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.name}</span>
            </button>
          ))}
        </div>
        
        <div className="nav-actions">
          <button 
            className="nav-action theme-action"
            onClick={() => {
              const event = new Event('theme-toggle');
              window.dispatchEvent(event);
              setIsMenuOpen(false);
            }}
          >
            <span className="nav-icon">🎨</span>
            <span className="nav-text">Theme</span>
          </button>
          
          {localStorage.getItem('currentTheme') === 'default' && (
            <button 
              className="nav-action gradient-action"
              onClick={() => {
                const event = new Event('gradient-toggle');
                window.dispatchEvent(event);
                setIsMenuOpen(false);
              }}
            >
              <span className="nav-icon">🌈</span>
              <span className="nav-text">Gradient</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Breadcrumb navigation */}
      {location.pathname !== '/' && (
        <div className="breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-item">Home</button>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">
            {navLinks.find(link => link.path === location.pathname)?.name || 'Page'}
          </span>
        </div>
      )}
    </nav>
  );
}

export default Navigation;