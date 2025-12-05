'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import { 
  Sparkles, AlertCircle, CheckCircle2, TrendingUp, 
  Volume2, PlayCircle, RotateCcw, Share2, Eye,
  Award, Target, Zap, Activity, User, BookOpen,
  ChevronRight, Download, MessageSquare
} from 'lucide-react';

export default function AIFeedbackPage() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('pronunciation');
  const [autoScroll, setAutoScroll] = useState(false);

  // Mock student data
  const students = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      avatar: 'AH',
      surah: 'Al-Baqarah',
      ayah: '255 (Ayatul Kursi)',
      juz: 3,
      date: '2025-12-05',
      overallScore: 92,
      mistakes: 3,
      fluencyScore: 88,
      tajweedScore: 95,
      pronunciationScore: 90,
      paceScore: 94
    },
    {
      id: 2,
      name: 'Fatima Ali',
      avatar: 'FA',
      surah: 'Yasin',
      ayah: '1-12',
      juz: 22,
      date: '2025-12-05',
      overallScore: 85,
      mistakes: 5,
      fluencyScore: 82,
      tajweedScore: 88,
      pronunciationScore: 84,
      paceScore: 86
    },
    {
      id: 3,
      name: 'Omar Ibrahim',
      avatar: 'OI',
      surah: 'Al-Mulk',
      ayah: '1-5',
      juz: 29,
      date: '2025-12-04',
      overallScore: 96,
      mistakes: 1,
      fluencyScore: 98,
      tajweedScore: 94,
      pronunciationScore: 97,
      paceScore: 95
    },
    {
      id: 4,
      name: 'Aisha Mohammed',
      avatar: 'AM',
      surah: 'Ar-Rahman',
      ayah: '1-16',
      juz: 27,
      date: '2025-12-04',
      overallScore: 78,
      mistakes: 8,
      fluencyScore: 75,
      tajweedScore: 80,
      pronunciationScore: 79,
      paceScore: 78
    }
  ];

  // Mock feedback details
  const feedbackDetails = {
    pronunciation: [
      { 
        ayah: 'Bismillah ir-Rahman ir-Rahim', 
        issue: 'Slight mispronunciation of "Rahman"', 
        severity: 'medium',
        suggestion: 'Emphasize the "R" sound more clearly'
      },
      { 
        ayah: 'Alhamdulillahi Rabbi al-alameen', 
        issue: 'Correct pronunciation', 
        severity: 'none',
        suggestion: 'Excellent work!'
      },
      { 
        ayah: 'Ar-Rahman ir-Rahim', 
        issue: 'Rushed pronunciation', 
        severity: 'low',
        suggestion: 'Slow down slightly for better clarity'
      }
    ],
    tajweed: [
      { 
        ayah: 'Bismillah ir-Rahman ir-Rahim', 
        issue: 'Missing Ghunnah on "Rahman"', 
        severity: 'high',
        suggestion: 'Apply nasal sound for proper Ghunnah'
      },
      { 
        ayah: 'Maliki yawmi ad-deen', 
        issue: 'Correct Tajweed rules applied', 
        severity: 'none',
        suggestion: 'Perfect application of rules'
      }
    ],
    fluency: [
      { 
        ayah: 'Overall flow', 
        issue: 'Good flow with minor pauses', 
        severity: 'low',
        suggestion: 'Practice continuous recitation without breaks'
      },
      { 
        ayah: 'Verse transitions', 
        issue: 'Smooth transitions between verses', 
        severity: 'none',
        suggestion: 'Maintain this consistency'
      }
    ]
  };

  const tabs = [
    { id: 'pronunciation', label: 'Pronunciation', icon: Volume2 },
    { id: 'tajweed', label: 'Tajweed', icon: BookOpen },
    { id: 'fluency', label: 'Fluency & Pace', icon: Activity }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      case 'medium': return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'low': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      default: return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'none': return CheckCircle2;
      default: return AlertCircle;
    }
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                AI Feedback
              </h1>
              <p className="text-slate-400 text-sm">Intelligent recitation analysis</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold">
            v0.0.0032
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Student List */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Recitations</h2>
            <div className="space-y-3">
              {students.map((student) => (
                <motion.button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedStudent?.id === student.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 border-transparent'
                      : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      selectedStudent?.id === student.id
                        ? 'bg-white text-purple-600'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                    }`}>
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold truncate ${
                        selectedStudent?.id === student.id ? 'text-white' : 'text-slate-200'
                      }`}>
                        {student.name}
                      </div>
                      <div className={`text-xs mt-1 ${
                        selectedStudent?.id === student.id ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        {student.surah} • {student.ayah}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`text-xs font-bold ${
                          selectedStudent?.id === student.id ? 'text-white' : 'text-emerald-400'
                        }`}>
                          {student.overallScore}%
                        </div>
                        <div className={`text-xs ${
                          selectedStudent?.id === student.id ? 'text-white/60' : 'text-slate-500'
                        }`}>
                          {student.mistakes} mistakes
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Feedback Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedStudent ? (
            <>
              {/* Student Header Card */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl font-bold">
                      {selectedStudent.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedStudent.name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-slate-400">{selectedStudent.surah}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-sm text-slate-400">Juz {selectedStudent.juz}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-sm text-slate-400">{selectedStudent.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      {selectedStudent.overallScore}%
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Overall Score</div>
                  </div>
                </div>

                {/* Progress Meter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Progress Meter</span>
                    <span className="text-sm font-semibold text-emerald-400">
                      {selectedStudent.mistakes} mistakes identified
                    </span>
                  </div>
                  <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedStudent.overallScore}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
                    />
                  </div>
                </div>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Volume2 className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-slate-400">Pronunciation</span>
                    </div>
                    <div className="text-lg font-bold text-white">{selectedStudent.pronunciationScore}%</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-slate-400">Tajweed</span>
                    </div>
                    <div className="text-lg font-bold text-white">{selectedStudent.tajweedScore}%</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-slate-400">Fluency</span>
                    </div>
                    <div className="text-lg font-bold text-white">{selectedStudent.fluencyScore}%</div>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-slate-400">Pace</span>
                    </div>
                    <div className="text-lg font-bold text-white">{selectedStudent.paceScore}%</div>
                  </div>
                </div>
              </div>

              {/* Feedback Tabs */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex items-center gap-2 p-2 bg-slate-900/50 border-b border-slate-700/50">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                          : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <tab.icon className="w-4 h-4" />
                        <span className="hidden md:inline">{tab.label}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {feedbackDetails[activeTab]?.map((item, idx) => {
                        const SeverityIcon = getSeverityIcon(item.severity);
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-4 rounded-xl border-2 ${getSeverityColor(item.severity)}`}
                          >
                            <div className="flex items-start gap-3">
                              <SeverityIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <div className="font-semibold mb-1">{item.ayah}</div>
                                <div className="text-sm opacity-90 mb-2">{item.issue}</div>
                                <div className="flex items-start gap-2 text-xs opacity-75">
                                  <Target className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{item.suggestion}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>

                  {/* Auto-scroll Toggle */}
                  <div className="mt-6 pt-4 border-t border-slate-700/50">
                    <button
                      onClick={() => setAutoScroll(!autoScroll)}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      <div className={`w-10 h-6 rounded-full transition-all ${
                        autoScroll ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-slate-700'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                          autoScroll ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </div>
                      <span>Auto-scroll through Ayahs</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl hover:border-emerald-400/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">Retry Recitation</div>
                      <div className="text-xs text-slate-400">Practice again</div>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl hover:border-blue-400/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">Mark as Reviewed</div>
                      <div className="text-xs text-slate-400">Acknowledge feedback</div>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">Share Progress</div>
                      <div className="text-xs text-slate-400">Export report</div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </>
          ) : (
            /* No Selection State */
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Recitation Selected</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Select a student's recitation from the list to view detailed AI-powered feedback and analysis
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
