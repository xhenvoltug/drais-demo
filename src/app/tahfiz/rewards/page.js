'use client';

import React, { useState } from 'react';
import {
  Award, Trophy, Star, Medal, Crown, Zap, Heart,
  Target, Flame, Gift, TrendingUp, Users, ChevronRight,
  Sparkles, Check, Lock, Download, Filter
} from 'lucide-react';

export default function RewardsMotivation() {
  const [selectedTab, setSelectedTab] = useState('badges');
  const [filterType, setFilterType] = useState('all');

  // Badge categories
  const badges = [
    {
      id: 1,
      name: 'Perfect Week',
      description: '7 days consecutive attendance',
      icon: <Star className="w-8 h-8" />,
      color: 'from-yellow-400 to-yellow-600',
      rarity: 'gold',
      earned: 45,
      total: 248,
      requirement: '7 consecutive days',
      points: 100
    },
    {
      id: 2,
      name: 'Tajweed Master',
      description: '95%+ accuracy in 10 sessions',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-purple-400 to-purple-600',
      rarity: 'epic',
      earned: 23,
      total: 248,
      requirement: '95% accuracy × 10',
      points: 200
    },
    {
      id: 3,
      name: 'Fast Learner',
      description: 'Complete 1 Juz in 2 weeks',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-400 to-blue-600',
      rarity: 'rare',
      earned: 67,
      total: 248,
      requirement: '1 Juz in 14 days',
      points: 150
    },
    {
      id: 4,
      name: 'Consistency Star',
      description: '30 days attendance streak',
      icon: <Flame className="w-8 h-8" />,
      color: 'from-orange-400 to-red-600',
      rarity: 'legendary',
      earned: 12,
      total: 248,
      requirement: '30 day streak',
      points: 300
    },
    {
      id: 5,
      name: 'Golden Reciter',
      description: 'Perfect recitation 20 times',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-yellow-300 to-amber-500',
      rarity: 'gold',
      earned: 34,
      total: 248,
      requirement: '20 perfect recitations',
      points: 180
    },
    {
      id: 6,
      name: 'Dedicated Student',
      description: '90%+ attendance for 3 months',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-pink-400 to-rose-600',
      rarity: 'epic',
      earned: 56,
      total: 248,
      requirement: '90% attendance × 90 days',
      points: 250
    },
    {
      id: 7,
      name: 'Half Hafiz',
      description: 'Complete 15 Juz',
      icon: <Medal className="w-8 h-8" />,
      color: 'from-emerald-400 to-teal-600',
      rarity: 'legendary',
      earned: 8,
      total: 248,
      requirement: 'Complete 15 Juz',
      points: 500
    },
    {
      id: 8,
      name: 'Early Bird',
      description: 'Arrive before 8 AM for 30 days',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-cyan-400 to-blue-600',
      rarity: 'rare',
      earned: 29,
      total: 248,
      requirement: '30 days before 8 AM',
      points: 120
    },
  ];

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Ahmed Hassan', points: 2450, badges: 12, level: 24, trend: 'up' },
    { rank: 2, name: 'Fatima Ali', points: 2380, badges: 11, level: 23, trend: 'up' },
    { rank: 3, name: 'Omar Khalil', points: 2250, badges: 10, level: 22, trend: 'down' },
    { rank: 4, name: 'Aisha Mohammed', points: 2180, badges: 10, level: 21, trend: 'same' },
    { rank: 5, name: 'Hassan Ibrahim', points: 2050, badges: 9, level: 20, trend: 'up' },
    { rank: 6, name: 'Maryam Khalid', points: 1980, badges: 9, level: 19, trend: 'up' },
    { rank: 7, name: 'Yusuf Ahmad', points: 1850, badges: 8, level: 18, trend: 'down' },
    { rank: 8, name: 'Zainab Rashid', points: 1720, badges: 8, level: 17, trend: 'same' },
  ];

  // Achievements
  const achievements = [
    {
      title: 'Master of Surah Yasin',
      description: 'Perfect recitation of Surah Yasin',
      date: '2 days ago',
      student: 'Ahmed Hassan',
      icon: <Star className="w-6 h-6 text-yellow-500" />
    },
    {
      title: 'Completed Juz 10',
      description: 'Successfully memorized entire Juz 10',
      date: '1 week ago',
      student: 'Fatima Ali',
      icon: <Trophy className="w-6 h-6 text-purple-500" />
    },
    {
      title: '100 Day Streak',
      description: 'Maintained perfect attendance for 100 days',
      date: '2 weeks ago',
      student: 'Omar Khalil',
      icon: <Flame className="w-6 h-6 text-orange-500" />
    },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950';
      case 'epic':
        return 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950';
      case 'rare':
        return 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950';
      case 'gold':
        return 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950';
      default:
        return 'border-gray-300 bg-gray-50 dark:from-gray-800 dark:to-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Rewards & Motivation</h1>
              </div>
              <p className="text-yellow-100 text-lg">
                Celebrate achievements and inspire excellence
              </p>
            </div>
            <div className="text-right bg-white bg-opacity-20 rounded-xl p-4">
              <div className="text-sm text-yellow-200 mb-1">Total Badges Awarded</div>
              <div className="text-4xl font-bold">1,248</div>
              <div className="text-xs text-yellow-200">This month</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setSelectedTab('badges')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              selectedTab === 'badges'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Award className="w-5 h-5" />
            Badges & Achievements
          </button>
          <button
            onClick={() => setSelectedTab('leaderboard')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              selectedTab === 'leaderboard'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Trophy className="w-5 h-5" />
            Leaderboard
          </button>
          <button
            onClick={() => setSelectedTab('recent')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              selectedTab === 'recent'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Recent Achievements
          </button>
        </div>

        {/* Badges & Achievements Tab */}
        {selectedTab === 'badges' && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-500" />
                  Available Badges
                </h2>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Badges</option>
                  <option value="legendary">Legendary</option>
                  <option value="epic">Epic</option>
                  <option value="rare">Rare</option>
                  <option value="gold">Gold</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`rounded-xl border-2 p-6 hover:shadow-2xl transition-all cursor-pointer ${getRarityColor(badge.rarity)}`}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${badge.color} text-white shadow-lg`}>
                        {badge.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {badge.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {badge.description}
                        </p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          badge.rarity === 'legendary' ? 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                          badge.rarity === 'epic' ? 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          badge.rarity === 'rare' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {badge.rarity}
                        </span>
                      </div>
                      <div className="w-full space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>Progress</span>
                          <span className="font-bold">{badge.earned}/{badge.total}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${badge.color} transition-all`}
                            style={{ width: `${(badge.earned / badge.total) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {badge.requirement}
                        </div>
                        <div className="flex items-center justify-center gap-1 text-yellow-600 dark:text-yellow-400 font-bold">
                          <Star className="w-4 h-4" />
                          {badge.points} points
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Leaderboard Tab */}
        {selectedTab === 'leaderboard' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Top Performers Leaderboard
              </h2>
              <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>

            <div className="space-y-3">
              {leaderboard.map((student) => (
                <div
                  key={student.rank}
                  className={`flex items-center gap-4 p-5 rounded-xl transition-all hover:shadow-lg ${
                    student.rank <= 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-2 border-yellow-400'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${
                    student.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg' :
                    student.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg' :
                    student.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg' :
                    'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
                  }`}>
                    {student.rank}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {student.badges} badges
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Level {student.level}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                      <Star className="w-6 h-6" />
                      {student.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">points</div>
                  </div>

                  <div>
                    {student.trend === 'up' && (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    )}
                    {student.trend === 'down' && (
                      <TrendingUp className="w-6 h-6 text-red-600 transform rotate-180" />
                    )}
                    {student.trend === 'same' && (
                      <div className="w-6 h-6 text-gray-400">—</div>
                    )}
                  </div>

                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Achievements Tab */}
        {selectedTab === 'recent' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              Recent Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl border-2 border-purple-200 dark:border-purple-800"
                >
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {achievement.student}
                      </span>
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                  <Gift className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivation Quote */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white shadow-xl text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <blockquote className="text-2xl font-bold mb-2">
            "The best among you are those who learn the Quran and teach it."
          </blockquote>
          <p className="text-purple-200">- Prophet Muhammad (peace be upon him)</p>
        </div>
      </div>
    </div>
  );
}
