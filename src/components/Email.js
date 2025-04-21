import React from 'react';

function Email() {
  const email = "jay@jaymakesvideos.xyz";

  return (
    <div className="page-container platform-page">
      <h1>Contact Me</h1>
      
      <div className="platform-content">
        <div className="channel-info">
          <h2>Email Address</h2>
          <p className="channel-description">
            You can reach me at: <code>{email}</code>
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Response Time</h3>
              <p>Usually within 24-48 hours</p>
            </div>
            <div className="stat-item">
              <h3>Best For</h3>
              <p>Collaborations, Business Inquiries, General Questions</p>
            </div>
          </div>

          <a 
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="platform-button email-btn"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}

export default Email; 