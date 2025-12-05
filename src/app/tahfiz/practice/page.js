'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import { 
  Play, Pause, RotateCcw, Mic, Users, GraduationCap, 
  Volume2, TrendingUp, Flame, Target, BookOpen, 
  ChevronRight, Clock, Award
} from 'lucide-react';

export default function RecitationPracticePage() {
  const [selectedMode, setSelectedMode] = useState('solo');
  const [isReciting, setIsReciting] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [waveformActive, setWaveformActive] = useState(false);

  // Mock current recitation
  const [currentRecitation, setCurrentRecitation] = useState({
    juz: 1,
    surah: 'Al-Fatihah',
    surahNumber: 1,
    ayah: 3,
    totalAyahs: 7,
    page: 1
  });

  // Mock practice stats
  const stats = {
    streak: 12,
    accuracy: 94.5,
    totalRecitations: 48,
    weeklyGoal: 85,
    weeklyProgress: 67
  };

  // Mock mistake categories
  const mistakeCategories = [
    { name: 'Tajweed', count: 8, color: 'bg-rose-500' },
    { name: 'Pronunciation', count: 12, color: 'bg-orange-500' },
    { name: 'Fluency', count: 5, color: 'bg-amber-500' },
    { name: 'Memory', count: 3, color: 'bg-yellow-500' }
  ];

  const modes = [
    {
      id: 'solo',
      name: 'Solo Recitation',
      icon: Mic,
      description: 'Practice at your own pace',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'group',
      name: 'Group Recitation',
      icon: Users,
      description: 'Recite with peers',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'tutor',
      name: 'Tutor-Led',
      icon: GraduationCap,
      description: 'Live guidance from tutor',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isReciting) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        setCurrentProgress(prev => Math.min(prev + 0.5, 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReciting]);

  // Waveform animation effect
  useEffect(() => {
    setWaveformActive(isReciting);
  }, [isReciting]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsReciting(true);
  };

  const handlePause = () => {
    setIsReciting(false);
  };

  const handleReset = () => {
    setIsReciting(false);
    setElapsedTime(0);
    setCurrentProgress(0);
  };

  // Progress ring animation
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (currentProgress / 100) * circumference;

  return (
    <>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Recitation Practice
          </h1>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold">
            v0.0.0032
          </span>
        </div>
        <p className="text-slate-400">Choose your practice mode and start reciting</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Mode Selection & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Practice Modes */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Practice Modes
            </h2>
            <div className="space-y-3">
              {modes.map((mode) => (
                <motion.button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedMode === mode.id
                      ? `bg-gradient-to-r ${mode.gradient} border-transparent text-white`
                      : 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <mode.icon className={`w-5 h-5 mt-0.5 ${selectedMode === mode.id ? 'text-white' : 'text-slate-400'}`} />
                    <div className="text-left flex-1">
                      <div className="font-semibold">{mode.name}</div>
                      <div className={`text-xs mt-1 ${selectedMode === mode.id ? 'text-white/80' : 'text-slate-400'}`}>
                        {mode.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Practice Stats Preview */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Your Stats
            </h2>
            <div className="space-y-4">
              {/* Streak */}
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Recitation Streak</div>
                    <div className="text-lg font-bold text-white">{stats.streak} days</div>
                  </div>
                </div>
              </div>

              {/* Accuracy */}
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Avg Accuracy</div>
                    <div className="text-lg font-bold text-white">{stats.accuracy}%</div>
                  </div>
                </div>
              </div>

              {/* Weekly Goal */}
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-slate-400">Weekly Goal</div>
                  <div className="text-xs font-semibold text-emerald-400">{stats.weeklyProgress}%</div>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.weeklyProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mistake Categories */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Mistakes</h2>
            <div className="space-y-3">
              {mistakeCategories.map((category, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {category.count}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-300">{category.name}</div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full ${category.color}`}
                        style={{ width: `${(category.count / 12) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Recitation Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Recitation Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            {/* Current Surah Info */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-semibold">
                  Juz {currentRecitation.juz} • Page {currentRecitation.page}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {currentRecitation.surah}
              </h2>
              <p className="text-slate-400">
                Ayah {currentRecitation.ayah} of {currentRecitation.totalAyahs}
              </p>
            </div>

            {/* Progress Ring */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-700"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="54"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-white mb-1">
                    {formatTime(elapsedTime)}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    {isReciting ? 'Reciting...' : 'Ready'}
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 mt-2">
                    {Math.round(currentProgress)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Waveform Animation */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-1 h-24 bg-slate-900/50 rounded-xl p-4">
                {[...Array(32)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-full"
                    animate={{
                      height: waveformActive 
                        ? [
                            Math.random() * 60 + 20,
                            Math.random() * 60 + 20,
                            Math.random() * 60 + 20
                          ]
                        : 8
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: i * 0.05
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-slate-400 text-sm">
                <Volume2 className="w-4 h-4" />
                <span>{waveformActive ? 'Recording audio...' : 'Audio inactive'}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={isReciting ? handlePause : handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 transition-all"
              >
                {isReciting ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl hover:border-blue-400/50 transition-all"
            >
              <Clock className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-semibold text-white">View History</div>
              <div className="text-xs text-slate-400 mt-1">{stats.totalRecitations} sessions</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl hover:border-purple-400/50 transition-all"
            >
              <Award className="w-6 h-6 text-purple-400 mb-2" />
              <div className="text-sm font-semibold text-white">AI Feedback</div>
              <div className="text-xs text-slate-400 mt-1">Get instant analysis</div>
            </motion.button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
