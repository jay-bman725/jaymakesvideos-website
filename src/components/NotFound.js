import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const invalidUrl = searchParams.get('invalid_url') || location.pathname;

  const openGitHubIssue = () => {
    const title = encodeURIComponent(`Missing Page: ${invalidUrl}`);
    const body = encodeURIComponent(
      `## Missing Page Details\n\nRequested URL: ${invalidUrl}\n\n` +
      `## Expected Behavior\n\nPlease describe what you expected to find at this URL.\n\n` +
      `## Why this page should exist\n\nPlease explain why you think this page should exist.\n\n` +
      `## Additional Context\n\nAdd any other context about the missing page here.`
    );
    const issueURL = `https://github.com/jay-bman725/jaymakesvideos-website/issues/new?title=${title}&body=${body}&labels=missing%20page`;
    window.open(issueURL, '_blank');
  };

  // Common pages that users might be looking for
  const suggestedPages = [
    { path: '/content', name: 'Content Hub', description: 'Browse all my content platforms' },
    { path: '/youtube', name: 'YouTube Channel', description: 'Watch my latest videos' },
    { path: '/discord', name: 'Discord Community', description: 'Join our community' },
    { path: '/twitch', name: 'Twitch Channel', description: 'Watch my live streams' }
  ];

  return (
    <div className="page-container not-found-page">
      <div className="not-found-header">
        <h1>404 - Page Not Found</h1>
        <p className="not-found-subtitle">Oops! Looks like we've hit a dead end.</p>
      </div>

      <div className="not-found-details">
        <div className="error-details">
          <h2>What Happened?</h2>
          <p>The page you requested <code>{decodeURIComponent(invalidUrl)}</code> could not be found on this website.</p>
          <p>This might be because:</p>
          <ul>
            <li>The page was moved or deleted</li>
            <li>The URL was typed incorrectly</li>
            <li>You clicked on an outdated link</li>
          </ul>
        </div>

        <div className="suggested-pages">
          <h2>Popular Pages You Might Like</h2>
          <div className="suggested-pages-grid">
            {suggestedPages.map((page, index) => (
              <button 
                key={index}
                className="suggested-page-button"
                onClick={() => navigate(page.path)}
              >
                <h3>{page.name}</h3>
                <p>{page.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="not-found-actions">
          <button 
            className="platform-button primary"
            onClick={() => navigate('/')}
          >
            Return to Homepage
          </button>
          <button 
            className="platform-button secondary"
            onClick={openGitHubIssue}
          >
            Report Missing Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;