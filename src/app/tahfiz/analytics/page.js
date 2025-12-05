'use client';

import React, { useState } from 'react';
import {
  BarChart3, Search, Filter, Download, TrendingUp, Users,
  BookOpen, Award, Clock, Target, Star, ChevronDown, ChevronUp,
  ArrowUpDown, Calendar, Zap, Trophy, AlertCircle
} from 'lucide-react';

export default function TahfizPerformanceAnalytics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterJuz, setFilterJuz] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const students = [
    { id: 1, name: 'Ahmed Hassan', class: 'Advanced', juzCompleted: 15, mistakes: 23, revisionStreak: 42, lastHalaqa: '2025-12-04', performance: 4.8 },
    { id: 2, name: 'Fatima Ali', class: 'Advanced', juzCompleted: 12, mistakes: 18, revisionStreak: 35, lastHalaqa: '2025-12-04', performance: 4.6 },
    { id: 3, name: 'Omar Khalil', class: 'Beginner', juzCompleted: 3, mistakes: 45, revisionStreak: 12, lastHalaqa: '2025-12-03', performance: 4.2 },
    { id: 4, name: 'Aisha Mohammed', class: 'Advanced', juzCompleted: 18, mistakes: 12, revisionStreak: 58, lastHalaqa: '2025-12-05', performance: 4.9 },
    { id: 5, name: 'Yusuf Ibrahim', class: 'Beginner', juzCompleted: 2, mistakes: 67, revisionStreak: 8, lastHalaqa: '2025-12-02', performance: 3.5 },
    { id: 6, name: 'Maryam Abdullah', class: 'Revision', juzCompleted: 20, mistakes: 15, revisionStreak: 64, lastHalaqa: '2025-12-05', performance: 4.7 },
    { id: 7, name: 'Hassan Malik', class: 'Advanced', juzCompleted: 16, mistakes: 21, revisionStreak: 48, lastHalaqa: '2025-12-04', performance: 4.5 },
    { id: 8, name: 'Zainab Ahmed', class: 'Beginner', juzCompleted: 4, mistakes: 52, revisionStreak: 15, lastHalaqa: '2025-12-03', performance: 3.9 },
  ];

  const tutors = [
    { id: 1, name: 'Ustadh Ibrahim', halaqas: 3, students: 24, avgProgress: 73, pendingAssessments: 5, efficiency: 4.8 },
    { id: 2, name: 'Ustadh Khalid', halaqas: 2, students: 18, avgProgress: 68, pendingAssessments: 3, efficiency: 4.5 },
    { id: 3, name: 'Ustadha Amina', halaqas: 2, students: 15, avgProgress: 82, pendingAssessments: 2, efficiency: 4.9 },
  ];

  // Surah mastery grid (top 10 students x 10 Surahs)
  const topStudents = students.slice(0, 10);
  const surahs = [
    'Al-Fatiha', 'Al-Baqarah', 'Al-Imran', 'An-Nisa', 'Al-Maidah',
    'Al-Kahf', 'Yasin', 'Ar-Rahman', 'Al-Waqiah', 'Al-Mulk'
  ];

  const generateMasteryData = () => {
    return topStudents.map(student =>
      surahs.map(surah => ({
        student: student.name,
        surah,
        mastery: Math.floor(Math.random() * 100)
      }))
    ).flat();
  };

  const masteryData = generateMasteryData();

  const getMasteryColor = (mastery) => {
    if (mastery >= 90) return 'bg-emerald-700';
    if (mastery >= 70) return 'bg-emerald-600';
    if (mastery >= 50) return 'bg-emerald-500';
    if (mastery >= 30) return 'bg-emerald-400';
    if (mastery >= 10) return 'bg-emerald-300';
    return 'bg-gray-200 dark:bg-gray-700';
  };

  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = filterClass === 'all' || student.class === filterClass;
      const matchesJuz = filterJuz === 'all' || 
        (filterJuz === 'low' && student.juzCompleted < 5) ||
        (filterJuz === 'medium' && student.juzCompleted >= 5 && student.juzCompleted < 15) ||
        (filterJuz === 'high' && student.juzCompleted >= 15);
      return matchesSearch && matchesClass && matchesJuz;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Performance Analytics</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Deep insights into student progress and tutor efficiency
              </p>
            </div>
            <button className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
              <Download className="w-5 h-5" />
              Export Snapshot
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Classes</option>
              <option value="Advanced">Advanced</option>
              <option value="Beginner">Beginner</option>
              <option value="Revision">Revision</option>
            </select>

            <select
              value={filterJuz}
              onChange={(e) => setFilterJuz(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Juz Levels</option>
              <option value="low">1-4 Juz</option>
              <option value="medium">5-14 Juz</option>
              <option value="high">15+ Juz</option>
            </select>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Filter className="w-5 h-5" />
              <span>{filteredStudents.length} students found</span>
            </div>
          </div>
        </div>

        {/* Student Performance Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Student Performance Table
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4">
                    <button
                      onClick={() => toggleSort('name')}
                      className="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors"
                    >
                      Name
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-center p-4">
                    <button
                      onClick={() => toggleSort('class')}
                      className="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors mx-auto"
                    >
                      Class
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-center p-4">
                    <button
                      onClick={() => toggleSort('juzCompleted')}
                      className="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors mx-auto"
                    >
                      Juz Completed
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-center p-4">
                    <button
                      onClick={() => toggleSort('mistakes')}
                      className="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors mx-auto"
                    >
                      Mistakes
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-center p-4">
                    <button
                      onClick={() => toggleSort('revisionStreak')}
                      className="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors mx-auto"
                    >
                      Revision Streak
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-center p-4">
                    <button
                      onClick={() => toggleSort('lastHalaqa')}
                      className="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors mx-auto"
                    >
                      Last Halaqa
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="text-center p-4 font-bold text-gray-900 dark:text-white">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{student.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.class === 'Advanced' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                        student.class === 'Beginner' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                        'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {student.class}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{student.juzCompleted}</span>
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                          <div
                            className="bg-emerald-600 h-1 rounded-full"
                            style={{ width: `${(student.juzCompleted / 30) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`font-bold ${
                        student.mistakes < 20 ? 'text-green-600 dark:text-green-400' :
                        student.mistakes < 50 ? 'text-amber-600 dark:text-amber-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {student.mistakes}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-gray-900 dark:text-white">{student.revisionStreak}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                      {student.lastHalaqa}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(student.performance)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tutor Efficiency View */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Tutor Efficiency Dashboard
          </h2>
          
          <div className="space-y-4">
            {tutors.map(tutor => (
              <div key={tutor.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                      {tutor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white">{tutor.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(tutor.efficiency)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          {tutor.efficiency}/5.0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Halaqas</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{tutor.halaqas}</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Students</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{tutor.students}</div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{tutor.avgProgress}%</div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{tutor.pendingAssessments}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Student Progress</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{tutor.avgProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${tutor.avgProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Surah Mastery Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Surah Mastery Grid
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Top 10 students vs 10 key Surahs
              </p>
            </div>
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left font-bold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                    Student
                  </th>
                  {surahs.map(surah => (
                    <th key={surah} className="p-2 text-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {surah}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topStudents.map(student => (
                  <tr key={student.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-2 font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                      {student.name}
                    </td>
                    {surahs.map(surah => {
                      const cellData = masteryData.find(d => d.student === student.name && d.surah === surah);
                      return (
                        <td key={surah} className="p-1">
                          <div
                            className={`w-12 h-12 rounded ${getMasteryColor(cellData?.mastery || 0)} hover:scale-110 transition-transform cursor-pointer mx-auto`}
                            title={`${student.name} - ${surah}: ${cellData?.mastery || 0}% mastered`}
                          ></div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">0-10%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-300 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">10-30%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">50-70%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-700 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">90-100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
