'use client';

import React, { useState } from 'react';
import {
  BookOpen, CheckCircle, XCircle, AlertTriangle, Star,
  Volume2, Mic, Save, Send, Clock, Calendar, User,
  TrendingUp, Award, MessageSquare, Flag, ChevronRight,
  ChevronLeft, Play, Pause, RotateCcw, ThumbsUp, ThumbsDown
} from 'lucide-react';

export default function DailySabaki() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recording, setRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  // Mock data for students awaiting sabaki
  const pendingStudents = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      class: 'Class A',
      juz: 13,
      surah: 'Ibrahim',
      verses: '1-7',
      pageNumber: 255,
      type: 'new',
      scheduledTime: '09:00 AM',
      status: 'waiting'
    },
    {
      id: 2,
      name: 'Fatima Ali',
      class: 'Class B',
      juz: 12,
      surah: 'Yusuf',
      verses: '20-30',
      pageNumber: 238,
      type: 'revision',
      scheduledTime: '09:15 AM',
      status: 'waiting'
    },
    {
      id: 3,
      name: 'Omar Khalil',
      class: 'Class A',
      juz: 11,
      surah: 'Hud',
      verses: '50-60',
      pageNumber: 226,
      type: 'new',
      scheduledTime: '09:30 AM',
      status: 'waiting'
    },
  ];

  const [sabakiData, setSabakiData] = useState({
    tajweed: { score: 0, notes: '' },
    makhraj: { score: 0, notes: '' },
    fluency: { score: 0, notes: '' },
    mistakes: [],
    generalFeedback: '',
    recommendation: 'proceed'
  });

  const criteria = [
    { id: 'tajweed', name: 'Tajweed', icon: <Star className="w-5 h-5" /> },
    { id: 'makhraj', name: 'Makhraj', icon: <Volume2 className="w-5 h-5" /> },
    { id: 'fluency', name: 'Fluency', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const commonMistakes = [
    'Mad (Prolongation)',
    'Ghunnah (Nasal sound)',
    'Qalqalah (Echo sound)',
    'Idgham (Merging)',
    'Iqlab (Conversion)',
    'Ikhfa (Concealing)',
    'Stopping at wrong places',
    'Letter pronunciation'
  ];

  const startSabaki = (student) => {
    setSelectedStudent(student);
  };

  const updateScore = (criterion, score) => {
    setSabakiData(prev => ({
      ...prev,
      [criterion]: { ...prev[criterion], score }
    }));
  };

  const toggleMistake = (mistake) => {
    setSabakiData(prev => ({
      ...prev,
      mistakes: prev.mistakes.includes(mistake)
        ? prev.mistakes.filter(m => m !== mistake)
        : [...prev.mistakes, mistake]
    }));
  };

  const saveSabaki = () => {
    // Save logic here
    console.log('Saving sabaki:', sabakiData);
    setSelectedStudent(null);
    setSabakiData({
      tajweed: { score: 0, notes: '' },
      makhraj: { score: 0, notes: '' },
      fluency: { score: 0, notes: '' },
      mistakes: [],
      generalFeedback: '',
      recommendation: 'proceed'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Daily Sabaki (Correction)</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Listen, evaluate, and provide feedback on student recitations
              </p>
            </div>
            <div className="text-right bg-white bg-opacity-20 rounded-xl p-4">
              <div className="text-sm text-emerald-200 mb-1">Today's Sessions</div>
              <div className="text-4xl font-bold">{pendingStudents.length}</div>
              <div className="text-xs text-emerald-200">Pending</div>
            </div>
          </div>
        </div>

        {!selectedStudent ? (
          <>
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'pending'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Pending ({pendingStudents.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'completed'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Completed Today (0)
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'history'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                History
              </button>
            </div>

            {/* Pending Students Queue */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border-2 border-transparent hover:border-emerald-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-lg font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {student.class}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      student.type === 'new'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                    }`}>
                      {student.type === 'new' ? 'New' : 'Revision'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Surah</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {student.surah}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Verses</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {student.verses}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Juz / Page</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Juz {student.juz} - Page {student.pageNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Scheduled</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {student.scheduledTime}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => startSabaki(student)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    Start Sabaki
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Sabaki Session Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Student Info & Recording */}
            <div className="space-y-6">
              {/* Student Info Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedStudent.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedStudent.class}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="p-3 bg-emerald-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Surah</div>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedStudent.surah}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Verses</div>
                      <div className="font-bold text-blue-600 dark:text-blue-400">
                        {selectedStudent.verses}
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Page</div>
                      <div className="font-bold text-purple-600 dark:text-purple-400">
                        {selectedStudent.pageNumber}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recording Controls */}
                <div className="border-t dark:border-gray-700 pt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Recording Controls
                  </h4>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setRecording(!recording)}
                      className={`w-full px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        recording
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {recording ? (
                        <>
                          <Pause className="w-5 h-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5" />
                          Start Recording
                        </>
                      )}
                    </button>
                    {recording && (
                      <div className="text-center text-red-600 dark:text-red-400 animate-pulse font-semibold">
                        ● Recording in progress...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Play Reference Audio
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    View Mushaf Page
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    Mark for Review
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Evaluation Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Criteria Scoring */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Evaluation Criteria
                </h3>
                <div className="space-y-6">
                  {criteria.map((criterion) => (
                    <div key={criterion.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                          {criterion.icon}
                          {criterion.name}
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">
                          {sabakiData[criterion.id].score}/10
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                          <button
                            key={score}
                            onClick={() => updateScore(criterion.id, score)}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                              sabakiData[criterion.id].score >= score
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                      <textarea
                        placeholder={`Notes for ${criterion.name.toLowerCase()}...`}
                        value={sabakiData[criterion.id].notes}
                        onChange={(e) =>
                          setSabakiData(prev => ({
                            ...prev,
                            [criterion.id]: { ...prev[criterion.id], notes: e.target.value }
                          }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                        rows="2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Common Mistakes
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {commonMistakes.map((mistake) => (
                    <button
                      key={mistake}
                      onClick={() => toggleMistake(mistake)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all text-left ${
                        sabakiData.mistakes.includes(mistake)
                          ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-2 border-red-500'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {mistake}
                    </button>
                  ))}
                </div>
              </div>

              {/* General Feedback */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  General Feedback
                </h3>
                <textarea
                  placeholder="Provide detailed feedback and suggestions for improvement..."
                  value={sabakiData.generalFeedback}
                  onChange={(e) =>
                    setSabakiData(prev => ({ ...prev, generalFeedback: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                  rows="4"
                />
              </div>

              {/* Recommendation */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Recommendation
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setSabakiData(prev => ({ ...prev, recommendation: 'proceed' }))}
                    className={`px-6 py-4 rounded-lg font-semibold transition-all ${
                      sabakiData.recommendation === 'proceed'
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ThumbsUp className="w-6 h-6 mx-auto mb-2" />
                    Proceed
                  </button>
                  <button
                    onClick={() => setSabakiData(prev => ({ ...prev, recommendation: 'revise' }))}
                    className={`px-6 py-4 rounded-lg font-semibold transition-all ${
                      sabakiData.recommendation === 'revise'
                        ? 'bg-yellow-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <RotateCcw className="w-6 h-6 mx-auto mb-2" />
                    Revise
                  </button>
                  <button
                    onClick={() => setSabakiData(prev => ({ ...prev, recommendation: 'repeat' }))}
                    className={`px-6 py-4 rounded-lg font-semibold transition-all ${
                      sabakiData.recommendation === 'repeat'
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ThumbsDown className="w-6 h-6 mx-auto mb-2" />
                    Repeat
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSabaki}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  Save & Complete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
