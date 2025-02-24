import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/css/AuthPages.css';

const LogInSignUp = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        const response = await fetch('http://localhost/api/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                action: isLogin ? 'login' : 'signup'
            }),
            credentials: 'include',
            mode: 'cors',
        });

        const result = await response.json();

        if (result.status === 'success') {
            if (isLogin) {
                setSuccess('Login successful! Redirecting...');
                setIsAuthenticated(true);
                localStorage.setItem('userEmail', formData.email);
                localStorage.setItem('userName', result.user.name);

                if (result.nstp_exists) {
                    localStorage.setItem('userProgram', result.user.program);
                    navigate('/dashboard');
                } else {
                    navigate('/SelectNSTP', { 
                        state: { 
                            name: result.user.name, 
                            email: formData.email 
                        } 
                    });
                }
            } else {
                setSuccess('Registration successful! You can now login.');
                setTimeout(() => {
                    setIsLogin(true);
                    setSuccess('');
                    setFormData(prev => ({
                        ...prev,
                        name: '',
                        password: ''
                    }));
                }, 2000);
            }
        } else {
            setError(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again.');
    }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-container">
      <h1 className="greet">Welcome to NSTP Monitoring Management</h1>
      <div className="auth-card">
        <div className="card-header">
          <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
          <p className="card-description">
            {isLogin
              ? "Welcome back! Please enter your credentials."
              : "Create an account to get started."}
          </p>
        </div>

        {error && (
          <div className="message error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="message success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-content">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <div className="input-container">
                  <svg
                    className="input-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="name"
                    name="name"
                    placeholder="Rod Mark Buctuan"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-container">
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="pawlo@email.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-container">
                <svg
                  className="input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="form-input"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button type="submit" className="submit-button">
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p className="toggle-text">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-button"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInSignUp;