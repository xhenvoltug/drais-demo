'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, BookOpen, Calendar, TrendingUp, Award, AlertCircle, Clock,
  DollarSign, FileText, Activity, BarChart3, Target, Bell, MessageSquare,
  CheckCircle, XCircle, ArrowUp, ArrowDown, Eye, Download, Settings,
  GraduationCap, UserCheck, ClipboardList, PieChart, Zap, Star
} from 'lucide-react';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('week'); // week, month, term, year
  const [dashboardData, setDashboardData] = useState(null);

  // Load dashboard data from localStorage or mock API
  useEffect(() => {
    const savedData = localStorage.getItem('admin_dashboard_data');
    if (savedData) {
      setDashboardData(JSON.parse(savedData));
    } else {
      // Mock data
      const mockData = {
        overview: {
          totalStudents: 1247,
          totalTeachers: 87,
          totalClasses: 42,
          activeExams: 15,
          studentTrend: 5.2,
          teacherTrend: 2.1,
          classTrend: 0,
          examTrend: -3.5
        },
        academic: {
          averageAttendance: 92.5,
          averagePerformance: 78.3,
          passRate: 89.7,
          excellenceRate: 34.2,
          attendanceTrend: 1.2,
          performanceTrend: 3.4
        },
        financial: {
          totalRevenue: 45680000,
          collected: 38420000,
          pending: 7260000,
          collectionRate: 84.1,
          revenueTrend: 12.3
        },
        exams: {
          upcoming: 8,
          ongoing: 3,
          completed: 24,
          pendingGrading: 47,
          resultsPublished: 18
        },
        tahfiz: {
          activeStudents: 324,
          completedJuz: 892,
          averageProgress: 67.8,
          topMemorizers: 15
        },
        recentActivities: [
          { id: 1, type: 'exam', title: 'Mathematics Mid-Term completed', time: '2 hours ago', user: 'Grade 9A', icon: FileText, color: 'blue' },
          { id: 2, type: 'result', title: 'Physics results published', time: '5 hours ago', user: 'Dr. Omar', icon: Award, color: 'emerald' },
          { id: 3, type: 'alert', title: 'Low attendance alert for Grade 10B', time: '1 day ago', user: 'System', icon: AlertCircle, color: 'amber' },
          { id: 4, type: 'user', title: 'New teacher registered', time: '2 days ago', user: 'Ms. Sarah Ahmed', icon: Users, color: 'purple' },
          { id: 5, type: 'fee', title: 'Fee payment received', time: '3 days ago', user: 'ST001 - Ahmed Hassan', icon: DollarSign, color: 'emerald' }
        ],
        alerts: [
          { id: 1, type: 'critical', message: 'Exam schedule conflict detected for Grade 11A', priority: 'high' },
          { id: 2, type: 'warning', message: '5 pending result approvals', priority: 'medium' },
          { id: 3, type: 'info', message: 'Monthly report generation due in 3 days', priority: 'low' }
        ],
        upcomingEvents: [
          { id: 1, title: 'Parent-Teacher Meeting', date: '2025-12-10', type: 'meeting', participants: 120 },
          { id: 2, title: 'Final Examinations Begin', date: '2025-12-15', type: 'exam', participants: 850 },
          { id: 3, title: 'Tahfiz Competition', date: '2025-12-20', type: 'event', participants: 50 }
        ]
      };
      setDashboardData(mockData);
      localStorage.setItem('admin_dashboard_data', JSON.stringify(mockData));
    }
  }, []);

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend) => {
    if (trend > 0) return <ArrowUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    if (trend < 0) return <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />;
    return <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening in your school</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="term">This Term</option>
                <option value="year">This Year</option>
              </select>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(dashboardData.overview.studentTrend)}
                <span className={`text-sm font-semibold ${
                  dashboardData.overview.studentTrend > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {Math.abs(dashboardData.overview.studentTrend)}%
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {dashboardData.overview.totalStudents.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(dashboardData.overview.teacherTrend)}
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {Math.abs(dashboardData.overview.teacherTrend)}%
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {dashboardData.overview.totalTeachers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Teaching Staff</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(dashboardData.overview.classTrend)}
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">0%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {dashboardData.overview.totalClasses}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Classes</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(dashboardData.overview.examTrend)}
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                  {Math.abs(dashboardData.overview.examTrend)}%
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {dashboardData.overview.activeExams}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Exams</div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Academic Performance */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Academic Performance</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Attendance Rate</span>
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {dashboardData.academic.averageAttendance}%
                </div>
                <div className="w-full bg-blue-200 dark:bg-blue-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                    style={{ width: `${dashboardData.academic.averageAttendance}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg Performance</span>
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {dashboardData.academic.averagePerformance}%
                </div>
                <div className="w-full bg-purple-200 dark:bg-purple-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                    style={{ width: `${dashboardData.academic.averagePerformance}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pass Rate</span>
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  {dashboardData.academic.passRate}%
                </div>
                <div className="w-full bg-emerald-200 dark:bg-emerald-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                    style={{ width: `${dashboardData.academic.passRate}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Excellence Rate</span>
                  <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                  {dashboardData.academic.excellenceRate}%
                </div>
                <div className="w-full bg-amber-200 dark:bg-amber-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full"
                    style={{ width: `${dashboardData.academic.excellenceRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Alerts</h2>
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="space-y-3">
              {dashboardData.alerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    alert.priority === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                    alert.priority === 'medium' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
                    'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      alert.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                      alert.priority === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`} />
                    <div>
                      <p className={`text-sm font-medium ${
                        alert.priority === 'high' ? 'text-red-900 dark:text-red-100' :
                        alert.priority === 'medium' ? 'text-amber-900 dark:text-amber-100' :
                        'text-blue-900 dark:text-blue-100'
                      }`}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              View All Alerts
            </button>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {dashboardData.recentActivities.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-xl transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      activity.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                      activity.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' :
                      activity.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-gray-100 dark:bg-gray-900/30'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        activity.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        activity.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                        activity.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                        activity.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                        'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400">{activity.user}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {dashboardData.upcomingEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      event.type === 'exam' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                      event.type === 'meeting' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.participants} participants
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
