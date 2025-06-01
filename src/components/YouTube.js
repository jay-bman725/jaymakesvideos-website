import React from 'react';

function YouTube() {

  return (
    <div className="page-container platform-page">
      <div className="pride-celebration">
        <h1 className="rainbow-text">🏳️‍🌈 My YouTube Channel - Pride Edition 🏳️‍🌈</h1>
        <div className="pride-message">
          <p>Creating inclusive tech content that celebrates everyone! Happy Pride Month! 🌈✨</p>
        </div>
      </div>
      
      <div className="platform-content">
        <div className="channel-info">
          <h2 className="rainbow-text">🎥 Jay Makes Videos</h2>
          <p className="channel-description">
            Welcome to my YouTube channel! Here you'll find exciting content about
            tech and entertainment, created with love and inclusivity for our amazing diverse community! 
            Subscribe to join our growing family! 🏳️‍🌈
          </p>
          
          <div className="stats-grid">
            <div className="stat-item pride-flag-border">
              <h3>🌈 Upload Schedule</h3>
              <p>New videos every week with pride!</p>
            </div>
            <div className="stat-item pride-flag-border">
              <h3>💖 Content Type</h3>
              <p>Inclusive Tech Reviews, Tutorials</p>
            </div>
          </div>

          <a 
            href="https://www.youtube.com/@Jay.Makes.Videos"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-button youtube-btn pride-flag-border"
          >
            🎥 Visit Channel
          </a>
          
          <div className="pride-footer">
            <p className="rainbow-text">✨ Tech content made with love and pride! ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTube;