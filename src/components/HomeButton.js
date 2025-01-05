import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function HomeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="home-button-overlay">
      <button 
        className="home-button-persistent"
        onClick={() => navigate('/')}
      >
        Return Home
      </button>
    </div>
  );
}

export default HomeButton; 