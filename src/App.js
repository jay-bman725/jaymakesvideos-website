import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';
import Discord from './components/Discord';
import Home from './components/Home';
import Content from './components/Content';
import YouTube from './components/YouTube';
import Twitch from './components/Twitch';
import Bluesky from './components/Bluesky';
import HomeButton from './components/HomeButton';
import NotFound from './components/NotFound';
import GitHubCorner from './components/GitHubCorner';
import ThemeToggle from './components/ThemeToggle';
import ThemeCustomizer from './components/ThemeCustomizer';
import ScrollToTop from './components/ScrollToTop';
import SiteMap from './components/SiteMap';
import About from './components/About';
import Email from './components/Email';
import Privacy from './components/Privacy';
import { SpeedInsights } from "@vercel/speed-insights/react";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import FeedbackPopup from './components/FeedbackPopup';
import ConfirmationModal from './components/ConfirmationModal';

// Helper component to watch for route changes and hide privacy consent on privacy page
function AppContent() {
  const location = useLocation();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [cancelCallback, setCancelCallback] = useState(null);
  const [confirmText, setConfirmText] = useState('I Understand');
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [onInputChange, setOnInputChange] = useState(null);

  useEffect(() => {
    // Check for privacy policy consent
    const privacyConsent = Cookies.get('privacy_consent');
    if (!privacyConsent) {
      // Don't show the privacy consent if we're on the privacy page
      const isPrivacyPage = location.pathname === '/privacy';
      if (!isPrivacyPage) {
        setShowPrivacyConsent(true);
      }
    }

    const visits = parseInt(Cookies.get('visit_count') || '0');
    const lastFeedback = parseInt(Cookies.get('last_feedback') || '0');
    const feedbackDenied = parseInt(Cookies.get('feedback_denied') || '0');
    const feedbackNever = Cookies.get('feedback_never');
    
    if (feedbackNever === 'true') {
      return;
    }
    
    const newCount = visits + 1;
    Cookies.set('visit_count', newCount, { expires: 365 });

    if (lastFeedback > 0) {
      // After giving feedback, show again at 200, 400, etc visits
      if (newCount >= lastFeedback + 200) {
        setShowFeedback(true);
      }
    } else if (feedbackDenied > 0) {
      // If previously denied, show at next 10th interval
      if (newCount >= (Math.floor(feedbackDenied / 10) + 1) * 10) {
        setShowFeedback(true);
      }
    } else if (newCount === 10) {
      // First time showing feedback
      setShowFeedback(true);
    }
  }, [location]);

  // Hide privacy consent if user navigates to privacy page
  useEffect(() => {
    if (location.pathname === '/privacy') {
      setShowPrivacyConsent(false);
    }
  }, [location]);

  const handleCloseFeedback = (giveFeedback) => {
    setShowFeedback(false);
    const visits = parseInt(Cookies.get('visit_count') || '0');
    
    if (giveFeedback === 'never') {
      Cookies.set('feedback_never', 'true', { expires: 3650 }); // Set for 10 years
    } else if (giveFeedback) {
      Cookies.set('last_feedback', visits, { expires: 365 });
      Cookies.remove('feedback_denied');
    } else {
      Cookies.set('feedback_denied', visits, { expires: 365 });
    }
  };

  const handlePrivacyConsent = () => {
    showConfirmationDialog(
      "By clicking 'I Agree', you confirm that you have read and agree to our Privacy Policy.",
      () => {
        // Set cookie with the specific date mentioned
        Cookies.set('privacy_consent', 'true', { 
          expires: 365,
          sameSite: 'strict'
        });
        Cookies.set('privacy_consent_date', '5/5/2025', { 
          expires: 365,
          sameSite: 'strict'
        });
        setShowPrivacyConsent(false);
      },
      null,
      "I Agree"
    );
  };

  // Method to show confirmation dialog from anywhere in the app
  const showConfirmationDialog = (message, onConfirm, onCancel, confirmButtonText = 'I Understand', shouldShowInput = false, initialInputValue = '', inputChangeHandler = null) => {
    setConfirmationMessage(message);
    setConfirmationCallback(() => onConfirm);
    setCancelCallback(() => onCancel);
    setConfirmText(confirmButtonText);
    setShowInput(shouldShowInput);
    setInputValue(initialInputValue);
    setOnInputChange(() => inputChangeHandler);
    setShowConfirmation(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    setShowConfirmation(false);
    if (confirmationCallback) {
      confirmationCallback();
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    setShowConfirmation(false);
    if (cancelCallback) {
      cancelCallback();
    }
  };

  // Handle input change
  const handleInputChange = (value) => {
    setInputValue(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        <Route path="/videos" element={<Videos />} />
        <Route 
          path="/discord" 
          element={
            <Discord 
              showConfirmation={showConfirmationDialog}
            />
          } 
        />
        <Route path="/youtube" element={<YouTube />} />
        <Route path="/twitch" element={<Twitch />} />
        <Route path="/bsky" element={<Bluesky />} />
        <Route path="/sitemap" element={<SiteMap />} />
        <Route path="/about" element={<About />} />
        <Route path="/email" element={<Email />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to={`/404?invalid_url=${encodeURIComponent(window.location.pathname)}`} replace />} />
      </Routes>
      <ScrollToTop />
      <SpeedInsights />
      <HomeButton />
      <GitHubCorner />
      <ThemeToggle />
      <ThemeCustomizer />
      {showFeedback && <FeedbackPopup onClose={handleCloseFeedback} />}
      {showPrivacyConsent && (
        <div className="theme-modal-overlay">
          <div className="theme-modal">
            <h2>Privacy Policy Consent</h2>
            <p>We value your privacy. Please review our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> which explains how we use cookies and process your data.</p>
            <div className="theme-buttons">
              <button 
                className="theme-button light" 
                onClick={handlePrivacyConsent}
              >
                I agree to the privacy policy
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={showConfirmation}
        message={confirmationMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={confirmText}
        showInput={showInput}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
