import React from 'react';
import { useNavigate } from 'react-router-dom';

function SiteMap() {
  const navigate = useNavigate();

  // Define all pages with their descriptions
  const pages = [
    { 
      path: '/', 
      name: 'Home', 
      description: 'Main landing page with navigation to all content' 
    },
    { 
      path: '/content', 
      name: 'Content Hub', 
      description: 'Browse all my content platforms in one place' 
    },
    { 
      path: '/videos', 
      name: 'Videos', 
      description: 'Collection of my video content' 
    },
    { 
      path: '/discord', 
      name: 'Discord Community', 
      description: 'Join our Discord server to connect with the community' 
    },
    { 
      path: '/youtube', 
      name: 'YouTube Channel', 
      description: 'Watch my latest videos on YouTube' 
    },
    { 
      path: '/twitch', 
      name: 'Twitch Channel', 
      description: 'Follow my live streams on Twitch' 
    },
    { 
      path: '/bsky', 
      name: 'Bluesky', 
      description: 'Follow me on Bluesky for updates and news' 
    },
    { 
      path: '/sitemap', 
      name: 'Site Map', 
      description: 'This page - overview of all available pages'
    }
  ];

  return (
    <div className="page-container">
      <h1>Site Map</h1>
      <p>Here's a complete list of all pages available on this website:</p>
      
      <div className="site-map-grid">
        {pages.map((page, index) => (
          <button 
            key={index}
            className="site-map-button"
            onClick={() => navigate(page.path)}
            disabled={page.path === '/sitemap'}
          >
            <div className="button-content">
              <h3>{page.name}</h3>
              <p>{page.description}</p>
            </div>
            <div className="path-label">
              {page.path}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SiteMap; 