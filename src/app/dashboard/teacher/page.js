'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, BookOpen, Users, ClipboardCheck, Award, TrendingUp,
  FileText, MessageSquare, Bell, CheckCircle, AlertCircle, Star,
  ChevronRight, Download, Plus, Eye, Edit, Target, BarChart3
} from 'lucide-react';

export default function TeacherDashboard() {
  const [teacherData, setTeacherData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedData = localStorage.getItem('teacher_dashboard_data');
    if (savedData) {
      setTeacherData(JSON.parse(savedData));
    } else {
      const mockData = {
        teacher: {
          name: 'Dr. Ahmed Khalil',
          id: 'TCH-0045',
          subjects: ['Mathematics', 'Physics'],
          classes: ['Grade 9A', 'Grade 9B', 'Grade 10A']
        },
        todaySchedule: [
          { id: 1, time: '08:00 - 09:00', subject: 'Mathematics', class: 'Grade 9A', room: 'A-201', status: 'completed' },
          { id: 2, time: '09:15 - 10:15', subject: 'Physics', class: 'Grade 10A', room: 'B-105', status: 'in-progress' },
          { id: 3, time: '10:30 - 11:30', subject: 'Mathematics', class: 'Grade 9B', room: 'A-201', status: 'upcoming' },
          { id: 4, time: '13:00 - 14:00', subject: 'Physics Lab', class: 'Grade 10A', room: 'Lab-2', status: 'upcoming' }
        ],
        quickStats: {
          classesToday: 4,
          pendingGrading: 38,
          avgAttendance: 94.2,
          studentCount: 127
        },
        pendingTasks: [
          { id: 1, type: 'grading', title: 'Grade Mathematics Mid-Term - Grade 9A', deadline: '2 days', priority: 'high', count: 35 },
          { id: 2, type: 'grading', title: 'Grade Physics Quiz - Grade 10A', deadline: '5 days', priority: 'medium', count: 42 },
          { id: 3, type: 'report', title: 'Submit Monthly Progress Report', deadline: '1 week', priority: 'low', count: 1 },
          { id: 4, type: 'lesson', title: 'Prepare Lesson Plan - Chapter 7', deadline: '3 days', priority: 'medium', count: 1 }
        ],
        recentPerformance: [
          { class: 'Grade 9A', subject: 'Mathematics', average: 78.5, trend: 'up', lastExam: 'Mid-Term', students: 35 },
          { class: 'Grade 9B', subject: 'Mathematics', average: 72.3, trend: 'down', lastExam: 'Mid-Term', students: 38 },
          { class: 'Grade 10A', subject: 'Physics', average: 81.2, trend: 'up', lastExam: 'Quiz 3', students: 42 }
        ],
        attendanceToday: [
          { class: 'Grade 9A', present: 33, total: 35, percentage: 94.3, status: 'good' },
          { class: 'Grade 10A', present: 39, total: 42, percentage: 92.9, status: 'good' }
        ],
        announcements: [
          { id: 1, title: 'Parent-Teacher Meeting scheduled', date: '2025-12-10', type: 'meeting' },
          { id: 2, title: 'Exam schedule finalized for Finals', date: '2025-12-15', type: 'exam' },
          { id: 3, title: 'Professional Development Workshop', date: '2025-12-08', type: 'training' }
        ]
      };
      setTeacherData(mockData);
      localStorage.setItem('teacher_dashboard_data', JSON.stringify(mockData));
    }
  }, []);

  if (!teacherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome, {teacherData.teacher.name.split(' ')[1]}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {teacherData.teacher.subjects.join(' • ')} | {teacherData.teacher.id}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                View Full Schedule
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Quick Actions
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-500/10 to-indigo-600/10 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {teacherData.quickStats.classesToday}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Classes Today</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-semibold">
                Action Required
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {teacherData.quickStats.pendingGrading}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Grading</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {teacherData.quickStats.avgAttendance}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Attendance</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {teacherData.quickStats.studentCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Today's Schedule</h2>
            <div className="space-y-3">
              {teacherData.todaySchedule.map((lesson, idx) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-xl border-l-4 ${
                    lesson.status === 'completed' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500' :
                    lesson.status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' :
                    'bg-gray-50 dark:bg-gray-900/20 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        lesson.status === 'completed' ? 'bg-emerald-500' :
                        lesson.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-400'
                      }`} />
                      <span className="font-semibold text-gray-900 dark:text-white">{lesson.time}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      lesson.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                      lesson.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                    }`}>
                      {lesson.status.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{lesson.subject}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {lesson.class}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {lesson.room}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pending Tasks</h2>
            <div className="space-y-3">
              {teacherData.pendingTasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    task.priority === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                    task.priority === 'medium' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
                    'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      task.type === 'grading' ? 'bg-amber-100 dark:bg-amber-900/30' :
                      task.type === 'report' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      {task.type === 'grading' ? <ClipboardCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" /> :
                       task.type === 'report' ? <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> :
                       <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{task.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>Due in {task.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Class Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Performance</h2>
            <div className="space-y-4">
              {teacherData.recentPerformance.map((perf, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{perf.class}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{perf.subject} - {perf.lastExam}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{perf.average}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{perf.students} students</div>
                      </div>
                      {perf.trend === 'up' ? (
                        <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400 rotate-180" />
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-purple-200 dark:bg-purple-900/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                      style={{ width: `${perf.average}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Announcements</h2>
            <div className="space-y-4">
              {teacherData.announcements.map((announcement, idx) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{announcement.title}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      announcement.type === 'exam' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                      announcement.type === 'meeting' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    }`}>
                      {announcement.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{announcement.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
