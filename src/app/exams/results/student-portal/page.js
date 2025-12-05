'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Download, Eye, Calendar, BookOpen, FileText, TrendingUp,
  CheckCircle, XCircle, Clock, AlertCircle, ChevronRight, Star,
  BarChart3, Target, Activity, ArrowUp, ArrowDown, Printer,
  Share2, MessageSquare, Lock, Unlock, Search, Filter
} from 'lucide-react';

export default function StudentResultPortal() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock student data
  const studentInfo = {
    name: 'Ahmed Hassan',
    studentId: 'ST001',
    class: 'Grade 9A',
    rollNumber: '15',
    section: 'A'
  };

  // Mock exam results
  const examResults = [
    {
      id: 1,
      examName: 'Mathematics Mid-Term Examination',
      subject: 'Mathematics',
      date: '2025-12-05',
      totalMarks: 100,
      obtainedMarks: 87,
      percentage: 87,
      grade: 'A',
      status: 'published',
      rank: 3,
      totalStudents: 35,
      passingMarks: 40,
      teacherName: 'Mr. Ahmed Ibrahim',
      feedback: 'Excellent work! Your problem-solving approach is clear and methodical. Keep up the great work.',
      detailedSolution: true,
      allowDownload: true,
      questions: [
        { id: 1, title: 'Pythagorean Theorem', marks: 10, obtained: 9, feedback: 'Good explanation, minor error in final step' },
        { id: 2, title: 'Circle Area', marks: 5, obtained: 5, feedback: 'Perfect!' },
        { id: 3, title: 'Quadratic Equations', marks: 10, obtained: 8, feedback: 'Correct method, computational error' },
        { id: 4, title: 'Prime Numbers', marks: 15, obtained: 14, feedback: 'Excellent understanding' },
        { id: 5, title: 'Speed Problem', marks: 8, obtained: 7, feedback: 'Good working shown' }
      ]
    },
    {
      id: 2,
      examName: 'Physics Final Examination',
      subject: 'Physics',
      date: '2025-12-04',
      totalMarks: 150,
      obtainedMarks: 128,
      percentage: 85.3,
      grade: 'A',
      status: 'published',
      rank: 5,
      totalStudents: 32,
      passingMarks: 60,
      teacherName: 'Dr. Omar Khalid',
      feedback: 'Very good performance. Your understanding of kinematics is solid.',
      detailedSolution: true,
      allowDownload: true
    },
    {
      id: 3,
      examName: 'English Quiz',
      subject: 'English',
      date: '2025-12-03',
      totalMarks: 50,
      obtainedMarks: 42,
      percentage: 84,
      grade: 'A',
      status: 'published',
      rank: 8,
      totalStudents: 35,
      passingMarks: 20,
      teacherName: 'Ms. Sarah Ahmed',
      feedback: 'Good work on grammar. Essay could use more supporting examples.',
      detailedSolution: false,
      allowDownload: true
    },
    {
      id: 4,
      examName: 'Chemistry Lab Test',
      subject: 'Chemistry',
      date: '2025-12-02',
      totalMarks: 100,
      obtainedMarks: 78,
      percentage: 78,
      grade: 'B',
      status: 'published',
      rank: 12,
      totalStudents: 30,
      passingMarks: 40,
      teacherName: 'Dr. Fatima Ali',
      feedback: 'Good practical skills. Review stoichiometry calculations.',
      detailedSolution: true,
      allowDownload: true
    },
    {
      id: 5,
      examName: 'Biology Assessment',
      subject: 'Biology',
      date: '2025-11-30',
      totalMarks: 80,
      obtainedMarks: null,
      percentage: null,
      grade: null,
      status: 'pending',
      rank: null,
      totalStudents: 28,
      passingMarks: 32,
      teacherName: 'Mr. Hassan Yusuf',
      feedback: null,
      detailedSolution: false,
      allowDownload: false
    }
  ];

  const getGradeColor = (grade) => {
    const colors = {
      'A': 'from-emerald-500 to-teal-600',
      'B': 'from-blue-500 to-indigo-600',
      'C': 'from-amber-500 to-orange-600',
      'D': 'from-orange-500 to-red-600',
      'F': 'from-red-500 to-rose-600'
    };
    return colors[grade] || 'from-gray-500 to-gray-600';
  };

  const getStatusBadge = (status) => {
    const badges = {
      published: { label: 'Published', class: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', icon: CheckCircle },
      pending: { label: 'Pending', class: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-500/30', icon: Clock },
      locked: { label: 'Locked', class: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-500/30', icon: Lock }
    };
    return badges[status] || badges.pending;
  };

  const calculateOverallPerformance = () => {
    const published = examResults.filter(e => e.status === 'published' && e.percentage !== null);
    if (published.length === 0) return { avg: 0, total: 0, passed: 0 };
    
    const avg = published.reduce((sum, e) => sum + e.percentage, 0) / published.length;
    const passed = published.filter(e => e.percentage >= (e.passingMarks / e.totalMarks * 100)).length;
    
    return {
      avg: avg.toFixed(1),
      total: published.length,
      passed: passed,
      passRate: ((passed / published.length) * 100).toFixed(1)
    };
  };

  const performance = calculateOverallPerformance();

  const filteredResults = examResults.filter(exam => {
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    const matchesSearch = exam.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Exam Results</h1>
          <p className="text-gray-600 dark:text-gray-400">View your grades, feedback, and detailed solutions</p>
        </div>

        {/* Student Info Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white">
              {studentInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{studentInfo.name}</h2>
              <div className="flex items-center gap-4 text-white/90">
                <span>{studentInfo.studentId}</span>
                <span>•</span>
                <span>{studentInfo.class}</span>
                <span>•</span>
                <span>Roll No: {studentInfo.rollNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{performance.avg}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overall Average</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{performance.passed}/{performance.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Exams Passed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{performance.passRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pass Rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{examResults.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Exams</div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Exam Results List */}
        <div className="space-y-6">
          {filteredResults.map((exam, idx) => {
            const statusBadge = getStatusBadge(exam.status);
            const StatusIcon = statusBadge.icon;
            const isPassed = exam.percentage && exam.percentage >= (exam.passingMarks / exam.totalMarks * 100);

            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exam.examName}</h3>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border inline-flex items-center gap-1 ${statusBadge.class}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusBadge.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {exam.subject}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {exam.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {exam.teacherName}
                        </span>
                      </div>
                    </div>

                    {exam.grade && (
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${getGradeColor(exam.grade)} flex items-center justify-center shadow-lg`}>
                        <div className="text-4xl font-bold text-white">{exam.grade}</div>
                      </div>
                    )}
                  </div>

                  {exam.status === 'published' && exam.percentage !== null && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {exam.obtainedMarks}/{exam.totalMarks}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Marks Obtained</div>
                        </div>

                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{exam.percentage}%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Percentage</div>
                        </div>

                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            #{exam.rank}/{exam.totalStudents}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Class Rank</div>
                        </div>

                        <div className={`p-4 ${isPassed ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'} rounded-xl`}>
                          <div className={`text-2xl font-bold ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {isPassed ? 'PASS' : 'FAIL'}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                        </div>
                      </div>

                      {exam.feedback && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                          <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">Teacher's Feedback</h4>
                              <p className="text-indigo-800 dark:text-indigo-200">{exam.feedback}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exam.questions && (
                        <div className="mb-4">
                          <button
                            onClick={() => setSelectedExam(selectedExam === exam.id ? null : exam.id)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span className="font-semibold text-gray-900 dark:text-white">View Question-wise Breakdown</span>
                            <ChevronRight className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${selectedExam === exam.id ? 'rotate-90' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {selectedExam === exam.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 space-y-3"
                              >
                                {exam.questions.map((q, qIdx) => (
                                  <div key={q.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-semibold text-gray-900 dark:text-white">Question {qIdx + 1}: {q.title}</span>
                                      <span className={`font-bold ${q.obtained === q.marks ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                        {q.obtained}/{q.marks}
                                      </span>
                                    </div>
                                    {q.feedback && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">{q.feedback}</p>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        {exam.detailedSolution && (
                          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Solutions
                          </button>
                        )}
                        {exam.allowDownload && (
                          <button className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Report
                          </button>
                        )}
                        <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-2">
                          <Printer className="w-4 h-4" />
                          Print
                        </button>
                        <button className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg font-semibold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </>
                  )}

                  {exam.status === 'pending' && (
                    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-center">
                      <Clock className="w-12 h-12 text-amber-600 dark:text-amber-400 mx-auto mb-3" />
                      <p className="text-amber-900 dark:text-amber-100 font-semibold">
                        Results are being graded and will be published soon
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
