import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

const SESSION_KEY = 'amh-admin-auth';

export const AdminApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
    } catch {
      return false;
    }
  });

  const handleLogin = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'authenticated');
    } catch {
      // Ignore
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore
    }
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};
