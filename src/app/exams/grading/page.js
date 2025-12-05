'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, Clock, AlertCircle, Filter, Search, Download,
  Eye, Edit, Award, Users, FileText, Calendar, ChevronRight,
  CheckSquare, BarChart3, TrendingUp, RefreshCw, Send, Zap,
  Target, Activity, BookOpen, GraduationCap, ArrowUpCircle
} from 'lucide-react';

export default function GradingDashboard() {
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExams, setSelectedExams] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // list or grid

  // Mock data - Submitted exams
  const submittedExams = [
    { id: 1, studentName: 'Ahmed Hassan', studentId: 'ST001', class: 'Grade 9A', exam: 'Mathematics Mid-Term', subject: 'Mathematics', status: 'pending', score: null, totalMarks: 100, submittedDate: '2025-12-05 09:30', questions: 45, autoGradable: 35, manualGrade: 10, priority: 'high' },
    { id: 2, studentName: 'Fatima Ali', studentId: 'ST002', class: 'Grade 9A', exam: 'Mathematics Mid-Term', subject: 'Mathematics', status: 'graded', score: 87, totalMarks: 100, submittedDate: '2025-12-05 09:25', questions: 45, autoGradable: 35, manualGrade: 10, priority: 'normal', gradedBy: 'Mr. Ahmed', gradedDate: '2025-12-05 14:30' },
    { id: 3, studentName: 'Omar Ibrahim', studentId: 'ST003', class: 'Grade 9B', exam: 'Physics Final', subject: 'Physics', status: 'grading', score: null, totalMarks: 150, submittedDate: '2025-12-04 15:45', questions: 60, autoGradable: 40, manualGrade: 20, priority: 'high' },
    { id: 4, studentName: 'Aisha Mohammed', studentId: 'ST004', class: 'Grade 10A', exam: 'English Quiz', subject: 'English', status: 'pending', score: null, totalMarks: 50, submittedDate: '2025-12-05 10:15', questions: 25, autoGradable: 15, manualGrade: 10, priority: 'normal' },
    { id: 5, studentName: 'Yusuf Abdullah', studentId: 'ST005', class: 'Grade 9A', exam: 'Mathematics Mid-Term', subject: 'Mathematics', status: 'graded', score: 92, totalMarks: 100, submittedDate: '2025-12-05 09:20', questions: 45, autoGradable: 35, manualGrade: 10, priority: 'normal', gradedBy: 'Mr. Ahmed', gradedDate: '2025-12-05 13:45' },
    { id: 6, studentName: 'Sarah Khan', studentId: 'ST006', class: 'Grade 10B', exam: 'Chemistry Lab Test', subject: 'Chemistry', status: 'auto-graded', score: 78, totalMarks: 100, submittedDate: '2025-12-04 11:30', questions: 30, autoGradable: 30, manualGrade: 0, priority: 'low', gradedBy: 'Auto-Grade System', gradedDate: '2025-12-04 11:31' },
    { id: 7, studentName: 'Hassan Ali', studentId: 'ST007', class: 'Grade 11A', exam: 'Biology Assessment', subject: 'Biology', status: 'pending', score: null, totalMarks: 80, submittedDate: '2025-12-05 08:00', questions: 40, autoGradable: 25, manualGrade: 15, priority: 'high' },
    { id: 8, studentName: 'Mariam Yusuf', studentId: 'ST008', class: 'Grade 9B', exam: 'Physics Final', subject: 'Physics', status: 'graded', score: 145, totalMarks: 150, submittedDate: '2025-12-04 15:50', questions: 60, autoGradable: 40, manualGrade: 20, priority: 'normal', gradedBy: 'Dr. Omar', gradedDate: '2025-12-05 10:00' }
  ];

  // Stats calculations
  const totalSubmissions = submittedExams.length;
  const pendingGrading = submittedExams.filter(e => e.status === 'pending' || e.status === 'grading').length;
  const gradedCount = submittedExams.filter(e => e.status === 'graded' || e.status === 'auto-graded').length;
  const avgCompletionTime = '2.5 hours';

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'Pending', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: Clock },
      grading: { label: 'In Progress', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Activity },
      graded: { label: 'Graded', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle },
      'auto-graded': { label: 'Auto-Graded', class: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: Zap }
    };
    return badges[status] || badges.pending;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'border-l-red-500',
      normal: 'border-l-blue-500',
      low: 'border-l-gray-500'
    };
    return colors[priority] || colors.normal;
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (percentage >= 60) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const toggleExamSelection = (examId) => {
    setSelectedExams(prev => 
      prev.includes(examId) ? prev.filter(id => id !== examId) : [...prev, examId]
    );
  };

  const selectAll = () => {
    setSelectedExams(selectedExams.length === submittedExams.length ? [] : submittedExams.map(e => e.id));
  };

  const filteredExams = submittedExams.filter(exam => {
    const matchesClass = filterClass === 'all' || exam.class === filterClass;
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    const matchesSubject = filterSubject === 'all' || exam.subject === filterSubject;
    const matchesSearch = exam.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesStatus && matchesSubject && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Grading Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Review and grade student exam submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{totalSubmissions}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{pendingGrading}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Grading</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{gradedCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Graded</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{avgCompletionTime}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Grading Time</div>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student name, exam, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">All Classes</option>
                <option value="Grade 9A">Grade 9A</option>
                <option value="Grade 9B">Grade 9B</option>
                <option value="Grade 10A">Grade 10A</option>
                <option value="Grade 10B">Grade 10B</option>
                <option value="Grade 11A">Grade 11A</option>
              </select>

              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="grading">In Progress</option>
                <option value="graded">Graded</option>
                <option value="auto-graded">Auto-Graded</option>
              </select>

              <button className="px-4 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedExams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 mb-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">{selectedExams.length} exam(s) selected</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Auto-Grade All
                </button>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Release Results
                </button>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Regrade Selected
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submissions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Exam Submissions</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={selectAll}
                  className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors text-sm"
                >
                  {selectedExams.length === submittedExams.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedExams.length === submittedExams.length}
                      onChange={selectAll}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Exam</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Submitted</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredExams.map((exam, idx) => {
                  const statusBadge = getStatusBadge(exam.status);
                  const StatusIcon = statusBadge.icon;
                  return (
                    <motion.tr
                      key={exam.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-900/50 border-l-4 ${getPriorityColor(exam.priority)} ${
                        selectedExams.includes(exam.id) ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedExams.includes(exam.id)}
                          onChange={() => toggleExamSelection(exam.id)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{exam.studentName}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{exam.studentId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{exam.exam}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{exam.subject}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{exam.class}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border inline-flex items-center gap-1 ${statusBadge.class}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {exam.score !== null ? (
                          <div>
                            <span className={`text-lg font-bold ${getScoreColor(exam.score, exam.totalMarks)}`}>
                              {exam.score}/{exam.totalMarks}
                            </span>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {Math.round((exam.score / exam.totalMarks) * 100)}%
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not graded</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {exam.submittedDate}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/exams/grading/${exam.id}`}
                            className="p-2 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 rounded-lg transition-colors"
                            title="Grade Exam"
                          >
                            <Edit className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </a>
                          <button className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </button>
                          <button className="p-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg transition-colors">
                            <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
