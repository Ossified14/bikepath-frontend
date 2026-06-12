import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Bike, User, LogOut } from 'lucide-react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import MapPage from './pages/MapPage'
import ActivityPage from './pages/ActivityPage'
import ProfilePage from './pages/ProfilePage'
import CommunityPage from './pages/CommunityPage'
import FriendsPage from './pages/FriendsPage'
import { getProfile } from './services/bikepathService'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(() => {
    // Ambil data user dari localStorage saat pertama kali load
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Hanya update userData jika token berubah atau ada event storage
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (token && saved) {
      setUserData(JSON.parse(saved));
    } else if (!token) {
      setUserData(null);
    }
  }, [location.pathname, token]);

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    setIsOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={token ? "/map" : "/"} className="nav-logo" onClick={closeMenu}>
          <Bike size={32} color="var(--z-blue)" />
          <span>BIKE<span>PATH</span></span>
        </Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {!token ? (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMenu}>LOGIN</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links" onClick={closeMenu}>SIGN UP</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/map" className="nav-links" onClick={closeMenu}>MAP</Link>
              </li>
              <li className="nav-item">
                <Link to="/activity" className="nav-links" onClick={closeMenu}>ACTIVITY</Link>
              </li>
              <li className="nav-item">
                <Link to="/community" className="nav-links" onClick={closeMenu}>COMMUNITY</Link>
              </li>
              <li className="nav-item">
                <Link to="/friends" className="nav-links" onClick={closeMenu}>FRIENDS</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-links profile-trigger" onClick={closeMenu}>
                  <div className="profile-avatar">
                    {userData?.avatar ? (
                      <img src={userData.avatar} alt="avatar" />
                    ) : (
                      <User size={20} color="#fff" />
                    )}
                  </div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
