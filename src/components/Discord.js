import React from 'react';
import { useNavigate } from 'react-router-dom';

function Discord() {
  const navigate = useNavigate();

  return (
    <div className="discord-container">
      <h1>Join Our Discord Community!</h1>
      
      <div className="discord-rules">
        <h2>Discord Rules</h2>
        <ol>
          <li>Be respectful to all members</li>
          <li>No spam or self-promotion without permission</li>
          <li>No NSFW content</li>
          <li>No harassment or bullying</li>
          <li>Follow Discord's Terms of Service</li>
          <li>Have fun and enjoy the community!</li>
        </ol>
      </div>

      <a 
        href="https://discord.gg/98d9dyrYrt"
        target="_blank"
        rel="noopener noreferrer"
        className="join-button"
      >
        Join the Discord Server
      </a>
    </div>
  );
}

export default Discord; 