'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell, Clock, CheckCircle, AlertTriangle, Award, BookOpen,
  X, Filter, Calendar, Users, Target, Trash2, MailOpen
} from 'lucide-react';

export default function TahfizNotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock notifications with animation
    const mockNotifications = [
      {
        id: 1,
        type: 'halaqa-reminder',
        avatar: 'A',
        name: 'Ahmed Hassan',
        message: 'Halaqa session starting in 15 minutes',
        time: '10 minutes ago',
        read: false,
        timestamp: new Date(Date.now() - 10 * 60 * 1000)
      },
      {
        id: 2,
        type: 'missed-session',
        avatar: 'F',
        name: 'Fatima Ali',
        message: 'Missed morning Halaqa session',
        time: '2 hours ago',
        read: false,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 3,
        type: 'assessment-due',
        avatar: 'O',
        name: 'Omar Khalil',
        message: 'Monthly assessment due tomorrow',
        time: '5 hours ago',
        read: false,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
      },
      {
        id: 4,
        type: 'milestone',
        avatar: 'M',
        name: 'Maryam Abdullah',
        message: 'Completed Juz 20! 🎉',
        time: '1 day ago',
        read: true,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        id: 5,
        type: 'halaqa-reminder',
        avatar: 'Y',
        name: 'Yusuf Ibrahim',
        message: 'Afternoon Halaqa starts at 2:00 PM',
        time: '1 day ago',
        read: true,
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000)
      },
      {
        id: 6,
        type: 'assessment-due',
        avatar: 'H',
        name: 'Hassan Malik',
        message: 'Tajweed assessment scheduled for Friday',
        time: '2 days ago',
        read: true,
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000)
      },
      {
        id: 7,
        type: 'milestone',
        avatar: 'Z',
        name: 'Zainab Ahmed',
        message: 'Earned "30-Day Streak" badge!',
        time: '3 days ago',
        read: true,
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000)
      },
      {
        id: 8,
        type: 'missed-session',
        avatar: 'A',
        name: 'Aisha Mohammed',
        message: 'Absent from evening revision session',
        time: '3 days ago',
        read: true,
        timestamp: new Date(Date.now() - 76 * 60 * 60 * 1000)
      },
    ];

    setNotifications(mockNotifications);
  }, []);

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'halaqa-reminder':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950',
          border: 'border-blue-500',
          icon: Bell,
          iconColor: 'text-blue-600 dark:text-blue-400',
          iconBg: 'bg-blue-100 dark:bg-blue-900'
        };
      case 'missed-session':
        return {
          bg: 'bg-red-50 dark:bg-red-950',
          border: 'border-red-500',
          icon: X,
          iconColor: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900'
        };
      case 'assessment-due':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950',
          border: 'border-amber-500',
          icon: AlertTriangle,
          iconColor: 'text-amber-600 dark:text-amber-400',
          iconBg: 'bg-amber-100 dark:bg-amber-900'
        };
      case 'milestone':
        return {
          bg: 'bg-green-50 dark:bg-green-950',
          border: 'border-green-500',
          icon: Award,
          iconColor: 'text-green-600 dark:text-green-400',
          iconBg: 'bg-green-100 dark:bg-green-900'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-950',
          border: 'border-gray-500',
          icon: Bell,
          iconColor: 'text-gray-600 dark:text-gray-400',
          iconBg: 'bg-gray-100 dark:bg-gray-900'
        };
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (filter === 'unread') return !notif.read;
    if (filter === 'today') return notif.timestamp >= today;
    if (filter === 'week') return notif.timestamp >= weekAgo;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <Bell className="w-10 h-10" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <h1 className="text-4xl font-bold">Notification Center</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Stay updated with Halaqa activities and student milestones
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-all"
              >
                <MailOpen className="w-5 h-5" />
                Mark All Read
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-all"
              >
                <Trash2 className="w-5 h-5" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Stats & Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {notifications.filter(n => n.type === 'halaqa-reminder').length} Halaqa Reminders
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {notifications.filter(n => n.type === 'missed-session').length} Missed Sessions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {notifications.filter(n => n.type === 'assessment-due').length} Assessments
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {notifications.filter(n => n.type === 'milestone').length} Milestones
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'unread'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'today'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setFilter('week')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'week'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif, index) => {
              const style = getNotificationStyle(notif.type);
              const Icon = style.icon;
              
              return (
                <div
                  key={notif.id}
                  className={`${style.bg} rounded-xl border-l-4 ${style.border} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-slideInRight`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4 p-6">
                    {/* Avatar & Icon */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                        {notif.avatar}
                      </div>
                      <div className={`p-2 ${style.iconBg} rounded-lg`}>
                        <Icon className={`w-5 h-5 ${style.iconColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {notif.name}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 mt-1">
                            {notif.message}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {notif.time}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </button>
                      )}
                      <button
                        onClick={() => dismissNotification(notif.id)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Dismiss"
                      >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More (UI-only) */}
        {filteredNotifications.length > 0 && (
          <div className="text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
              Load More Notifications
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
