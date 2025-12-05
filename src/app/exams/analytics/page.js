'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, PieChart, TrendingUp, TrendingDown, Download, Filter,
  Users, Award, Target, AlertTriangle, ChevronRight, Eye,
  FileText, Calendar, BookOpen, Zap, Activity, LineChart,
  Hash, Percent, ArrowUp, ArrowDown, Minus
} from 'lucide-react';

export default function ExamAnalytics() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedExam, setSelectedExam] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // overview, class, subject, student

  // Mock data - Class performance
  const classPerformance = [
    { class: 'Grade 9A', avgScore: 78, students: 35, passRate: 86, topScore: 95, lowestScore: 45, trend: 'up' },
    { class: 'Grade 9B', avgScore: 72, students: 32, passRate: 81, topScore: 92, lowestScore: 38, trend: 'up' },
    { class: 'Grade 10A', avgScore: 85, students: 38, passRate: 92, topScore: 98, lowestScore: 55, trend: 'up' },
    { class: 'Grade 10B', avgScore: 68, students: 40, passRate: 75, topScore: 88, lowestScore: 32, trend: 'down' },
    { class: 'Grade 11A', avgScore: 81, students: 30, passRate: 87, topScore: 96, lowestScore: 48, trend: 'stable' }
  ];

  // Mock data - Subject analytics
  const subjectAnalytics = [
    { subject: 'Mathematics', avgScore: 75, passRate: 82, failRate: 18, masteryLevel: 'good', commonMistakes: ['Algebraic equations', 'Geometry theorems'] },
    { subject: 'English', avgScore: 82, passRate: 90, failRate: 10, masteryLevel: 'excellent', commonMistakes: ['Grammar rules', 'Essay structure'] },
    { subject: 'Physics', avgScore: 70, passRate: 78, failRate: 22, masteryLevel: 'fair', commonMistakes: ['Newton\'s laws', 'Energy calculations'] },
    { subject: 'Chemistry', avgScore: 78, passRate: 85, failRate: 15, masteryLevel: 'good', commonMistakes: ['Chemical equations', 'Periodic table'] },
    { subject: 'Biology', avgScore: 80, passRate: 88, failRate: 12, masteryLevel: 'good', commonMistakes: ['Cell division', 'Genetics'] }
  ];

  // Mock data - Top performers
  const topPerformers = [
    { id: 1, name: 'Ahmed Hassan', class: 'Grade 10A', avgScore: 95, exams: 8, improvement: 12 },
    { id: 2, name: 'Fatima Ali', class: 'Grade 9A', avgScore: 93, exams: 7, improvement: 8 },
    { id: 3, name: 'Omar Ibrahim', class: 'Grade 11A', avgScore: 92, exams: 9, improvement: 15 },
    { id: 4, name: 'Aisha Mohammed', class: 'Grade 10B', avgScore: 90, exams: 8, improvement: 10 },
    { id: 5, name: 'Yusuf Abdullah', class: 'Grade 9B', avgScore: 89, exams: 7, improvement: 5 }
  ];

  // Mock data - Grade distribution
  const gradeDistribution = [
    { grade: 'A (90-100)', count: 145, percentage: 23 },
    { grade: 'B (80-89)', count: 198, percentage: 32 },
    { grade: 'C (70-79)', count: 156, percentage: 25 },
    { grade: 'D (60-69)', count: 87, percentage: 14 },
    { grade: 'F (0-59)', count: 39, percentage: 6 }
  ];

  // Mock data - Individual student analytics
  const studentAnalytics = [
    { id: 1, name: 'Ahmed Hassan', scores: [85, 88, 90, 92, 95], avgScore: 90, trend: 'improving', lastExam: 95, improvement: '+10%' },
    { id: 2, name: 'Fatima Ali', scores: [78, 82, 85, 88, 90], avgScore: 85, trend: 'improving', lastExam: 90, improvement: '+15%' },
    { id: 3, name: 'Omar Ibrahim', scores: [92, 90, 88, 85, 83], avgScore: 88, trend: 'declining', lastExam: 83, improvement: '-10%' }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-emerald-500" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getMasteryBadge = (level) => {
    const badges = {
      excellent: { label: 'Excellent', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      good: { label: 'Good', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      fair: { label: 'Fair', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      poor: { label: 'Needs Improvement', class: 'bg-red-500/20 text-red-400 border-red-500/30' }
    };
    return badges[level];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Exam Analytics & Reports</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive performance insights and trends</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <button className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'class', label: 'Class Analytics', icon: Users },
            { id: 'subject', label: 'Subject Analytics', icon: BookOpen },
            { id: 'student', label: 'Student Analytics', icon: Target }
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  viewMode === mode.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {mode.label}
              </motion.button>
            );
          })}
        </div>

        {/* Overview Mode */}
        {viewMode === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">48</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Exams</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1,250</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <Percent className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">84%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Overall Pass Rate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                    <Hash className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">77.5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
              </motion.div>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grade Distribution</h2>
              <div className="space-y-4">
                {gradeDistribution.map((grade, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{grade.grade}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{grade.count} students ({grade.percentage}%)</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${grade.percentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full ${
                          grade.grade.startsWith('A') ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                          grade.grade.startsWith('B') ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                          grade.grade.startsWith('C') ? 'bg-gradient-to-r from-purple-500 to-pink-600' :
                          grade.grade.startsWith('D') ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                          'bg-gradient-to-r from-red-500 to-pink-600'
                        }`}
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
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{student.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{student.class} • {student.exams} exams</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{student.avgScore}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Avg Score</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">+{student.improvement}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Improvement</div>
                      </div>
                      <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Class Analytics Mode */}
        {viewMode === 'class' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Class-Level Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Class</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Students</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Avg Score</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Pass Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Top Score</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Lowest Score</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Trend</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {classPerformance.map((cls, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{cls.class}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{cls.students}</td>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${
                          cls.avgScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                          cls.avgScore >= 70 ? 'text-blue-600 dark:text-blue-400' :
                          'text-amber-600 dark:text-amber-400'
                        }`}>
                          {cls.avgScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{cls.passRate}%</td>
                      <td className="px-6 py-4 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">{cls.topScore}%</td>
                      <td className="px-6 py-4 text-sm text-red-600 dark:text-red-400 font-semibold">{cls.lowestScore}%</td>
                      <td className="px-6 py-4">{getTrendIcon(cls.trend)}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subject Analytics Mode */}
        {viewMode === 'subject' && (
          <div className="space-y-6">
            {subjectAnalytics.map((subject, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{subject.subject}</h3>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-lg text-xs font-semibold border ${getMasteryBadge(subject.masteryLevel).class}`}>
                      {getMasteryBadge(subject.masteryLevel).label}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors">
                    View Details
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Score</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{subject.avgScore}%</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pass Rate</div>
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{subject.passRate}%</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fail Rate</div>
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">{subject.failRate}%</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Common Mistakes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.commonMistakes.map((mistake, i) => (
                      <span key={i} className="px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-lg text-sm">
                        {mistake}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Student Analytics Mode */}
        {viewMode === 'student' && (
          <div className="space-y-6">
            {studentAnalytics.map((student, idx) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{student.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">Individual Performance Analysis</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{student.avgScore}%</div>
                    <div className={`text-lg font-semibold ${
                      student.trend === 'improving' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {student.improvement}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Score Progression</h4>
                    <div className="space-y-3">
                      {student.scores.map((score, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-16">Exam {i + 1}</span>
                          <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white w-12">{score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center p-8 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl">
                      <Activity className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Performance Status</div>
                      <div className={`text-2xl font-bold capitalize ${
                        student.trend === 'improving' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {student.trend}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
