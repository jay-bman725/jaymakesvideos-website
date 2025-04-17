import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import GradientCustomizer from './components/GradientCustomizer';
import ScrollToTop from './components/ScrollToTop';
import { SpeedInsights } from "@vercel/speed-insights/react";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import FeedbackPopup from './components/FeedbackPopup';

function App() {
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
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
  }, []);

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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<Content />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/twitch" element={<Twitch />} />
          <Route path="/bsky" element={<Bluesky />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to={`/404?invalid_url=${encodeURIComponent(window.location.pathname)}`} replace />} />
        </Routes>
        <ScrollToTop />
        <SpeedInsights />
        <HomeButton />
        <GitHubCorner />
        <ThemeToggle />
        <GradientCustomizer />
        {showFeedback && <FeedbackPopup onClose={handleCloseFeedback} />}
      </div>
    </Router>
  );
}

export default App;
