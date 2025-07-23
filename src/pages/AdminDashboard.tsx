import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  DollarSign,
  Brain,
  MessageSquare,
  Calendar,
  Filter,
  Download,
  Bell,
  Settings,
  Shield,
  Target,
  Zap,
  Eye,
  Phone,
  Mail,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalProblems: number;
  activeProblems: number;
  resolvedToday: number;
  avgResolutionTime: number;
  citizenSatisfaction: number;
  budgetUtilized: number;
  departmentEfficiency: number;
  aiAccuracy: number;
}

interface Problem {
  id: string;
  title: string;
  category: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: string;
  location: string;
  reportedAt: string;
  assignedDepartment: string;
  estimatedCost: number;
  aiScore: number;
  citizenReports: number;
}

interface Department {
  name: string;
  activeIssues: number;
  avgResolutionTime: number;
  efficiency: number;
  budget: number;
  budgetUsed: number;
}

const mockStats: DashboardStats = {
  totalProblems: 15847,
  activeProblems: 3456,
  resolvedToday: 127,
  avgResolutionTime: 4.2,
  citizenSatisfaction: 87.5,
  budgetUtilized: 68.3,
  departmentEfficiency: 82.1,
  aiAccuracy: 94.7
};

const mockProblems: Problem[] = [
  {
    id: 'RPT-2024-001',
    title: 'Water Pipeline Burst - Emergency',
    category: 'Water Supply',
    priority: 'urgent',
    status: 'In Progress',
    location: 'Sector 14, Delhi',
    reportedAt: '2024-01-16T08:30:00Z',
    assignedDepartment: 'Water Department',
    estimatedCost: 45000,
    aiScore: 9.2,
    citizenReports: 23
  },
  {
    id: 'RPT-2024-002',
    title: 'Street Light Maintenance Required',
    category: 'Infrastructure',
    priority: 'medium',
    status: 'Assigned',
    location: 'MG Road, Mumbai',
    reportedAt: '2024-01-15T14:20:00Z',
    assignedDepartment: 'Electrical Division',
    estimatedCost: 8500,
    aiScore: 7.8,
    citizenReports: 12
  }
];

const mockDepartments: Department[] = [
  {
    name: 'Water Department',
    activeIssues: 45,
    avgResolutionTime: 3.2,
    efficiency: 89,
    budget: 2500000,
    budgetUsed: 1650000
  },
  {
    name: 'Waste Management',
    activeIssues: 78,
    avgResolutionTime: 2.8,
    efficiency: 92,
    budget: 1800000,
    budgetUsed: 1200000
  },
  {
    name: 'Infrastructure',
    activeIssues: 34,
    avgResolutionTime: 5.1,
    efficiency: 76,
    budget: 3200000,
    budgetUsed: 2100000
  }
];

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [problems, setProblems] = useState<Problem[]>(mockProblems);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('today');
  const [selectedView, setSelectedView] = useState<'overview' | 'problems' | 'analytics' | 'departments'>('overview');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change: string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} from yesterday
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Civic <span className="gradient-text">Command Center</span>
              </h1>
              <p className="text-lg text-gray-600">
                Government dashboard for civic issue management and analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Bell className="w-4 h-4" />
                <span>Alerts (3)</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl p-2 mb-8"
        >
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'problems', label: 'Problem Triage', icon: <AlertTriangle className="w-4 h-4" /> },
              { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'departments', label: 'Departments', icon: <Users className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedView === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Dashboard */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Problems"
                value={stats.totalProblems.toLocaleString()}
                change="+12%"
                icon={<FileText className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
              />
              <StatCard
                title="Active Issues"
                value={stats.activeProblems.toLocaleString()}
                change="-5%"
                icon={<AlertTriangle className="w-6 h-6 text-orange-600" />}
                color="bg-orange-100"
              />
              <StatCard
                title="Resolved Today"
                value={stats.resolvedToday}
                change="+23%"
                icon={<CheckCircle className="w-6 h-6 text-green-600" />}
                color="bg-green-100"
              />
              <StatCard
                title="Avg Resolution Time"
                value={`${stats.avgResolutionTime} days`}
                change="-8%"
                icon={<Clock className="w-6 h-6 text-purple-600" />}
                color="bg-purple-100"
              />
            </div>

            {/* Performance Metrics */}
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  System Performance
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Citizen Satisfaction</span>
                      <span>{stats.citizenSatisfaction}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${stats.citizenSatisfaction}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>AI Accuracy</span>
                      <span>{stats.aiAccuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${stats.aiAccuracy}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Department Efficiency</span>
                      <span>{stats.departmentEfficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${stats.departmentEfficiency}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Budget Utilization</span>
                      <span>{stats.budgetUtilized}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${stats.budgetUtilized}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  AI Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-red-800">High Priority Alert</span>
                    </div>
                    <p className="text-sm text-red-700">
                      Water supply issues in Sector 14 require immediate attention. 
                      Recommend deploying emergency response team.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Resource Optimization</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Consider reallocating maintenance crew from low-activity areas 
                      to handle increased demand in central districts.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-800">Efficiency Improvement</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Implementing predictive maintenance could reduce response time 
                      by 15% based on historical data analysis.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Problem Triage */}
        {selectedView === 'problems' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Problem Triage System</h3>
                <div className="flex items-center space-x-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Priorities</option>
                    <option>Urgent Only</option>
                    <option>High Priority</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{problem.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(problem.priority)}`}>
                          {problem.priority}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          AI Score: {problem.aiScore}/10
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{problem.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(problem.reportedAt).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{problem.citizenReports} reports</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <DollarSign className="w-3 h-3" />
                          <span>₹{problem.estimatedCost.toLocaleString()}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Assigned to: <span className="font-medium">{problem.assignedDepartment}</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                        Reassign
                      </button>
                      <button className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700">
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics */}
        {selectedView === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                Problem Categories
              </h3>
              <div className="space-y-4">
                {[
                  { category: 'Water Supply', count: 234, percentage: 35, color: 'bg-blue-500' },
                  { category: 'Waste Management', count: 189, percentage: 28, color: 'bg-green-500' },
                  { category: 'Infrastructure', count: 156, percentage: 23, color: 'bg-orange-500' },
                  { category: 'Street Lighting', count: 94, percentage: 14, color: 'bg-yellow-500' }
                ].map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${item.color}`}></div>
                      <span className="font-medium text-gray-900">{item.category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{item.count}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Resolution Trends
              </h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">87.5%</div>
                  <div className="text-sm text-gray-600">Overall Resolution Rate</div>
                </div>
                <div className="space-y-3">
                  {[
                    { period: 'This Week', resolved: 127, total: 145, rate: 87.6 },
                    { period: 'Last Week', resolved: 134, total: 156, rate: 85.9 },
                    { period: 'This Month', resolved: 523, total: 598, rate: 87.5 },
                    { period: 'Last Month', resolved: 487, total: 567, rate: 85.9 }
                  ].map((item, index) => (
                    <div key={item.period} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{item.period}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{item.resolved}/{item.total}</div>
                        <div className="text-xs text-gray-600">{item.rate}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Departments */}
        {selectedView === 'departments' && (
          <div className="space-y-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                      <Phone className="w-4 h-4" />
                      <span>Contact</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                      <Mail className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{dept.activeIssues}</div>
                    <div className="text-sm text-gray-600">Active Issues</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{dept.avgResolutionTime}</div>
                    <div className="text-sm text-gray-600">Avg Resolution (days)</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">{dept.efficiency}%</div>
                    <div className="text-sm text-gray-600">Efficiency Score</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      ₹{(dept.budgetUsed / 100000).toFixed(1)}L
                    </div>
                    <div className="text-sm text-gray-600">Budget Used</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Budget Utilization</span>
                    <span>{Math.round((dept.budgetUsed / dept.budget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(dept.budgetUsed / dept.budget) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;