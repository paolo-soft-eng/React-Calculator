import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../src/css/Select.css";

const SelectNSTP = ({ setIsAuthenticated }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email } = location.state || {};

  if (!location.state) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      setError("Please select a program.");
      return;
    }

    try {
      const response = await fetch('http://localhost/api/selectProgram.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          program: selectedOption,
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSuccess("Program selected successfully! Redirecting to dashboard...");
        setError("");
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(result.message);
        setSuccess("");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
      setSuccess("");
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const modifiedName = name ? name.split(" ").map(capitalize).join(" ") : "";

  return (
    <div className="select-nstp-container">
      <div className="background-text">
        <h1>Welcome, {modifiedName}</h1>
      </div>

      <div className="select-box">
        <h2>Select NSTP Program</h2>
        <label htmlFor="nstp-select">Choose your program:</label>
        <select id="nstp-select" value={selectedOption} onChange={handleChange}>
          <option value="">Please select</option>
          <option value="CWTS">CWTS</option>
          <option value="ROTC">ROTC</option>
        </select>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default SelectNSTP;