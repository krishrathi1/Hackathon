import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Landing from './pages/Landing';
import ReportProblem from './pages/ReportProblem';
import ProblemTracking from './pages/ProblemTracking';
import MapInterface from './pages/MapInterface';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/report" element={<ReportProblem />} />
            <Route path="/tracking" element={<ProblemTracking />} />
            <Route path="/map" element={<MapInterface />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;
