// import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RiskRuler from './pages/RiskRuler/RiskRuler';
import GoldenWay from './pages/Goldenway/Goldenway';
import Footer from './components/Navbar/footer';
import News from './components/Navbar/News';

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
    <div className="w-full min-h-screen flex flex-col pt-16 relative [&>*:last-child]:mt-auto">
      <Navbar />
      {location.pathname === '/' && (
        <div className="flex-1 flex flex-col justify-center items-center py-8 text-8xl">
          <h1 className="font-bold bg-gradient-to-r from-white via-[#6130cc] to-white bg-clip-text text-transparent">
            Welcome to INRisk
          </h1>
          <p className="mt-4 text-2xl">
            Your trusted platform for risk management
          </p>
        </div>
      )}
      <Routes>
        <Route path="/RiskRuler" element={<RiskRuler />} />
        <Route path="/goldenway" element={<GoldenWay />} />
      </Routes>
      <News />
      <Footer />
    </div>
  );
};

export default App;