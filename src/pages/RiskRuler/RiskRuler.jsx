import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './RiskRuler.scss';

const RiskRuler = () => {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stockData, setStockData] = useState(null);

  const formatLargeNumber = (num) => {
    if (!num) return 'N/A';
    if (num >= 1e9) return `₹${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `₹${(num / 1e6).toFixed(2)}M`;
    return `₹${num.toFixed(2)}`;
  };

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    return num.toFixed(2);
  };

  const fetchStockData = async () => {
    setLoading(true);
    setError('');
    try {
      console.log(`Attempting to fetch data for ticker: ${ticker}`);
      
      const response = await fetch(`http://localhost:8000/api/stock/${ticker}.NS`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to fetch stock data: ${response.status} ${errorData}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      setStockData(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to fetch stock data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="risk-ruler">
      <div className="risk-ruler__card">
        <div className="risk-ruler__header">
          <h2>Stock Data Dashboard</h2>
          <div className="risk-ruler__input-group">
            <input
              type="text"
              placeholder="Enter symbol (e.g., TATAMOTORS)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
            <button
              onClick={fetchStockData}
              disabled={loading}
              className="risk-ruler__button"
            >
              {loading ? 'Loading...' : 'Get Stock Data'}
            </button>
          </div>
        </div>

        {error && (
          <div className="risk-ruler__error">
            {error}
          </div>
        )}

        {stockData && (
          <div className="risk-ruler__content">
            {/* Company Info Section */}
            <div className="data-section">
              <h3>Company Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Company Name</span>
                  <span className="value">{stockData.basicInfo.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Exchange</span>
                  <span className="value">{stockData.basicInfo.exchange}</span>
                </div>
                <div className="info-item">
                  <span className="label">Currency</span>
                  <span className="value">{stockData.basicInfo.currency}</span>
                </div>
              </div>
            </div>

            {/* Price Information */}
            <div className="data-section">
              <h3>Price Information</h3>
              <div className="info-grid">
                <div className="info-item highlight">
                  <span className="label">Current Price</span>
                  <span className="value">{formatLargeNumber(stockData.basicInfo.currentPrice)}</span>
                </div>
                <div className="info-item">
                  <span className="label">52 Week High</span>
                  <span className="value">{formatLargeNumber(stockData.keyMetrics['52WeekHigh'])}</span>
                </div>
                <div className="info-item">
                  <span className="label">52 Week Low</span>
                  <span className="value">{formatLargeNumber(stockData.keyMetrics['52WeekLow'])}</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="data-section">
              <h3>Key Metrics</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Market Cap</span>
                  <span className="value">{formatLargeNumber(stockData.keyMetrics.marketCap)}</span>
                </div>
                <div className="info-item">
                  <span className="label">P/E Ratio</span>
                  <span className="value">{formatNumber(stockData.keyMetrics.peRatio)}</span>
                </div>
                <div className="info-item">
                  <span className="label">EPS</span>
                  <span className="value">{formatNumber(stockData.keyMetrics.eps)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Dividend Rate</span>
                  <span className="value">{formatNumber(stockData.keyMetrics.dividendRate)}%</span>
                </div>
                <div className="info-item">
                  <span className="label">Volume</span>
                  <span className="value">{stockData.keyMetrics.volume?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="data-section">
              <h3>Financial Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Total Revenue</span>
                  <span className="value">{formatLargeNumber(stockData.financials.totalRevenue)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Gross Profits</span>
                  <span className="value">{formatLargeNumber(stockData.financials.grossProfits)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Total Debt</span>
                  <span className="value">{formatLargeNumber(stockData.financials.totalDebt)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Total Assets</span>
                  <span className="value">{formatLargeNumber(stockData.financials.totalAssets)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Total Liabilities</span>
                  <span className="value">{formatLargeNumber(stockData.financials.totalLiabilities)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskRuler;