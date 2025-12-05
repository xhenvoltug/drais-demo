'use client';

import React, { useState } from 'react';
import {
  Users, TrendingUp, Award, Target, BookOpen, Calendar,
  Clock, CheckCircle, AlertCircle, BarChart3, User,
  ChevronRight, Filter, Download, Star, Activity, Flame
} from 'lucide-react';

export default function ClassOverview() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [timeRange, setTimeRange] = useState('month');

  // Mock class data
  const classes = [
    {
      id: 1,
      name: 'Class A',
      teacher: 'Sheikh Abdullah',
      students: 45,
      avgProgress: 75,
      target: 80,
      attendance: 92,
      topPerformers: 12,
      needsAttention: 5,
      juzCompleted: 342,
      weeklyPages: 68,
      color: 'emerald'
    },
    {
      id: 2,
      name: 'Class B',
      teacher: 'Ustadh Omar',
      students: 52,
      avgProgress: 68,
      target: 75,
      attendance: 88,
      topPerformers: 10,
      needsAttention: 8,
      juzCompleted: 298,
      weeklyPages: 62,
      color: 'blue'
    },
    {
      id: 3,
      name: 'Class C',
      teacher: 'Sheikh Hassan',
      students: 48,
      avgProgress: 72,
      target: 70,
      attendance: 90,
      topPerformers: 11,
      needsAttention: 6,
      juzCompleted: 315,
      weeklyPages: 65,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Class D',
      teacher: 'Ustadh Ibrahim',
      students: 50,
      avgProgress: 65,
      target: 70,
      attendance: 85,
      topPerformers: 8,
      needsAttention: 10,
      juzCompleted: 275,
      weeklyPages: 58,
      color: 'teal'
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'from-emerald-500 to-emerald-600',
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      teal: 'from-teal-500 to-teal-600',
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Class Overview</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Monitor and compare performance across all Tahfiz classes
              </p>
            </div>
            <div className="flex gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white bg-opacity-20 border-0 rounded-lg text-white focus:ring-2 focus:ring-white"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="term">This Term</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Users className="w-8 h-8" />}
            title="Total Students"
            value="195"
            subtitle="Across 4 classes"
            color="emerald"
          />
          <StatCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Juz Completed"
            value="1,230"
            subtitle="This term"
            color="blue"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Avg Progress"
            value="70%"
            subtitle="All classes combined"
            color="purple"
          />
          <StatCard
            icon={<CheckCircle className="w-8 h-8" />}
            title="Avg Attendance"
            value="89%"
            subtitle="Last 30 days"
            color="teal"
          />
        </div>

        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-emerald-500 cursor-pointer"
              onClick={() => setSelectedClass(classItem)}
            >
              {/* Class Header */}
              <div className={`bg-gradient-to-r ${getColorClasses(classItem.color)} p-6 rounded-t-xl text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{classItem.name}</h3>
                    <p className="text-white text-opacity-90">
                      Teacher: {classItem.teacher}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{classItem.students}</div>
                    <div className="text-sm opacity-90">Students</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Class Progress</span>
                    <span className="font-bold">{classItem.avgProgress}% / {classItem.target}%</span>
                  </div>
                  <div className="w-full h-3 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${classItem.avgProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Class Stats */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {classItem.topPerformers}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Top Performers</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {classItem.needsAttention}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Need Attention</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {classItem.attendance}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Attendance</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{classItem.juzCompleted} Juz completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{classItem.weeklyPages} pages/week</span>
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 font-semibold">
                  View Detailed Report
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Class Comparison Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
              Class Performance Comparison
            </h2>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>

          <div className="space-y-6">
            {classes.map((classItem, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getColorClasses(classItem.color)}`} />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {classItem.name}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {classItem.students} students
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Progress: <span className={`font-bold bg-gradient-to-r ${getColorClasses(classItem.color)} bg-clip-text text-transparent`}>
                        {classItem.avgProgress}%
                      </span>
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Target: <span className="font-bold text-blue-600">{classItem.target}%</span>
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Attendance: <span className="font-bold text-green-600">{classItem.attendance}%</span>
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getColorClasses(classItem.color)} rounded-full transition-all`}
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

        {/* Teachers Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Teacher Performance Leaderboard
          </h2>
          <div className="space-y-4">
            {classes.map((classItem, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-amber-600' :
                  'bg-emerald-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {classItem.teacher}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {classItem.name} • {classItem.students} students
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    {classItem.avgProgress}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Class Progress
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {classItem.juzCompleted}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Juz Completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    teal: 'from-teal-500 to-teal-600',
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
