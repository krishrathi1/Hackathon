import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Flag, Users, BarChart3, Map, Trophy, Shield } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 glass shadow-lg"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="gandhi-spectacles"></div>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Digital Civic</h1>
              <p className="text-xs text-blue-600 font-medium">Revolution</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Flag className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/report"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/report'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Report Problem</span>
            </Link>
            <Link
              to="/tracking"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/tracking'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Track Progress</span>
            </Link>
            <Link
              to="/map"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/map'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </Link>
            <Link
              to="/leaderboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/leaderboard'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                location.pathname === '/admin'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-blue-50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-blue-100"
          >
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === '/'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Flag className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/report"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === '/report'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Report Problem</span>
              </Link>
              <Link
                to="/tracking"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === '/tracking'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Track Progress</span>
              </Link>
              <Link
                to="/map"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === '/map'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>Map View</span>
              </Link>
              <Link
                to="/leaderboard"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === '/leaderboard'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Leaderboard</span>
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === '/admin'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
