import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Goldenway.scss';

function GoldenWay() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    currentSavings: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    expectedRetirementAge: '',
    riskTolerance: 'moderate',
    expectedInflation: 3,
  });

  const [retirementPlan, setRetirementPlan] = useState(null);
  const [projectionData, setProjectionData] = useState([]);
  const [formVisible, setFormVisible] = useState(true); // Manage form visibility

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

  const calculateRetirement = () => {
    const yearsToRetirement = formData.expectedRetirementAge - formData.age;
    const monthlyInvestment = formData.monthlyIncome - formData.monthlyExpenses;

    const riskReturns = {
      conservative: 0.06,
      moderate: 0.08,
      aggressive: 0.10,
    };

    const annualReturn = riskReturns[formData.riskTolerance];
    const inflationRate = formData.expectedInflation / 100;

    const projections = [];
    let currentSavings = Number(formData.currentSavings);
    let cumulativeContributions = currentSavings;
    let totalProjectedValue = currentSavings;

    for (let year = 1; year <= yearsToRetirement; year++) {
      const yearlyContribution = monthlyInvestment * 12;
      totalProjectedValue = (totalProjectedValue + yearlyContribution) * (1 + annualReturn);
      cumulativeContributions += yearlyContribution;

      const inflationAdjustedValue = totalProjectedValue / Math.pow(1 + inflationRate, year);

      projections.push({
        year,
        totalValue: Math.round(totalProjectedValue),
        inflationAdjustedValue: Math.round(inflationAdjustedValue),
        cumulativeContributions: Math.round(cumulativeContributions),
      });
    }

    const futureValue = projections[projections.length - 1].totalValue;
    const inflationAdjustedFinalValue = projections[projections.length - 1].inflationAdjustedValue;

    setRetirementPlan({
      futureValue: Math.round(futureValue),
      inflationAdjustedFinalValue: Math.round(inflationAdjustedFinalValue),
      monthlyInvestment,
      yearsToRetirement,
      totalContributions: Math.round(cumulativeContributions),
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
      <div className="form-container">
        {formVisible ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
              <label>Monthly Income (₹)</label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Monthly Expenses (₹)</label>
              <input
                type="number"
                name="monthlyExpenses"
                value={formData.monthlyExpenses}
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
              <label>Risk Tolerance</label>
              <select
                name="riskTolerance"
                value={formData.riskTolerance}
                onChange={handleChange}
              >
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>

            <div className="form-group">
              <label>Expected Inflation Rate (%)</label>
              <input
                type="number"
                name="expectedInflation"
                value={formData.expectedInflation}
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
              <span>₹{retirementPlan.monthlyInvestment.toLocaleString()}</span>
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
