import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MarketLense from './pages/Portfolio/MarketLense';
import GoldenWay from './pages/Goldenway/Goldenway';
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
    <div className="Appcontent">
      <Navbar />
      {location.pathname === '/' && (
        <div className="home-content">
          <h1>Welcome to INRisk</h1>
          <p>Your trusted platform for risk management</p>
        </div>
      )}
      <Routes>
        <Route path="/marketlense" element={<MarketLense />} />
        <Route path="/goldenway" element={<GoldenWay />} />
      </Routes>
    </div>
  );
};

export default App;
