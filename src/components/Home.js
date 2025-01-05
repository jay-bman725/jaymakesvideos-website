import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container home-page">
      <h1>Welcome to JayMakesVideos</h1>
      <p>Check out my content and join our Discord community!</p>
      
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
      </div>
    </div>
  );
}

export default Home; 