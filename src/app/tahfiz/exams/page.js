'use client';

import React, { useState } from 'react';
import {
  FileText, Calendar, Clock, Users, BookOpen, CheckCircle,
  XCircle, AlertCircle, Star, TrendingUp, Award, Plus,
  Edit, Trash2, Eye, Download, Filter, Search, Play
} from 'lucide-react';

export default function TahfizExams() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock exam data
  const exams = [
    {
      id: 1,
      title: 'Juz 1-5 Comprehensive Test',
      type: 'written',
      date: '2024-12-15',
      time: '09:00 AM',
      duration: 120,
      juzRange: '1-5',
      totalMarks: 100,
      studentsEnrolled: 45,
      status: 'upcoming',
      examiner: 'Sheikh Abdullah'
    },
    {
      id: 2,
      title: 'Surah Al-Baqarah Oral Test',
      type: 'oral',
      date: '2024-12-20',
      time: '10:00 AM',
      duration: 30,
      juzRange: '1-3',
      totalMarks: 50,
      studentsEnrolled: 52,
      status: 'upcoming',
      examiner: 'Ustadh Omar'
    },
    {
      id: 3,
      title: 'Tajweed Rules Assessment',
      type: 'practical',
      date: '2024-12-10',
      time: '11:00 AM',
      duration: 60,
      juzRange: 'All',
      totalMarks: 75,
      studentsEnrolled: 48,
      status: 'completed',
      examiner: 'Sheikh Hassan',
      avgScore: 68,
      passRate: 85
    },
  ];

  // Recent results
  const recentResults = [
    {
      id: 1,
      studentName: 'Ahmed Hassan',
      examTitle: 'Tajweed Rules Assessment',
      score: 72,
      totalMarks: 75,
      grade: 'A',
      date: '2024-12-10',
      status: 'passed'
    },
    {
      id: 2,
      studentName: 'Fatima Ali',
      examTitle: 'Tajweed Rules Assessment',
      score: 68,
      totalMarks: 75,
      grade: 'B+',
      date: '2024-12-10',
      status: 'passed'
    },
    {
      id: 3,
      studentName: 'Omar Khalil',
      examTitle: 'Tajweed Rules Assessment',
      score: 45,
      totalMarks: 75,
      grade: 'C',
      date: '2024-12-10',
      status: 'failed'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'ongoing':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'written':
        return <FileText className="w-5 h-5" />;
      case 'oral':
        return <BookOpen className="w-5 h-5" />;
      case 'practical':
        return <Star className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'text-green-600 dark:text-green-400';
    if (grade === 'B' || grade === 'B+') return 'text-blue-600 dark:text-blue-400';
    if (grade === 'C' || grade === 'C+') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Tahfiz Exams & Assessments</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Create, manage, and evaluate Quran memorization tests
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-semibold flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create New Exam
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Calendar className="w-8 h-8" />}
            title="Upcoming Exams"
            value="2"
            subtitle="Next 7 days"
            color="blue"
          />
          <StatCard
            icon={<Users className="w-8 h-8" />}
            title="Total Students"
            value="145"
            subtitle="Enrolled in exams"
            color="emerald"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Average Score"
            value="68%"
            subtitle="Last 3 exams"
            color="purple"
          />
          <StatCard
            icon={<CheckCircle className="w-8 h-8" />}
            title="Pass Rate"
            value="85%"
            subtitle="This term"
            color="green"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'upcoming'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Upcoming (2)
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'completed'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Completed (1)
          </button>
          <button
            onClick={() => setSelectedTab('results')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'results'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Results
          </button>
        </div>

        {/* Exams List */}
        {(selectedTab === 'upcoming' || selectedTab === 'completed') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {exams
              .filter(exam => exam.status === selectedTab)
              .map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-emerald-500"
                >
                  <div className="p-6 space-y-4">
                    {/* Exam Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                          {getTypeIcon(exam.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {exam.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Examiner: {exam.examiner}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(exam.status)}`}>
                        {exam.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Exam Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(exam.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{exam.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span>Juz {exam.juzRange}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{exam.studentsEnrolled} students</span>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                        {exam.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {exam.duration} minutes • {exam.totalMarks} marks
                      </span>
                    </div>

                    {/* Results (for completed exams) */}
                    {exam.status === 'completed' && (
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                        <div className="text-center p-3 bg-green-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {exam.avgScore}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Avg Score</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {exam.passRate}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Pass Rate</div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {exam.status === 'upcoming' ? (
                        <>
                          <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <Play className="w-4 h-4" />
                            Start Exam
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Results
                          </button>
                          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Export
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Results Tab */}
        {selectedTab === 'results' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recent Exam Results
                </h2>
                <div className="flex gap-4">
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white">
                    <option>All Exams</option>
                    <option>Tajweed Rules Assessment</option>
                    <option>Juz 1-5 Test</option>
                  </select>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Exam
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                            {result.studentName.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {result.studentName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {result.examTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {result.score}/{result.totalMarks}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round((result.score / result.totalMarks) * 100)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-2xl font-bold ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                          result.status === 'passed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {result.status === 'passed' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          {result.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(result.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    emerald: 'from-emerald-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
