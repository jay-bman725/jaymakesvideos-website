import React from 'react';

const FeedbackPopup = ({ onClose }) => {
  return (
    <div className="feedback-overlay">
      <div className="feedback-modal">
        <h2>Help Us Improve!</h2>
        <p>We noticed you've visited this website quite a few times, thank you! Would you mind giving us some feedback?</p>
        <div className="feedback-buttons">
          <a 
            href="https://forms.gle/H2cYE35G7mxZnJt98" 
            target="_blank" 
            rel="noopener noreferrer"
            className="feedback-button primary"
            onClick={() => onClose(true)}
          >
            Give Feedback
          </a>
          <button 
            className="feedback-button secondary" 
            onClick={() => onClose(false)}
          >
            Maybe Later
          </button>
        </div>
        <button 
          className="feedback-button tertiary slim-button" 
          onClick={() => onClose('never')}
        >
          Don't show this again
        </button>
      </div>
    </div>
  );
};

export default FeedbackPopup;
