import React from 'react';

function Bluesky() {
  return (
    <div className="page-container platform-page">
      <div className="pride-celebration">
        <h1 className="rainbow-text">🏳️‍🌈 My Bluesky Profile - Pride Edition 🏳️‍🌈</h1>
        <div className="pride-message">
          <p>Sharing thoughts and celebrating diversity on the decentralized rainbow! Happy Pride Month! 🌈🦋</p>
        </div>
      </div>
      
      <div className="platform-content">
        <div className="channel-info">
          <h2 className="rainbow-text">🦋 @jaymakesvideos.xyz</h2>
          <p className="channel-description">
            Follow me on Bluesky for updates, thoughts, and interactions! 
            Join the decentralized social media revolution where everyone belongs! 🏳️‍🌈
          </p>
          
          <div className="stats-grid">
            <div className="stat-item pride-flag-border">
              <h3>🌈 Content Type</h3>
              <p>Updates, Tech Talk, Pride Community</p>
            </div>
            <div className="stat-item pride-flag-border">
              <h3>💖 Platform</h3>
              <p>Inclusive Decentralized Social</p>
            </div>
          </div>

          <a 
            href="https://bsky.app/profile/jaymakesvideos.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-button bluesky-btn pride-flag-border"
          >
            🦋 Visit Profile
          </a>
          
          <div className="pride-footer">
            <p className="rainbow-text">🦋 Flying high with pride and inclusivity! 🦋</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bluesky;