import React, { useState } from 'react';
import './StartPage.css';

function StartPage() {
  const [showSettings, setShowSettings] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    if (searchQuery) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  return (
    <div className="start-page">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search Google..."
            autoFocus
            className="search-input"
          />
        </form>
      </div>

      <div className="quick-links">
        <a href="https://www.youtube.com/@Jay.Makes.Videos" target="_blank" rel="noopener noreferrer">
          <div className="quick-link-item">
            <img src="/youtube-icon.png" alt="YouTube" />
            <span>YouTube</span>
          </div>
        </a>
        <a href="/discord">
          <div className="quick-link-item">
            <img src="/discord-icon.png" alt="Discord" />
            <span>Discord</span>
          </div>
        </a>
        <a href="/content">
          <div className="quick-link-item">
            <img src="/content-icon.png" alt="Content" />
            <span>Content</span>
          </div>
        </a>
      </div>

      <button 
        className="settings-toggle"
        onClick={() => setShowSettings(!showSettings)}
      >
        ⚙️
      </button>

      {showSettings && (
        <div className="settings-panel">
          <h3>Settings</h3>
          <div className="settings-options">
            <label>
              <input type="checkbox" /> Show Quick Links
            </label>
            <label>
              <input type="checkbox" /> Dark Mode
            </label>
            <label>
              <input type="checkbox" /> Custom Background
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartPage;