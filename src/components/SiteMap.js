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
      path: '/about', 
      name: 'About Me', 
      description: 'Learn more about who I am and what I do' 
    },
    { 
      path: '/email', 
      name: 'Email', 
      description: 'Contact me via email' 
    },
    { 
      path: '/privacy', 
      name: 'Privacy Policy', 
      description: 'Our privacy policy and data practices' 
    },
    {
      path: 'https://jaymakesvideos.instatus.com/',
      name: 'Status Page',
      description: 'Check the status of our services and any ongoing issues',
      isExternal: true
    },
    { 
      path: '/sitemap', 
      name: 'Site Map', 
      description: 'This page - overview of all available pages'
    }
  ];

  return (
    <div className="page-container">
      <div className="pride-celebration">
        <h1 className="rainbow-text">🏳️‍🌈 Site Map - Pride Edition 🏳️‍🌈</h1>
        <div className="pride-message">
          <p>Navigate with pride! Every page celebrates love, diversity, and inclusion! 🌈✨</p>
        </div>
      </div>
      
      <p>Here's a complete list of all pages available on this inclusive website:</p>
      
      <div className="site-map-grid">
        {pages.map((page, index) => (
          <button 
            key={index}
            className="site-map-button pride-flag-border"
            onClick={() => page.isExternal ? window.open(page.path, '_blank', 'noopener,noreferrer') : navigate(page.path)}
            disabled={page.path === '/sitemap'}
          >
            <div className="button-content">
              <h3 className="rainbow-text">{page.name}</h3>
              <p>{page.description}</p>
            </div>
            <div className="path-label">
              {page.isExternal ? 'external' : page.path}
            </div>
          </button>
        ))}
      </div>
      
      <div className="pride-footer">
        <p className="rainbow-text">🗺️ Every page made with love and pride! 🗺️</p>
      </div>
    </div>
  );
}

export default SiteMap; 