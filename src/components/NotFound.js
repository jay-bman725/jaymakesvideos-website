import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-container not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <p>It seems you've ventured into uncharted territory.</p>
      <button 
        className="platform-button"
        onClick={() => navigate('/')}
      >
        Return to Homepage
      </button>
    </div>
  );
}

export default NotFound;