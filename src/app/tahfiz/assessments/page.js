'use client';

import React, { useState } from 'react';
import {
  ClipboardCheck, Users, Star, Award, FileText, Download,
  CheckCircle, Clock, TrendingUp, Target, BookOpen, Sliders,
  ChevronRight, X, Calendar, Trophy, Zap, BarChart3
} from 'lucide-react';

export default function TahfizAssessments() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  const students = [
    { id: 1, name: 'Ahmed Hassan', juzCompleted: 12, weeklyScore: 0, learnedSurahs: [] },
    { id: 2, name: 'Fatima Ali', juzCompleted: 8, weeklyScore: 0, learnedSurahs: [] },
    { id: 3, name: 'Omar Khalil', juzCompleted: 15, weeklyScore: 0, learnedSurahs: [] },
    { id: 4, name: 'Aisha Mohammed', juzCompleted: 20, weeklyScore: 0, learnedSurahs: [] },
    { id: 5, name: 'Yusuf Ibrahim', juzCompleted: 6, weeklyScore: 0, learnedSurahs: [] },
    { id: 6, name: 'Maryam Abdullah', juzCompleted: 18, weeklyScore: 0, learnedSurahs: [] },
  ];

  const notableSurahs = [
    'Al-Fatiha', 'Al-Baqarah', 'Al-Imran', 'An-Nisa', 'Al-Maidah',
    'Al-Kahf', 'Yasin', 'Ar-Rahman', 'Al-Waqiah', 'Al-Mulk',
    'Al-Muzzammil', 'Al-Muddaththir', 'Al-Insan', 'An-Naba'
  ];

  const evaluationCriteria = [
    { id: 'hafdh', label: 'Hafdh (Memorization)', icon: BookOpen, color: 'emerald' },
    { id: 'murajaah', label: 'Murajaah (Revision)', icon: Clock, color: 'blue' },
    { id: 'fluency', label: 'Fluency', icon: Zap, color: 'purple' },
    { id: 'tajweed', label: 'Tajweed', icon: Target, color: 'teal' },
    { id: 'discipline', label: 'Discipline', icon: Award, color: 'amber' }
  ];

  const [evaluationScores, setEvaluationScores] = useState({});

  const updateScore = (studentId, criterion, score) => {
    setEvaluationScores(prev => ({
      ...prev,
      [`${studentId}-${criterion}`]: score
    }));
  };

  const getScore = (studentId, criterion) => {
    return evaluationScores[`${studentId}-${criterion}`] || 0;
  };

  const getAverageScore = (studentId) => {
    const scores = evaluationCriteria.map(c => getScore(studentId, c.id));
    const sum = scores.reduce((a, b) => a + b, 0);
    return scores.length > 0 ? (sum / scores.length).toFixed(1) : 0;
  };

  const summaryStats = {
    totalAssessments: 48,
    averageScore: 4.3,
    excellentStudents: 12,
    needsSupport: 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ClipboardCheck className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Tahfiz Assessments</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Comprehensive evaluation & testing dashboard
              </p>
            </div>
            <button className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
              <Download className="w-5 h-5" />
              Export All Reports
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <ClipboardCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{summaryStats.totalAssessments}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Assessments</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{summaryStats.averageScore}/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{summaryStats.excellentStudents}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Excellent Students</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                <TrendingUp className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{summaryStats.needsSupport}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Needs Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'weekly'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Weekly Memorization Test
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'monthly'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Monthly Evaluation
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'summary'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Teacher Summary Report
            </button>
          </div>
        </div>

        {/* Weekly Memorization Test */}
        {activeTab === 'weekly' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Weekly Memorization Test
              </h2>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Week of Jan 15-21, 2025</span>
              </div>
            </div>

            <div className="space-y-4">
              {students.map(student => (
                <div
                  key={student.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{student.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Juz {student.juzCompleted} completed</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                    >
                      Evaluate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly Evaluation */}
        {activeTab === 'monthly' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Monthly Evaluation Rubric
              </h2>
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
                Save All Evaluations
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Student</th>
                    {evaluationCriteria.map(criterion => {
                      const Icon = criterion.icon;
                      return (
                        <th key={criterion.id} className="text-center p-4">
                          <div className="flex flex-col items-center gap-2">
                            <Icon className={`w-6 h-6 text-${criterion.color}-600`} />
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {criterion.label}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                    <th className="text-center p-4 font-bold text-gray-900 dark:text-white">Average</th>
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
                      {evaluationCriteria.map(criterion => (
                        <td key={criterion.id} className="p-4">
                          <div className="flex items-center justify-center gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => updateScore(student.id, criterion.id, star)}
                                className="transition-transform hover:scale-125"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    star <= getScore(student.id, criterion.id)
                                      ? `fill-${criterion.color}-500 text-${criterion.color}-500`
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                  style={{
                                    fill: star <= getScore(student.id, criterion.id) 
                                      ? `var(--${criterion.color}-500)` 
                                      : 'transparent'
                                  }}
                                />
                              </button>
                            ))}
                          </div>
                        </td>
                      ))}
                      <td className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {getAverageScore(student.id)}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">/ 5.0</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Teacher Summary Report */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  High-Level Performance Metrics
                </h2>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg">
                  <Download className="w-5 h-5" />
                  Download as PDF
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-lg">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">87%</div>
                      <div className="text-emerald-100">Overall Completion</div>
                    </div>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                    <div className="bg-white h-3 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-lg">
                      <Target className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">4.2/5</div>
                      <div className="text-blue-100">Avg Tajweed Score</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${star <= 4 ? 'fill-white text-white' : 'text-blue-200'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-lg">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">+23%</div>
                      <div className="text-purple-100">Progress This Month</div>
                    </div>
                  </div>
                  <div className="text-sm text-purple-100">
                    Compared to last month
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Top Performers</h3>
                <div className="space-y-3">
                  {students.slice(0, 3).map((student, index) => (
                    <div key={student.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">#{index + 1}</div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white">{student.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Juz {student.juzCompleted} • 4.8/5</div>
                      </div>
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Areas for Improvement</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">Fluency</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">3.2/5</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">Murajaah</span>
                      <span className="text-red-600 dark:text-red-400 font-bold">2.9/5</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Test Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedStudent.name}</h2>
                    <p className="text-emerald-100">Weekly Memorization Test</p>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Test Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white">
                    <option>New Memorization</option>
                    <option>Revision Test</option>
                    <option>Full Juz Test</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Score (0-100)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="85"
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span>0</span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">85</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Surahs Learned This Week
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                    {notableSurahs.map(surah => (
                      <label key={surah} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                        <span className="text-sm text-gray-900 dark:text-white">{surah}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white text-center">
                  <Award className="w-16 h-16 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">Excellent Performance!</h3>
                  <p className="text-emerald-100">MashaAllah, keep up the great work</p>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
                >
                  Submit Evaluation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
