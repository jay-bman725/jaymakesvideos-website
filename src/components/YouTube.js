import React from 'react';
import { useNavigate } from 'react-router-dom';

function YouTube() {
  const navigate = useNavigate();

  return (
    <div className="page-container platform-page">
      <h1>My YouTube Channel</h1>
      
      <div className="platform-content">
        <div className="channel-info">
          <h2>Jay Makes Videos</h2>
          <p className="channel-description">
            Welcome to my YouTube channel! Here you'll find exciting content about
            gaming, tech, and entertainment. Subscribe to join our growing community!
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Upload Schedule</h3>
              <p>New videos every week</p>
            </div>
            <div className="stat-item">
              <h3>Content Type</h3>
              <p>Gaming, Tech Reviews, Tutorials</p>
            </div>
          </div>

          <a 
            href="https://www.youtube.com/@Jay.Makes.Videos"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-button youtube-btn"
          >
            Visit Channel
          </a>
        </div>
      </div>
    </div>
  );
}

export default YouTube; 