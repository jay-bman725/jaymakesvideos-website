import React from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeMessages from '../assets/homepage-welcome.json';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container home-page">
      <h1>Welcome to JayMakesVideos</h1>
      <p>{welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}</p>
      
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
      </div>
    </div>
  );

}

export default Home;