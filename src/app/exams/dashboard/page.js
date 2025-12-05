'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, Users, FileText, TrendingUp, AlertCircle,
  CheckCircle, Search, Filter, Download, Plus, Eye, Edit,
  Trash2, BarChart3, PieChart, Target, BookOpen, Award,
  ClipboardCheck, PlayCircle, PauseCircle, XCircle
} from 'lucide-react';

export default function ExamsDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data - Overview stats
  const stats = [
    { id: 1, label: 'Total Exams', value: 48, change: '+12%', icon: FileText, color: 'from-blue-500 to-indigo-600', bgColor: 'from-blue-500/10 to-indigo-600/10', borderColor: 'border-blue-500/30' },
    { id: 2, label: 'Upcoming Exams', value: 12, change: 'This Week', icon: Calendar, color: 'from-purple-500 to-pink-600', bgColor: 'from-purple-500/10 to-pink-600/10', borderColor: 'border-purple-500/30' },
    { id: 3, label: 'Total Students', value: 1250, change: '45 Classes', icon: Users, color: 'from-emerald-500 to-teal-600', bgColor: 'from-emerald-500/10 to-teal-600/10', borderColor: 'border-emerald-500/30' },
    { id: 4, label: 'Grading Progress', value: '87%', change: '156 Pending', icon: TrendingUp, color: 'from-amber-500 to-orange-600', bgColor: 'from-amber-500/10 to-orange-600/10', borderColor: 'border-amber-500/30' }
  ];

  // Mock data - Upcoming exams
  const upcomingExams = [
    { id: 1, title: 'Mathematics Mid-Term Exam', class: 'Grade 9A', term: 'First Term', subject: 'Mathematics', date: '2025-12-10', time: '09:00 AM', duration: '2 hours', students: 35, status: 'scheduled', type: 'Mid-Term' },
    { id: 2, title: 'English Literature Quiz', class: 'Grade 10B', term: 'First Term', subject: 'English', date: '2025-12-12', time: '10:30 AM', duration: '1 hour', students: 40, status: 'scheduled', type: 'Quiz' },
    { id: 3, title: 'Physics Final Exam', class: 'Grade 11A', term: 'First Term', subject: 'Physics', date: '2025-12-15', time: '02:00 PM', duration: '3 hours', students: 32, status: 'scheduled', type: 'Final' },
    { id: 4, title: 'Chemistry Lab Test', class: 'Grade 9B', term: 'First Term', subject: 'Chemistry', date: '2025-12-16', time: '11:00 AM', duration: '1.5 hours', students: 28, status: 'scheduled', type: 'Lab Test' }
  ];

  // Mock data - Recently completed
  const completedExams = [
    { id: 1, title: 'Biology Mid-Term Exam', class: 'Grade 10A', subject: 'Biology', date: '2025-12-03', students: 38, graded: 38, avgScore: 78, status: 'graded' },
    { id: 2, title: 'History Essay Test', class: 'Grade 11B', subject: 'History', date: '2025-12-02', students: 35, graded: 28, avgScore: 72, status: 'grading' },
    { id: 3, title: 'Computer Science Quiz', class: 'Grade 9A', subject: 'Computer Science', date: '2025-12-01', students: 40, graded: 40, avgScore: 85, status: 'graded' },
    { id: 4, title: 'Geography Map Test', class: 'Grade 8B', subject: 'Geography', date: '2025-11-30', students: 32, graded: 30, avgScore: 68, status: 'grading' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'scheduled': { label: 'Scheduled', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'ongoing': { label: 'Ongoing', class: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'grading': { label: 'Grading', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      'graded': { label: 'Completed', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' }
    };
    return badges[status] || badges.scheduled;
  };

  const getExamTypeColor = (type) => {
    const colors = {
      'Quiz': 'bg-purple-500/20 text-purple-400',
      'Mid-Term': 'bg-blue-500/20 text-blue-400',
      'Final': 'bg-red-500/20 text-red-400',
      'Lab Test': 'bg-emerald-500/20 text-emerald-400'
    };
    return colors[type] || 'bg-slate-500/20 text-slate-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Examination Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage exams, schedules, and results</p>
          </div>
          <motion.a
            href="/exams/create"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Exam
          </motion.a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-2xl p-6 shadow-lg dark:shadow-none`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{stat.change}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search exams by class, term, subject, or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Exams</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
              <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2">
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Exams</h2>
            <a href="/exams/schedule" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              View Calendar →
            </a>
          </div>
          <div className="space-y-4">
            {upcomingExams.map((exam, idx) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exam.title}</h3>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getExamTypeColor(exam.type)}`}>
                        {exam.type}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(exam.status).class}`}>
                        {getStatusBadge(exam.status).label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{exam.class}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FileText className="w-4 h-4" />
                        <span>{exam.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{exam.time} • {exam.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{exam.students} Students Enrolled</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 rounded-lg transition-colors"
                      title="Edit Exam"
                    >
                      <Edit className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                      title="Cancel Exam"
                    >
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recently Completed Exams */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recently Completed</h2>
            <a href="/exams/results" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              View All Results →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Exam Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Students</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Grading</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Avg Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {completedExams.map((exam, idx) => (
                  <motion.tr
                    key={exam.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{exam.title}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{exam.subject}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{exam.class}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{exam.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{exam.students}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all"
                            style={{ width: `${(exam.graded / exam.students) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          {exam.graded}/{exam.students}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${
                        exam.avgScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                        exam.avgScore >= 60 ? 'text-blue-600 dark:text-blue-400' :
                        'text-amber-600 dark:text-amber-400'
                      }`}>
                        {exam.avgScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(exam.status).class}`}>
                        {getStatusBadge(exam.status).label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="View Results">
                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Analytics">
                          <BarChart3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Export">
                          <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
