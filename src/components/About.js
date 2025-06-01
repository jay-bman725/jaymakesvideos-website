import React from 'react';
import { useNavigate } from 'react-router-dom';
import avitar from '../assets/avitar.png';

function About() {
  const navigate = useNavigate();

  const socialPlatforms = [
    { name: 'YouTube', path: '/youtube', description: 'Watch my latest videos and tutorials' },
    { name: 'Twitch', path: '/twitch', description: 'Join my live streams' },
    { name: 'Blue Sky', path: '/bsky', description: 'Follow me on Blue Sky' },
    { name: 'Discord', path: '/discord', description: 'Be part of our community' },
    { name: 'Email', path: '/email', description: 'Send me an email' },
    { name: 'Contact Form', path: 'https://forms.gle/cNAuyqAm6gjrD6L67', description: 'Reach out via Google Forms' }
  ];

  return (
    <div className="page-container platform-page">
      <h1>About Me</h1>
      <div className="about-content">
        <div className="about-section">
          <img 
            src={avitar}
            alt="Profile" 
            className="profile-image"
          />
          <div className="bio-section">
            <h2>Jay</h2>
            <p className="bio-text">
              Hi! I'm Jay, a content creator passionate about making engaging videos
              and building communities. I specialize in tech content, gaming, and fostering
              online communities, bringing creativity and authenticity to everything I create.
            </p>
          </div>
        </div>
        
        <div className="details-section">
          <h3>What I Do</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <h4>Content Creation</h4>
              <ol>
                <li>Tech Reviews & Tutorials</li>
                <li>Gaming Content</li>
                <li>Community Events</li>
                <li>Live Streams</li>
              </ol>
            </div>
            <div className="stat-item">
              <h4>Community Building</h4>
              <ol>
                <li>Discord Community Management</li>
                <li>Interactive Live Streams</li>
                <li>Social Media Engagement</li>
                <li>Collaborative Projects</li>
              </ol>
            </div>
          </div>

          <h3>My Journey</h3>
          <p className="journey-text">
            My content creation journey started with a passion for technology and gaming.
            What began as casual video making evolved into a dedicated pursuit of creating
            engaging content that educates and entertains. Along the way, I've built an
            amazing community of like-minded individuals who share my interests in tech,
            gaming, and digital creativity.
          </p>

          <h3>Connect With Me</h3>
          <div className="platform-grid">
            {socialPlatforms.map((platform, index) => (
              <button 
                key={index}
                className="platform-button"
                onClick={() => {
                  if (platform.path.startsWith('mailto:')) {
                    window.open(platform.path, '_blank');
                  } else if (platform.path.startsWith('http')) {
                    window.open(platform.path, '_blank');
                  } else {
                    navigate(platform.path);
                  }
                }}
              >
                <h4>{platform.name}</h4>
                <p>{platform.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 