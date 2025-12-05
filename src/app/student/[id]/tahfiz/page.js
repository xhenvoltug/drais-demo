'use client';

import React from 'react';
import {
  BookOpen, Clock, Award, TrendingUp, Calendar, CheckCircle,
  Star, Trophy, Flame, Target, ChevronRight, BarChart3, Zap
} from 'lucide-react';

export default function StudentTahfizProfile({ params }) {
  const studentId = params?.id || '1';

  // Mock student data
  const student = {
    id: studentId,
    name: 'Ahmed Hassan',
    class: 'Advanced Halaqa',
    currentJuz: 15,
    totalPages: 300,
    completedPages: 245,
    streak: 42,
    joinDate: '2023-01-15'
  };

  const memorizationTimeline = [
    { surah: 'Al-Baqarah', dateCompleted: '2024-12-15', tutor: 'Ustadh Ibrahim', juz: 1 },
    { surah: 'Al-Imran', dateCompleted: '2024-11-28', tutor: 'Ustadh Ibrahim', juz: 3 },
    { surah: 'An-Nisa', dateCompleted: '2024-11-10', tutor: 'Ustadh Khalid', juz: 4 },
    { surah: 'Al-Kahf', dateCompleted: '2024-10-22', tutor: 'Ustadh Ibrahim', juz: 15 },
    { surah: 'Yasin', dateCompleted: '2024-10-05', tutor: 'Ustadh Ibrahim', juz: 22 },
    { surah: 'Ar-Rahman', dateCompleted: '2024-09-18', tutor: 'Ustadh Khalid', juz: 27 },
  ];

  const revisionSchedule = [
    { surah: 'Al-Baqarah', nextDate: '2025-01-25', daysRemaining: 3, status: 'upcoming' },
    { surah: 'Al-Imran', nextDate: '2025-01-28', daysRemaining: 6, status: 'upcoming' },
    { surah: 'Yasin', nextDate: '2025-01-22', daysRemaining: 0, status: 'due-today' },
    { surah: 'Ar-Rahman', nextDate: '2025-01-20', daysRemaining: -2, status: 'overdue' },
  ];

  const badges = [
    { id: 1, name: 'Juz 1 Complete', icon: '🎯', earned: true, rarity: 'gold' },
    { id: 2, name: 'Juz 2 Complete', icon: '🎯', earned: true, rarity: 'gold' },
    { id: 3, name: 'Juz 3 Complete', icon: '🎯', earned: true, rarity: 'gold' },
    { id: 4, name: '30-Day Streak', icon: '🔥', earned: true, rarity: 'epic' },
    { id: 5, name: 'Tajweed Excellence', icon: '⭐', earned: true, rarity: 'legendary' },
    { id: 6, name: 'Perfect Attendance', icon: '📅', earned: true, rarity: 'rare' },
    { id: 7, name: 'Juz 4 Complete', icon: '🎯', earned: false, rarity: 'gold' },
    { id: 8, name: '100-Day Streak', icon: '🔥', earned: false, rarity: 'legendary' },
  ];

  // Mastery heatmap data (114 Surahs)
  const generateHeatmapData = () => {
    return Array.from({ length: 114 }, (_, i) => ({
      surahNumber: i + 1,
      progress: Math.random() * 100
    }));
  };

  const heatmapData = generateHeatmapData();

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-emerald-700';
    if (progress >= 70) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-emerald-400';
    if (progress >= 30) return 'bg-emerald-300';
    if (progress >= 10) return 'bg-emerald-200';
    return 'bg-gray-200 dark:bg-gray-700';
  };

  const getRarityStyle = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-600';
      case 'epic':
        return 'bg-gradient-to-br from-violet-500 to-purple-500 border-violet-600';
      case 'rare':
        return 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-600';
      default:
        return 'bg-gradient-to-br from-yellow-500 to-amber-500 border-yellow-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{student.name}</h1>
              <p className="text-emerald-100 text-lg">{student.class} • Juz {student.currentJuz} in Progress</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-lg">
                <Flame className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{student.streak}</div>
                <div className="text-xs text-emerald-200">Day Streak</div>
              </div>
              <div className="text-center bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-lg">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{badges.filter(b => b.earned).length}</div>
                <div className="text-xs text-emerald-200">Badges Earned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Memorization Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Memorization Timeline</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600 to-teal-600"></div>
            
            <div className="space-y-6">
              {memorizationTimeline.map((item, index) => (
                <div key={index} className="relative pl-20">
                  <div className="absolute left-5 top-2 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.surah}</h3>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-full font-semibold">
                        Juz {item.juz}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{item.dateCompleted}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{item.tutor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revision Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revision Schedule</h2>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
              View Full Schedule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {revisionSchedule.map((item, index) => {
              const statusColors = {
                'due-today': 'bg-yellow-50 dark:bg-yellow-950 border-yellow-500',
                'overdue': 'bg-red-50 dark:bg-red-950 border-red-500',
                'upcoming': 'bg-green-50 dark:bg-green-950 border-green-500'
              };
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${statusColors[item.status]} shadow-md`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.surah}</h3>
                    {item.status === 'overdue' && (
                      <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full font-semibold">
                        OVERDUE
                      </span>
                    )}
                    {item.status === 'due-today' && (
                      <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full font-semibold">
                        DUE TODAY
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Next revision: {item.nextDate}</span>
                    {item.daysRemaining > 0 && (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                        <Clock className="w-4 h-4" />
                        {item.daysRemaining} days
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievement Badges</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative p-6 rounded-xl border-2 transition-all ${
                  badge.earned
                    ? `${getRarityStyle(badge.rarity)} text-white shadow-lg hover:scale-105`
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">{badge.icon}</div>
                  <div className="font-bold text-sm">{badge.name}</div>
                  {badge.earned && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-amber-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Gold</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Rare</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Epic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Legendary</span>
            </div>
          </div>
        </div>

        {/* Mastery Heatmap */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mastery Heatmap</h2>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress from Al-Fatiha to An-Nas</span>
            </div>
          </div>

          <div className="grid grid-cols-10 md:grid-cols-19 gap-1 mb-4">
            {heatmapData.map((surah) => (
              <div
                key={surah.surahNumber}
                className={`aspect-square rounded ${getProgressColor(surah.progress)} transition-all hover:scale-125 hover:shadow-lg cursor-pointer`}
                title={`Surah ${surah.surahNumber}: ${surah.progress.toFixed(0)}% mastered`}
              ></div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">0-10%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-200 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">10-30%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-300 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">30-50%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-400 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">50-70%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">70-90%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-700 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">90-100%</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-lg">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold">82%</div>
                <div className="text-blue-100">Overall Progress</div>
              </div>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-lg">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold">4.7/5</div>
                <div className="text-purple-100">Avg Evaluation</div>
              </div>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-5 h-5 ${star <= 4 ? 'fill-white' : 'text-purple-200'}`} />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-lg">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold">{student.completedPages}</div>
                <div className="text-emerald-100">Pages Completed</div>
              </div>
            </div>
            <div className="text-sm text-emerald-100">
              Out of {student.totalPages} total pages
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
