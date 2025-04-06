import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import notificationMessages from './assets/notifications.json';
import Notification from './components/Notification';
import Videos from './components/Videos';
import Discord from './components/Discord';
import Home from './components/Home';
import Content from './components/Content';
import YouTube from './components/YouTube';
import Twitch from './components/Twitch';
import Bluesky from './components/Bluesky';
import HomeButton from './components/HomeButton';
import NotFound from './components/NotFound';
import StartPage from './components/StartPage';
import GitHubCorner from './components/GitHubCorner';
import ThemeToggle from './components/ThemeToggle';
import GradientCustomizer from './components/GradientCustomizer';
import ScrollToTop from './components/ScrollToTop';
import { SpeedInsights } from "@vercel/speed-insights/react";


function App() {
  const [isAprilFools, setIsAprilFools] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === 3) { // April is month 3 (0-based)
      setIsAprilFools(true);
      import('./themes/april-fools.css');
    }

    // Function to show random notification
    const showRandomNotification = () => {
      const randomMessage = notificationMessages.messages[Math.floor(Math.random() * notificationMessages.messages.length)];
      const id = Date.now();
      setNotifications(prev => [...prev, { id, message: randomMessage }]);
    };

    // Set up interval for notifications
    const notificationInterval = setInterval(showRandomNotification, 10000);

    // Show initial notification
    showRandomNotification();

    // Function to add spin animation
    const addSpinAnimation = () => {
      const elements = document.querySelectorAll('.home-button-persistent, .dropdown-button, .platform-button, .nav-button');
      elements.forEach(element => {
        element.classList.add('spin-animation');
        setTimeout(() => element.classList.remove('spin-animation'), 1000);
      });
    };

    // Set up interval for spinning animation
    const spinInterval = setInterval(addSpinAnimation, 15000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(spinInterval);
      clearInterval(notificationInterval);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="notification-container">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            />
          ))}
        </div>
        {isAprilFools && (
          <div className="april-fools-banner">
            🎉 Welcome to April! Enjoy the fun and surprises all month long! 🎈
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homepage" element={<StartPage />} />
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
      </div>
    </Router>
  );
}

export default App;
