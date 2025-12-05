'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import { 
  ChevronLeft, ChevronRight, Check, X, Clock, 
  Award, Brain, Target, TrendingUp, BarChart3,
  Play, Pause, RotateCcw, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function QuizPage() {
  const [currentQuizType, setCurrentQuizType] = useState('mcq');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Mock quiz data
  const quizTypes = [
    {
      id: 'mcq',
      name: 'Multiple Choice',
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      questions: [
        {
          id: 1,
          question: 'Which Surah is known as the "Heart of the Quran"?',
          options: ['Al-Fatihah', 'Yasin', 'Al-Baqarah', 'Al-Ikhlas'],
          correct: 1
        },
        {
          id: 2,
          question: 'How many verses are in Surah Al-Fatihah?',
          options: ['5', '6', '7', '8'],
          correct: 2
        },
        {
          id: 3,
          question: 'Which Juz contains Surah Al-Kahf?',
          options: ['Juz 14', 'Juz 15', 'Juz 16', 'Juz 17'],
          correct: 1
        }
      ]
    },
    {
      id: 'fill',
      name: 'Fill in the Blank',
      icon: Brain,
      gradient: 'from-blue-500 to-cyan-600',
      questions: [
        {
          id: 1,
          question: 'Complete the Ayah: "Bismillah ir-Rahman ir-______"',
          answer: 'Rahim',
          hint: 'Starts with R'
        },
        {
          id: 2,
          question: 'Complete: "Alhamdulillahi ______ al-alameen"',
          answer: 'Rabbi',
          hint: 'Lord of...'
        },
        {
          id: 3,
          question: 'Complete: "Qul Huwa Allahu ______"',
          answer: 'Ahad',
          hint: 'Means One'
        }
      ]
    },
    {
      id: 'rearrange',
      name: 'Rearrange Ayah',
      icon: Target,
      gradient: 'from-purple-500 to-pink-600',
      questions: [
        {
          id: 1,
          question: 'Arrange these words in correct order:',
          words: ['ir-Rahim', 'Bismillah', 'ir-Rahman'],
          correct: [1, 2, 0]
        },
        {
          id: 2,
          question: 'Arrange these words in correct order:',
          words: ['al-alameen', 'Rabbi', 'Alhamdulillahi'],
          correct: [2, 1, 0]
        },
        {
          id: 3,
          question: 'Arrange these words in correct order:',
          words: ['Ahad', 'Allahu', 'Huwa', 'Qul'],
          correct: [3, 2, 1, 0]
        }
      ]
    }
  ];

  const currentQuiz = quizTypes.find(q => q.id === currentQuizType);
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  const totalQuestions = currentQuiz?.questions.length || 0;

  // Mock analytics
  const analytics = {
    accuracy: 87.5,
    avgTimePerQuestion: 32,
    totalAttempts: 24,
    bestScore: 95,
    mistakeHeatmap: [
      { category: 'MCQ', mistakes: 3 },
      { category: 'Fill', mistakes: 5 },
      { category: 'Rearrange', mistakes: 2 }
    ]
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (quizStarted && !quizCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer(null);
    setTimeElapsed(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(userAnswers[currentQuiz.questions[currentQuestionIndex + 1]?.id] || null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[currentQuiz.questions[currentQuestionIndex - 1]?.id] || null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuiz.questions.forEach(q => {
      if (q.correct !== undefined && userAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const timerBarProgress = (timeElapsed / 300) * 100; // 5 min max

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Interactive Quizzes
          </h1>
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold">
            v0.0.0032
          </span>
        </div>
        <p className="text-slate-400">Test your Quran memorization knowledge</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Quiz Types & Analytics */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quiz Type Selection */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quiz Types</h2>
            <div className="space-y-3">
              {quizTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => {
                    setCurrentQuizType(type.id);
                    setQuizStarted(false);
                    setQuizCompleted(false);
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setSelectedAnswer(null);
                    setTimeElapsed(0);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    currentQuizType === type.id
                      ? `bg-gradient-to-r ${type.gradient} border-transparent text-white`
                      : 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <type.icon className={`w-5 h-5 ${currentQuizType === type.id ? 'text-white' : 'text-slate-400'}`} />
                    <div className="font-semibold">{type.name}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quiz Analytics */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Analytics
            </h2>
            <div className="space-y-4">
              {/* Accuracy */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Accuracy</span>
                  <span className="text-sm font-bold text-emerald-400">{analytics.accuracy}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                    style={{ width: `${analytics.accuracy}%` }}
                  />
                </div>
              </div>

              {/* Avg Time */}
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-400">Avg Time/Question</span>
                </div>
                <span className="text-sm font-bold text-white">{analytics.avgTimePerQuestion}s</span>
              </div>

              {/* Best Score */}
              <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-slate-400">Best Score</span>
                </div>
                <span className="text-sm font-bold text-white">{analytics.bestScore}%</span>
              </div>
            </div>
          </div>

          {/* Mistake Heatmap */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Mistake Heatmap</h2>
            <div className="space-y-3">
              {analytics.mistakeHeatmap.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-400">{item.category}</span>
                    <span className="text-xs font-semibold text-rose-400">{item.mistakes} errors</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-orange-500"
                      style={{ width: `${(item.mistakes / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Quiz Area */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            {!quizStarted ? (
              /* Quiz Start Screen */
              <div className="text-center py-12">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${currentQuiz?.gradient} flex items-center justify-center`}>
                  <currentQuiz.icon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{currentQuiz?.name}</h2>
                <p className="text-slate-400 mb-8">
                  {totalQuestions} questions • Test your knowledge
                </p>
                <motion.button
                  onClick={handleStartQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-xl bg-gradient-to-r ${currentQuiz?.gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Quiz
                  </div>
                </motion.button>
              </div>
            ) : quizCompleted ? (
              /* Quiz Complete Screen */
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
                <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                  {calculateScore()}%
                </div>
                <p className="text-slate-400 mb-8">
                  Time: {formatTime(timeElapsed)} • {Object.keys(userAnswers).length}/{totalQuestions} answered
                </p>
                <motion.button
                  onClick={handleStartQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    Retry Quiz
                  </div>
                </motion.button>
              </div>
            ) : (
              /* Active Quiz */
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Progress & Timer */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-4 h-4" />
                        {formatTime(timeElapsed)}
                      </div>
                    </div>
                    {/* Timer Bar */}
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                        animate={{ width: `${Math.min(timerBarProgress, 100)}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      {currentQuestion?.question}
                    </h3>

                    {/* MCQ Options */}
                    {currentQuizType === 'mcq' && (
                      <div className="space-y-3">
                        {currentQuestion?.options.map((option, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => handleAnswerSelect(idx)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                              selectedAnswer === idx
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-transparent text-white'
                                : 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === idx ? 'border-white bg-white' : 'border-slate-600'
                              }`}>
                                {selectedAnswer === idx && (
                                  <Check className="w-4 h-4 text-emerald-600" />
                                )}
                              </div>
                              <span className="font-medium">{option}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Fill in the Blank */}
                    {currentQuizType === 'fill' && (
                      <div>
                        <input
                          type="text"
                          value={selectedAnswer || ''}
                          onChange={(e) => handleAnswerSelect(e.target.value)}
                          placeholder="Type your answer..."
                          className="w-full p-4 bg-slate-900/50 border-2 border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        {currentQuestion?.hint && (
                          <div className="mt-3 text-sm text-slate-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Hint: {currentQuestion.hint}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Rearrange */}
                    {currentQuizType === 'rearrange' && (
                      <div className="grid grid-cols-2 gap-3">
                        {currentQuestion?.words.map((word, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => handleAnswerSelect(idx)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 bg-slate-900/50 border-2 border-slate-700/50 rounded-xl text-white hover:border-purple-500/50 transition-all"
                          >
                            {word}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                    <motion.button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </div>
                    </motion.button>

                    <div className="flex gap-2">
                      {currentQuiz.questions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            userAnswers[currentQuiz.questions[idx].id] !== undefined
                              ? 'bg-emerald-500'
                              : idx === currentQuestionIndex
                              ? 'bg-purple-500 w-6'
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    <motion.button
                      onClick={handleNext}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium transition-all"
                    >
                      <div className="flex items-center gap-2">
                        {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
