'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, TrendingUp, TrendingDown, Award, Users, FileText,
  Calendar, Download, Filter, Target, AlertCircle, CheckCircle,
  ArrowUp, ArrowDown, Minus, Eye, ChevronRight, PieChart,
  Activity, BookOpen, GraduationCap, Zap, Clock, Star
} from 'lucide-react';

export default function GradeAnalytics() {
  const [viewMode, setViewMode] = useState('overview'); // overview, class, subject, student, question
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  // Mock analytics data
  const overviewStats = {
    totalExams: 45,
    gradedExams: 38,
    pendingExams: 7,
    averageScore: 76.5,
    averageGradingTime: '2.5 hours',
    passRate: 82.3
  };

  const gradeDistribution = [
    { grade: 'A', range: '90-100', count: 12, percentage: 26.7, color: 'emerald' },
    { grade: 'B', range: '80-89', count: 15, percentage: 33.3, color: 'blue' },
    { grade: 'C', range: '70-79', count: 10, percentage: 22.2, color: 'amber' },
    { grade: 'D', range: '60-69', count: 5, percentage: 11.1, color: 'orange' },
    { grade: 'F', range: '0-59', count: 3, percentage: 6.7, color: 'red' }
  ];

  const classPerformance = [
    { class: 'Grade 9A', students: 35, avgScore: 82.5, passRate: 91.4, highestScore: 98, lowestScore: 65, trend: 'up', improvement: 5.2 },
    { class: 'Grade 9B', students: 32, avgScore: 78.3, passRate: 87.5, highestScore: 95, lowestScore: 58, trend: 'up', improvement: 3.1 },
    { class: 'Grade 10A', students: 38, avgScore: 75.2, passRate: 84.2, highestScore: 93, lowestScore: 52, trend: 'down', improvement: -2.3 },
    { class: 'Grade 10B', students: 30, avgScore: 71.8, passRate: 76.7, highestScore: 90, lowestScore: 48, trend: 'stable', improvement: 0.5 },
    { class: 'Grade 11A', students: 28, avgScore: 85.6, passRate: 96.4, highestScore: 100, lowestScore: 72, trend: 'up', improvement: 7.8 }
  ];

  const subjectAnalysis = [
    { subject: 'Mathematics', exams: 12, avgScore: 74.2, passRate: 83.3, difficulty: 'medium', commonMistakes: ['Algebra', 'Geometry', 'Word Problems'] },
    { subject: 'Physics', exams: 8, avgScore: 79.5, passRate: 87.5, difficulty: 'medium', commonMistakes: ['Kinematics', 'Energy', 'Circuits'] },
    { subject: 'Chemistry', exams: 10, avgScore: 72.1, passRate: 80.0, difficulty: 'hard', commonMistakes: ['Stoichiometry', 'Equations', 'Organic'] },
    { subject: 'Biology', exams: 9, avgScore: 81.3, passRate: 91.1, difficulty: 'easy', commonMistakes: ['Genetics', 'Ecology', 'Cell Structure'] },
    { subject: 'English', exams: 6, avgScore: 76.8, passRate: 85.7, difficulty: 'medium', commonMistakes: ['Grammar', 'Essay Structure', 'Vocabulary'] }
  ];

  const questionAnalysis = [
    { questionId: 'Q1', type: 'MCQ', avgScore: 4.2, maxScore: 5, successRate: 84, difficulty: 'easy', attempts: 45 },
    { questionId: 'Q2', type: 'Short Answer', avgScore: 6.5, maxScore: 10, successRate: 65, difficulty: 'medium', attempts: 45 },
    { questionId: 'Q3', type: 'Essay', avgScore: 10.5, maxScore: 15, successRate: 70, difficulty: 'medium', attempts: 45 },
    { questionId: 'Q4', type: 'Multi-part', avgScore: 5.8, maxScore: 10, successRate: 58, difficulty: 'hard', attempts: 45 },
    { questionId: 'Q5', type: 'Problem Solving', avgScore: 4.9, maxScore: 8, successRate: 61, difficulty: 'hard', attempts: 45 }
  ];

  const topPerformers = [
    { name: 'Mariam Yusuf', studentId: 'ST008', avgScore: 95.3, exams: 5, class: 'Grade 9B' },
    { name: 'Yusuf Abdullah', studentId: 'ST005', avgScore: 92.8, exams: 5, class: 'Grade 9A' },
    { name: 'Fatima Ali', studentId: 'ST002', avgScore: 89.5, exams: 5, class: 'Grade 9A' }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-500/30',
      hard: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-500/30'
    };
    return colors[difficulty] || colors.medium;
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (percentage >= 60) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Grade Analytics & Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive performance insights and analysis</p>
        </div>

        {/* View Mode Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg mb-6 inline-flex gap-2">
          {[
            { value: 'overview', label: 'Overview', icon: BarChart3 },
            { value: 'class', label: 'Class Analysis', icon: Users },
            { value: 'subject', label: 'Subject Analysis', icon: BookOpen },
            { value: 'student', label: 'Student Analysis', icon: GraduationCap },
            { value: 'question', label: 'Question Analysis', icon: Target }
          ].map(mode => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.value}
                onClick={() => setViewMode(mode.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  viewMode === mode.value
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Classes</option>
              <option value="Grade 9A">Grade 9A</option>
              <option value="Grade 9B">Grade 9B</option>
              <option value="Grade 10A">Grade 10A</option>
              <option value="Grade 10B">Grade 10B</option>
              <option value="Grade 11A">Grade 11A</option>
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="term">This Term</option>
              <option value="year">This Year</option>
            </select>

            <button className="px-6 py-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-2 ml-auto">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{overviewStats.totalExams}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Exams</div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{overviewStats.gradedExams}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Graded</div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{overviewStats.pendingExams}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{overviewStats.averageScore}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Score</div>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{overviewStats.passRate}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pass Rate</div>
                </div>

                <div className="bg-gradient-to-br from-rose-500/10 to-red-600/10 border border-rose-500/30 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{overviewStats.averageGradingTime}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Time</div>
                </div>
              </div>

              {/* Grade Distribution Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grade Distribution</h2>
                <div className="space-y-4">
                  {gradeDistribution.map((item, idx) => (
                    <div key={item.grade}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 flex items-center justify-center font-bold text-white`}>
                            {item.grade}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{item.range}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{item.count} students</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.percentage}%</div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 h-3 rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Performers</h2>
                <div className="space-y-4">
                  {topPerformers.map((student, idx) => (
                    <div key={student.studentId} className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        idx === 0 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
                        idx === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        'bg-gradient-to-r from-orange-500 to-amber-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white">{student.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{student.studentId} • {student.class}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{student.avgScore}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{student.exams} exams</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'class' && (
            <motion.div
              key="class"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Class Performance Analysis</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Class</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Students</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Avg Score</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Pass Rate</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Range</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Trend</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {classPerformance.map((cls, idx) => (
                        <motion.tr
                          key={cls.class}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{cls.class}</td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{cls.students}</td>
                          <td className="px-6 py-4">
                            <span className={`text-lg font-bold ${getScoreColor(cls.avgScore, 100)}`}>
                              {cls.avgScore}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{cls.passRate}%</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {cls.lowestScore} - {cls.highestScore}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getTrendIcon(cls.trend)}
                              <span className={`font-semibold ${
                                cls.improvement > 0 ? 'text-emerald-600 dark:text-emerald-400' :
                                cls.improvement < 0 ? 'text-red-600 dark:text-red-400' :
                                'text-gray-600 dark:text-gray-400'
                              }`}>
                                {cls.improvement > 0 ? '+' : ''}{cls.improvement}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 rounded-lg transition-colors">
                              <ChevronRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'subject' && (
            <motion.div
              key="subject"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {subjectAnalysis.map((subject, idx) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{subject.subject}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{subject.exams} exams analyzed</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(subject.difficulty)}`}>
                      {subject.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{subject.avgScore}%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Average Score</div>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{subject.passRate}%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Pass Rate</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Common Mistakes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.commonMistakes.map((mistake, idx) => (
                        <span key={idx} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-medium">
                          {mistake}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {viewMode === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Question-Level Analysis</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Identify difficult questions and areas for improvement</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Question</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Avg Score</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Success Rate</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Difficulty</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Attempts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {questionAnalysis.map((question, idx) => (
                        <motion.tr
                          key={question.questionId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{question.questionId}</td>
                          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{question.type}</td>
                          <td className="px-6 py-4">
                            <span className={`font-bold ${getScoreColor(question.avgScore, question.maxScore)}`}>
                              {question.avgScore}/{question.maxScore}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-20">
                                <div
                                  className={`h-2 rounded-full ${
                                    question.successRate >= 70 ? 'bg-emerald-500' :
                                    question.successRate >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${question.successRate}%` }}
                                />
                              </div>
                              <span className="font-semibold text-gray-900 dark:text-white">{question.successRate}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{question.attempts}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
