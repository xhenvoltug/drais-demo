'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare, Calendar, Copy, Trash2, Send, Upload, Download,
  Users, FileText, AlertCircle, Clock, Eye, Edit, X,
  CheckCircle, XCircle, PlayCircle, PauseCircle, Layers,
  Database, Filter, Search, ChevronDown, MoreVertical
} from 'lucide-react';

export default function BulkActions() {
  const [activeTab, setActiveTab] = useState('exams');
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bulkAction, setBulkAction] = useState('');

  // Mock data - Exams
  const exams = [
    { id: 1, title: 'Mathematics Mid-Term', class: 'Grade 9A', date: '2025-12-10', students: 35, status: 'scheduled' },
    { id: 2, title: 'English Quiz', class: 'Grade 10B', date: '2025-12-12', students: 40, status: 'scheduled' },
    { id: 3, title: 'Physics Final', class: 'Grade 11A', date: '2025-12-15', students: 32, status: 'draft' },
    { id: 4, title: 'Chemistry Lab Test', class: 'Grade 9B', date: '2025-12-16', students: 28, status: 'scheduled' },
    { id: 5, title: 'Biology Assessment', class: 'Grade 10A', date: '2025-12-18', students: 38, status: 'draft' }
  ];

  // Mock data - Students
  const studentsData = [
    { id: 1, name: 'Ahmed Hassan', class: 'Grade 9A', enrolledExams: 3, status: 'active' },
    { id: 2, name: 'Fatima Ali', class: 'Grade 9A', enrolledExams: 3, status: 'active' },
    { id: 3, name: 'Omar Ibrahim', class: 'Grade 9B', enrolledExams: 2, status: 'active' },
    { id: 4, name: 'Aisha Mohammed', class: 'Grade 10A', enrolledExams: 4, status: 'suspended' },
    { id: 5, name: 'Yusuf Abdullah', class: 'Grade 10B', enrolledExams: 3, status: 'active' }
  ];

  // Mock data - Questions
  const questions = [
    { id: 1, text: 'What is the Pythagorean theorem?', subject: 'Mathematics', difficulty: 'medium', type: 'MCQ', usedIn: 5 },
    { id: 2, text: 'Explain photosynthesis process', subject: 'Biology', difficulty: 'hard', type: 'Essay', usedIn: 3 },
    { id: 3, text: 'Calculate the area of a circle', subject: 'Mathematics', difficulty: 'easy', type: 'Short Answer', usedIn: 8 },
    { id: 4, text: 'Define Newton\'s First Law', subject: 'Physics', difficulty: 'medium', type: 'MCQ', usedIn: 6 },
    { id: 5, text: 'Analyze Shakespeare\'s themes', subject: 'English', difficulty: 'hard', type: 'Essay', usedIn: 2 }
  ];

  const toggleExamSelection = (examId) => {
    setSelectedExams(prev => 
      prev.includes(examId) ? prev.filter(id => id !== examId) : [...prev, examId]
    );
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const selectAllExams = () => {
    setSelectedExams(selectedExams.length === exams.length ? [] : exams.map(e => e.id));
  };

  const selectAllStudents = () => {
    setSelectedStudents(selectedStudents.length === studentsData.length ? [] : studentsData.map(s => s.id));
  };

  const selectAllQuestions = () => {
    setSelectedQuestions(selectedQuestions.length === questions.length ? [] : questions.map(q => q.id));
  };

  const handleBulkAction = (action) => {
    setBulkAction(action);
    setShowConfirmModal(true);
  };

  const confirmBulkAction = () => {
    console.log(`Performing ${bulkAction} on selected items`);
    setShowConfirmModal(false);
    // Reset selections
    setSelectedExams([]);
    setSelectedStudents([]);
    setSelectedQuestions([]);
  };

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: { label: 'Scheduled', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      draft: { label: 'Draft', class: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
      active: { label: 'Active', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      suspended: { label: 'Suspended', class: 'bg-red-500/20 text-red-400 border-red-500/30' }
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
    { id: 'exams', label: 'Bulk Exam Actions', icon: FileText, count: selectedExams.length },
    { id: 'students', label: 'Bulk Student Actions', icon: Users, count: selectedStudents.length },
    { id: 'questions', label: 'Bulk Question Actions', icon: Database, count: selectedQuestions.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Bulk Actions</h1>
          <p className="text-gray-600 dark:text-gray-400">Perform actions on multiple items simultaneously</p>
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
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {tab.count > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Bulk Exam Actions */}
          {activeTab === 'exams' && (
            <motion.div
              key="exams"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Action Bar */}
              {selectedExams.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">{selectedExams.length} exam(s) selected</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleBulkAction('publish')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Publish
                      </button>
                      <button
                        onClick={() => handleBulkAction('reschedule')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleBulkAction('clone')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Clone
                      </button>
                      <button
                        onClick={() => handleBulkAction('cancel')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Exams Table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Exams</h2>
                    <button
                      onClick={selectAllExams}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      {selectedExams.length === exams.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedExams.length === exams.length}
                            onChange={selectAllExams}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Exam Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Class</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Students</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {exams.map((exam, idx) => (
                        <motion.tr
                          key={exam.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer ${
                            selectedExams.includes(exam.id) ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                          }`}
                          onClick={() => toggleExamSelection(exam.id)}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedExams.includes(exam.id)}
                              onChange={() => toggleExamSelection(exam.id)}
                              className="w-4 h-4 rounded border-gray-300"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900 dark:text-white">{exam.title}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{exam.class}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{exam.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{exam.students}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(exam.status).class}`}>
                              {getStatusBadge(exam.status).label}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bulk Student Actions */}
          {activeTab === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Action Bar */}
              {selectedStudents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">{selectedStudents.length} student(s) selected</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleBulkAction('enroll')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Enroll in Exam
                      </button>
                      <button
                        onClick={() => handleBulkAction('unenroll')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Remove from Exam
                      </button>
                      <button
                        onClick={() => handleBulkAction('notify')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Notification
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Students Table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Students</h2>
                    <button
                      onClick={selectAllStudents}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      {selectedStudents.length === studentsData.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedStudents.length === studentsData.length}
                            onChange={selectAllStudents}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Student</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Class</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Enrolled Exams</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {studentsData.map((student, idx) => (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer ${
                            selectedStudents.includes(student.id) ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                          }`}
                          onClick={() => toggleStudentSelection(student.id)}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => toggleStudentSelection(student.id)}
                              className="w-4 h-4 rounded border-gray-300"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-semibold text-gray-900 dark:text-white">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{student.class}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{student.enrolledExams} exams</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(student.status).class}`}>
                              {getStatusBadge(student.status).label}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bulk Question Actions */}
          {activeTab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Action Bar */}
              {selectedQuestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">{selectedQuestions.length} question(s) selected</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleBulkAction('assign')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Layers className="w-4 h-4" />
                        Assign to Exam
                      </button>
                      <button
                        onClick={() => handleBulkAction('remove')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Remove from Exam
                      </button>
                      <button
                        onClick={() => handleBulkAction('export')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete-questions')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Questions Table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Questions</h2>
                    <button
                      onClick={selectAllQuestions}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      {selectedQuestions.length === questions.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedQuestions.length === questions.length}
                            onChange={selectAllQuestions}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Question</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Subject</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Difficulty</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Used In</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {questions.map((question, idx) => (
                        <motion.tr
                          key={question.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer ${
                            selectedQuestions.includes(question.id) ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                          }`}
                          onClick={() => toggleQuestionSelection(question.id)}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedQuestions.includes(question.id)}
                              onChange={() => toggleQuestionSelection(question.id)}
                              className="w-4 h-4 rounded border-gray-300"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900 dark:text-white">{question.text}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{question.subject}</td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-semibold capitalize ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{question.type}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{question.usedIn} exams</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowConfirmModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Bulk Action</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to perform this action? This will affect multiple items and cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBulkAction}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
