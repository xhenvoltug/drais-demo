'use client';

import React, { useState, useEffect } from 'react';
import {
  Play, Pause, RotateCcw, Clock, Users, AlertTriangle,
  CheckCircle, ChevronLeft, ChevronRight, StickyNote,
  TrendingUp, BookOpen, Star, BarChart3, X, Save
} from 'lucide-react';

export default function AdvancedHalaqaSession() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [sessionNotes, setSessionNotes] = useState('');
  const [showNotesPanel, setShowNotesPanel] = useState(true);

  const students = [
    { id: 1, name: 'Ahmed Hassan', status: 'completed', mistakes: 3, duration: '12:34', performance: 4.8 },
    { id: 2, name: 'Fatima Ali', status: 'reciting', mistakes: 1, duration: '08:15', performance: 4.6 },
    { id: 3, name: 'Omar Khalil', status: 'ready', mistakes: 0, duration: '00:00', performance: 4.2 },
    { id: 4, name: 'Aisha Mohammed', status: 'ready', mistakes: 0, duration: '00:00', performance: 4.9 },
    { id: 5, name: 'Yusuf Ibrahim', status: 'ready', mistakes: 0, duration: '00:00', performance: 3.5 },
  ];

  const mistakeSummary = [
    { category: 'Tajweed', count: 12, color: 'bg-red-500' },
    { category: 'Pronunciation', count: 8, color: 'bg-orange-500' },
    { category: 'Fluency', count: 5, color: 'bg-yellow-500' },
    { category: 'Memory', count: 3, color: 'bg-green-500' },
    { category: 'Pausing', count: 2, color: 'bg-blue-500' },
    { category: 'Tone', count: 1, color: 'bg-purple-500' },
  ];

  const totalMistakes = mistakeSummary.reduce((sum, item) => sum + item.count, 0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePreviousStudent = () => {
    if (selectedStudent > 0) {
      setSelectedStudent(selectedStudent - 1);
    }
  };

  const handleNextStudent = () => {
    if (selectedStudent < students.length - 1) {
      setSelectedStudent(selectedStudent + 1);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-500';
      case 'reciting':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-500';
      case 'ready':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-500';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-500';
    }
  };

  const currentStudent = students[selectedStudent];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Advanced Halaqa Session</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Morning Advanced Halaqa • {students.length} Students
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-lg">
                <div className="text-3xl font-bold">{formatTime(time)}</div>
                <div className="text-xs text-emerald-200">Session Time</div>
              </div>
              <div className="text-center bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-lg">
                <div className="text-3xl font-bold">{students.filter(s => s.status === 'completed').length}/{students.length}</div>
                <div className="text-xs text-emerald-200">Completed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Session Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Timer */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Session Control</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`p-4 rounded-xl font-bold transition-all shadow-lg ${
                      isPlaying
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => setTime(0)}
                    className="p-4 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-7xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {formatTime(time)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {isPlaying ? 'Session in progress...' : 'Session paused'}
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(students.filter(s => s.status === 'completed').length / students.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Student Recitation Carousel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Current Student</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousStudent}
                    disabled={selectedStudent === 0}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {selectedStudent + 1} / {students.length}
                  </span>
                  <button
                    onClick={handleNextStudent}
                    disabled={selectedStudent === students.length - 1}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-xl p-8 border-2 border-emerald-200 dark:border-emerald-800 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-2xl">
                      {currentStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentStudent.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(currentStudent.performance)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(currentStudent.status)}`}>
                    {currentStudent.status.charAt(0).toUpperCase() + currentStudent.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentStudent.duration}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Mistakes</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentStudent.mistakes}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentStudent.performance}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
                  Start Recitation
                </button>
                <button className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors shadow-lg">
                  Mark Mistake
                </button>
                <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
                  Complete
                </button>
              </div>
            </div>

            {/* Progress Preview Charts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Session Progress</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">Completion Rate</span>
                  </div>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.round((students.filter(s => s.status === 'completed').length / students.length) * 100)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">Total Mistakes</span>
                  </div>
                  <div className="text-4xl font-bold text-amber-600 dark:text-amber-400">{totalMistakes}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Mistake Summary Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mistake Summary</h2>
              </div>
              <div className="space-y-3">
                {mistakeSummary.map((item, index) => {
                  const percentage = ((item.count / totalMistakes) * 100).toFixed(0);
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{item.category}</span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 font-bold">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Session Notes Sticky Panel */}
            {showNotesPanel && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <StickyNote className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Session Notes</h2>
                  </div>
                  <button
                    onClick={() => setShowNotesPanel(false)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Add notes about this session..."
                  rows="8"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white resize-none"
                />
                <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Notes
                </button>
              </div>
            )}

            {/* Student Queue */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Queue</h2>
              </div>
              <div className="space-y-2">
                {students.map((student, index) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(index)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      index === selectedStudent
                        ? 'bg-emerald-100 dark:bg-emerald-900 border-2 border-emerald-500'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {student.name}
                      </span>
                    </div>
                    {student.status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
