import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RiskRuler from './pages/RiskRuler/RiskRuler';
import GoldenWay from './pages/Goldenway/Goldenway';
import Footer from './components/Navbar/footer';
import './App.scss';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  return (
    <div className="app-content">
      <Navbar />
      {location.pathname === '/' && (
        <div className="home-content">
          <h1>Welcome to INRisk</h1>
          <p>Your trusted platform for risk management</p>
        </div>
      )}
      <Footer />
      <Routes>
        <Route path="/RiskRuler" element={<RiskRuler />} />
        <Route path="/goldenway" element={<GoldenWay />} />
      </Routes>
    </div>
  );
};

export default App;
