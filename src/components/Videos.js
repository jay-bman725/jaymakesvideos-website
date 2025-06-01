import React from 'react';

function Videos() {
  const videos = [
    'tHbzQF4pUfY', 
  ];

  return (
    <div className="page-container videos-container">
      <div className="pride-celebration">
        <h1 className="rainbow-text">🏳️‍🌈 Pride Month Videos 🏳️‍🌈</h1>
        <div className="pride-message">
          <p>Celebrating love, diversity, and authenticity through our content! Happy Pride Month! 🌈✨</p>
        </div>
      </div>
      
      <div className="videos-content">
        <div className="pride-section">
          <h2 className="rainbow-text">🎥 Latest Videos</h2>
          <p>Creating inclusive content that celebrates everyone in our community!</p>
        </div>
        
        {videos.map((videoId, index) => (
          <div key={index} className="video-item pride-flag-border">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
        
        <div className="pride-footer">
          <p className="rainbow-text">💖 Creating content with love and pride! 💖</p>
        </div>
      </div>
    </div>
  );
}

export default Videos; 