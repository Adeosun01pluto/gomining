import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AuthPage from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/utils/ScrollToTop';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className='md:py-16'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/miners" element={<DigitalMiners />} />
            <Route path="/digital-miners" element={<DigitalMiners />} />
            <Route path="/token" element={<Token />} />
            <Route path="/game" element={<Game />} />
            <Route path="/launchpad" element={<Launchpad />} />
            <Route path="/company" element={<Company />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Explicit Not Found Route */}
            <Route path="/not-found" element={<NotFound />} />

            {/* Redirect all unknown routes to Not Found */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
