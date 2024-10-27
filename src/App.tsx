import React, { useState } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import FinancialReport from './pages/FinancialReport';
import { Report } from './types/navigation';
import { mockCategories } from './data/mockData';
import { useDarkMode } from './hooks/useDarkMode';
import * as authService from './services/auth';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      localStorage.setItem('accessToken', response.accessToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const renderContent = () => {
    if (selectedReport?.path === '/financial/revenue') {
      return <FinancialReport />;
    }
    return <Dashboard />;
  };

  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={handleLogin} 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        error={error}
      />
    );
  }

  return (
    <Layout
      categories={mockCategories}
      user={user}
      darkMode={darkMode}
      onToggleDarkMode={() => setDarkMode(!darkMode)}
      onSelectReport={setSelectedReport}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;