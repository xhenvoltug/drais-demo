'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import { 
  Trophy, Crown, Medal, Star, TrendingUp, Zap,
  Award, Target, Flame, ChevronRight, Filter,
  Calendar, Clock, Users, BookOpen, BarChart3,
  ArrowUp, ArrowDown, Sparkles, Gift, Heart
} from 'lucide-react';

export default function LeaderboardsPage() {
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [modeFilter, setModeFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  // Mock leaderboard data
  const students = [
    {
      rank: 1,
      name: 'Aisha Mohammed',
      avatar: 'AM',
      class: 'Grade 6B',
      totalScore: 5850,
      weeklyPoints: 850,
      monthlyPoints: 3200,
      dailyPoints: 120,
      streak: 60,
      juzCompleted: 20,
      accuracy: 98,
      recitationTime: '42h 15m',
      trendChange: 2, // positions moved
      badges: 6,
      level: 'Master'
    },
    {
      rank: 2,
      name: 'Fatima Ali',
      avatar: 'FA',
      class: 'Grade 6B',
      totalScore: 5200,
      weeklyPoints: 780,
      monthlyPoints: 2900,
      dailyPoints: 95,
      streak: 45,
      juzCompleted: 15,
      accuracy: 95,
      recitationTime: '38h 30m',
      trendChange: 0,
      badges: 4,
      level: 'Expert'
    },
    {
      rank: 3,
      name: 'Ahmed Hassan',
      avatar: 'AH',
      class: 'Grade 5A',
      totalScore: 4850,
      weeklyPoints: 720,
      monthlyPoints: 2750,
      dailyPoints: 88,
      streak: 28,
      juzCompleted: 12,
      accuracy: 92,
      recitationTime: '35h 45m',
      trendChange: 1,
      badges: 4,
      level: 'Advanced'
    },
    {
      rank: 4,
      name: 'Omar Ibrahim',
      avatar: 'OI',
      class: 'Grade 5A',
      totalScore: 3680,
      weeklyPoints: 550,
      monthlyPoints: 2100,
      dailyPoints: 75,
      streak: 15,
      juzCompleted: 8,
      accuracy: 88,
      recitationTime: '28h 20m',
      trendChange: -1,
      badges: 3,
      level: 'Intermediate'
    },
    {
      rank: 5,
      name: 'Khadija Yusuf',
      avatar: 'KY',
      class: 'Grade 6B',
      totalScore: 3420,
      weeklyPoints: 520,
      monthlyPoints: 1950,
      dailyPoints: 68,
      streak: 22,
      juzCompleted: 9,
      accuracy: 90,
      recitationTime: '26h 10m',
      trendChange: 2,
      badges: 3,
      level: 'Intermediate'
    },
    {
      rank: 6,
      name: 'Yusuf Abdullah',
      avatar: 'YA',
      class: 'Grade 5A',
      totalScore: 3150,
      weeklyPoints: 480,
      monthlyPoints: 1800,
      dailyPoints: 62,
      streak: 18,
      juzCompleted: 7,
      accuracy: 86,
      recitationTime: '24h 40m',
      trendChange: -2,
      badges: 2,
      level: 'Intermediate'
    },
    {
      rank: 7,
      name: 'Mariam Ibrahim',
      avatar: 'MI',
      class: 'Grade 6B',
      totalScore: 2890,
      weeklyPoints: 450,
      monthlyPoints: 1650,
      dailyPoints: 58,
      streak: 12,
      juzCompleted: 6,
      accuracy: 84,
      recitationTime: '22h 30m',
      trendChange: 1,
      badges: 2,
      level: 'Intermediate'
    },
    {
      rank: 8,
      name: 'Ibrahim Yusuf',
      avatar: 'IY',
      class: 'Grade 5A',
      totalScore: 2100,
      weeklyPoints: 320,
      monthlyPoints: 1200,
      dailyPoints: 42,
      streak: 10,
      juzCompleted: 5,
      accuracy: 82,
      recitationTime: '18h 15m',
      trendChange: 0,
      badges: 2,
      level: 'Beginner'
    }
  ];

  const filteredStudents = students.filter(s => {
    if (classFilter !== 'all' && s.class !== classFilter) return false;
    return true;
  });

  const getPoints = (student) => {
    switch(timeFilter) {
      case 'daily': return student.dailyPoints;
      case 'weekly': return student.weeklyPoints;
      case 'monthly': return student.monthlyPoints;
      default: return student.totalScore;
    }
  };

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'from-yellow-500 to-amber-600';
      case 2: return 'from-slate-400 to-slate-500';
      case 3: return 'from-orange-500 to-amber-700';
      default: return 'from-slate-600 to-slate-700';
    }
  };

  const getRankBadge = (rank) => {
    switch(rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-slate-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-500" />;
      default: return <span className="text-slate-400 font-bold text-lg">#{rank}</span>;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Master': return 'from-purple-500 to-pink-600';
      case 'Expert': return 'from-blue-500 to-cyan-600';
      case 'Advanced': return 'from-emerald-500 to-teal-600';
      case 'Intermediate': return 'from-amber-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Leaderboards
              </h1>
              <p className="text-slate-400 text-sm">Top performing students rankings</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold">
            v0.0.0033
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Time Filter */}
            <div className="flex-1">
              <label className="text-xs text-slate-400 mb-2 block">Time Period</label>
              <div className="flex gap-2">
                {['daily', 'weekly', 'monthly', 'all-time'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeFilter(period)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                      timeFilter === period
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white'
                        : 'bg-slate-900/50 border border-slate-700/50 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {period.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Class Filter */}
            <div>
              <label className="text-xs text-slate-400 mb-2 block">Class</label>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Classes</option>
                <option value="Grade 5A">Grade 5A</option>
                <option value="Grade 6B">Grade 6B</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredStudents.slice(0, 3).map((student, idx) => {
            const podiumOrder = idx === 0 ? 1 : idx === 1 ? 0 : 2; // 2nd, 1st, 3rd
            const heights = ['h-48', 'h-56', 'h-40'];
            return (
              <motion.div
                key={student.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: podiumOrder * 0.1 }}
                className={`order-${podiumOrder}`}
              >
                <div className={`bg-gradient-to-br ${getRankColor(student.rank)} rounded-2xl p-6 text-white ${heights[idx]} flex flex-col justify-between`}>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {getRankBadge(student.rank)}
                    </div>
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                      {student.avatar}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{student.name}</h3>
                    <p className="text-sm opacity-90">{student.class}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">
                      {getPoints(student).toLocaleString()}
                    </div>
                    <div className="text-xs opacity-90">points</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Level</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400">Points</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400">Accuracy</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400">Streak</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400">Juz</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredStudents.map((student, idx) => (
                  <motion.tr
                    key={student.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`hover:bg-slate-900/30 transition-colors ${
                      student.rank <= 3 ? 'bg-slate-900/20' : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {student.rank <= 3 ? (
                          getRankBadge(student.rank)
                        ) : (
                          <span className="text-slate-400 font-bold">#{student.rank}</span>
                        )}
                      </div>
                    </td>

                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getLevelColor(student.level)} flex items-center justify-center text-white font-bold text-sm`}>
                          {student.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{student.name}</div>
                          <div className="text-xs text-slate-400">{student.class}</div>
                        </div>
                      </div>
                    </td>

                    {/* Level */}
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${getLevelColor(student.level)} text-white text-xs font-semibold`}>
                        <Sparkles className="w-3 h-3" />
                        {student.level}
                      </div>
                    </td>

                    {/* Points */}
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-bold text-amber-400">
                        {getPoints(student).toLocaleString()}
                      </div>
                    </td>

                    {/* Accuracy */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                            style={{ width: `${student.accuracy}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-emerald-400 w-10">
                          {student.accuracy}%
                        </span>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-orange-400">
                        <Flame className="w-4 h-4" />
                        <span className="text-sm font-semibold">{student.streak}</span>
                      </div>
                    </td>

                    {/* Juz */}
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm text-slate-300">
                        {student.juzCompleted}/30
                      </div>
                    </td>

                    {/* Trend */}
                    <td className="px-6 py-4 text-right">
                      {student.trendChange > 0 ? (
                        <div className="inline-flex items-center gap-1 text-emerald-400">
                          <ArrowUp className="w-4 h-4" />
                          <span className="text-xs font-semibold">+{student.trendChange}</span>
                        </div>
                      ) : student.trendChange < 0 ? (
                        <div className="inline-flex items-center gap-1 text-rose-400">
                          <ArrowDown className="w-4 h-4" />
                          <span className="text-xs font-semibold">{student.trendChange}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">-</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Trend Mini Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStudents.slice(0, 4).map((student) => {
            const weeklyData = [65, 72, 68, 78, 85, 82, 90];
            const maxValue = Math.max(...weeklyData);
            return (
              <div
                key={student.rank}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getLevelColor(student.level)} flex items-center justify-center text-white text-xs font-bold`}>
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{student.name}</div>
                    <div className="text-xs text-slate-400">Weekly Trend</div>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-1 h-20">
                  {weeklyData.map((value, idx) => {
                    const height = (value / maxValue) * 100;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className={`w-full bg-gradient-to-t ${getLevelColor(student.level)} rounded-t`}
                        />
                        <div className="text-xs text-slate-500">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredStudents[0]?.totalScore.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">Top Score</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {Math.round(filteredStudents.reduce((acc, s) => acc + s.accuracy, 0) / filteredStudents.length)}%
                </div>
                <div className="text-xs text-slate-400">Avg Accuracy</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {Math.max(...filteredStudents.map(s => s.streak))}
                </div>
                <div className="text-xs text-slate-400">Top Streak</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredStudents.length}
                </div>
                <div className="text-xs text-slate-400">Total Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
