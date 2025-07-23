import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Filter, 
  Search, 
  Layers, 
  Navigation, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Bell,
  Plus,
  Eye,
  BarChart3
} from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  category: string;
  status: 'urgent' | 'medium' | 'resolved';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  reportedAt: string;
  priority: number;
  engagement: {
    views: number;
    supports: number;
  };
}

interface MapFilters {
  problemType: string;
  status: string;
  timeframe: string;
  showHeatmap: boolean;
}

const mockProblems: Problem[] = [
  {
    id: 'RPT-001',
    title: 'Broken Street Light',
    category: 'Street Lighting',
    status: 'urgent',
    location: { lat: 28.6139, lng: 77.2090, address: 'Connaught Place, Delhi' },
    reportedAt: '2024-01-15T10:30:00Z',
    priority: 5,
    engagement: { views: 234, supports: 45 }
  },
  {
    id: 'RPT-002',
    title: 'Garbage Collection Issue',
    category: 'Waste Management',
    status: 'medium',
    location: { lat: 28.5355, lng: 77.3910, address: 'Sector 62, Noida' },
    reportedAt: '2024-01-14T08:15:00Z',
    priority: 3,
    engagement: { views: 156, supports: 28 }
  },
  {
    id: 'RPT-003',
    title: 'Pothole Repair Completed',
    category: 'Infrastructure',
    status: 'resolved',
    location: { lat: 28.4595, lng: 77.0266, address: 'Cyber City, Gurgaon' },
    reportedAt: '2024-01-10T14:20:00Z',
    priority: 4,
    engagement: { views: 89, supports: 67 }
  },
  {
    id: 'RPT-004',
    title: 'Water Supply Disruption',
    category: 'Water Supply',
    status: 'urgent',
    location: { lat: 28.7041, lng: 77.1025, address: 'Model Town, Delhi' },
    reportedAt: '2024-01-16T06:45:00Z',
    priority: 5,
    engagement: { views: 312, supports: 89 }
  },
  {
    id: 'RPT-005',
    title: 'Park Maintenance',
    category: 'Environment',
    status: 'medium',
    location: { lat: 28.6328, lng: 77.2197, address: 'Lodhi Gardens, Delhi' },
    reportedAt: '2024-01-13T16:30:00Z',
    priority: 2,
    engagement: { views: 145, supports: 23 }
  }
];

const neighborhoods = [
  { name: 'Connaught Place', problems: 12, resolved: 8 },
  { name: 'Sector 62', problems: 8, resolved: 5 },
  { name: 'Cyber City', problems: 15, resolved: 12 },
  { name: 'Model Town', problems: 6, resolved: 3 },
  { name: 'Lodhi Gardens', problems: 4, resolved: 2 }
];

const MapInterface: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(mockProblems);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [filters, setFilters] = useState<MapFilters>({
    problemType: 'all',
    status: 'all',
    timeframe: 'all',
    showHeatmap: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log('Location access denied')
      );
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-white" />;
      case 'medium': return <Clock className="w-4 h-4 text-white" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-white" />;
      default: return <MapPin className="w-4 h-4 text-white" />;
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesType = filters.problemType === 'all' || problem.category.toLowerCase().includes(filters.problemType.toLowerCase());
    const matchesStatus = filters.status === 'all' || problem.status === filters.status;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Community Problem <span className="gradient-text">Navigator</span>
          </h1>
          <p className="text-lg text-gray-600">
            Interactive map showing civic issues and community solutions across your city
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Controls */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Search */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-600" />
                Search Location
              </h3>
              <input
                type="text"
                placeholder="Search address or landmark..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Problem Type</label>
                  <select
                    value={filters.problemType}
                    onChange={(e) => setFilters(prev => ({ ...prev, problemType: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="street lighting">Street Lighting</option>
                    <option value="waste management">Waste Management</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="water supply">Water Supply</option>
                    <option value="environment">Environment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="urgent">Urgent</option>
                    <option value="medium">Medium</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
                  <select
                    value={filters.timeframe}
                    onChange={(e) => setFilters(prev => ({ ...prev, timeframe: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="heatmap"
                    checked={filters.showHeatmap}
                    onChange={(e) => setFilters(prev => ({ ...prev, showHeatmap: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="heatmap" className="ml-2 text-sm text-gray-700">Show Heat Map</label>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-green-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  Report Here
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  <Bell className="w-4 h-4 mr-2" />
                  Subscribe to Area
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate to Problem
                </button>
              </div>
            </div>

            {/* Neighborhood Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                Neighborhood Stats
              </h3>
              <div className="space-y-3">
                {neighborhoods.map((area, index) => (
                  <div key={area.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{area.name}</p>
                      <p className="text-sm text-gray-600">{area.problems} total issues</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{area.resolved} resolved</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((area.resolved / area.problems) * 100)}% success
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Map Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-bold text-gray-900">Live Problem Map</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Urgent</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Medium</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Resolved</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    <Layers className="w-4 h-4" />
                    <span>Toggle Layers</span>
                  </button>
                </div>
              </div>

              {/* Simulated Map */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-gray-300"></div>
                    ))}
                  </div>
                </div>

                {/* Problem Pins */}
                {filteredProblems.map((problem, index) => (
                  <motion.div
                    key={problem.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`absolute w-8 h-8 ${getStatusColor(problem.status)} rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform`}
                    style={{
                      left: `${20 + (index * 15) % 60}%`,
                      top: `${20 + (index * 12) % 60}%`
                    }}
                    onClick={() => setSelectedProblem(problem)}
                  >
                    {getStatusIcon(problem.status)}
                  </motion.div>
                ))}

                {/* User Location */}
                {userLocation && (
                  <div className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse" 
                       style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  </div>
                )}

                {/* Heat Map Overlay */}
                {filters.showHeatmap && (
                  <div className="absolute inset-0 bg-gradient-radial from-red-500 via-orange-500 to-transparent opacity-30"></div>
                )}
              </div>

              {/* Problem Details Panel */}
              {selectedProblem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 border-t border-gray-200 bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">{selectedProblem.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(selectedProblem.status)}`}>
                          {selectedProblem.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{selectedProblem.location.address}</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Reported on {new Date(selectedProblem.reportedAt).toLocaleDateString()}
                      </p>
                      
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{selectedProblem.engagement.views} views</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{selectedProblem.engagement.supports} supports</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      <button 
                        onClick={() => setSelectedProblem(null)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Map Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid md:grid-cols-4 gap-4 mt-6"
            >
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {filteredProblems.filter(p => p.status === 'urgent').length}
                </div>
                <div className="text-sm text-gray-600">Urgent Issues</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {filteredProblems.filter(p => p.status === 'medium').length}
                </div>
                <div className="text-sm text-gray-600">Medium Priority</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {filteredProblems.filter(p => p.status === 'resolved').length}
                </div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {Math.round((filteredProblems.filter(p => p.status === 'resolved').length / filteredProblems.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MapInterface;