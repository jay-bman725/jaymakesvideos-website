import React from 'react';
import { useNavigate } from 'react-router-dom';

function Twitch() {
  const navigate = useNavigate();

  return (
    <div className="page-container platform-page">
      <div className="pride-celebration">
        <h1 className="rainbow-text">🏳️‍🌈 My Twitch Channel - Pride Edition 🏳️‍🌈</h1>
        <div className="pride-message">
          <p>Live streaming with love, inclusivity, and pride! Join our rainbow community! 🌈🎮</p>
        </div>
      </div>
      
      <div className="platform-content">
        <div className="channel-info">
          <h2 className="rainbow-text">🎮 JayDoesLivestream</h2>
          <p className="channel-description">
            Join me live for exciting gameplay, interactive streams, and great conversations
            with our amazing, diverse, and inclusive community! Everyone is welcome here! 🏳️‍🌈
          </p>
          
          <div className="stats-grid">
            <div className="stat-item pride-flag-border">
              <h3>🌈 Stream Schedule</h3>
              <p>Live streams every weekend with pride!</p>
            </div>
            <div className="stat-item pride-flag-border">
              <h3>💖 Stream Content</h3>
              <p>Inclusive Gaming, Just Chatting, Pride Events</p>
            </div>
          </div>

          <a 
            href="https://www.twitch.tv/jaydoeslivestream"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-button twitch-btn pride-flag-border"
          >
            🎮 Visit Channel
          </a>
          
          <div className="pride-footer">
            <p className="rainbow-text">🎮 Streaming with love and pride for everyone! 🎮</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Twitch; 