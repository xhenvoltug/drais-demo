'use client';

import React, { useState } from 'react';
import {
  BookOpen, TrendingUp, Award, Target, CheckCircle,
  Lock, Calendar, Filter, Search, Download, ChevronRight,
  BarChart3, PieChart, Activity, Clock, Star, Flame
} from 'lucide-react';

export default function JuzSurahProgress() {
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Quran structure data
  const quranStructure = {
    totalJuz: 30,
    totalSurahs: 114,
    totalPages: 604,
    totalVerses: 6236
  };

  // Mock progress data
  const juzProgress = Array.from({ length: 30 }, (_, i) => ({
    juzNumber: i + 1,
    totalPages: 20,
    completedPages: Math.floor(Math.random() * 21),
    accuracy: Math.floor(Math.random() * 30) + 70,
    studentsCompleted: Math.floor(Math.random() * 50),
    status: i < 10 ? 'completed' : i < 15 ? 'in-progress' : 'not-started'
  }));

  // Famous Surahs data
  const notableSurahs = [
    { number: 1, name: 'Al-Fatihah', verses: 7, juz: 1, meaning: 'The Opening', status: 'completed' },
    { number: 2, name: 'Al-Baqarah', verses: 286, juz: 1, meaning: 'The Cow', status: 'in-progress' },
    { number: 18, name: 'Al-Kahf', verses: 110, juz: 15, meaning: 'The Cave', status: 'in-progress' },
    { number: 36, name: 'Yasin', verses: 83, juz: 22, meaning: 'Yasin', status: 'completed' },
    { number: 55, name: 'Ar-Rahman', verses: 78, juz: 27, meaning: 'The Most Merciful', status: 'in-progress' },
    { number: 67, name: 'Al-Mulk', verses: 30, juz: 29, meaning: 'The Sovereignty', status: 'completed' },
    { number: 112, name: 'Al-Ikhlas', verses: 4, juz: 30, meaning: 'Sincerity', status: 'completed' },
    { number: 113, name: 'Al-Falaq', verses: 5, juz: 30, meaning: 'The Daybreak', status: 'completed' },
    { number: 114, name: 'An-Nas', verses: 6, juz: 30, meaning: 'Mankind', status: 'completed' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'in-progress':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
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
                <Target className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Juz & Surah Progress Tracking</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Comprehensive progress monitoring across all 30 Juz and 114 Surahs
              </p>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Total Juz"
            value={quranStructure.totalJuz}
            subtitle="30 Parts"
            progress={40}
            color="emerald"
          />
          <StatCard
            icon={<Star className="w-8 h-8" />}
            title="Total Surahs"
            value={quranStructure.totalSurahs}
            subtitle="114 Chapters"
            progress={35}
            color="blue"
          />
          <StatCard
            icon={<FileText className="w-8 h-8" />}
            title="Total Pages"
            value={quranStructure.totalPages}
            subtitle="604 Pages"
            progress={28}
            color="purple"
          />
          <StatCard
            icon={<Activity className="w-8 h-8" />}
            title="Total Verses"
            value={quranStructure.totalVerses}
            subtitle="6,236 Ayat"
            progress={25}
            color="teal"
          />
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                List View
              </button>
            </div>
            <div className="flex gap-4">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Levels</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Juz Progress Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            30 Juz Progress Overview
          </h2>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {juzProgress.map((juz) => (
                <div
                  key={juz.juzNumber}
                  className="group relative cursor-pointer"
                >
                  <div
                    className={`aspect-square rounded-xl bg-gradient-to-br ${getStatusColor(juz.status)} p-4 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all hover:scale-110`}
                  >
                    <div className="text-xs font-semibold opacity-75">JUZ</div>
                    <div className="text-2xl font-bold">{juz.juzNumber}</div>
                    <div className="text-xs opacity-75">{juz.accuracy}%</div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-xl">
                      <div className="font-bold mb-1">Juz {juz.juzNumber}</div>
                      <div>Pages: {juz.completedPages}/{juz.totalPages}</div>
                      <div>Accuracy: {juz.accuracy}%</div>
                      <div>Students: {juz.studentsCompleted}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {juzProgress.map((juz) => (
                <div
                  key={juz.juzNumber}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getStatusColor(juz.status)} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {juz.juzNumber}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Juz {juz.juzNumber}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(juz.status)}`}>
                        {juz.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Pages: {juz.completedPages}/{juz.totalPages}</span>
                      <span>Accuracy: {juz.accuracy}%</span>
                      <span>Students Completed: {juz.studentsCompleted}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getStatusColor(juz.status)} transition-all`}
                        style={{ width: `${(juz.completedPages / juz.totalPages) * 100}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notable Surahs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Notable Surahs Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notableSurahs.map((surah) => (
              <div
                key={surah.number}
                className="group p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer shadow-md hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getStatusColor(surah.status)} flex items-center justify-center text-white font-bold shadow-lg`}>
                      {surah.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {surah.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {surah.meaning}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    {surah.verses} verses
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Juz {surah.juz}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {surah.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {surah.status === 'in-progress' && (
                    <Activity className="w-5 h-5 text-blue-500" />
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(surah.status)}`}>
                    {surah.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Completion Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <PieChart className="w-6 h-6 text-emerald-600" />
              Overall Completion Rate
            </h3>
            <div className="flex items-center justify-center py-8">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - 0.35)}`}
                    className="text-emerald-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">35%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">10</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">15</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Not Started</div>
              </div>
            </div>
          </div>

          {/* Monthly Progress Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Monthly Progress Trend
            </h3>
            <div className="space-y-4">
              {['January', 'February', 'March', 'April', 'May', 'June'].map((month, index) => (
                <div key={month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {month}
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      {Math.floor(Math.random() * 20) + 10} Juz
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                      style={{ width: `${Math.floor(Math.random() * 40) + 40}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, progress, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    teal: 'from-teal-500 to-teal-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
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
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function FileText({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
