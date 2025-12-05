'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import {
  User, BookOpen, TrendingUp, Award, Clock, Calendar,
  Target, Star, Trophy, Flame, CheckCircle, AlertCircle,
  ArrowRight, Bell, MessageSquare, Download, Eye, Sparkles
} from 'lucide-react';

export default function ParentDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock data - multiple children
  const children = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      avatar: null,
      level: 'Intermediate',
      currentJuz: 8,
      totalJuz: 30,
      dailyScore: 92,
      weeklyStreak: 12,
      nextQuiz: { title: 'Juz 8 Complete Review', date: '2025-12-08', time: '10:00 AM' },
      recentActivity: [
        { id: 1, type: 'recitation', title: 'Surah Al-Anfal Completed', score: 94, time: '2 hours ago', icon: BookOpen, color: 'emerald' },
        { id: 2, type: 'quiz', title: 'Juz 7 Quiz Passed', score: 88, time: '1 day ago', icon: Award, color: 'purple' },
        { id: 3, type: 'badge', title: 'Earned "Consistent Learner" Badge', score: null, time: '2 days ago', icon: Trophy, color: 'amber' },
        { id: 4, type: 'recitation', title: 'Surah At-Tawbah (1-50)', score: 91, time: '3 days ago', icon: BookOpen, color: 'emerald' }
      ],
      upcomingEvents: [
        { id: 1, type: 'quiz', title: 'Juz 8 Quiz', date: '2025-12-08', time: '10:00 AM' },
        { id: 2, type: 'exam', title: 'Monthly Assessment', date: '2025-12-15', time: '2:00 PM' },
        { id: 3, type: 'halaqa', title: 'Tajweed Halaqa Session', date: '2025-12-10', time: '4:00 PM' }
      ]
    },
    {
      id: 2,
      name: 'Fatima Hassan',
      avatar: null,
      level: 'Beginner',
      currentJuz: 3,
      totalJuz: 30,
      dailyScore: 85,
      weeklyStreak: 7,
      nextQuiz: { title: 'Juz 3 Review', date: '2025-12-09', time: '11:00 AM' },
      recentActivity: [
        { id: 1, type: 'recitation', title: 'Surah Al-Baqarah (200-286)', score: 87, time: '3 hours ago', icon: BookOpen, color: 'emerald' },
        { id: 2, type: 'badge', title: 'Earned "7-Day Streak" Badge', score: null, time: '1 day ago', icon: Flame, color: 'orange' }
      ],
      upcomingEvents: [
        { id: 1, type: 'quiz', title: 'Juz 3 Quiz', date: '2025-12-09', time: '11:00 AM' }
      ]
    }
  ];

  const student = selectedStudent || children[0];

  const getActivityIcon = (activity) => {
    const Icon = activity.icon;
    return Icon;
  };

  const getActivityColor = (color) => {
    const colors = {
      emerald: 'from-emerald-500 to-teal-600',
      purple: 'from-purple-500 to-pink-600',
      amber: 'from-amber-500 to-orange-600',
      orange: 'from-orange-500 to-red-600',
      blue: 'from-blue-500 to-indigo-600'
    };
    return colors[color] || colors.emerald;
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      quiz: Award,
      exam: Target,
      halaqa: BookOpen
    };
    return icons[type] || Calendar;
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Parent Dashboard</h1>
              <p className="text-slate-400">Monitor your children's Quran memorization journey</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-white transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full text-xs font-bold flex items-center justify-center">3</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-white transition-colors relative"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full text-xs font-bold flex items-center justify-center">5</span>
              </motion.button>
            </div>
          </div>

          {/* Student Selector */}
          {children.length > 1 && (
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              {children.map((child) => (
                <motion.button
                  key={child.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedStudent(child)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all min-w-max ${
                    student.id === child.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50'
                      : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                    student.id === child.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}>
                    {child.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">{child.name}</div>
                    <div className="text-xs text-slate-400">{child.level}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Current Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{student.currentJuz}/{student.totalJuz}</div>
                  <div className="text-xs text-emerald-400">Juz Completed</div>
                </div>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-1000"
                  style={{ width: `${(student.currentJuz / student.totalJuz) * 100}%` }}
                />
              </div>
            </motion.div>

            {/* Daily Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{student.dailyScore}%</div>
                  <div className="text-xs text-purple-400">Today's Score</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>Excellent Performance!</span>
              </div>
            </motion.div>

            {/* Weekly Streak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{student.weeklyStreak}</div>
                  <div className="text-xs text-amber-400">Day Streak</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-400">
                <Trophy className="w-4 h-4" />
                <span>Keep it going!</span>
              </div>
            </motion.div>

            {/* Next Quiz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white truncate max-w-[120px]">{student.nextQuiz.title}</div>
                  <div className="text-xs text-blue-400">{student.nextQuiz.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <Clock className="w-4 h-4" />
                <span>{student.nextQuiz.time}</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.a
              href="/tahfiz/progress"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl p-6 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-white font-semibold mb-1">View Progress</h3>
              <p className="text-sm text-slate-400">Track detailed memorization progress</p>
            </motion.a>

            <motion.a
              href="/tahfiz/leaderboards"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl p-6 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-white font-semibold mb-1">Leaderboards</h3>
              <p className="text-sm text-slate-400">See rankings and achievements</p>
            </motion.a>

            <motion.a
              href="/tahfiz/ai-feedback"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl p-6 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-white font-semibold mb-1">Request AI Feedback</h3>
              <p className="text-sm text-slate-400">Get personalized improvement tips</p>
            </motion.a>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                  {student.recentActivity.map((activity, idx) => {
                    const Icon = getActivityIcon(activity);
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-slate-900/50 hover:bg-slate-900/70 border border-slate-700/30 rounded-xl transition-all group cursor-pointer"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getActivityColor(activity.color)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold mb-1">{activity.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.time}
                            </span>
                            {activity.score && (
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-amber-400" />
                                Score: {activity.score}%
                              </span>
                            )}
                          </div>
                        </div>
                        <Eye className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Upcoming Events</h2>
                <div className="space-y-3">
                  {student.upcomingEvents.map((event, idx) => {
                    const Icon = getEventTypeIcon(event.type);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-700/30 rounded-xl hover:border-purple-500/30 transition-all group cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm mb-1">{event.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Calendar className="w-3 h-3" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                              <Clock className="w-3 h-3" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            event.type === 'quiz' ? 'bg-purple-500/20 text-purple-400' :
                            event.type === 'exam' ? 'bg-red-500/20 text-red-400' :
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {event.type.toUpperCase()}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  View Full Calendar
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
