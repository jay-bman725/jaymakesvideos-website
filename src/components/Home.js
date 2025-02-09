import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container home-page">
      <h1>Welcome to JayMakesVideos</h1>
      <p>Enjoy your stay ;)</p>
      
      <div className="nav-buttons">
        <button 
          className="nav-button content-btn"
          onClick={() => navigate('/content')}
        >
          My Content
        </button>
        <button 
          className="nav-button discord-btn"
          onClick={() => navigate('/discord')}
        >
          Join Discord
        </button>
        <button 
          className="nav-button discord-btn"
          onClick={() => navigate('/bsky')}
        >
          Follow My Bluesky
        </button>
        <button 
          className="nav-button github-btn"
          onClick={() => window.open('https://github.com/jay-bman725/jaymakesvideos-website', '_blank')}
        >
          View on GitHub
        </button>
      </div>
    </div>
  );
}

export default Home;