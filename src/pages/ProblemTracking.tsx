import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Camera, 
  MessageSquare, 
  ThumbsUp, 
  Share2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  category: string;
  status: 'reported' | 'ai-processed' | 'assigned' | 'in-progress' | 'verification' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: string;
  reportedBy: string;
  reportedAt: string;
  assignedTo?: {
    department: string;
    contact: string;
    phone: string;
    email: string;
  };
  progress: number;
  timeline: Array<{
    status: string;
    timestamp: string;
    description: string;
    photos?: string[];
    user?: string;
  }>;
  engagement: {
    views: number;
    supports: number;
    shares: number;
  };
  photos: {
    before: string[];
    during: string[];
    after: string[];
  };
}

const mockProblems: Problem[] = [
  {
    id: 'RPT-2024-001',
    title: 'Broken Street Light on MG Road',
    category: 'Street Lighting',
    status: 'in-progress',
    priority: 'high',
    location: 'MG Road, Sector 14, Delhi',
    reportedBy: 'Priya Sharma',
    reportedAt: '2024-01-15T10:30:00Z',
    assignedTo: {
      department: 'Municipal Corporation - Electrical Division',
      contact: 'Rajesh Kumar',
      phone: '+91-9876543210',
      email: 'rajesh.kumar@mcd.gov.in'
    },
    progress: 65,
    timeline: [
      {
        status: 'Reported',
        timestamp: '2024-01-15T10:30:00Z',
        description: 'Problem reported by citizen with photo evidence',
        photos: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300'],
        user: 'Priya Sharma'
      },
      {
        status: 'AI Processed',
        timestamp: '2024-01-15T10:35:00Z',
        description: 'Automatically categorized as Street Lighting - High Priority'
      },
      {
        status: 'Authority Assigned',
        timestamp: '2024-01-15T11:00:00Z',
        description: 'Assigned to Municipal Corporation - Electrical Division'
      },
      {
        status: 'In Progress',
        timestamp: '2024-01-16T09:00:00Z',
        description: 'Repair work initiated by maintenance team',
        photos: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300']
      }
    ],
    engagement: {
      views: 234,
      supports: 45,
      shares: 12
    },
    photos: {
      before: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300'],
      during: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300'],
      after: []
    }
  },
  {
    id: 'RPT-2024-002',
    title: 'Garbage Collection Issue',
    category: 'Waste Management',
    status: 'resolved',
    priority: 'medium',
    location: 'Green Park Extension, Delhi',
    reportedBy: 'Amit Singh',
    reportedAt: '2024-01-10T08:15:00Z',
    assignedTo: {
      department: 'Waste Management Department',
      contact: 'Sunita Devi',
      phone: '+91-9876543211',
      email: 'sunita.devi@mcd.gov.in'
    },
    progress: 100,
    timeline: [
      {
        status: 'Reported',
        timestamp: '2024-01-10T08:15:00Z',
        description: 'Garbage not collected for 3 days',
        user: 'Amit Singh'
      },
      {
        status: 'AI Processed',
        timestamp: '2024-01-10T08:20:00Z',
        description: 'Categorized as Waste Management - Medium Priority'
      },
      {
        status: 'Authority Assigned',
        timestamp: '2024-01-10T09:00:00Z',
        description: 'Assigned to Waste Management Department'
      },
      {
        status: 'In Progress',
        timestamp: '2024-01-10T14:00:00Z',
        description: 'Collection team dispatched to location'
      },
      {
        status: 'Verification',
        timestamp: '2024-01-11T10:00:00Z',
        description: 'Community confirmed garbage collection completed'
      },
      {
        status: 'Resolved',
        timestamp: '2024-01-11T10:30:00Z',
        description: 'Issue resolved successfully. Regular collection schedule restored.',
        photos: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300']
      }
    ],
    engagement: {
      views: 156,
      supports: 28,
      shares: 8
    },
    photos: {
      before: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300'],
      during: [],
      after: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300']
    }
  }
];

const ProblemTracking: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(mockProblems);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(problems[0]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'text-blue-600 bg-blue-100';
      case 'ai-processed': return 'text-purple-600 bg-purple-100';
      case 'assigned': return 'text-orange-600 bg-orange-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'verification': return 'text-indigo-600 bg-indigo-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reported': return <AlertCircle className="w-5 h-5" />;
      case 'ai-processed': return <TrendingUp className="w-5 h-5" />;
      case 'assigned': return <User className="w-5 h-5" />;
      case 'in-progress': return <Clock className="w-5 h-5" />;
      case 'verification': return <Eye className="w-5 h-5" />;
      case 'resolved': return <CheckCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesFilter = filter === 'all' || problem.status === filter;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
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
            Civic <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600">
            Track your reports and community progress in real-time
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="reported">Reported</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Problems List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1 space-y-4"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Reports</h2>
            {filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedProblem(problem)}
                className={`card-hover bg-white rounded-xl p-4 shadow-lg cursor-pointer border-2 transition-all ${
                  selectedProblem?.id === problem.id ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{problem.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{problem.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(problem.priority)}`}>
                    {problem.priority}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(problem.status)}`}>
                    {getStatusIcon(problem.status)}
                    <span className="capitalize">{problem.status.replace('-', ' ')}</span>
                  </div>
                  <span className="text-sm text-gray-500">#{problem.id}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{problem.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${problem.progress}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed View */}
          <div className="lg:col-span-2">
            {selectedProblem && (
              <motion.div
                key={selectedProblem.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Problem Header */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProblem.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedProblem.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(selectedProblem.reportedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{selectedProblem.reportedBy}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedProblem.priority)}`}>
                      {selectedProblem.priority} Priority
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Overall Progress</span>
                      <span>{selectedProblem.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedProblem.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>

                  {/* Engagement Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 text-blue-600 mb-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-bold">{selectedProblem.engagement.views}</span>
                      </div>
                      <span className="text-sm text-gray-600">Views</span>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 text-green-600 mb-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="font-bold">{selectedProblem.engagement.supports}</span>
                      </div>
                      <span className="text-sm text-gray-600">Supports</span>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 text-purple-600 mb-1">
                        <Share2 className="w-4 h-4" />
                        <span className="font-bold">{selectedProblem.engagement.shares}</span>
                      </div>
                      <span className="text-sm text-gray-600">Shares</span>
                    </div>
                  </div>
                </div>

                {/* Assigned Authority */}
                {selectedProblem.assignedTo && (
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Assigned Authority</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Department</p>
                        <p className="font-semibold text-gray-900">{selectedProblem.assignedTo.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Contact Person</p>
                        <p className="font-semibold text-gray-900">{selectedProblem.assignedTo.contact}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600">{selectedProblem.assignedTo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600">{selectedProblem.assignedTo.email}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Status Timeline</h3>
                  <div className="space-y-6">
                    {selectedProblem.timeline.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(item.status.toLowerCase().replace(' ', '-'))}`}>
                          {getStatusIcon(item.status.toLowerCase().replace(' ', '-'))}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{item.status}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(item.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{item.description}</p>
                          {item.user && (
                            <p className="text-sm text-blue-600">By: {item.user}</p>
                          )}
                          {item.photos && item.photos.length > 0 && (
                            <div className="flex space-x-2 mt-3">
                              {item.photos.map((photo, photoIndex) => (
                                <img
                                  key={photoIndex}
                                  src={photo}
                                  alt="Timeline photo"
                                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Photo Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Photo Timeline</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Camera className="w-4 h-4 mr-2 text-red-600" />
                        Before
                      </h4>
                      <div className="space-y-2">
                        {selectedProblem.photos.before.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt="Before"
                            className="w-full h-24 object-cover rounded-lg shadow-md"
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Camera className="w-4 h-4 mr-2 text-yellow-600" />
                        During
                      </h4>
                      <div className="space-y-2">
                        {selectedProblem.photos.during.length > 0 ? (
                          selectedProblem.photos.during.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt="During"
                              className="w-full h-24 object-cover rounded-lg shadow-md"
                            />
                          ))
                        ) : (
                          <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                            Work in progress
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Camera className="w-4 h-4 mr-2 text-green-600" />
                        After
                      </h4>
                      <div className="space-y-2">
                        {selectedProblem.photos.after.length > 0 ? (
                          selectedProblem.photos.after.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt="After"
                              className="w-full h-24 object-cover rounded-lg shadow-md"
                            />
                          ))
                        ) : (
                          <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                            {selectedProblem.status === 'resolved' ? 'Completed' : 'Pending completion'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>Support This Issue</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                    <Camera className="w-5 h-5" />
                    <span>Add Evidence</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>Contact Authority</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemTracking;