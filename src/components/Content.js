import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Content() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const platforms = [
    { name: 'YouTube Channel', path: '/youtube', icon: '🎥' },
    { name: 'Latest Videos', path: '/videos', icon: '📺' },
    { name: 'Twitch Channel', path: '/twitch', icon: '🎮' },
    { name: 'Bluesky', path: '/bsky', icon: '🦋' },
  ];

  return (
    <div className="page-container content-page">
      <div className="pride-celebration">
        <h1 className="rainbow-text">🏳️‍🌈 My Content - Pride Edition 🏳️‍🌈</h1>
        <div className="pride-message">
          <p>Discover inclusive content across all platforms! Celebrating diversity in every video, stream, and post! 🌈</p>
        </div>
      </div>
      
      <div className="content-menu" ref={dropdownRef}>
        <button 
          className={`dropdown-button pride-flag-border ${isDropdownOpen ? 'active' : ''}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>🌈 Select Platform</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        
        <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
          {platforms.map((platform, index) => (
            <button 
              key={index}
              className="pride-flag-border"
              onClick={() => {
                navigate(platform.path);
                setIsDropdownOpen(false);
              }}
            >
              <span className="platform-icon">{platform.icon}</span>
              {platform.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="pride-footer">
        <p className="rainbow-text">💖 Content created with love and pride for everyone! 💖</p>
      </div>
    </div>
  );
}

export default Content; 