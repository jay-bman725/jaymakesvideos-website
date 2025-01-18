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

  ];

  return (
    <div className="page-container content-page">
      <h1>My Content</h1>
      
      <div className="content-menu" ref={dropdownRef}>
        <button 
          className={`dropdown-button ${isDropdownOpen ? 'active' : ''}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>Select Platform</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        
        <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
          {platforms.map((platform, index) => (
            <button 
              key={index}
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
    </div>
  );
}

export default Content; 