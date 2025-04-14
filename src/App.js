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
import StartPage from './components/StartPage';
import GitHubCorner from './components/GitHubCorner';
import ThemeToggle from './components/ThemeToggle';
import GradientCustomizer from './components/GradientCustomizer';
import ScrollToTop from './components/ScrollToTop';
import { SpeedInsights } from "@vercel/speed-insights/react";


function App() {

  return (
    <Router>
      <div className="App">
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
