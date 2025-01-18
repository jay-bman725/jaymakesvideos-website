import React from 'react';
import { useNavigate } from 'react-router-dom';

function Bluesky() {
  const navigate = useNavigate();

  return (
    <div className="page-container platform-page">
      <h1>My Bluesky Profile</h1>
      
      <div className="platform-content">
        <div className="channel-info">
          <h2>@jaymakesvideos.xyz</h2>
          <p className="channel-description">
            Follow me on Bluesky for updates, thoughts, and interactions! 
            Join the decentralized social media revolution.
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Content Type</h3>
              <p>Updates, Tech Talk, Community</p>
            </div>
            <div className="stat-item">
              <h3>Platform</h3>
              <p>Decentralized Social</p>
            </div>
          </div>

          <a 
            href="https://bsky.app/profile/jaymakesvideos.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-button bluesky-btn"
          >
            Visit Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default Bluesky; 