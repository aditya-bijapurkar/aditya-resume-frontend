import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/details', label: 'Projcet Details', icon: '🚧'},
    { path: '/experience', label: 'Experience', icon: '📈' },
    { path: '/skills', label: 'Skills', icon: '🛠️' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <div className="sidebar">
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
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 