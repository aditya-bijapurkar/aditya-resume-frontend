import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './css/Sidebar.css';

const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/experience', label: 'My Experience', icon: '📈' },
    { path: '/skills', label: 'My Certifications', icon: '🛠️' },
    { path: '/details', label: 'Project Overview', icon: '🚧'},
    { path: '/cost', label: 'Cost Analysis', icon: '💰' },
    { path: '/contact', label: 'Contact Me', icon: '📧' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-main-content">
            <div className="sidebar-header">
              <h2>Portfolio</h2>
            </div>
            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="sidebar-footer">
            <p>© 2026. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
