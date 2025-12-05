'use client';

import React from 'react';
import {
  User, BookOpen, Users, TrendingUp, Award, AlertTriangle,
  Clock, CheckCircle, Star, MessageSquare, Calendar, Target,
  BarChart3, Trophy, Zap, ChevronRight, Mail, Bell
} from 'lucide-react';

export default function TutorTahfizDashboard({ params }) {
  const tutorId = params?.id || '1';

  const tutor = {
    id: tutorId,
    name: 'Ustadh Ibrahim Al-Mansur',
    qualification: 'Ijazah in Hafs & Warsh',
    joinDate: '2020-03-15',
    totalStudents: 24,
    halaqas: 3
  };

  const assignedHalaqas = [
    {
      id: 1,
      name: 'Morning Advanced',
      students: 12,
      level: 'Advanced',
      schedule: 'Mon-Fri 8:00 AM',
      avgProgress: 85
    },
    {
      id: 2,
      name: 'Afternoon Beginners',
      students: 8,
      level: 'Beginner',
      schedule: 'Sat-Thu 2:00 PM',
      avgProgress: 62
    },
    {
      id: 3,
      name: 'Evening Revision',
      students: 4,
      level: 'Revision',
      schedule: 'Sun-Thu 6:00 PM',
      avgProgress: 78
    }
  ];

  const students = [
    { id: 1, name: 'Ahmed Hassan', halaqa: 'Morning Advanced', juz: 15, performance: 4.8, status: 'excellent' },
    { id: 2, name: 'Fatima Ali', halaqa: 'Morning Advanced', juz: 12, performance: 4.6, status: 'excellent' },
    { id: 3, name: 'Omar Khalil', halaqa: 'Afternoon Beginners', juz: 3, performance: 4.2, status: 'good' },
    { id: 4, name: 'Aisha Mohammed', halaqa: 'Morning Advanced', juz: 18, performance: 4.9, status: 'excellent' },
    { id: 5, name: 'Yusuf Ibrahim', halaqa: 'Afternoon Beginners', juz: 2, performance: 3.5, status: 'needs-support' },
    { id: 6, name: 'Maryam Abdullah', halaqa: 'Evening Revision', juz: 20, performance: 4.7, status: 'excellent' },
  ];

  const performanceInsights = {
    avgRecitationRating: 4.5,
    studentsNearingCompletion: 5,
    revisionAlerts: 3,
    weeklyProgress: 12.5
  };

  const nearingCompletion = students.filter(s => s.juz >= 15);
  const needsSupport = students.filter(s => s.performance < 4.0);

  const revisionAlerts = [
    { student: 'Ahmed Hassan', surah: 'Al-Baqarah', daysOverdue: 2 },
    { student: 'Fatima Ali', surah: 'Yasin', daysOverdue: 1 },
    { student: 'Maryam Abdullah', surah: 'Ar-Rahman', daysOverdue: 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Tutor Profile Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 backdrop-blur-lg flex items-center justify-center text-4xl font-bold border-4 border-white">
                {tutor.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{tutor.name}</h1>
                <p className="text-emerald-100 text-lg mb-1">{tutor.qualification}</p>
                <div className="flex items-center gap-4 text-sm text-emerald-200">
                  <span>Joined: {new Date(tutor.joinDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{tutor.totalStudents} Students</span>
                  <span>•</span>
                  <span>{tutor.halaqas} Halaqas</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
              <MessageSquare className="w-5 h-5" />
              Message All Students
            </button>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-lg">
                <Star className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{performanceInsights.avgRecitationRating}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Recitation</div>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= performanceInsights.avgRecitationRating
                      ? 'fill-emerald-500 text-emerald-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg">
                <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{performanceInsights.studentsNearingCompletion}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Nearing Juz Complete</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{performanceInsights.revisionAlerts}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Revision Alerts</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">+{performanceInsights.weeklyProgress}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Halaqas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Assigned Halaqas</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assignedHalaqas.map(halaqa => (
              <div
                key={halaqa.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">{halaqa.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    halaqa.level === 'Advanced' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' :
                    halaqa.level === 'Beginner' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                    'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    {halaqa.level}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{halaqa.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{halaqa.schedule}</span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Average Progress</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{halaqa.avgProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 h-2 rounded-full"
                      style={{ width: `${halaqa.avgProgress}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Students Under Supervision */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Students Under Your Supervision</h2>
            </div>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold">
              View All {tutor.totalStudents}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Student</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Halaqa</th>
                  <th className="text-center p-4 font-bold text-gray-900 dark:text-white">Current Juz</th>
                  <th className="text-center p-4 font-bold text-gray-900 dark:text-white">Performance</th>
                  <th className="text-center p-4 font-bold text-gray-900 dark:text-white">Status</th>
                  <th className="text-center p-4 font-bold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{student.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{student.halaqa}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full font-semibold">
                        Juz {student.juz}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(student.performance)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {student.performance}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'excellent' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                        student.status === 'good' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                        'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                      }`}>
                        {student.status === 'excellent' ? 'Excellent' : student.status === 'good' ? 'Good' : 'Needs Support'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nearing Completion */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Students Nearing Juz Completion</h3>
            </div>
            <div className="space-y-3">
              {nearingCompletion.map(student => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{student.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Juz {student.juz} - {((student.juz / 30) * 100).toFixed(0)}% complete</div>
                    </div>
                  </div>
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Revision Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Revision Alerts</h3>
            </div>
            <div className="space-y-3">
              {revisionAlerts.map((alert, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                  alert.daysOverdue > 0 
                    ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 border-red-500'
                    : 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-500'
                }`}>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{alert.student}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {alert.surah} - {alert.daysOverdue > 0 ? `${alert.daysOverdue} days overdue` : 'Due today'}
                    </div>
                  </div>
                  <Clock className={`w-5 h-5 ${alert.daysOverdue > 0 ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-xl">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 hover:bg-opacity-30 transition-all">
              <Bell className="w-8 h-8" />
              <span className="font-semibold">Send Reminder</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 hover:bg-opacity-30 transition-all">
              <BarChart3 className="w-8 h-8" />
              <span className="font-semibold">View Analytics</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 hover:bg-opacity-30 transition-all">
              <Target className="w-8 h-8" />
              <span className="font-semibold">Set Goals</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 hover:bg-opacity-30 transition-all">
              <Award className="w-8 h-8" />
              <span className="font-semibold">Award Badges</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
