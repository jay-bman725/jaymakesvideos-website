import React, { useEffect } from 'react';
import './Notification.css';

function Notification({ message, onClose, autoClose = true }) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [onClose, autoClose]);

  return (
    <div className="notification">
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Notification;