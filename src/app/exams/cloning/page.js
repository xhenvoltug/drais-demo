'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy, Clock, Users, FileText, CheckCircle, Calendar, History,
  Eye, Edit, Trash2, Filter, Search, ChevronRight, Target,
  BookOpen, Award, Database, Plus, X, AlertCircle, Layers,
  ArrowRight, RotateCcw, Download, Upload
} from 'lucide-react';

export default function ExamCloning() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedExam, setSelectedExam] = useState(null);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [cloneOptions, setCloneOptions] = useState({
    includeQuestions: true,
    includeSettings: true,
    includeGradingRules: true,
    newClass: '',
    newDate: '',
    newTitle: ''
  });

  // Mock data - Existing exams available for cloning
  const examTemplates = [
    { id: 1, title: 'Mathematics Mid-Term Template', subject: 'Mathematics', questions: 45, duration: '2 hours', gradeLevel: 'Grade 9', usedCount: 12, lastUsed: '2025-11-15', avgScore: 78, creator: 'Mr. Ahmed' },
    { id: 2, title: 'English Literature Quiz', subject: 'English', questions: 25, duration: '1 hour', gradeLevel: 'Grade 10', usedCount: 8, lastUsed: '2025-11-20', avgScore: 82, creator: 'Ms. Fatima' },
    { id: 3, title: 'Physics Final Exam', subject: 'Physics', questions: 60, duration: '3 hours', gradeLevel: 'Grade 11', usedCount: 5, lastUsed: '2025-10-30', avgScore: 75, creator: 'Dr. Omar' },
    { id: 4, title: 'Chemistry Lab Assessment', subject: 'Chemistry', questions: 30, duration: '1.5 hours', gradeLevel: 'Grade 9', usedCount: 15, lastUsed: '2025-12-01', avgScore: 80, creator: 'Ms. Aisha' },
    { id: 5, title: 'Biology Comprehensive Test', subject: 'Biology', questions: 50, duration: '2.5 hours', gradeLevel: 'Grade 10', usedCount: 10, lastUsed: '2025-11-25', avgScore: 76, creator: 'Mr. Yusuf' }
  ];

  // Mock data - Clone history
  const cloneHistory = [
    { id: 1, original: 'Mathematics Mid-Term', clone: 'Mathematics Mid-Term - Grade 9B', clonedBy: 'Mr. Ahmed', date: '2025-12-03', status: 'active', students: 32 },
    { id: 2, original: 'English Quiz', clone: 'English Quiz - Makeup', clonedBy: 'Ms. Fatima', date: '2025-12-02', status: 'completed', students: 5 },
    { id: 3, original: 'Physics Final', clone: 'Physics Final - Remedial', clonedBy: 'Dr. Omar', date: '2025-12-01', status: 'scheduled', students: 18 },
    { id: 4, original: 'Chemistry Lab Test', clone: 'Chemistry Lab Test - Section B', clonedBy: 'Ms. Aisha', date: '2025-11-30', status: 'active', students: 28 }
  ];

  // Mock data - Reusable question sets
  const questionSets = [
    { id: 1, name: 'Algebra Fundamentals', subject: 'Mathematics', questions: 20, difficulty: 'medium', usedIn: 8, lastModified: '2025-11-15' },
    { id: 2, name: 'Shakespeare Analysis', subject: 'English', questions: 15, difficulty: 'hard', usedIn: 5, lastModified: '2025-11-20' },
    { id: 3, name: 'Newton\'s Laws', subject: 'Physics', questions: 12, difficulty: 'medium', usedIn: 10, lastModified: '2025-10-30' },
    { id: 4, name: 'Periodic Table Basics', subject: 'Chemistry', questions: 18, difficulty: 'easy', usedIn: 12, lastModified: '2025-12-01' },
    { id: 5, name: 'Cell Biology', subject: 'Biology', questions: 25, difficulty: 'medium', usedIn: 7, lastModified: '2025-11-25' }
  ];

  const initiateClone = (exam) => {
    setSelectedExam(exam);
    setCloneOptions({
      ...cloneOptions,
      newTitle: `${exam.title} - Clone`
    });
    setShowCloneModal(true);
  };

  const executeClone = () => {
    console.log('Cloning exam:', selectedExam, 'with options:', cloneOptions);
    setShowCloneModal(false);
    setSelectedExam(null);
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Active', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      scheduled: { label: 'Scheduled', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      completed: { label: 'Completed', class: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
    };
    return badges[status];
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'text-emerald-400',
      medium: 'text-amber-400',
      hard: 'text-red-400'
    };
    return colors[difficulty];
  };

  const tabs = [
    { id: 'templates', label: 'Exam Templates', icon: FileText },
    { id: 'history', label: 'Clone History', icon: History },
    { id: 'questions', label: 'Question Sets', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Exam Cloning & Reuse</h1>
          <p className="text-gray-600 dark:text-gray-400">Quickly create new exams from existing templates</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Exam Templates Tab */}
          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Templates</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search templates..."
                        className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                    <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {examTemplates.map((template, idx) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{template.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{template.subject}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span>{template.questions} questions</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{template.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-semibold">
                          {template.gradeLevel}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-white dark:bg-gray-950 rounded-lg">
                        <div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Used</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{template.usedCount}x</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Score</div>
                          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{template.avgScore}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Creator</div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{template.creator}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Last used: {template.lastUsed}
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button
                            onClick={() => initiateClone(template)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Clone
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Clone History Tab */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Clone History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Original Exam</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Cloned As</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Cloned By</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Students</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {cloneHistory.map((item, idx) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{item.original}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Copy className="w-4 h-4 text-purple-500" />
                              <span className="font-semibold text-gray-900 dark:text-white">{item.clone}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.clonedBy}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{item.students}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(item.status).class}`}>
                              {getStatusBadge(item.status).label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Question Sets Tab */}
          {activeTab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reusable Question Sets</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Set
                  </button>
                </div>

                <div className="space-y-4">
                  {questionSets.map((set, idx) => (
                    <motion.div
                      key={set.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-5 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                            <Database className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{set.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{set.subject}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Layers className="w-4 h-4" />
                                <span>{set.questions} questions</span>
                              </div>
                              <div>
                                <span className={`font-semibold capitalize ${getDifficultyColor(set.difficulty)}`}>
                                  {set.difficulty}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <RotateCcw className="w-4 h-4" />
                                <span>Used in {set.usedIn} exams</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right mr-4">
                            <div className="text-xs text-gray-600 dark:text-gray-400">Last Modified</div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{set.lastModified}</div>
                          </div>
                          <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Edit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add to Exam
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clone Modal */}
        <AnimatePresence>
          {showCloneModal && selectedExam && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCloneModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <Copy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Clone Exam</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedExam.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCloneModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      New Exam Title
                    </label>
                    <input
                      type="text"
                      value={cloneOptions.newTitle}
                      onChange={(e) => setCloneOptions({...cloneOptions, newTitle: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Target Class
                      </label>
                      <input
                        type="text"
                        value={cloneOptions.newClass}
                        onChange={(e) => setCloneOptions({...cloneOptions, newClass: e.target.value})}
                        placeholder="e.g., Grade 10A"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        New Date
                      </label>
                      <input
                        type="date"
                        value={cloneOptions.newDate}
                        onChange={(e) => setCloneOptions({...cloneOptions, newDate: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Clone Options</h4>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-white">Include Questions</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cloneOptions.includeQuestions}
                          onChange={(e) => setCloneOptions({...cloneOptions, includeQuestions: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-white">Include Settings</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cloneOptions.includeSettings}
                          onChange={(e) => setCloneOptions({...cloneOptions, includeSettings: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-white">Include Grading Rules</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cloneOptions.includeGradingRules}
                          onChange={(e) => setCloneOptions({...cloneOptions, includeGradingRules: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowCloneModal(false)}
                      className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={executeClone}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Copy className="w-5 h-5" />
                      Clone Exam
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
