'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Send, ArrowLeft, User, Calendar, Clock, Award, MessageSquare,
  CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Eye,
  FileText, Star, Zap, BookOpen, Edit3, RotateCcw, History, Copy
} from 'lucide-react';

export default function ManualGradingInterface({ params }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [grades, setGrades] = useState({});
  const [feedback, setFeedback] = useState({});
  const [generalFeedback, setGeneralFeedback] = useState('');
  const [privateRemarks, setPrivateRemarks] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock exam data
  const examSubmission = {
    id: params?.id || '1',
    studentName: 'Ahmed Hassan',
    studentId: 'ST001',
    class: 'Grade 9A',
    examName: 'Mathematics Mid-Term Examination',
    subject: 'Mathematics',
    totalMarks: 100,
    submittedDate: '2025-12-05 09:30',
    duration: '2 hours',
    previousGrade: null,
    version: 1
  };

  // Mock questions with student answers
  const questions = [
    {
      id: 1,
      type: 'essay',
      question: 'Explain the Pythagorean theorem and provide a real-world application.',
      marks: 10,
      studentAnswer: 'The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse is equal to the sum of squares of the other two sides (a² + b² = c²). A real-world application is in construction, where builders use the 3-4-5 triangle rule to ensure corners are perfectly square.',
      rubric: ['Clear explanation (4 marks)', 'Correct formula (2 marks)', 'Real-world example (3 marks)', 'Presentation (1 mark)'],
      autoGradable: false
    },
    {
      id: 2,
      type: 'short-answer',
      question: 'Calculate the area of a circle with radius 7cm. (Use π = 3.14)',
      marks: 5,
      studentAnswer: 'Area = π × r² = 3.14 × 7² = 3.14 × 49 = 153.86 cm²',
      correctAnswer: '153.86 cm²',
      autoGradable: true,
      autoScore: 5
    },
    {
      id: 3,
      type: 'multi-part',
      question: 'Given the quadratic equation 2x² - 5x + 3 = 0',
      parts: [
        { part: 'a', question: 'Find the discriminant', marks: 3, studentAnswer: 'b² - 4ac = (-5)² - 4(2)(3) = 25 - 24 = 1' },
        { part: 'b', question: 'Solve for x using the quadratic formula', marks: 5, studentAnswer: 'x = (5 ± √1) / 4 = (5 ± 1) / 4\nx₁ = 6/4 = 1.5, x₂ = 4/4 = 1' },
        { part: 'c', question: 'Verify your solutions', marks: 2, studentAnswer: 'For x=1.5: 2(1.5)² - 5(1.5) + 3 = 4.5 - 7.5 + 3 = 0 ✓\nFor x=1: 2(1)² - 5(1) + 3 = 2 - 5 + 3 = 0 ✓' }
      ],
      totalMarks: 10,
      autoGradable: false
    },
    {
      id: 4,
      type: 'essay',
      question: 'Discuss the importance of prime numbers in mathematics and cryptography.',
      marks: 15,
      studentAnswer: 'Prime numbers are fundamental building blocks in mathematics. They cannot be divided evenly by any number except 1 and themselves. In cryptography, large prime numbers are crucial for encryption algorithms like RSA. The difficulty of factoring large numbers into their prime components makes encrypted data secure.',
      rubric: ['Definition of primes (3 marks)', 'Mathematical importance (4 marks)', 'Cryptography application (5 marks)', 'Examples (2 marks)', 'Writing quality (1 mark)'],
      autoGradable: false
    },
    {
      id: 5,
      type: 'problem-solving',
      question: 'A train travels 240 km at a speed of 80 km/h. How long does the journey take? If the train increases its speed by 20 km/h for the return journey, how much time is saved?',
      marks: 8,
      studentAnswer: 'Journey time = Distance/Speed = 240/80 = 3 hours\nReturn speed = 80 + 20 = 100 km/h\nReturn time = 240/100 = 2.4 hours\nTime saved = 3 - 2.4 = 0.6 hours = 36 minutes',
      steps: ['Calculate initial time (2 marks)', 'Calculate return speed (1 mark)', 'Calculate return time (2 marks)', 'Calculate time difference (2 marks)', 'Show working (1 mark)'],
      autoGradable: false
    }
  ];

  // Predefined comment templates
  const commentTemplates = [
    { id: 1, text: 'Excellent work! Clear understanding demonstrated.', category: 'positive' },
    { id: 2, text: 'Good attempt, but needs more detail in the explanation.', category: 'constructive' },
    { id: 3, text: 'The calculation is correct, but please show your working.', category: 'constructive' },
    { id: 4, text: 'Partial credit - the method is correct but there\'s a computational error.', category: 'partial' },
    { id: 5, text: 'Please review this topic and see me during office hours.', category: 'improvement' },
    { id: 6, text: 'Outstanding application of the concept!', category: 'positive' },
    { id: 7, text: 'Incomplete answer - missing key components.', category: 'improvement' }
  ];

  const handleGradeChange = (questionId, value, partIndex = null) => {
    const key = partIndex !== null ? `${questionId}_${partIndex}` : questionId;
    setGrades(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
    setAutoSaveStatus('saving');
    setTimeout(() => setAutoSaveStatus('saved'), 1000);
  };

  const handleFeedbackChange = (questionId, value) => {
    setFeedback(prev => ({ ...prev, [questionId]: value }));
    setAutoSaveStatus('saving');
    setTimeout(() => setAutoSaveStatus('saved'), 1000);
  };

  const applyTemplate = (template) => {
    const currentQ = questions[currentQuestion];
    setFeedback(prev => ({ ...prev, [currentQ.id]: template.text }));
    setShowTemplates(false);
  };

  const calculateTotalScore = () => {
    return Object.values(grades).reduce((sum, grade) => sum + grade, 0);
  };

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <a href="/exams/grading" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Grading Dashboard
          </a>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{examSubmission.examName}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {examSubmission.studentName} ({examSubmission.studentId})
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {examSubmission.class}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {examSubmission.submittedDate}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {calculateTotalScore()}/{examSubmission.totalMarks}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Score</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {autoSaveStatus === 'saving' ? 'Saving...' : 'All changes saved'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grading Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question & Answer Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    Q{currentQ.id}
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold">
                      {currentQ.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentQ.totalMarks || currentQ.marks} marks
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Question:</h3>
                <p className="text-gray-700 dark:text-gray-300">{currentQ.question}</p>
              </div>

              {currentQ.type === 'multi-part' && (
                <div className="space-y-4 mb-6">
                  {currentQ.parts.map((part, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">Part {part.part}:</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{part.marks} marks</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{part.question}</p>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Student's Answer:</p>
                        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{part.studentAnswer}</p>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Grade for Part {part.part}:
                        </label>
                        <input
                          type="number"
                          min="0"
                          max={part.marks}
                          step="0.5"
                          value={grades[`${currentQ.id}_${idx}`] || ''}
                          onChange={(e) => handleGradeChange(currentQ.id, e.target.value, idx)}
                          className="w-32 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder={`0-${part.marks}`}
                        />
                        <span className="ml-2 text-gray-600 dark:text-gray-400">/ {part.marks}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentQ.type !== 'multi-part' && (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Student's Answer:</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border-l-4 border-blue-500">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{currentQ.studentAnswer}</p>
                    </div>
                  </div>

                  {currentQ.autoGradable && (
                    <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-semibold text-emerald-900 dark:text-emerald-100">Auto-Graded</span>
                      </div>
                      <p className="text-emerald-800 dark:text-emerald-200">
                        System Score: <span className="font-bold">{currentQ.autoScore}/{currentQ.marks}</span>
                      </p>
                    </div>
                  )}

                  {currentQ.rubric && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Grading Rubric:</h3>
                      <ul className="space-y-2">
                        {currentQ.rubric.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Grading & Feedback Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              {currentQ.type !== 'multi-part' && (
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Assign Grade:
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="0"
                      max={currentQ.marks}
                      step="0.5"
                      value={grades[currentQ.id] || currentQ.autoScore || ''}
                      onChange={(e) => handleGradeChange(currentQ.id, e.target.value)}
                      className="w-40 px-6 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder={`0-${currentQ.marks}`}
                    />
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">/ {currentQ.marks}</span>
                    {currentQ.autoGradable && (
                      <button
                        onClick={() => handleGradeChange(currentQ.id, currentQ.autoScore)}
                        className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Use Auto-Grade
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white">
                    Feedback for Student:
                  </label>
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Templates
                  </button>
                </div>

                {showTemplates && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl space-y-2"
                  >
                    {commentTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => applyTemplate(template)}
                        className="w-full text-left px-4 py-2 bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        {template.text}
                      </button>
                    ))}
                  </motion.div>
                )}

                <textarea
                  value={feedback[currentQ.id] || ''}
                  onChange={(e) => handleFeedbackChange(currentQ.id, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Provide specific feedback for this question..."
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-gray-900 dark:text-white transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Question {currentQuestion + 1} of {totalQuestions}
                </div>
              </div>

              <button
                onClick={() => setCurrentQuestion(Math.min(totalQuestions - 1, currentQuestion + 1))}
                disabled={currentQuestion === totalQuestions - 1}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-colors flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar - Quick Actions & Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Draft
                </button>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Submit & Release
                </button>

                <button className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview Result
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">General Feedback</h4>
                <textarea
                  value={generalFeedback}
                  onChange={(e) => setGeneralFeedback(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Overall exam feedback..."
                />
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Private Remarks</h4>
                <textarea
                  value={privateRemarks}
                  onChange={(e) => setPrivateRemarks(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Internal notes (not visible to student)..."
                />
              </div>

              {/* Question Navigator */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Question Navigator</h4>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(idx)}
                      className={`w-full aspect-square rounded-lg font-bold text-sm transition-all ${
                        idx === currentQuestion
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                          : grades[q.id] || (q.type === 'multi-part' && q.parts.some((_, i) => grades[`${q.id}_${i}`]))
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
