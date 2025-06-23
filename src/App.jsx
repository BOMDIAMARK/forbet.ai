import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import './App.css';
import './styles/enhanced-ux.css';

// Páginas Públicas
import { LandingPage } from './pages/LandingPage';

// Páginas Protegidas
import { Dashboard } from './pages/Dashboard';
import { Predict } from './pages/Predict';
import { LiveMatches } from './pages/LiveMatches';
import { Teams } from './pages/Teams';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';

// Componentes
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

// Layout para páginas protegidas
function ProtectedLayout({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-16">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Layout público
function PublicLayout({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rota Pública */}
        <Route 
          path="/" 
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          } 
        />

        {/* Rotas Protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          } 
        />
        
        <Route 
          path="/predict" 
          element={
            <ProtectedLayout>
              <Predict />
            </ProtectedLayout>
          } 
        />
        
        <Route 
          path="/live" 
          element={
            <ProtectedLayout>
              <LiveMatches />
            </ProtectedLayout>
          } 
        />
        
        <Route 
          path="/teams" 
          element={
            <ProtectedLayout>
              <Teams />
            </ProtectedLayout>
          } 
        />
        
        <Route 
          path="/analytics" 
          element={
            <ProtectedLayout>
              <Analytics />
            </ProtectedLayout>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          } 
        />

        {/* Redirect para dashboard se logado, senão para landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

