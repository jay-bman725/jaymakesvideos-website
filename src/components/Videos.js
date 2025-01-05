import React from 'react';

function Videos() {
  const videos = [
    'tHbzQF4pUfY', 
  ];

  return (
    <div className="page-container">
      <h1>Videos</h1>
      <div className="video-grid">
        {videos.map((videoId, index) => (
          <div key={index} className="video-item">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos; 