'use client';

import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, PieChart, Download, Filter,
  Calendar, Users, BookOpen, Award, Target, Activity,
  Clock, CheckCircle, Star, FileText, ChevronRight
} from 'lucide-react';

export default function TahfizReports() {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock data
  const overviewStats = {
    totalStudents: 248,
    totalJuzCompleted: 1230,
    avgProgress: 68,
    attendanceRate: 89,
    avgAccuracy: 92,
    activeMemoriz ers: 187
  };

  const classPerformance = [
    { class: 'Class A', students: 45, avgProgress: 75, attendance: 92, juzCompleted: 342 },
    { class: 'Class B', students: 52, avgProgress: 68, attendance: 88, juzCompleted: 298 },
    { class: 'Class C', students: 48, avgProgress: 72, attendance: 90, juzCompleted: 315 },
    { class: 'Class D', students: 50, avgProgress: 65, attendance: 85, juzCompleted: 275 },
  ];

  const monthlyProgress = [
    { month: 'Jan', juz: 85, pages: 1700, accuracy: 90 },
    { month: 'Feb', juz: 92, pages: 1840, accuracy: 91 },
    { month: 'Mar', juz: 88, pages: 1760, accuracy: 89 },
    { month: 'Apr', juz: 95, pages: 1900, accuracy: 92 },
    { month: 'May', juz: 102, pages: 2040, accuracy: 93 },
    { month: 'Jun', juz: 98, pages: 1960, accuracy: 92 },
  ];

  const topPerformers = [
    { name: 'Ahmed Hassan', juz: 12, accuracy: 98, attendance: 100 },
    { name: 'Fatima Ali', juz: 11, accuracy: 96, attendance: 98 },
    { name: 'Omar Khalil', juz: 10, accuracy: 95, attendance: 97 },
    { name: 'Aisha Mohammed', juz: 9, accuracy: 94, attendance: 96 },
    { name: 'Hassan Ibrahim', juz: 8, accuracy: 93, attendance: 95 },
  ];

  const needsAttention = [
    { name: 'Student A', issue: 'Low attendance (65%)', class: 'Class B' },
    { name: 'Student B', issue: 'Below target progress (45%)', class: 'Class D' },
    { name: 'Student C', issue: 'Accuracy below 70%', class: 'Class C' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Tahfiz Reports & Analytics</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Comprehensive insights and performance analysis
              </p>
            </div>
            <button className="px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-semibold flex items-center gap-2 shadow-lg">
              <Download className="w-5 h-5" />
              Export All Reports
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="overview">Overview Report</option>
              <option value="student">Student Performance</option>
              <option value="class">Class Comparison</option>
              <option value="progress">Progress Tracking</option>
              <option value="attendance">Attendance Report</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="term">This Term</option>
              <option value="year">This Year</option>
            </select>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Classes</option>
              <option value="A">Class A</option>
              <option value="B">Class B</option>
              <option value="C">Class C</option>
              <option value="D">Class D</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            icon={<Users className="w-8 h-8" />}
            title="Total Students"
            value={overviewStats.totalStudents}
            change="+12"
            changeType="positive"
            subtitle="Active memorizers"
            color="emerald"
          />
          <MetricCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Juz Completed"
            value={overviewStats.totalJuzCompleted}
            change="+145"
            changeType="positive"
            subtitle="This term"
            color="blue"
          />
          <MetricCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Avg Progress"
            value={`${overviewStats.avgProgress}%`}
            change="+5%"
            changeType="positive"
            subtitle="Across all students"
            color="purple"
          />
          <MetricCard
            icon={<CheckCircle className="w-8 h-8" />}
            title="Attendance Rate"
            value={`${overviewStats.attendanceRate}%`}
            change="+3%"
            changeType="positive"
            subtitle="Last 30 days"
            color="green"
          />
          <MetricCard
            icon={<Star className="w-8 h-8" />}
            title="Avg Accuracy"
            value={`${overviewStats.avgAccuracy}%`}
            change="+2%"
            changeType="positive"
            subtitle="Recitation quality"
            color="yellow"
          />
          <MetricCard
            icon={<Activity className="w-8 h-8" />}
            title="Active Sessions"
            value="187"
            change="-5"
            changeType="negative"
            subtitle="Daily sabaki"
            color="teal"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Progress Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                Monthly Progress Trend
              </h2>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              {monthlyProgress.map((month, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {month.month}
                    </span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {month.juz} Juz
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {month.pages} pages
                      </span>
                      <span className="text-purple-600 dark:text-purple-400">
                        {month.accuracy}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                      style={{ width: `${(month.juz / 120) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Class Performance Comparison
              </h2>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              {classPerformance.map((classItem, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {classItem.class}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {classItem.students} students
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-emerald-600">{classItem.avgProgress}%</div>
                      <div className="text-gray-600 dark:text-gray-400">Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{classItem.attendance}%</div>
                      <div className="text-gray-600 dark:text-gray-400">Attendance</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">{classItem.juzCompleted}</div>
                      <div className="text-gray-600 dark:text-gray-400">Juz</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
                      style={{ width: `${classItem.avgProgress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Top 5 Performers
            </h2>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-lg"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-amber-600' :
                    'bg-emerald-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <span>{student.juz} Juz</span>
                      <span>•</span>
                      <span>{student.accuracy}% accuracy</span>
                      <span>•</span>
                      <span>{student.attendance}% attendance</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-red-500" />
              Students Needing Attention
            </h2>
            <div className="space-y-3">
              {needsAttention.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-950 rounded-lg border-l-4 border-red-500"
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {student.name}
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {student.issue}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {student.class}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Downloadable Reports */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            Downloadable Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReportCard
              title="Student Progress Report"
              description="Individual student performance and achievements"
              icon={<Users className="w-6 h-6" />}
              color="emerald"
            />
            <ReportCard
              title="Class Performance Report"
              description="Comparative analysis across all classes"
              icon={<BarChart3 className="w-6 h-6" />}
              color="blue"
            />
            <ReportCard
              title="Attendance Summary"
              description="Detailed attendance records and trends"
              icon={<Calendar className="w-6 h-6" />}
              color="purple"
            />
            <ReportCard
              title="Exam Results Report"
              description="Comprehensive exam scores and statistics"
              icon={<Award className="w-6 h-6" />}
              color="yellow"
            />
            <ReportCard
              title="Progress Tracking Report"
              description="Juz and Surah completion tracking"
              icon={<Target className="w-6 h-6" />}
              color="teal"
            />
            <ReportCard
              title="Teacher Performance"
              description="Teacher effectiveness and class outcomes"
              icon={<Star className="w-6 h-6" />}
              color="orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, change, changeType, subtitle, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    teal: 'from-teal-500 to-teal-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ReportCard({ title, description, icon, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    teal: 'from-teal-500 to-teal-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-emerald-500">
      <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white w-fit mb-3`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
        <Download className="w-4 h-4" />
        Download PDF
      </button>
    </div>
  );
}
