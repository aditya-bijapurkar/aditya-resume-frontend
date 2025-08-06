import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './css/Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 