import React from 'react';
import { useNavigate } from 'react-router-dom';

function Twitch() {
  const navigate = useNavigate();

  return (
    <div className="page-container platform-page">
      <h1>My Twitch Channel</h1>
      
      <div className="platform-content">
        <div className="channel-info">
          <h2>JayDoesLivestream</h2>
          <p className="channel-description">
            Join me live for exciting gameplay, interactive streams, and great conversations
            with our amazing community!
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Stream Schedule</h3>
              <p>Live streams every weekend</p>
            </div>
            <div className="stat-item">
              <h3>Stream Content</h3>
              <p>Gaming, Just Chatting, Events</p>
            </div>
          </div>

          <a 
            href="https://www.twitch.tv/jaydoeslivestream"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-button twitch-btn"
          >
            Visit Channel
          </a>
        </div>
      </div>
    </div>
  );
}

export default Twitch; 