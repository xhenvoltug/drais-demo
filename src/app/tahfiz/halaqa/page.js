'use client';

import React, { useState } from 'react';
import TahfizNavBar from '@/components/tahfiz-navbar';
import {
  BookOpen, Users, Clock, Play, Pause, ChevronRight,
  ChevronLeft, Check, RotateCcw, Star, Award, Target,
  MessageSquare, Volume2, AlertCircle, TrendingUp, X
} from 'lucide-react';

export default function TahfizHalaqa() {
  const [selectedHalaqa, setSelectedHalaqa] = useState(null);
  const [recitationSession, setRecitationSession] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Mock Halaqa data
  const halaqas = [
    {
      id: 1,
      name: 'Morning Juz 1-5 Halaqa',
      tutor: {
        name: 'Sheikh Abdullah Rahman',
        photo: null,
        qualification: 'Hafiz, Ijazah holder'
      },
      students: 12,
      todayFocus: 'Surah Al-Baqarah 200-286',
      schedule: '08:00 AM - 10:00 AM',
      level: 'Beginner',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 2,
      name: 'Advanced Juz 20-30 Halaqa',
      tutor: {
        name: 'Ustadh Omar Khalil',
        photo: null,
        qualification: 'Hafiz, Qiraat specialist'
      },
      students: 8,
      todayFocus: 'Surah Yasin - Complete review',
      schedule: '10:30 AM - 12:30 PM',
      level: 'Advanced',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Afternoon Revision Halaqa',
      tutor: {
        name: 'Sheikh Hassan Ibrahim',
        photo: null,
        qualification: 'Hafiz, Tajweed expert'
      },
      students: 15,
      todayFocus: 'Juz 10-15 Murajaah',
      schedule: '02:00 PM - 04:00 PM',
      level: 'Intermediate',
      color: 'from-purple-500 to-pink-600'
    },
  ];

  const halaqaStudents = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      class: 'Grade 8',
      photo: null,
      todayTarget: 'Surah Al-Baqarah 200-220',
      status: 'completed',
      progress: 100,
      notes: 'Excellent recitation'
    },
    {
      id: 2,
      name: 'Fatima Ali',
      class: 'Grade 7',
      photo: null,
      todayTarget: 'Surah Al-Baqarah 221-240',
      status: 'reciting',
      progress: 65,
      notes: 'Minor tajweed corrections needed'
    },
    {
      id: 3,
      name: 'Omar Khalil',
      class: 'Grade 9',
      photo: null,
      todayTarget: 'Surah Al-Baqarah 241-260',
      status: 'revising',
      progress: 45,
      notes: ''
    },
    {
      id: 4,
      name: 'Aisha Mohammed',
      class: 'Grade 8',
      photo: null,
      todayTarget: 'Surah Al-Baqarah 261-286',
      status: 'ready',
      progress: 0,
      notes: ''
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-500';
      case 'reciting':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-500';
      case 'revising':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-500';
      case 'ready':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-400';
    }
  };

  const startRecitationSession = (student) => {
    setRecitationSession(student);
    setTimer(0);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl backdrop-blur-lg">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Daily Halaqa Sessions</h1>
          </div>
          <p className="text-emerald-100 text-lg">
            Real-time Quran teaching and recitation management
          </p>
        </div>

        {/* Halaqa Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {halaqas.map((halaqa) => (
            <div
              key={halaqa.id}
              onClick={() => setSelectedHalaqa(halaqa)}
              className={`rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-2 ${
                selectedHalaqa?.id === halaqa.id ? 'border-emerald-500 scale-105' : 'border-transparent'
              }`}
            >
              {/* Halaqa Header */}
              <div className={`bg-gradient-to-br ${halaqa.color} p-6 text-white backdrop-blur-sm`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{halaqa.name}</h3>
                    <div className="flex items-center gap-2 text-white text-opacity-90 text-sm">
                      <Clock className="w-4 h-4" />
                      {halaqa.schedule}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">
                    {halaqa.level}
                  </span>
                </div>

                {/* Tutor Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xl font-bold backdrop-blur-lg">
                    {halaqa.tutor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{halaqa.tutor.name}</div>
                    <div className="text-xs text-white text-opacity-75">
                      {halaqa.tutor.qualification}
                    </div>
                  </div>
                </div>

                {/* Today's Focus */}
                <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-xs text-white text-opacity-75 mb-1">Today's Focus</div>
                  <div className="font-semibold">{halaqa.todayFocus}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white dark:bg-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{halaqa.students} Students</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student List for Selected Halaqa */}
        {selectedHalaqa && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedHalaqa.name} - Students
              </h2>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg">
                Message All Students
              </button>
            </div>

            <div className="space-y-4">
              {halaqaStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-500 transition-all"
                >
                  {/* Student Info */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {student.name.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{student.class}</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                      Target: {student.todayTarget}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-bold text-emerald-600">{student.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 animate-pulse"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getStatusColor(student.status)}`}>
                    {student.status.toUpperCase()}
                  </span>

                  {/* Start Button */}
                  <button
                    onClick={() => startRecitationSession(student)}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-semibold shadow-lg"
                  >
                    <Play className="w-4 h-4" />
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recitation Session Modal */}
        {recitationSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl font-bold backdrop-blur-lg">
                      {recitationSession.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{recitationSession.name}</h2>
                      <p className="text-emerald-100">{recitationSession.todayTarget}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setRecitationSession(null);
                      setIsTimerRunning(false);
                    }}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Timer */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 font-mono">
                    {formatTime(timer)}
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
                        isTimerRunning
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-5 h-5 inline mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 inline mr-2" />
                          Start
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setTimer(0)}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-lg"
                    >
                      <RotateCcw className="w-5 h-5 inline mr-2" />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Notes Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Session Notes
                  </label>
                  <textarea
                    placeholder="Enter notes about the recitation session..."
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                    defaultValue={recitationSession.notes}
                  />
                </div>

                {/* Mistake Counter */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mistakes</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">2</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Corrections</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">8</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Perfect Ayat</div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                  <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" />
                    Previous Student
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Complete & Save
                  </button>
                  <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold flex items-center gap-2">
                    Next Student
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
      </div>
    </div>
  );
}
