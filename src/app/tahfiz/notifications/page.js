'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import {
  Bell, Award, Trophy, Calendar, AlertCircle, CheckCircle,
  X, Trash2, Eye, Filter, Star, BookOpen, Target, Flame,
  MessageSquare, Users, Clock, TrendingUp, Download, Sparkles
} from 'lucide-react';

export default function Notifications() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'badge', title: 'New Badge Earned!', message: 'Ahmed Hassan earned "30-Day Streak Master" badge', time: '5 mins ago', read: false, icon: Trophy, color: 'amber', student: 'Ahmed Hassan' },
    { id: 2, type: 'progress', title: 'Juz Completed', message: 'Fatima Ali completed Juz 18 with 96% accuracy', time: '1 hour ago', read: false, icon: CheckCircle, color: 'emerald', student: 'Fatima Ali' },
    { id: 3, type: 'quiz', title: 'Quiz Reminder', message: 'Juz 8 Quiz scheduled for tomorrow at 10:00 AM', time: '2 hours ago', read: false, icon: Calendar, color: 'purple', student: null },
    { id: 4, type: 'alert', title: 'Attention Needed', message: 'Omar Khalil\'s accuracy dropped below 90%', time: '3 hours ago', read: true, icon: AlertCircle, color: 'red', student: 'Omar Khalil' },
    { id: 5, type: 'certificate', title: 'Certificate Ready', message: 'Juz 15 Mastery Certificate is ready for download', time: '5 hours ago', read: true, icon: Award, color: 'blue', student: 'Aisha Mohammed' },
    { id: 6, type: 'announcement', title: 'System Update', message: 'New AI feedback features now available in practice mode', time: '1 day ago', read: true, icon: Sparkles, color: 'purple', student: null },
    { id: 7, type: 'progress', title: 'Weekly Goal Achieved', message: 'You completed 5 practice sessions this week!', time: '1 day ago', read: true, icon: Target, color: 'emerald', student: null },
    { id: 8, type: 'badge', title: 'Achievement Unlocked', message: 'Earned "Perfect Recitation" badge for 3 consecutive sessions', time: '2 days ago', read: true, icon: Star, color: 'amber', student: null },
    { id: 9, type: 'quiz', title: 'Quiz Results', message: 'Your Juz 7 Quiz score: 94% - Excellent work!', time: '2 days ago', read: true, icon: TrendingUp, color: 'emerald', student: null },
    { id: 10, type: 'progress', title: 'Milestone Reached', message: 'Khadija Ahmed reached 50% Quran memorization', time: '3 days ago', read: true, icon: Trophy, color: 'purple', student: 'Khadija Ahmed' },
    { id: 11, type: 'alert', title: 'Streak at Risk', message: 'Yusuf Ibrahim hasn\'t practiced in 2 days', time: '3 days ago', read: true, icon: Flame, color: 'orange', student: 'Yusuf Ibrahim' },
    { id: 12, type: 'announcement', title: 'Halaqa Session', message: 'Special Tajweed session tomorrow at 4:00 PM', time: '4 days ago', read: true, icon: BookOpen, color: 'blue', student: null }
  ]);

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'badge', label: 'Badges', count: notifications.filter(n => n.type === 'badge').length },
    { id: 'progress', label: 'Progress', count: notifications.filter(n => n.type === 'progress').length },
    { id: 'quiz', label: 'Quizzes', count: notifications.filter(n => n.type === 'quiz').length },
    { id: 'alert', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length }
  ];

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getColorClasses = (color) => {
    const colors = {
      amber: { gradient: 'from-amber-500 to-orange-600', bg: 'from-amber-500/10 to-orange-600/10', border: 'border-amber-500/30', text: 'text-amber-400' },
      emerald: { gradient: 'from-emerald-500 to-teal-600', bg: 'from-emerald-500/10 to-teal-600/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
      purple: { gradient: 'from-purple-500 to-pink-600', bg: 'from-purple-500/10 to-pink-600/10', border: 'border-purple-500/30', text: 'text-purple-400' },
      red: { gradient: 'from-red-500 to-pink-600', bg: 'from-red-500/10 to-pink-600/10', border: 'border-red-500/30', text: 'text-red-400' },
      blue: { gradient: 'from-blue-500 to-indigo-600', bg: 'from-blue-500/10 to-indigo-600/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      orange: { gradient: 'from-orange-500 to-red-600', bg: 'from-orange-500/10 to-red-600/10', border: 'border-orange-500/30', text: 'text-orange-400' }
    };
    return colors[color] || colors.purple;
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-slate-400">Stay updated with your Tahfiz journey</p>
            </div>
            {unreadCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Mark All as Read</span>
              </motion.button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {filters.map((f) => (
              <motion.button
                key={f.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'
                }`}
              >
                {f.label} {f.count > 0 && `(${f.count})`}
              </motion.button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-16"
                >
                  <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Notifications</h3>
                  <p className="text-slate-400">You're all caught up!</p>
                </motion.div>
              ) : (
                filteredNotifications.map((notification, idx) => {
                  const Icon = notification.icon;
                  const colors = getColorClasses(notification.color);
                  return (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                      drag="x"
                      dragConstraints={{ left: -100, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, { offset }) => {
                        if (offset.x < -80) {
                          deleteNotification(notification.id);
                        }
                      }}
                      className={`group relative bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-5 cursor-pointer transition-all ${
                        !notification.read ? 'shadow-lg' : 'opacity-75'
                      } hover:opacity-100 hover:scale-[1.01]`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      {/* Swipe Indicator */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-xs text-slate-500">← Swipe to delete</div>
                      </div>

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="text-white font-bold">{notification.title}</h3>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-slate-300 text-sm mb-3">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {notification.time}
                              </span>
                              {notification.student && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {notification.student}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                                  title="Mark as read"
                                >
                                  <Eye className={`w-4 h-4 ${colors.text}`} />
                                </motion.button>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Load More (if needed) */}
          {filteredNotifications.length >= 10 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-white rounded-xl font-semibold transition-all"
            >
              Load More Notifications
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
