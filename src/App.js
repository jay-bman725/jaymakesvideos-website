import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Videos from './components/Videos';
import Discord from './components/Discord';
import Home from './components/Home';
import Content from './components/Content';
import YouTube from './components/YouTube';
import Twitch from './components/Twitch';
import Bluesky from './components/Bluesky';
import HomeButton from './components/HomeButton';
import { SpeedInsights } from "@vercel/speed-insights/react";


function App() {
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
        </Routes>
        <SpeedInsights />
        <HomeButton />
      </div>
    </Router>
  );
}

export default App;
