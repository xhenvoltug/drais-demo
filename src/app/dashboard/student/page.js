'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Award, BookOpen, Calendar, TrendingUp, Clock, Target, Star,
  CheckCircle, AlertCircle, Bell, FileText, Activity, BarChart3,
  GraduationCap, Trophy, Zap, ArrowUp, ArrowDown, Eye, Download
} from 'lucide-react';

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('student_dashboard_data');
    if (savedData) {
      setStudentData(JSON.parse(savedData));
    } else {
      const mockData = {
        student: {
          name: 'Ahmed Hassan Ibrahim',
          id: 'ST-2024-1247',
          class: 'Grade 9A',
          section: 'Science',
          admissionDate: '2022-09-01'
        },
        overview: {
          overallGrade: 'A',
          overallPercentage: 85.4,
          classRank: 3,
          totalStudents: 35,
          attendance: 96.5,
          trend: 3.2
        },
        recentExams: [
          { id: 1, subject: 'Mathematics', exam: 'Mid-Term', score: 88, maxScore: 100, grade: 'A', date: '2025-11-25', trend: 'up' },
          { id: 2, subject: 'Physics', exam: 'Quiz 3', score: 42, maxScore: 50, grade: 'A', date: '2025-11-22', trend: 'up' },
          { id: 3, subject: 'Chemistry', exam: 'Mid-Term', score: 78, maxScore: 100, grade: 'B+', date: '2025-11-20', trend: 'down' },
          { id: 4, subject: 'English', exam: 'Essay', score: 38, maxScore: 40, grade: 'A+', date: '2025-11-18', trend: 'stable' }
        ],
        subjectPerformance: [
          { subject: 'Mathematics', current: 88, previous: 82, average: 85, grade: 'A', color: 'blue' },
          { subject: 'Physics', current: 84, previous: 86, average: 83, grade: 'A', color: 'purple' },
          { subject: 'Chemistry', current: 78, previous: 85, average: 80, grade: 'B+', color: 'emerald' },
          { subject: 'English', current: 92, previous: 90, average: 91, grade: 'A+', color: 'amber' },
          { subject: 'Arabic', current: 87, previous: 84, average: 85, grade: 'A', color: 'rose' },
          { subject: 'Islamic Studies', current: 95, previous: 93, average: 94, grade: 'A+', color: 'indigo' }
        ],
        tahfizProgress: {
          currentJuz: 5,
          completedJuz: 4,
          totalVerses: 892,
          accuracy: 94.5,
          lastSession: '2025-12-01',
          target: 'Complete Juz 5 by December'
        },
        upcomingExams: [
          { id: 1, subject: 'Mathematics', type: 'Final Exam', date: '2025-12-15', time: '09:00 AM', duration: '2 hours', venue: 'Hall A' },
          { id: 2, subject: 'Physics', type: 'Final Exam', date: '2025-12-17', time: '10:00 AM', duration: '2 hours', venue: 'Hall B' },
          { id: 3, subject: 'Chemistry', type: 'Final Exam', date: '2025-12-19', time: '09:00 AM', duration: '2 hours', venue: 'Hall A' }
        ],
        achievements: [
          { id: 1, title: 'Perfect Attendance', description: 'No absences in November', icon: CheckCircle, color: 'emerald', date: '2025-11-30' },
          { id: 2, title: 'Top Performer', description: 'Highest score in Mathematics', icon: Trophy, color: 'amber', date: '2025-11-25' },
          { id: 3, title: 'Tahfiz Excellence', description: 'Completed Juz 4 with 95% accuracy', icon: Star, color: 'purple', date: '2025-11-20' }
        ],
        notifications: [
          { id: 1, type: 'exam', message: 'Final Exam schedule released', time: '2 hours ago', priority: 'high' },
          { id: 2, type: 'result', message: 'Physics Quiz results published', time: '1 day ago', priority: 'medium' },
          { id: 3, type: 'announcement', message: 'Parent-Teacher meeting on Dec 10', time: '2 days ago', priority: 'low' }
        ],
        attendanceSummary: {
          present: 87,
          absent: 2,
          late: 1,
          excused: 1,
          total: 91,
          percentage: 96.5
        }
      };
      setStudentData(mockData);
      localStorage.setItem('student_dashboard_data', JSON.stringify(mockData));
    }
  }, []);

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'emerald';
    if (grade.startsWith('B')) return 'blue';
    if (grade.startsWith('C')) return 'amber';
    return 'red';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {studentData.student.name.split(' ')[0]}! 🎓
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {studentData.student.class} • {studentData.student.section} • {studentData.student.id}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                My Schedule
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                studentData.overview.overallGrade.startsWith('A') ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              }`}>
                Grade {studentData.overview.overallGrade}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {studentData.overview.overallPercentage}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overall Performance</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-emerald-600 dark:text-emerald-400">
              <ArrowUp className="w-4 h-4" />
              <span>+{studentData.overview.trend}% from last term</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              #{studentData.overview.classRank}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Class Rank (of {studentData.overview.totalStudents})
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {studentData.overview.attendance}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {studentData.attendanceSummary.present}/{studentData.attendanceSummary.total} days present
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Juz {studentData.tahfizProgress.currentJuz}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tahfiz Progress</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {studentData.tahfizProgress.accuracy}% accuracy
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Exam Results */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Exam Results</h2>
            <div className="space-y-3">
              {studentData.recentExams.map((exam, idx) => {
                const gradeColor = getGradeColor(exam.grade);
                const percentage = (exam.score / exam.maxScore * 100).toFixed(1);
                return (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{exam.subject}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{exam.exam} • {exam.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {exam.score}/{exam.maxScore}
                          </div>
                          <div className={`text-sm font-semibold text-${gradeColor}-600 dark:text-${gradeColor}-400`}>
                            {percentage}% • Grade {exam.grade}
                          </div>
                        </div>
                        {exam.trend === 'up' ? (
                          <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        ) : exam.trend === 'down' ? (
                          <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400 rotate-180" />
                        ) : (
                          <Activity className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r from-${gradeColor}-500 to-${gradeColor}-600 h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              View All Results
            </button>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Exams</h2>
            <div className="space-y-3">
              {studentData.upcomingExams.map((exam, idx) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{exam.subject}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{exam.type}</p>
                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{exam.time} ({exam.duration})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Performance & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Subject Performance</h2>
            <div className="space-y-4">
              {studentData.subjectPerformance.map((subject, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{subject.subject}</span>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-${subject.color}-100 dark:bg-${subject.color}-900/30 text-${subject.color}-600 dark:text-${subject.color}-400`}>
                        {subject.grade}
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{subject.current}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className={`bg-gradient-to-r from-${subject.color}-500 to-${subject.color}-600 h-2 rounded-full`}
                      style={{ width: `${subject.current}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Previous: {subject.previous}%</span>
                    <span>Class Avg: {subject.average}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              {studentData.achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 bg-gradient-to-br from-${achievement.color}-50 to-${achievement.color}-100 dark:from-${achievement.color}-900/20 dark:to-${achievement.color}-900/30 border border-${achievement.color}-200 dark:border-${achievement.color}-800 rounded-xl`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-${achievement.color}-500 to-${achievement.color}-600 flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{achievement.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
