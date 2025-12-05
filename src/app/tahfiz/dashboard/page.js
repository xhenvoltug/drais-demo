'use client';

import React, { useState, useEffect } from 'react';
import TahfizNavBar from '@/components/tahfiz-navbar';
import {
  BookOpen, Users, TrendingUp, Award, Clock, Target,
  Bell, AlertTriangle, CheckCircle, Calendar, BarChart3,
  PieChart, Activity, Zap, Trophy, Star, ChevronRight,
  Download, Filter, RefreshCw
} from 'lucide-react';

export default function TahfizMasterDashboard() {
  const [activeChart, setActiveChart] = useState('weekly');
  const [notifications, setNotifications] = useState([]);

  // Animated progress ring state
  const [progressRings, setProgressRings] = useState({
    memorization: 0,
    revision: 0,
    attendance: 0
  });

  useEffect(() => {
    // Animate progress rings on mount
    setTimeout(() => {
      setProgressRings({
        memorization: 73,
        revision: 85,
        attendance: 92
      });
    }, 100);

    // Mock notifications
    setNotifications([
      { id: 1, type: 'assessment', title: 'Monthly Assessment Due', desc: 'Advanced Halaqa - 3 students pending', time: '2 hours ago' },
      { id: 2, type: 'revision', title: 'Revision Alert', desc: 'Ahmed Hassan - Al-Baqarah overdue', time: '5 hours ago' },
      { id: 3, type: 'attendance', title: 'Attendance Warning', desc: 'Morning Halaqa - Low attendance this week', time: '1 day ago' },
    ]);
  }, []);

  const overviewStats = [
    { label: 'Total Students', value: 168, change: '+12', icon: Users, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Active Halaqas', value: 14, change: '+2', icon: BookOpen, color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
    { label: 'Completion Rate', value: '73%', change: '+5%', icon: Target, color: 'purple', gradient: 'from-purple-500 to-pink-500' },
    { label: 'Active Tutors', value: 8, change: '+1', icon: Award, color: 'amber', gradient: 'from-amber-500 to-orange-500' },
    { label: 'Daily Recitations', value: 142, change: '+8', icon: Activity, color: 'teal', gradient: 'from-teal-500 to-cyan-500' },
  ];

  // Weekly recitation trends (7 days)
  const weeklyData = [
    { day: 'Mon', recitations: 135 },
    { day: 'Tue', recitations: 142 },
    { day: 'Wed', recitations: 128 },
    { day: 'Thu', recitations: 156 },
    { day: 'Fri', recitations: 148 },
    { day: 'Sat', recitations: 162 },
    { day: 'Sun', recitations: 138 },
  ];

  // Surah completion by students (top 8 Surahs)
  const surahData = [
    { name: 'Al-Fatiha', students: 168, percentage: 100 },
    { name: 'Al-Baqarah', students: 145, percentage: 86 },
    { name: 'Al-Imran', students: 132, percentage: 79 },
    { name: 'An-Nisa', students: 118, percentage: 70 },
    { name: 'Al-Kahf', students: 156, percentage: 93 },
    { name: 'Yasin', students: 162, percentage: 96 },
    { name: 'Ar-Rahman', students: 149, percentage: 89 },
    { name: 'Al-Mulk', students: 158, percentage: 94 },
  ];

  // Mistake category distribution
  const mistakeData = [
    { category: 'Tajweed', count: 342, color: 'bg-red-500' },
    { category: 'Pronunciation', count: 289, color: 'bg-orange-500' },
    { category: 'Fluency', count: 156, color: 'bg-yellow-500' },
    { category: 'Memory', count: 198, color: 'bg-green-500' },
    { category: 'Pausing', count: 124, color: 'bg-blue-500' },
    { category: 'Tone', count: 87, color: 'bg-purple-500' },
  ];

  const totalMistakes = mistakeData.reduce((sum, item) => sum + item.count, 0);

  // Juz mastery heatmap (30 Juz x 7 days)
  const generateHeatmapData = () => {
    return Array.from({ length: 30 }, (_, juz) =>
      Array.from({ length: 7 }, (_, day) => ({
        juz: juz + 1,
        day,
        mastery: Math.floor(Math.random() * 100)
      }))
    ).flat();
  };

  const heatmapData = generateHeatmapData();

  const getHeatmapColor = (mastery) => {
    if (mastery >= 90) return 'bg-emerald-700';
    if (mastery >= 70) return 'bg-emerald-600';
    if (mastery >= 50) return 'bg-emerald-500';
    if (mastery >= 30) return 'bg-emerald-400';
    if (mastery >= 10) return 'bg-emerald-300';
    return 'bg-gray-200 dark:bg-gray-700';
  };

  const ProgressRing = ({ percentage, color, size = 120 }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`text-${color}-500 transition-all duration-1000`}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Tahfiz Master Dashboard</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Comprehensive analytics & performance tracking
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl hover:bg-opacity-30 transition-all">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {overviewStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {stat.label}
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Rings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <ProgressRing percentage={progressRings.memorization} color="emerald" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {progressRings.memorization}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Completion</div>
                </div>
              </div>
              <h3 className="mt-4 font-bold text-lg text-gray-900 dark:text-white">
                Memorization Progress
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Overall completion rate
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <ProgressRing percentage={progressRings.revision} color="blue" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {progressRings.revision}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">On Track</div>
                </div>
              </div>
              <h3 className="mt-4 font-bold text-lg text-gray-900 dark:text-white">
                Revision Adherence
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Students following schedule
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <ProgressRing percentage={progressRings.attendance} color="purple" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {progressRings.attendance}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Present</div>
                </div>
              </div>
              <h3 className="mt-4 font-bold text-lg text-gray-900 dark:text-white">
                Attendance Rate
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Daily halaqa participation
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Recitation Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Weekly Recitation Trends
              </h2>
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-3">
              {weeklyData.map((item, index) => {
                const maxRecitations = Math.max(...weeklyData.map(d => d.recitations));
                const percentage = (item.recitations / maxRecitations) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{item.day}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.recitations}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Surah Completion */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Surah Completion by Students
              </h2>
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-3">
              {surahData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{item.students}/168</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Juz Mastery Heatmap */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Juz Mastery Heatmap
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                30 Juz progress over the last 7 days
              </p>
            </div>
            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="overflow-x-auto">
            <div className="inline-grid grid-cols-7 gap-2 min-w-full">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={index} className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {day}
                </div>
              ))}
              {heatmapData.map((cell, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded ${getHeatmapColor(cell.mastery)} hover:scale-110 transition-transform cursor-pointer`}
                  title={`Juz ${cell.juz}: ${cell.mastery}% mastery`}
                ></div>
              ))}
            </div>
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

        {/* Mistake Category Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Mistake Category Distribution
              </h2>
              <PieChart className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-3">
              {mistakeData.map((item, index) => {
                const percentage = ((item.count / totalMistakes) * 100).toFixed(1);
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{item.category}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 font-bold">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h2>
              <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-4">
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-xl border-l-4 ${
                    notif.type === 'assessment'
                      ? 'bg-blue-50 dark:bg-blue-950 border-blue-500'
                      : notif.type === 'revision'
                      ? 'bg-red-50 dark:bg-red-950 border-red-500'
                      : 'bg-amber-50 dark:bg-amber-950 border-amber-500'
                  } hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {notif.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {notif.desc}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                        <Clock className="w-3 h-3" />
                        {notif.time}
                      </div>
                    </div>
                    <button className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
              View All Notifications
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-xl">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 hover:bg-opacity-30 transition-all hover:scale-105">
              <Users className="w-8 h-8" />
              <span className="font-semibold">Manage Students</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 hover:bg-opacity-30 transition-all hover:scale-105">
              <BookOpen className="w-8 h-8" />
              <span className="font-semibold">View Halaqas</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 hover:bg-opacity-30 transition-all hover:scale-105">
              <Target className="w-8 h-8" />
              <span className="font-semibold">Set Goals</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 hover:bg-opacity-30 transition-all hover:scale-105">
              <Trophy className="w-8 h-8" />
              <span className="font-semibold">Award Badges</span>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
