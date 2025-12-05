'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Filter, Calendar, TrendingUp, Award, Users, FileText,
  BarChart3, PieChart, Target, ArrowUp, ArrowDown, Printer, Share2,
  Eye, ChevronRight, BookOpen, GraduationCap, Clock, Star, Activity
} from 'lucide-react';

export default function AcademicReportsDetailedUI() {
  const [reportType, setReportType] = useState('student'); // student, class, subject, comprehensive
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [reportData, setReportData] = useState(null);

  // Mock data
  const students = [
    { id: 'ST001', name: 'Ahmed Hassan', class: 'Grade 9A' },
    { id: 'ST002', name: 'Fatima Ali', class: 'Grade 9A' },
    { id: 'ST003', name: 'Omar Ibrahim', class: 'Grade 9B' }
  ];

  const mockStudentReport = {
    student: { id: 'ST001', name: 'Ahmed Hassan', class: 'Grade 9A', rollNumber: '15' },
    term: 'Term 1',
    overallPerformance: {
      totalMarks: 750,
      obtainedMarks: 628,
      percentage: 83.7,
      grade: 'A',
      rank: 3,
      totalStudents: 35,
      attendance: 92
    },
    subjects: [
      { name: 'Mathematics', marks: 87, total: 100, grade: 'A', trend: 'up', improvement: 5 },
      { name: 'Physics', marks: 78, total: 100, grade: 'B', trend: 'stable', improvement: 0 },
      { name: 'Chemistry', marks: 82, total: 100, grade: 'A', trend: 'up', improvement: 3 },
      { name: 'Biology', marks: 91, total: 100, grade: 'A+', trend: 'up', improvement: 8 },
      { name: 'English', marks: 75, total: 100, grade: 'B', trend: 'down', improvement: -2 },
      { name: 'Islamic Studies', marks: 88, total: 100, grade: 'A', trend: 'up', improvement: 4 },
      { name: 'Arabic', marks: 79, total: 100, grade: 'B', trend: 'stable', improvement: 1 },
      { name: 'Computer Science', marks: 48, total: 50, grade: 'A+', trend: 'up', improvement: 6 }
    ],
    strengths: ['Strong analytical skills', 'Excellent in sciences', 'Consistent performer'],
    improvements: ['Focus on English grammar', 'Increase participation in discussions'],
    teacherRemarks: 'Ahmed is a dedicated student with strong academic performance. Continue the excellent work!',
    tahfizProgress: { memorized: 3, reviewing: 2, total: 30 }
  };

  const mockClassReport = {
    class: 'Grade 9A',
    term: 'Term 1',
    totalStudents: 35,
    statistics: {
      averageScore: 76.5,
      passRate: 91.4,
      excellenceRate: 34.3,
      highestScore: 95,
      lowestScore: 52
    },
    subjectPerformance: [
      { subject: 'Mathematics', avgScore: 74.2, passRate: 85.7, difficulty: 'medium' },
      { subject: 'Physics', avgScore: 79.5, passRate: 91.4, difficulty: 'easy' },
      { subject: 'Chemistry', avgScore: 72.1, passRate: 80.0, difficulty: 'hard' },
      { subject: 'Biology', avgScore: 81.3, passRate: 94.3, difficulty: 'easy' },
      { subject: 'English', avgScore: 76.8, passRate: 88.6, difficulty: 'medium' }
    ],
    topPerformers: [
      { name: 'Fatima Ali', percentage: 92.5, rank: 1 },
      { name: 'Yusuf Abdullah', percentage: 89.3, rank: 2 },
      { name: 'Ahmed Hassan', percentage: 83.7, rank: 3 }
    ],
    attendanceOverview: { average: 89.2, excellent: 20, good: 10, poor: 5 }
  };

  const generateReport = () => {
    // Simulate loading from localStorage or API
    if (reportType === 'student') {
      setReportData(mockStudentReport);
      localStorage.setItem(`report_student_${selectedStudent}_${selectedTerm}`, JSON.stringify(mockStudentReport));
    } else if (reportType === 'class') {
      setReportData(mockClassReport);
      localStorage.setItem(`report_class_${selectedClass}_${selectedTerm}`, JSON.stringify(mockClassReport));
    }
  };

  const downloadPDF = () => {
    alert('Generating PDF report... (Feature placeholder)');
  };

  const downloadExcel = () => {
    alert('Generating Excel report... (Feature placeholder)');
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />;
    return <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-emerald-600 dark:text-emerald-400';
    if (grade.includes('B')) return 'text-blue-600 dark:text-blue-400';
    if (grade.includes('C')) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Academic Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate comprehensive performance reports</p>
        </div>

        {/* Report Type Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg mb-6 inline-flex gap-2">
          {[
            { value: 'student', label: 'Student Report', icon: Users },
            { value: 'class', label: 'Class Report', icon: BookOpen },
            { value: 'subject', label: 'Subject Analysis', icon: Target },
            { value: 'comprehensive', label: 'Comprehensive', icon: BarChart3 }
          ].map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => setReportType(type.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  reportType === type.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Report Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Report Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportType === 'student' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Student
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Select Student</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.class})</option>
                  ))}
                </select>
              </div>
            )}

            {(reportType === 'class' || reportType === 'comprehensive') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Select Class</option>
                  <option value="Grade 9A">Grade 9A</option>
                  <option value="Grade 9B">Grade 9B</option>
                  <option value="Grade 10A">Grade 10A</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Term/Period
              </label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">Select Term</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={generateReport}
                disabled={!selectedTerm || (reportType === 'student' && !selectedStudent) || (reportType === 'class' && !selectedClass)}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Report Display - Student Report */}
        <AnimatePresence mode="wait">
          {reportData && reportType === 'student' && (
            <motion.div
              key="student-report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Student Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{reportData.student.name}</h2>
                    <div className="flex items-center gap-4 text-white/90">
                      <span>{reportData.student.id}</span>
                      <span>•</span>
                      <span>{reportData.student.class}</span>
                      <span>•</span>
                      <span>Roll No: {reportData.student.rollNumber}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold mb-1">{reportData.overallPerformance.grade}</div>
                    <div className="text-white/80">Overall Grade</div>
                  </div>
                </div>
              </div>

              {/* Overall Performance */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6">
                  <Award className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {reportData.overallPerformance.percentage}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Overall Percentage</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6">
                  <Target className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    #{reportData.overallPerformance.rank}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Class Rank (of {reportData.overallPerformance.totalStudents})
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6">
                  <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {reportData.overallPerformance.obtainedMarks}/{reportData.overallPerformance.totalMarks}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Marks</div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6">
                  <Clock className="w-10 h-10 text-amber-600 dark:text-amber-400 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {reportData.overallPerformance.attendance}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Attendance</div>
                </div>
              </div>

              {/* Subject-wise Performance */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subject-wise Performance</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Subject</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Marks</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Grade</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Trend</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {reportData.subjects.map((subject, idx) => (
                        <motion.tr
                          key={subject.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{subject.name}</td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            {subject.marks}/{subject.total}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-lg font-bold ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getTrendIcon(subject.trend)}
                              <span className={subject.improvement > 0 ? 'text-emerald-600 dark:text-emerald-400' : subject.improvement < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}>
                                {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${(subject.marks / subject.total) >= 0.8 ? 'bg-emerald-500' : (subject.marks / subject.total) >= 0.6 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                style={{ width: `${(subject.marks / subject.total) * 100}%` }}
                              />
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {reportData.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-emerald-800 dark:text-emerald-200">
                        <ArrowUp className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {reportData.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-amber-800 dark:text-amber-200">
                        <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Teacher Remarks */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">Teacher's Remarks</h3>
                <p className="text-blue-800 dark:text-blue-200">{reportData.teacherRemarks}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={downloadPDF}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={downloadExcel}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Excel
                </button>
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <Printer className="w-5 h-5" />
                  Print Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
