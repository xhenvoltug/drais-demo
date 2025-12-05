'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import { 
  Calendar, Clock, Award, TrendingUp, Filter, 
  Search, ChevronDown, ArrowUpDown, BarChart3,
  Mic, Users, GraduationCap, AlertTriangle,
  CheckCircle, XCircle, BookOpen, Download,
  Eye, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function RecitationHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock recitation history
  const recitationHistory = [
    {
      id: 1,
      date: '2025-12-05',
      time: '09:30 AM',
      surah: 'Al-Baqarah',
      ayah: '255',
      juz: 3,
      mode: 'solo',
      mistakes: 2,
      score: 94,
      duration: '12:34',
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-12-05',
      time: '02:15 PM',
      surah: 'Yasin',
      ayah: '1-12',
      juz: 22,
      mode: 'group',
      mistakes: 4,
      score: 88,
      duration: '18:22',
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-12-04',
      time: '10:00 AM',
      surah: 'Al-Mulk',
      ayah: '1-5',
      juz: 29,
      mode: 'tutor',
      mistakes: 1,
      score: 98,
      duration: '08:45',
      status: 'completed'
    },
    {
      id: 4,
      date: '2025-12-04',
      time: '03:45 PM',
      surah: 'Ar-Rahman',
      ayah: '1-16',
      juz: 27,
      mode: 'solo',
      mistakes: 6,
      score: 82,
      duration: '15:20',
      status: 'completed'
    },
    {
      id: 5,
      date: '2025-12-03',
      time: '11:20 AM',
      surah: 'Al-Waqiah',
      ayah: '1-10',
      juz: 27,
      mode: 'group',
      mistakes: 3,
      score: 90,
      duration: '10:15',
      status: 'completed'
    },
    {
      id: 6,
      date: '2025-12-03',
      time: '04:30 PM',
      surah: 'Al-Kahf',
      ayah: '1-10',
      juz: 15,
      mode: 'tutor',
      mistakes: 0,
      score: 100,
      duration: '14:50',
      status: 'completed'
    },
    {
      id: 7,
      date: '2025-12-02',
      time: '09:15 AM',
      surah: 'Al-Fatihah',
      ayah: '1-7',
      juz: 1,
      mode: 'solo',
      mistakes: 1,
      score: 96,
      duration: '05:30',
      status: 'completed'
    },
    {
      id: 8,
      date: '2025-12-02',
      time: '02:00 PM',
      surah: 'Al-Ikhlas',
      ayah: '1-4',
      juz: 30,
      mode: 'group',
      mistakes: 0,
      score: 100,
      duration: '03:45',
      status: 'completed'
    },
    {
      id: 9,
      date: '2025-12-01',
      time: '10:45 AM',
      surah: 'Al-Falaq',
      ayah: '1-5',
      juz: 30,
      mode: 'solo',
      mistakes: 2,
      score: 92,
      duration: '04:20',
      status: 'completed'
    },
    {
      id: 10,
      date: '2025-12-01',
      time: '03:30 PM',
      surah: 'An-Nas',
      ayah: '1-6',
      juz: 30,
      mode: 'tutor',
      mistakes: 1,
      score: 95,
      duration: '04:55',
      status: 'completed'
    }
  ];

  // Mock weekly trend data
  const weeklyTrend = [
    { day: 'Mon', recitations: 3, avgScore: 92 },
    { day: 'Tue', recitations: 2, avgScore: 88 },
    { day: 'Wed', recitations: 4, avgScore: 95 },
    { day: 'Thu', recitations: 3, avgScore: 90 },
    { day: 'Fri', recitations: 5, avgScore: 93 },
    { day: 'Sat', recitations: 2, avgScore: 87 },
    { day: 'Sun', recitations: 1, avgScore: 96 }
  ];

  // Mock mistake distribution
  const mistakeDistribution = [
    { category: 'Tajweed', count: 8, percentage: 35 },
    { category: 'Pronunciation', count: 7, percentage: 30 },
    { category: 'Fluency', count: 5, percentage: 22 },
    { category: 'Memory', count: 3, percentage: 13 }
  ];

  const modeOptions = [
    { value: 'all', label: 'All Modes', icon: BookOpen },
    { value: 'solo', label: 'Solo', icon: Mic },
    { value: 'group', label: 'Group', icon: Users },
    { value: 'tutor', label: 'Tutor-Led', icon: GraduationCap }
  ];

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'solo': return Mic;
      case 'group': return Users;
      case 'tutor': return GraduationCap;
      default: return BookOpen;
    }
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case 'solo': return 'text-emerald-400 bg-emerald-500/10';
      case 'group': return 'text-blue-400 bg-blue-500/10';
      case 'tutor': return 'text-purple-400 bg-purple-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-rose-400';
  };

  // Filtering and sorting
  const filteredHistory = recitationHistory
    .filter(item => {
      const matchesSearch = item.surah.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMode = selectedMode === 'all' || item.mode === selectedMode;
      return matchesSearch && matchesMode;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.date) - new Date(a.date);
          break;
        case 'score':
          comparison = b.score - a.score;
          break;
        case 'mistakes':
          comparison = a.mistakes - b.mistakes;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Recitation History
          </h1>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold">
            v0.0.0032
          </span>
        </div>
        <p className="text-slate-400">Track your recitation progress and performance</p>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{recitationHistory.length}</div>
                <div className="text-xs text-slate-400">Total Sessions</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">92%</div>
                <div className="text-xs text-slate-400">Avg Score</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2:15</div>
                <div className="text-xs text-slate-400">Total Hours</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">23</div>
                <div className="text-xs text-slate-400">Total Mistakes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Recitation Trend */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Weekly Recitation Trend
            </h2>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyTrend.map((day, idx) => {
                const maxRecitations = Math.max(...weeklyTrend.map(d => d.recitations));
                const height = (day.recitations / maxRecitations) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full flex flex-col items-center">
                      <div className="text-xs text-emerald-400 font-semibold mb-1">
                        {day.avgScore}%
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="w-full bg-gradient-to-t from-emerald-500 to-teal-600 rounded-t-lg min-h-[20px]"
                      />
                    </div>
                    <div className="text-xs text-slate-400 font-medium">{day.day}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mistake Distribution Donut */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-rose-400" />
              Mistake Category Distribution
            </h2>
            <div className="flex items-center justify-between gap-6">
              {/* Donut Chart (simplified visualization) */}
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="20"
                    className="text-slate-700"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#mistakeGradient)"
                    strokeWidth="20"
                    strokeDasharray={`${mistakeDistribution[0].percentage * 2.51} ${251 - mistakeDistribution[0].percentage * 2.51}`}
                    initial={{ strokeDashoffset: 251 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="mistakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">23</div>
                    <div className="text-xs text-slate-400">Total</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-2">
                {mistakeDistribution.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, 
                            ${idx === 0 ? '#f43f5e' : idx === 1 ? '#f97316' : idx === 2 ? '#fb923c' : '#fbbf24'}, 
                            ${idx === 0 ? '#f97316' : idx === 1 ? '#fb923c' : idx === 2 ? '#fbbf24' : '#fde047'}
                          )`
                        }}
                      />
                      <span className="text-sm text-slate-300">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{item.count}</span>
                      <span className="text-xs text-slate-500">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Surah..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Mode Filter */}
            <div className="flex gap-2">
              {modeOptions.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setSelectedMode(mode.value)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedMode === mode.value
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                      : 'bg-slate-900/50 border border-slate-700/50 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <mode.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{mode.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Download */}
            <button className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-all">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => toggleSort('date')}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      Date & Time
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Surah</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Mode</th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => toggleSort('mistakes')}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      Mistakes
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => toggleSort('score')}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      Score
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Duration</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {paginatedHistory.map((item, idx) => {
                  const ModeIcon = getModeIcon(item.mode);
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-900/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <div>
                            <div className="text-sm text-white">{item.date}</div>
                            <div className="text-xs text-slate-400">{item.time}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white font-medium">{item.surah}</div>
                        <div className="text-xs text-slate-400">Ayah {item.ayah} • Juz {item.juz}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getModeColor(item.mode)}`}>
                          <ModeIcon className="w-3 h-3" />
                          <span className="text-xs font-medium capitalize">{item.mode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-rose-400 font-semibold">{item.mistakes}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm font-bold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-slate-400 hover:text-emerald-400" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
