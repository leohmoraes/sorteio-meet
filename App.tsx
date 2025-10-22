
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ParticipantPage from './pages/ParticipantPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/:eventId" element={<AdminPage />} />
            <Route path="/join/:eventId" element={<ParticipantPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </HashRouter>
      </main>
    </div>
  );
};

export default App;
