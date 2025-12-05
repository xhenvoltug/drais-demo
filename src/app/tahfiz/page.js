'use client';

import React, { useState } from 'react';
import { 
  BookOpen, Users, TrendingUp, Award, Calendar, 
  Clock, CheckCircle, AlertCircle, Star, Activity,
  BarChart3, Target, Book, User
} from 'lucide-react';

export default function TahfizDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data
  const stats = {
    totalStudents: 248,
    activeMemorizers: 187,
    completedJuz: 342,
    averageProgress: 68,
    todayAttendance: 95,
    weeklyTarget: 85
  };

  const recentActivities = [
    { id: 1, student: 'Ahmed Hassan', action: 'Completed Juz 5', time: '2 hours ago', type: 'success' },
    { id: 2, student: 'Fatima Ali', action: 'Sabaki Session - Surah Al-Baqarah', time: '3 hours ago', type: 'info' },
    { id: 3, student: 'Omar Khalil', action: 'Earned Gold Star Badge', time: '5 hours ago', type: 'award' },
    { id: 4, student: 'Aisha Mohammed', action: 'Perfect Recitation - Surah Yasin', time: '1 day ago', type: 'success' },
  ];

  const topPerformers = [
    { id: 1, name: 'Ahmed Hassan', juz: 12, accuracy: 98, rank: 1 },
    { id: 2, name: 'Fatima Ali', juz: 11, accuracy: 96, rank: 2 },
    { id: 3, name: 'Omar Khalil', juz: 10, accuracy: 95, rank: 3 },
    { id: 4, name: 'Aisha Mohammed', juz: 9, accuracy: 94, rank: 4 },
    { id: 5, name: 'Hassan Ibrahim', juz: 8, accuracy: 93, rank: 5 },
  ];

  const classProgress = [
    { class: 'Class A', students: 45, avgProgress: 75, target: 80 },
    { class: 'Class B', students: 52, avgProgress: 68, target: 75 },
    { class: 'Class C', students: 48, avgProgress: 72, target: 70 },
    { class: 'Class D', students: 50, avgProgress: 65, target: 70 },
    { class: 'Class E', students: 53, avgProgress: 70, target: 75 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Tahfiz Al-Quran</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Complete Quran Memorization Management System
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-emerald-200 mb-1">Today's Date</div>
              <div className="text-2xl font-bold">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<Users className="w-8 h-8" />}
            title="Total Students"
            value={stats.totalStudents}
            subtitle={`${stats.activeMemorizers} actively memorizing`}
            color="emerald"
          />
          <StatCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Completed Juz"
            value={stats.completedJuz}
            subtitle="Across all students"
            color="teal"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Average Progress"
            value={`${stats.averageProgress}%`}
            subtitle={`Target: ${stats.weeklyTarget}%`}
            color="blue"
          />
          <StatCard
            icon={<CheckCircle className="w-8 h-8" />}
            title="Today's Attendance"
            value={`${stats.todayAttendance}%`}
            subtitle="187 of 248 present"
            color="green"
          />
          <StatCard
            icon={<Star className="w-8 h-8" />}
            title="Awards Given"
            value="342"
            subtitle="This month"
            color="yellow"
          />
          <StatCard
            icon={<Activity className="w-8 h-8" />}
            title="Active Sessions"
            value="12"
            subtitle="Ongoing sabaki sessions"
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-emerald-600" />
                Recent Activities
              </h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className={`p-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-100 text-green-600' :
                    activity.type === 'award' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                     activity.type === 'award' ? <Award className="w-5 h-5" /> :
                     <Book className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {activity.student}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Top Performers
            </h2>
            <div className="space-y-4">
              {topPerformers.map((performer) => (
                <div
                  key={performer.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-lg"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    performer.rank === 1 ? 'bg-yellow-500' :
                    performer.rank === 2 ? 'bg-gray-400' :
                    performer.rank === 3 ? 'bg-amber-600' :
                    'bg-emerald-500'
                  }`}>
                    {performer.rank}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {performer.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                      <span>{performer.juz} Juz</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {performer.accuracy}% accuracy
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Class Progress Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            Class Progress Overview
          </h2>
          <div className="space-y-4">
            {classProgress.map((classItem, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {classItem.class}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {classItem.students} students
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Progress: <span className="font-bold text-emerald-600">{classItem.avgProgress}%</span>
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Target: <span className="font-bold text-blue-600">{classItem.target}%</span>
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                    style={{ width: `${classItem.avgProgress}%` }}
                  />
                  <div
                    className="absolute top-0 left-0 h-full border-r-2 border-blue-600"
                    style={{ width: `${classItem.target}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton
            icon={<User className="w-6 h-6" />}
            label="Student Portfolio"
            href="/tahfiz/students"
            color="emerald"
          />
          <QuickActionButton
            icon={<Book className="w-6 h-6" />}
            label="Daily Sabaki"
            href="/tahfiz/sabaki"
            color="teal"
          />
          <QuickActionButton
            icon={<Target className="w-6 h-6" />}
            label="Progress Tracking"
            href="/tahfiz/progress"
            color="blue"
          />
          <QuickActionButton
            icon={<Award className="w-6 h-6" />}
            label="Rewards"
            href="/tahfiz/rewards"
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    teal: 'from-teal-500 to-teal-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
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
    </div>
  );
}

function QuickActionButton({ icon, label, href, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
    teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
  };

  return (
    <a
      href={href}
      className={`flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br ${colorClasses[color]} text-white rounded-xl shadow-lg hover:shadow-xl transition-all`}
    >
      {icon}
      <span className="font-semibold text-center">{label}</span>
    </a>
  );
}
