import React from 'react';

function Email() {
  const email = "jay@jaymakesvideos.xyz";

  return (
    <div className="page-container platform-page">
      <div className="pride-celebration">
        <h1 className="rainbow-text">🏳️‍🌈 Contact Me - Pride Edition 🏳️‍🌈</h1>
        <div className="pride-message">
          <p>Reach out with love! Everyone is welcome to connect! Happy Pride Month! 🌈💌</p>
        </div>
      </div>
      
      <div className="platform-content">
        <div className="channel-info">
          <h2 className="rainbow-text">💌 Email Address</h2>
          <p className="channel-description">
            You can reach me at: <code className="pride-flag-border">{email}</code>
            <br />All messages welcomed with love and inclusivity! 🏳️‍🌈
          </p>
          
          <div className="stats-grid">
            <div className="stat-item pride-flag-border">
              <h3>🌈 Response Time</h3>
              <p>Usually within 24-48 hours with love!</p>
            </div>
            <div className="stat-item pride-flag-border">
              <h3>💖 Best For</h3>
              <p>Collaborations, Business, Questions, Pride Support</p>
            </div>
          </div>

          <a 
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="platform-button email-btn pride-flag-border"
          >
            💌 Send Email
          </a>
          
          <div className="pride-footer">
            <p className="rainbow-text">💌 Connecting with pride and inclusivity! 💌</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Email; 