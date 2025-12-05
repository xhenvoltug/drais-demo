'use client';

import React, { useState } from 'react';
import {
  BookOpen, TrendingUp, Award, Calendar, Clock,
  CheckCircle, AlertCircle, Star, BarChart3, Target,
  Book, ChevronRight, Filter, Search, Download, User,
  Trophy, Flame, Heart, MessageSquare, FileText, Activity
} from 'lucide-react';

export default function StudentTahfizPortfolio() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  // Mock student data
  const students = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      class: 'Class A',
      photo: null,
      juzCompleted: 12,
      currentJuz: 13,
      currentSurah: 'Ibrahim',
      accuracy: 98,
      attendance: 95,
      streak: 45,
      badges: ['Perfect Week', 'Tajweed Master', 'Consistency Star'],
      lastActivity: '2 hours ago',
      totalPages: 364,
      weeklyGoal: 15,
      weeklyCompleted: 18
    },
    {
      id: 2,
      name: 'Fatima Ali',
      class: 'Class B',
      photo: null,
      juzCompleted: 11,
      currentJuz: 12,
      currentSurah: 'Yusuf',
      accuracy: 96,
      attendance: 98,
      streak: 38,
      badges: ['Golden Reciter', 'Fast Learner', 'Top 5'],
      lastActivity: '3 hours ago',
      totalPages: 334,
      weeklyGoal: 15,
      weeklyCompleted: 16
    },
    {
      id: 3,
      name: 'Omar Khalil',
      class: 'Class A',
      photo: null,
      juzCompleted: 10,
      currentJuz: 11,
      currentSurah: 'Hud',
      accuracy: 95,
      attendance: 92,
      streak: 30,
      badges: ['Dedicated', 'Rising Star'],
      lastActivity: '1 day ago',
      totalPages: 304,
      weeklyGoal: 15,
      weeklyCompleted: 14
    },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Student Tahfiz Portfolio</h1>
          </div>
          <p className="text-emerald-100 text-lg">
            Comprehensive tracking of each student's Quran memorization journey
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Classes</option>
              <option value="Class A">Class A</option>
              <option value="Class B">Class B</option>
              <option value="Class C">Class C</option>
            </select>
            <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-emerald-500"
            >
              {/* Student Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                  {student.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{student.class}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                      <Flame className="w-4 h-4" />
                      {student.streak} day streak
                    </span>
                    <span className="text-xs text-gray-500">
                      Active {student.lastActivity}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-emerald-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {student.juzCompleted}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Juz Completed</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {student.accuracy}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {student.attendance}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Attendance</div>
                </div>
              </div>

              {/* Current Progress */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Currently Memorizing
                    </span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                      Juz {student.currentJuz} - {student.currentSurah}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Weekly Progress
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.weeklyCompleted}/{student.weeklyGoal} pages
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                      style={{ width: `${(student.weeklyCompleted / student.weeklyGoal) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {student.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900 dark:to-amber-900 text-yellow-800 dark:text-yellow-200 text-xs font-semibold rounded-full flex items-center gap-1"
                  >
                    <Award className="w-3 h-3" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Student Modal/View */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl font-bold">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{selectedStudent.name}</h2>
                      <p className="text-emerald-100">{selectedStudent.class}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatBox
                    icon={<Book className="w-5 h-5" />}
                    label="Total Pages"
                    value={selectedStudent.totalPages}
                    color="emerald"
                  />
                  <StatBox
                    icon={<Target className="w-5 h-5" />}
                    label="Juz Completed"
                    value={selectedStudent.juzCompleted}
                    color="blue"
                  />
                  <StatBox
                    icon={<TrendingUp className="w-5 h-5" />}
                    label="Accuracy"
                    value={`${selectedStudent.accuracy}%`}
                    color="purple"
                  />
                  <StatBox
                    icon={<Flame className="w-5 h-5" />}
                    label="Day Streak"
                    value={selectedStudent.streak}
                    color="orange"
                  />
                </div>

                {/* Juz Progress Grid */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Juz Progress (1-30)
                  </h3>
                  <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
                      <div
                        key={juz}
                        className={`aspect-square flex items-center justify-center rounded-lg font-bold text-sm ${
                          juz <= selectedStudent.juzCompleted
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
                            : juz === selectedStudent.currentJuz
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-2 border-blue-500'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                        }`}
                      >
                        {juz}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity Timeline */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <ActivityItem
                      icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                      title="Completed Juz 12"
                      description="Perfect recitation with 98% accuracy"
                      time="2 days ago"
                    />
                    <ActivityItem
                      icon={<Award className="w-5 h-5 text-yellow-500" />}
                      title="Earned 'Perfect Week' Badge"
                      description="100% attendance and completion for 7 days"
                      time="5 days ago"
                    />
                    <ActivityItem
                      icon={<Book className="w-5 h-5 text-blue-500" />}
                      title="Sabaki Session - Surah Yusuf"
                      description="Excellent tajweed, minor makhraj corrections"
                      time="1 week ago"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    View Full Report
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white mb-2`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

function ActivityItem({ icon, title, description, time }) {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{time}</div>
    </div>
  );
}
