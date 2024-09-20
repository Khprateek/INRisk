import React from 'react';
import './App.css'; // Importing the main CSS file

function App() {
  return (
    <div className="App">
      <div className="logo">INRisk</div>
      <Navbar />
      <Content />
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <a href="index.html">Home</a>
      <a href="dashboard.html">Dashboard</a>
      <a href="GoldenWay.html">GoldenWay</a>
    </div>
  );
}

function Content() {
  return (
    <div className="content">
      <div className="main">
        <h1>GOLDEN YEARS</h1>
        <h2>Secure your future<br />By Right investment Advice</h2>
      </div>
    </div>
  );
}

export default App;