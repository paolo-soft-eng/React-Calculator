import React, { useEffect } from 'react';
import { Link, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import '../src/css/DashboardStudent.css';
import ViewAttendance from './ViewAttendance';
import Notification from './Notification';
import GenerateQr from './GenerateQr';
import ViewProfile from './ViewProfile';

const DashboardStudent = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      setIsAuthenticated(false);
      navigate('/login', { replace: true }); // Ensure this runs properly
    }
  };
  
  

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1 className='textDashboard'>NSTP Monitoring Student Dashboard</h1>
        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/dashboard/viewAttendance" 
                className={location.pathname === '/dashboard/viewAttendance' ? 'active' : ''}>
                View Attendance
              </Link>
            </li>
            <li>
              <Link to="/dashboard/notif"
                className={location.pathname === '/dashboard/notif' ? 'active' : ''}>
                Notification
              </Link>
            </li>
            <li>
              <Link to="/dashboard/generateQr"
                className={location.pathname === '/dashboard/generateQr' ? 'active' : ''}>
                Generate QR Code
              </Link>
            </li>
            <li>
              <Link to="/dashboard/viewProfile"
                className={location.pathname === '/dashboard/viewProfile' ? 'active' : ''}>
                View Profile
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="dashboard">
        <main className="main-content">
          <Routes>
            <Route index element={<Navigate to="viewAttendance" replace />} />
            <Route path="viewAttendance" element={<ViewAttendance />} />
            <Route path="notif" element={<Notification />} />
            <Route path="generateQr" element={<GenerateQr />} />
            <Route path="viewProfile" element={<ViewProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardStudent;