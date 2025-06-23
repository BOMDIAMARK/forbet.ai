import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Predictions } from './pages/Predictions';
import { Predict } from './pages/Predict';
import { LiveMatches } from './pages/LiveMatches';
import { Teams } from './pages/Teams';
import { Matches } from './pages/Matches';
import { Analytics } from './pages/Analytics';
import { Login } from './pages/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentPage, setCurrentPage] = useState('live'); // Começar na página AO VIVO

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'predictions':
        return <Predictions />;
      case 'predict':
        return <Predict />;
      case 'live':
        return <LiveMatches />;
      case 'teams':
        return <Teams />;
      case 'matches':
        return <Matches />;
      case 'analytics':
        return <Analytics />;
      default:
        return <LiveMatches />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="pl-16">
        <Header />
        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;

