'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import {
  Users, BookOpen, TrendingUp, Award, AlertCircle, CheckCircle,
  MessageSquare, FileText, Download, Send, Filter, Search,
  ChevronDown, ChevronUp, Star, Clock, Target, Flame, Eye,
  Calendar, BarChart3, Zap, Trophy, Bell, PlayCircle
} from 'lucide-react';

export default function TutorDashboard() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [sortBy, setSortBy] = useState('progress');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Mock data
  const classes = [
    { id: 'all', name: 'All Classes', count: 45 },
    { id: 'grade-5a', name: 'Grade 5A', count: 15 },
    { id: 'grade-5b', name: 'Grade 5B', count: 15 },
    { id: 'grade-6a', name: 'Grade 6A', count: 15 }
  ];

  const students = [
    { id: 1, name: 'Ahmed Hassan', class: 'Grade 5A', avatar: null, progress: 85, juzCompleted: 12, lastActivity: '2 hours ago', accuracy: 94, streak: 15, mode: 'Quran Only', needsAttention: false },
    { id: 2, name: 'Fatima Ali', class: 'Grade 5A', avatar: null, progress: 92, juzCompleted: 18, lastActivity: '1 day ago', accuracy: 96, streak: 22, mode: 'With Translation', needsAttention: false },
    { id: 3, name: 'Omar Khalil', class: 'Grade 5B', avatar: null, progress: 78, juzCompleted: 10, lastActivity: '5 hours ago', accuracy: 88, streak: 8, mode: 'Quran Only', needsAttention: true },
    { id: 4, name: 'Aisha Mohammed', class: 'Grade 6A', avatar: null, progress: 95, juzCompleted: 20, lastActivity: '30 mins ago', accuracy: 98, streak: 30, mode: 'With Translation', needsAttention: false },
    { id: 5, name: 'Yusuf Ibrahim', class: 'Grade 5A', avatar: null, progress: 72, juzCompleted: 8, lastActivity: '3 days ago', accuracy: 82, streak: 3, mode: 'Quran Only', needsAttention: true },
    { id: 6, name: 'Maryam Abdullah', class: 'Grade 5B', avatar: null, progress: 88, juzCompleted: 15, lastActivity: '1 hour ago', accuracy: 91, streak: 12, mode: 'With Translation', needsAttention: false },
    { id: 7, name: 'Hassan Ali', class: 'Grade 6A', avatar: null, progress: 81, juzCompleted: 11, lastActivity: '6 hours ago', accuracy: 89, streak: 10, mode: 'Quran Only', needsAttention: false },
    { id: 8, name: 'Zainab Osman', class: 'Grade 5B', avatar: null, progress: 90, juzCompleted: 16, lastActivity: '2 hours ago', accuracy: 93, streak: 18, mode: 'With Translation', needsAttention: false },
    { id: 9, name: 'Ibrahim Yusuf', class: 'Grade 5A', avatar: null, progress: 68, juzCompleted: 6, lastActivity: '2 days ago', accuracy: 79, streak: 5, mode: 'Quran Only', needsAttention: true },
    { id: 10, name: 'Khadija Ahmed', class: 'Grade 6A', avatar: null, progress: 93, juzCompleted: 19, lastActivity: '45 mins ago', accuracy: 95, streak: 25, mode: 'With Translation', needsAttention: false }
  ];

  const alerts = [
    { id: 1, type: 'attention', student: 'Omar Khalil', message: 'Accuracy dropped below 90% - Needs extra practice', severity: 'high', icon: AlertCircle, color: 'red' },
    { id: 2, type: 'attention', student: 'Yusuf Ibrahim', message: 'Inactive for 3 days - Follow up recommended', severity: 'high', icon: AlertCircle, color: 'red' },
    { id: 3, type: 'attention', student: 'Ibrahim Yusuf', message: 'Streak at risk - Only 5 days', severity: 'medium', icon: Flame, color: 'amber' },
    { id: 4, type: 'recommendation', student: 'Fatima Ali', message: 'Ready for Juz 19 - Assign new practice', severity: 'low', icon: Trophy, color: 'emerald' },
    { id: 5, type: 'recommendation', student: 'Aisha Mohammed', message: 'Top performer - Consider advanced challenges', severity: 'low', icon: Star, color: 'purple' }
  ];

  const recommendations = [
    { id: 1, title: 'Assign Juz 8 Quiz to Grade 5A', students: 15, action: 'Assign Quiz', icon: Award },
    { id: 2, title: 'Schedule Tajweed Review Session', students: 8, action: 'Schedule', icon: Calendar },
    { id: 3, title: 'Send Progress Reports to Parents', students: 45, action: 'Send Reports', icon: FileText }
  ];

  const filteredStudents = students
    .filter(s => selectedClass === 'all' || s.class === classes.find(c => c.id === selectedClass)?.name)
    .sort((a, b) => {
      switch (sortBy) {
        case 'progress': return b.progress - a.progress;
        case 'accuracy': return b.accuracy - a.accuracy;
        case 'streak': return b.streak - a.streak;
        case 'activity': return a.lastActivity.localeCompare(b.lastActivity);
        default: return 0;
      }
    });

  const toggleStudent = (id) => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Tutor Dashboard</h1>
              <p className="text-slate-400">Manage your classes and track student progress</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Data</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-purple-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">45</div>
                  <div className="text-xs text-purple-400">Total Students</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-emerald-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">86%</div>
                  <div className="text-xs text-emerald-400">Avg Progress</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-8 h-8 text-amber-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-xs text-amber-400">Need Attention</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Star className="w-8 h-8 text-blue-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">91%</div>
                  <div className="text-xs text-blue-400">Avg Accuracy</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Alerts & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Alerts Panel */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Alerts & Recommendations</h2>
                <div className="space-y-3">
                  {alerts.map((alert) => {
                    const Icon = alert.icon;
                    const colors = {
                      red: 'from-red-500 to-pink-600',
                      amber: 'from-amber-500 to-orange-600',
                      emerald: 'from-emerald-500 to-teal-600',
                      purple: 'from-purple-500 to-pink-600'
                    };
                    return (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-4 p-4 bg-slate-900/50 border border-slate-700/30 rounded-xl hover:bg-slate-900/70 transition-all group cursor-pointer"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colors[alert.color]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm mb-1">{alert.student}</h3>
                          <p className="text-slate-400 text-sm">{alert.message}</p>
                        </div>
                        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold">
                          View
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Recommendations */}
            <div>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  {recommendations.map((rec) => {
                    const Icon = rec.icon;
                    return (
                      <motion.div
                        key={rec.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-700/30 rounded-xl hover:border-indigo-500/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm">{rec.title}</h3>
                            <div className="text-xs text-slate-400">{rec.students} students</div>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg text-sm font-semibold transition-colors">
                          {rec.action}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Class Overview Table */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Class Selector */}
                <div className="flex flex-wrap gap-2">
                  {classes.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClass(cls.id)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        selectedClass === cls.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cls.name} ({cls.count})
                    </button>
                  ))}
                </div>

                {/* Search & Sort */}
                <div className="flex items-center gap-3 ml-auto">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="progress">Sort by Progress</option>
                    <option value="accuracy">Sort by Accuracy</option>
                    <option value="streak">Sort by Streak</option>
                    <option value="activity">Sort by Activity</option>
                  </select>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedStudents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-between"
                >
                  <span className="text-white font-semibold">
                    {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
                  </span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                    <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      Assign Practice
                    </button>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Generate Reports
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedStudents.length === filteredStudents.length}
                        onChange={selectAll}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Progress</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Last Activity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Accuracy</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Streak</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Mode</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredStudents.map((student, idx) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`hover:bg-slate-900/30 transition-colors ${student.needsAttention ? 'bg-red-500/5' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => toggleStudent(student.id)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-semibold flex items-center gap-2">
                              {student.name}
                              {student.needsAttention && (
                                <AlertCircle className="w-4 h-4 text-red-400" />
                              )}
                            </div>
                            <div className="text-sm text-slate-400">{student.class}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  student.progress >= 90 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                  student.progress >= 75 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                                  'bg-gradient-to-r from-amber-500 to-orange-600'
                                }`}
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-white font-semibold text-sm min-w-[50px]">
                            {student.progress}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Juz {student.juzCompleted}/30</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Clock className="w-4 h-4" />
                          {student.lastActivity}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-bold ${
                          student.accuracy >= 95 ? 'text-emerald-400' :
                          student.accuracy >= 85 ? 'text-blue-400' :
                          'text-amber-400'
                        }`}>
                          {student.accuracy}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Flame className={`w-4 h-4 ${student.streak >= 20 ? 'text-orange-400' : 'text-slate-500'}`} />
                          <span className="text-white font-semibold text-sm">{student.streak}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">
                          {student.mode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-slate-400 hover:text-indigo-400" />
                          </button>
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <MessageSquare className="w-4 h-4 text-slate-400 hover:text-purple-400" />
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
    </div>
  );
}
