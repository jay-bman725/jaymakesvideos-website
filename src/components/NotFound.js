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
    const issueURL = `https://github.com/jay-bman725/jaymakesvideos-website/issues/new?title=${title}&body=${body}`;
    window.open(issueURL, '_blank');
  };

  return (
    <div className="page-container not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <p>The requested URL <code>{decodeURIComponent(invalidUrl)}</code> was not found on this server.</p>
      <p>It seems you've ventured into uncharted territory!</p>
      <div className="not-found-buttons">
        <button 
          className="platform-button"
          onClick={() => navigate('/')}
        >
          Return to Homepage
        </button>
        <button 
          className="platform-button github-issue-btn"
          onClick={openGitHubIssue}
        >
          Report Missing Page
        </button>
      </div>
    </div>
  );
}

export default NotFound;