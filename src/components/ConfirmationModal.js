import React, { useEffect } from 'react';

function ConfirmationModal({ isOpen, message, onConfirm, onCancel, confirmText = "I Understand", showInput = false, inputValue = '', onInputChange = null }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="theme-modal-overlay" onClick={onCancel}>
      <div className="theme-modal" onClick={e => e.stopPropagation()}>
        <h2>Confirmation Required</h2>
        <div className="feedback-buttons">
          <p>{message}</p>
          {showInput && (
            <div className="modal-input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                className="discord-input"
                autoFocus
              />
            </div>
          )}
        </div>
        <div className="theme-buttons">
          <button 
            className="theme-button dark" 
            onClick={onCancel}
          >
            Go Back
          </button>
          <button 
            className="theme-button light" 
            onClick={onConfirm}
            autoFocus={!showInput}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal; 