'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Calendar, Clock, AlertTriangle, CheckCircle, Info,
  X, Eye, Trash2, Filter, Search, BellRing, FileText,
  Users, Target, Award, Zap, MessageSquare, Settings,
  ChevronRight, AlertCircle, XCircle, BellOff
} from 'lucide-react';

export default function ExamNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'upcoming', title: 'Mathematics Mid-Term Tomorrow', message: 'Grade 9A Mathematics exam scheduled for Dec 10, 2025 at 9:00 AM', time: '2 hours ago', read: false, priority: 'high', icon: Calendar },
    { id: 2, type: 'deadline', title: 'Grading Deadline Approaching', message: 'Physics Final exam grading due in 3 hours. 12 papers remaining.', time: '4 hours ago', read: false, priority: 'urgent', icon: Clock },
    { id: 3, type: 'conflict', title: 'Exam Schedule Conflict Detected', message: 'Grade 10A has 2 exams scheduled on the same day (Dec 15)', time: '6 hours ago', read: false, priority: 'high', icon: AlertTriangle },
    { id: 4, type: 'completion', title: 'English Quiz Completed', message: 'All 40 students have submitted their English Quiz. Ready for grading.', time: '8 hours ago', read: true, priority: 'medium', icon: CheckCircle },
    { id: 5, type: 'missing', title: 'Missing Grading Entries', message: 'Chemistry Lab Test has 5 ungraded essay questions.', time: '1 day ago', read: false, priority: 'high', icon: AlertCircle },
    { id: 6, type: 'duplicate', title: 'Duplicate Questions Found', message: '3 duplicate questions detected in Biology Assessment question bank.', time: '1 day ago', read: true, priority: 'medium', icon: AlertCircle },
    { id: 7, type: 'submission', title: 'Late Submission Alert', message: '2 students submitted Biology exam after deadline.', time: '2 days ago', read: true, priority: 'low', icon: Info },
    { id: 8, type: 'performance', title: 'Low Class Performance Alert', message: 'Grade 9B Physics exam average score is 62% (below threshold).', time: '2 days ago', read: false, priority: 'medium', icon: Target },
    { id: 9, type: 'upcoming', title: 'Chemistry Lab Test Next Week', message: 'Reminder: Chemistry practical exam on Dec 16, 2025.', time: '3 days ago', read: true, priority: 'low', icon: Calendar },
    { id: 10, type: 'success', title: 'Exam Published Successfully', message: 'Mathematics Quiz has been published to Grade 10A students.', time: '3 days ago', read: true, priority: 'low', icon: CheckCircle }
  ]);

  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filterType === 'all' || 
      (filterType === 'unread' && !notif.read) ||
      (filterType === 'urgent' && notif.priority === 'urgent') ||
      notif.type === filterType;
    
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'from-red-500 to-pink-600',
      high: 'from-amber-500 to-orange-600',
      medium: 'from-blue-500 to-indigo-600',
      low: 'from-gray-500 to-slate-600'
    };
    return colors[priority] || colors.medium;
  };

  const getTypeColor = (type) => {
    const colors = {
      upcoming: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      deadline: 'text-red-400 bg-red-500/20 border-red-500/30',
      conflict: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      completion: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      missing: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      duplicate: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      submission: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
      performance: 'text-pink-400 bg-pink-500/20 border-pink-500/30',
      success: 'text-teal-400 bg-teal-500/20 border-teal-500/30'
    };
    return colors[type] || colors.completion;
  };

  const filterTabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'urgent', label: 'Urgent', count: notifications.filter(n => n.priority === 'urgent').length },
    { id: 'upcoming', label: 'Upcoming Exams', count: notifications.filter(n => n.type === 'upcoming').length },
    { id: 'deadline', label: 'Deadlines', count: notifications.filter(n => n.type === 'deadline').length },
    { id: 'conflict', label: 'Conflicts', count: notifications.filter(n => n.type === 'conflict').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <BellRing className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Notifications & Alerts</h1>
              <p className="text-gray-600 dark:text-gray-400">Stay updated on exam activities</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold shadow-lg">
                {unreadCount} Unread
              </div>
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
              >
                Mark All as Read
              </button>
            </div>
          )}
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button
              onClick={clearAll}
              className="px-4 py-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-2"
            >
              <BellOff className="w-5 h-5" />
              Clear All
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {filterTabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap relative ${
                filterType === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-lg text-xs font-bold ${
                  filterType === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg"
              >
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Notifications</h3>
                <p className="text-gray-600 dark:text-gray-400">You're all caught up!</p>
              </motion.div>
            ) : (
              filteredNotifications.map((notif) => {
                const Icon = notif.icon;
                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={(e, { offset }) => {
                      if (offset.x < -80) {
                        deleteNotification(notif.id);
                      }
                    }}
                    className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border-l-4 cursor-pointer group relative ${
                      !notif.read ? 'border-l-indigo-600 shadow-xl' : 'border-l-gray-300 dark:border-l-gray-700 opacity-75'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Priority Indicator */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getPriorityColor(notif.priority)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{notif.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{notif.message}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold border capitalize ${getTypeColor(notif.type)}`}>
                            {notif.type}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{notif.time}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {!notif.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notif.id);
                                }}
                                className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                                title="Mark as read"
                              >
                                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notif.id);
                              }}
                              className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Swipe indicator */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-gray-400">← Swipe to delete</span>
                    </div>

                    {/* Unread indicator */}
                    {!notif.read && (
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg" />
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Alert Settings */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Upcoming Exam Reminders</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified 24 hours before exams</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Grading Deadline Alerts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alert when grading deadlines approach</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Conflict Warnings</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notify about schedule conflicts</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Performance Alerts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alert on low class performance</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
