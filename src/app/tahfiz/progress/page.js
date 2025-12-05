'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import { 
  Award, Trophy, Star, Crown, Zap, Target, Medal,
  BookOpen, CheckCircle, Lock, Unlock, Download,
  TrendingUp, Calendar, Filter, Search, ChevronRight,
  Flame, Heart, Gift, Sparkles, Users, GraduationCap,
  FileText, ExternalLink, Info
} from 'lucide-react';

export default function ProgressRewardsPage() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterClass, setFilterClass] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const [sortBy, setSortBy] = useState('progress');
  const [showTooltip, setShowTooltip] = useState(null);

  // Mock students data
  const students = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      avatar: 'AH',
      class: 'Grade 5A',
      tutor: 'Sheikh Ibrahim',
      overallProgress: 87,
      juzCompleted: 12,
      surahMastered: 45,
      streak: 28,
      totalPoints: 4850,
      level: 'Advanced',
      lastActivity: '2 hours ago',
      badges: ['streak-30', 'perfectionist', 'fast-learner', 'memorization-master'],
      certificates: ['juz-10', 'surah-master-1'],
      modeProgress: { solo: 92, group: 85, tutor: 88 }
    },
    {
      id: 2,
      name: 'Fatima Ali',
      avatar: 'FA',
      class: 'Grade 6B',
      tutor: 'Sheikh Abdullah',
      overallProgress: 92,
      juzCompleted: 15,
      surahMastered: 58,
      streak: 45,
      totalPoints: 5200,
      level: 'Expert',
      lastActivity: '1 hour ago',
      badges: ['streak-50', 'perfectionist', 'tajweed-expert', 'daily-champion'],
      certificates: ['juz-15', 'tajweed-master', 'excellence'],
      modeProgress: { solo: 95, group: 90, tutor: 92 }
    },
    {
      id: 3,
      name: 'Omar Ibrahim',
      avatar: 'OI',
      class: 'Grade 5A',
      tutor: 'Sheikh Ibrahim',
      overallProgress: 78,
      juzCompleted: 8,
      surahMastered: 32,
      streak: 15,
      totalPoints: 3680,
      level: 'Intermediate',
      lastActivity: '5 hours ago',
      badges: ['streak-15', 'fast-learner', 'consistent'],
      certificates: ['juz-5'],
      modeProgress: { solo: 80, group: 75, tutor: 79 }
    },
    {
      id: 4,
      name: 'Aisha Mohammed',
      avatar: 'AM',
      class: 'Grade 6B',
      tutor: 'Sheikh Abdullah',
      overallProgress: 95,
      juzCompleted: 20,
      surahMastered: 75,
      streak: 60,
      totalPoints: 5850,
      level: 'Master',
      lastActivity: '30 minutes ago',
      badges: ['streak-60', 'perfectionist', 'tajweed-expert', 'memorization-master', 'daily-champion', 'hafiz-track'],
      certificates: ['juz-20', 'tajweed-master', 'excellence', 'hafiz-progress'],
      modeProgress: { solo: 98, group: 93, tutor: 95 }
    },
    {
      id: 5,
      name: 'Ibrahim Yusuf',
      avatar: 'IY',
      class: 'Grade 5A',
      tutor: 'Sheikh Ibrahim',
      overallProgress: 65,
      juzCompleted: 5,
      surahMastered: 22,
      streak: 10,
      totalPoints: 2100,
      level: 'Beginner',
      lastActivity: '1 day ago',
      badges: ['streak-10', 'fast-learner'],
      certificates: ['juz-5'],
      modeProgress: { solo: 70, group: 60, tutor: 65 }
    }
  ];

  // Mock badges
  const allBadges = [
    { id: 'streak-10', name: '10-Day Streak', icon: Flame, color: 'from-yellow-500 to-orange-600', points: 100 },
    { id: 'streak-15', name: '15-Day Streak', icon: Flame, color: 'from-orange-500 to-red-600', points: 150 },
    { id: 'streak-30', name: '30-Day Streak', icon: Flame, color: 'from-red-500 to-rose-600', points: 300 },
    { id: 'streak-50', name: '50-Day Streak', icon: Flame, color: 'from-rose-500 to-pink-600', points: 500 },
    { id: 'streak-60', name: '60-Day Streak', icon: Flame, color: 'from-pink-500 to-purple-600', points: 600 },
    { id: 'perfectionist', name: 'Perfectionist', icon: Star, color: 'from-yellow-500 to-amber-600', points: 400 },
    { id: 'fast-learner', name: 'Fast Learner', icon: Zap, color: 'from-cyan-500 to-blue-600', points: 250 },
    { id: 'tajweed-expert', name: 'Tajweed Expert', icon: BookOpen, color: 'from-emerald-500 to-teal-600', points: 500 },
    { id: 'memorization-master', name: 'Memory Master', icon: Trophy, color: 'from-purple-500 to-indigo-600', points: 600 },
    { id: 'daily-champion', name: 'Daily Champion', icon: Crown, color: 'from-amber-500 to-yellow-600', points: 350 },
    { id: 'consistent', name: 'Consistency King', icon: Target, color: 'from-blue-500 to-cyan-600', points: 200 },
    { id: 'hafiz-track', name: 'Hafiz Track', icon: Medal, color: 'from-violet-500 to-purple-600', points: 1000 }
  ];

  // Mock certificates
  const allCertificates = [
    { id: 'juz-5', name: 'Juz 5 Completion', type: 'Juz', gradient: 'from-blue-500 to-cyan-600' },
    { id: 'juz-10', name: 'Juz 10 Completion', type: 'Juz', gradient: 'from-emerald-500 to-teal-600' },
    { id: 'juz-15', name: 'Juz 15 Completion', type: 'Juz', gradient: 'from-purple-500 to-pink-600' },
    { id: 'juz-20', name: 'Juz 20 Completion', type: 'Juz', gradient: 'from-amber-500 to-orange-600' },
    { id: 'surah-master-1', name: 'Surah Master I', type: 'Achievement', gradient: 'from-rose-500 to-pink-600' },
    { id: 'tajweed-master', name: 'Tajweed Master', type: 'Skill', gradient: 'from-violet-500 to-purple-600' },
    { id: 'excellence', name: 'Excellence Award', type: 'Achievement', gradient: 'from-yellow-500 to-amber-600' },
    { id: 'hafiz-progress', name: 'Hafiz in Progress', type: 'Milestone', gradient: 'from-indigo-500 to-blue-600' }
  ];

  const filteredStudents = students
    .filter(s => filterClass === 'all' || s.class === filterClass)
    .filter(s => filterMode === 'all' || true)
    .sort((a, b) => {
      switch(sortBy) {
        case 'progress': return b.overallProgress - a.overallProgress;
        case 'streak': return b.streak - a.streak;
        case 'points': return b.totalPoints - a.totalPoints;
        default: return 0;
      }
    });

  const getBadgeInfo = (badgeId) => allBadges.find(b => b.id === badgeId);
  const getCertificateInfo = (certId) => allCertificates.find(c => c.id === certId);

  // Progress ring component
  const ProgressRing = ({ progress, size = 120, strokeWidth = 8, label, value }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              className="text-slate-700"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-white">{value || `${progress}%`}</div>
          </div>
        </div>
        {label && <div className="text-xs text-slate-400 mt-2 text-center">{label}</div>}
      </div>
    );
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Progress & Rewards
              </h1>
              <p className="text-slate-400 text-sm">Track achievements and earn badges</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold">
            v0.0.0033
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters & Student List */}
        <div className="lg:col-span-1 space-y-6">
          {/* Filters */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-400" />
              Filters
            </h2>
            <div className="space-y-4">
              {/* Class Filter */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Class</label>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Classes</option>
                  <option value="Grade 5A">Grade 5A</option>
                  <option value="Grade 6B">Grade 6B</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="progress">Progress %</option>
                  <option value="streak">Streak</option>
                  <option value="points">Total Points</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Students</h2>
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <motion.button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    selectedStudent?.id === student.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 border-transparent'
                      : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      selectedStudent?.id === student.id
                        ? 'bg-white text-purple-600'
                        : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                    }`}>
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm truncate ${
                        selectedStudent?.id === student.id ? 'text-white' : 'text-slate-200'
                      }`}>
                        {student.name}
                      </div>
                      <div className={`text-xs ${
                        selectedStudent?.id === student.id ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        {student.overallProgress}% • {student.totalPoints} pts
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {selectedStudent ? (
            <>
              {/* Student Header */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
                      {selectedStudent.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedStudent.name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-slate-400">{selectedStudent.class}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-sm text-slate-400">Tutor: {selectedStudent.tutor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      selectedStudent.level === 'Master' ? 'bg-gradient-to-r from-purple-500 to-pink-600' :
                      selectedStudent.level === 'Expert' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                      selectedStudent.level === 'Advanced' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                      'bg-gradient-to-r from-slate-500 to-slate-600'
                    } text-white font-semibold`}>
                      <Crown className="w-4 h-4" />
                      {selectedStudent.level}
                    </div>
                  </div>
                </div>

                {/* Progress Rings */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ProgressRing 
                    progress={selectedStudent.overallProgress} 
                    label="Overall Progress"
                  />
                  <ProgressRing 
                    progress={(selectedStudent.juzCompleted / 30) * 100} 
                    label="Juz Completed"
                    value={`${selectedStudent.juzCompleted}/30`}
                  />
                  <ProgressRing 
                    progress={(selectedStudent.surahMastered / 114) * 100} 
                    label="Surah Mastered"
                    value={`${selectedStudent.surahMastered}/114`}
                  />
                  <ProgressRing 
                    progress={Math.min((selectedStudent.streak / 60) * 100, 100)} 
                    label="Streak Days"
                    value={selectedStudent.streak}
                  />
                </div>
              </div>

              {/* Practice Mode Progress */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Practice Mode Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-sm text-slate-300">Solo Recitation</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{selectedStudent.modeProgress.solo}%</div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedStudent.modeProgress.solo}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm text-slate-300">Group Recitation</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{selectedStudent.modeProgress.group}%</div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedStudent.modeProgress.group}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-sm text-slate-300">Tutor-Led</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{selectedStudent.modeProgress.tutor}%</div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedStudent.modeProgress.tutor}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges & Achievements */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    Earned Badges ({selectedStudent.badges.length})
                  </h2>
                  <div className="text-sm text-slate-400">
                    {selectedStudent.totalPoints} Total Points
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedStudent.badges.map((badgeId) => {
                    const badge = getBadgeInfo(badgeId);
                    if (!badge) return null;
                    const BadgeIcon = badge.icon;
                    return (
                      <motion.div
                        key={badgeId}
                        onHoverStart={() => setShowTooltip(badgeId)}
                        onHoverEnd={() => setShowTooltip(null)}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="relative"
                      >
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${badge.color} flex flex-col items-center justify-center aspect-square cursor-pointer`}>
                          <BadgeIcon className="w-8 h-8 text-white mb-2" />
                          <div className="text-xs text-white text-center font-semibold">{badge.name}</div>
                        </div>
                        <AnimatePresence>
                          {showTooltip === badgeId && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg whitespace-nowrap z-10"
                            >
                              <div className="text-xs text-white font-semibold">+{badge.points} points</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                  
                  {/* Locked Badges */}
                  {allBadges.filter(b => !selectedStudent.badges.includes(b.id)).slice(0, 2).map((badge) => {
                    return (
                      <div
                        key={badge.id}
                        className="p-4 rounded-xl bg-slate-900/50 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center aspect-square opacity-50"
                      >
                        <Lock className="w-8 h-8 text-slate-600 mb-2" />
                        <div className="text-xs text-slate-600 text-center font-semibold">{badge.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Certificates */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Certificates ({selectedStudent.certificates.length})
                  </h2>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedStudent.certificates.map((certId) => {
                    const cert = getCertificateInfo(certId);
                    if (!cert) return null;
                    return (
                      <motion.div
                        key={certId}
                        whileHover={{ scale: 1.02 }}
                        className={`p-6 rounded-xl bg-gradient-to-br ${cert.gradient} cursor-pointer group`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="text-white font-semibold mb-1">{cert.name}</div>
                        <div className="text-xs text-white/80">{cert.type}</div>
                      </motion.div>
                    );
                  })}

                  {/* Locked Certificate */}
                  {allCertificates.filter(c => !selectedStudent.certificates.includes(c.id)).slice(0, 1).map((cert) => (
                    <div
                      key={cert.id}
                      className="p-6 rounded-xl bg-slate-900/50 border-2 border-dashed border-slate-700 opacity-50"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">
                          <Lock className="w-6 h-6 text-slate-600" />
                        </div>
                      </div>
                      <div className="text-slate-600 font-semibold mb-1">{cert.name}</div>
                      <div className="text-xs text-slate-700">{cert.type}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gamified Progress Bar */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Level Progress
                  </h2>
                  <div className="text-sm text-slate-400">
                    Next Level: {selectedStudent.totalPoints >= 5000 ? 'Grand Master' : selectedStudent.level === 'Expert' ? 'Master' : 'Expert'} ({Math.min(6000 - selectedStudent.totalPoints, 1000)} points needed)
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedStudent.totalPoints % 1000) / 10}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    {['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master', 'Grand Master'].map((level, idx) => (
                      <div key={level} className="text-center">
                        <div className={`w-3 h-3 rounded-full mb-1 ${
                          selectedStudent.totalPoints >= idx * 1000 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                            : 'bg-slate-700'
                        }`} />
                        <div className="text-xs text-slate-500 hidden md:block">{level}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* No Selection State */
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Student Selected</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Select a student from the list to view their progress, badges, and certificates
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
