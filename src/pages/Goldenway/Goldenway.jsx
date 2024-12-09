import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Goldenway.scss';

function GoldenWay() {
  const [formData, setFormData] = useState({
    age: '',
    currentSavings: '',
    monthlyDeposit: '',
    expectedRetirementAge: '',
    requiredRetirementAmount: '',
    riskTolerance: '',
  });

  const INFLATION_RATE = 0.06;
  const [retirementPlan, setRetirementPlan] = useState(null);
  const [projectionData, setProjectionData] = useState([]);
  const [formVisible, setFormVisible] = useState(true);
  const [requiredReturn, setRequiredReturn] = useState(null);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Save form data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateRequiredReturn = () => {
    const yearsToRetirement = formData.expectedRetirementAge - formData.age;
    const monthlyDeposit = Number(formData.monthlyDeposit);
    const targetAmount = Number(formData.requiredRetirementAmount);
    const currentSavings = Number(formData.currentSavings);
    
    // Using Goal Seek approximation
    let requiredRate = 0.05; // Start with 5%
    const maxIterations = 100;
    let iteration = 0;
    
    while (iteration < maxIterations) {
      let projectedAmount = currentSavings;
      const yearlyDeposit = monthlyDeposit * 12;
      
      for (let year = 1; year <= yearsToRetirement; year++) {
        projectedAmount = (projectedAmount + yearlyDeposit) * (1 + requiredRate);
      }
      
      const difference = projectedAmount - targetAmount;
      
      if (Math.abs(difference) < targetAmount * 0.01) { // Within 1% accuracy
        break;
      }
      
      if (projectedAmount < targetAmount) {
        requiredRate += 0.01;
      } else {
        requiredRate -= 0.005;
      }
      
      iteration++;
    }
    
    return requiredRate;
  };

  const determineRiskTolerance = (requiredReturn) => {
    if (requiredReturn <= 0.06) return 'conservative';
    if (requiredReturn <= 0.09) return 'moderate';
    return 'aggressive';
  };

  const calculateRetirement = () => {
    const requiredReturnRate = calculateRequiredReturn();
    setRequiredReturn(requiredReturnRate);
    
    const riskLevel = determineRiskTolerance(requiredReturnRate);
    setFormData(prev => ({ ...prev, riskTolerance: riskLevel }));

    const yearsToRetirement = formData.expectedRetirementAge - formData.age;
    const monthlyDeposit = Number(formData.monthlyDeposit);

    const projections = [];
    let currentSavings = Number(formData.currentSavings);
    let cumulativeContributions = currentSavings;
    let totalProjectedValue = currentSavings;

    for (let year = 1; year <= yearsToRetirement; year++) {
      const yearlyContribution = monthlyDeposit * 12;
      totalProjectedValue = (totalProjectedValue + yearlyContribution) * (1 + requiredReturnRate);
      cumulativeContributions += yearlyContribution;

      const inflationAdjustedValue = totalProjectedValue / Math.pow(1 + INFLATION_RATE, year);

      projections.push({
        year,
        totalValue: Math.round(totalProjectedValue),
        inflationAdjustedValue: Math.round(inflationAdjustedValue),
        cumulativeContributions: Math.round(cumulativeContributions),
      });
    }

    setRetirementPlan({
      futureValue: Math.round(totalProjectedValue),
      inflationAdjustedFinalValue: Math.round(totalProjectedValue / Math.pow(1 + INFLATION_RATE, yearsToRetirement)),
      monthlyDeposit,
      yearsToRetirement,
      totalContributions: Math.round(cumulativeContributions),
      requiredReturn: (requiredReturnRate * 100).toFixed(2),
      riskTolerance: riskLevel,
    });

    setProjectionData(projections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRetirement();
    localStorage.removeItem('formData'); // Clear the stored data after submission if desired
    setFormVisible(false); // Hide the form after submission
  };

  return (
    <div className="golden-way-container">
      <h1>Plan Your Golden Years</h1>
      <div className="inflation-info">
        <p>Calculated with {INFLATION_RATE * 100}% annual inflation rate</p>
      </div>
      <div className="form-container">
        {formVisible ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Current Savings (₹)</label>
              <input
                type="number"
                name="currentSavings"
                value={formData.currentSavings}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Monthly Deposit (₹)</label>
              <input
                type="number"
                name="monthlyDeposit"
                value={formData.monthlyDeposit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Expected Retirement Age</label>
              <input
                type="number"
                name="expectedRetirementAge"
                value={formData.expectedRetirementAge}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Required Amount at Retirement (₹)</label>
              <input
                type="number"
                name="requiredRetirementAmount"
                value={formData.requiredRetirementAmount}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Calculate Retirement Plan</button>
          </form>
        ) : (
          <div className="results">
            <h2>Your Retirement Plan</h2>
            <div className="result-item">
              <span>Required Return Rate:</span>
              <span>{retirementPlan.requiredReturn}%</span>
            </div>
            <div className="result-item">
              <span>Recommended Risk Profile:</span>
              <span style={{ textTransform: 'capitalize' }}>{retirementPlan.riskTolerance}</span>
            </div>
            <div className="result-item">
              <span>Expected Retirement Savings:</span>
              <span>₹{retirementPlan.futureValue.toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span>Inflation Adjusted Savings:</span>
              <span>₹{retirementPlan.inflationAdjustedFinalValue.toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span>Total Contributions:</span>
              <span>₹{retirementPlan.totalContributions.toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span>Monthly Investment Needed:</span>
              <span>₹{retirementPlan.monthlyDeposit.toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span>Years to Retirement:</span>
              <span>{retirementPlan.yearsToRetirement} years</span>
            </div>
          </div>
        )}

        {/* Projection Chart */}
        {projectionData.length > 0 && (
          <div className="projection-chart">
            <h2>Retirement Projection</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="totalValue" 
                  stroke="#8884d8" 
                  name="Total Investment Value" 
                />
                <Line 
                  type="monotone" 
                  dataKey="inflationAdjustedValue" 
                  stroke="#82ca9d" 
                  name="Inflation Adjusted Value" 
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeContributions" 
                  stroke="#ffc658" 
                  name="Cumulative Contributions" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default GoldenWay;
