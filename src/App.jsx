
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import DigitalMiners from './pages/DigitalMiners';
import Token from './pages/Token';
import Game from './pages/Game';
import Launchpad from './pages/Launchpad';
import Company from './pages/Company';
import Learn from './pages/Learn';
import Hosting from './pages/Hosting';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/miners" element={<DigitalMiners />} />
          <Route path="/token" element={<Token />} />
          <Route path="/game" element={<Game />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/company" element={<Company />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/hosting" element={<Hosting />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;