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
      <h1>🏳️‍🌈 About Me - Jay 🏳️‍🌈</h1>
      
      {/* Pride Month Special Section */}
      <div style={{
        background: 'linear-gradient(45deg, #e60026, #ff8c00, #ffed00, #008026, #004cff, #732982)',
        padding: '1.5rem',
        borderRadius: '15px',
        margin: '1rem 0 2rem 0',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{color: 'white', marginBottom: '1rem'}}>🏳️‍🌈 Pride Month 2025 🏳️‍🌈</h2>
        <p style={{margin: 0, fontSize: '1.1rem', fontWeight: 'bold'}}>
          This Pride Month, I stand with the LGBTQ+ community in celebrating love, acceptance, and the freedom to be authentic! 
          Everyone deserves to love and be loved without fear. 💖🌈
        </p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <img 
            src={avitar}
            alt="Profile" 
            className="profile-image pride-flag-border"
            style={{borderRadius: '50%'}}
          />
          <div className="bio-section">
            <h2>Jay 🏳️‍🌈</h2>
            <p className="bio-text">
              Hi! I'm Jay, a content creator passionate about making engaging videos
              and building inclusive communities. I specialize in tech content, gaming, and fostering
              safe online spaces where everyone can be their authentic selves, bringing creativity, 
              love, and acceptance to everything I create. 🌈
            </p>
          </div>
        </div>
        
        <div className="details-section">
          <h3>What I Do 🎥</h3>
          <div className="stats-grid">
            <div className="stat-item pride-flag-border">
              <h4>🎬 Content Creation</h4>
              <ol>
                <li>Tech Reviews & Tutorials</li>
                <li>Gaming Content</li>
                <li>Inclusive Community Events</li>
                <li>Live Streams for Everyone</li>
              </ol>
            </div>
            <div className="stat-item pride-flag-border">
              <h4>🌈 Community Building</h4>
              <ol>
                <li>Safe Discord Community Spaces</li>
                <li>Interactive Live Streams</li>
                <li>Inclusive Social Media Engagement</li>
                <li>LGBTQ+ Friendly Collaborative Projects</li>
              </ol>
            </div>
          </div>

          <h3>My Journey 🚀</h3>
          <p className="journey-text" style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: '10px',
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            My content creation journey started with a passion for technology and gaming.
            What began as casual video making evolved into a dedicated pursuit of creating
            engaging content that educates and entertains. Along the way, I've built an
            amazing community of like-minded individuals who share my interests in tech,
            gaming, and digital creativity. 🏳️‍🌈 I believe in creating spaces where everyone 
            feels welcome, valued, and free to express their true selves! 🌈
          </p>

          <h3>Connect With Me 💫</h3>
          <div className="platform-grid">
            {socialPlatforms.map((platform, index) => (
              <button 
                key={index}
                className="platform-button pride-flag-border"
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
                <h4>🌈 {platform.name}</h4>
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