'use client';

import React, { useState } from 'react';
import {
  Volume2, Play, Pause, RotateCcw, Check, X, AlertTriangle,
  TrendingUp, Book, Clock, Save, ChevronLeft, ChevronRight,
  Star, Award, MessageSquare
} from 'lucide-react';

export default function RecitationTracking({ params }) {
  const [mistakeCounts, setMistakeCounts] = useState({
    tajweed: 0,
    pronunciation: 0,
    fluency: 0,
    memory: 0,
    pausing: 0,
    tone: 0
  });

  const [selectedAyah, setSelectedAyah] = useState(null);
  const [ayahStatuses, setAyahStatuses] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformData, setWaveformData] = useState(
    Array.from({ length: 50 }, () => Math.random() * 100)
  );

  // Mock recitation data
  const recitation = {
    id: params?.id || '1',
    student: 'Ahmed Hassan',
    surah: 'Al-Baqarah',
    ayahRange: '200-220',
    date: new Date().toLocaleDateString(),
    duration: '12:45',
    tutor: 'Sheikh Abdullah'
  };

  const mistakeCategories = [
    {
      id: 'tajweed',
      name: 'Tajweed Errors',
      icon: <Book className="w-5 h-5" />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      textColor: 'text-red-700 dark:text-red-300',
      borderColor: 'border-red-500'
    },
    {
      id: 'pronunciation',
      name: 'Pronunciation Errors',
      icon: <Volume2 className="w-5 h-5" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      textColor: 'text-orange-700 dark:text-orange-300',
      borderColor: 'border-orange-500'
    },
    {
      id: 'fluency',
      name: 'Fluency Issues',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      borderColor: 'border-yellow-500'
    },
    {
      id: 'memory',
      name: 'Memory Lapses',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      textColor: 'text-purple-700 dark:text-purple-300',
      borderColor: 'border-purple-500'
    },
    {
      id: 'pausing',
      name: 'Pausing Errors',
      icon: <Pause className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      textColor: 'text-blue-700 dark:text-blue-300',
      borderColor: 'border-blue-500'
    },
    {
      id: 'tone',
      name: 'Tone & Melody',
      icon: <Volume2 className="w-5 h-5" />,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950',
      textColor: 'text-pink-700 dark:text-pink-300',
      borderColor: 'border-pink-500'
    }
  ];

  // Mock Ayah data
  const ayahs = Array.from({ length: 21 }, (_, i) => ({
    number: 200 + i,
    text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ - Ayah ${200 + i}`,
    status: ayahStatuses[200 + i] || 'pending'
  }));

  const incrementMistake = (category) => {
    setMistakeCounts(prev => ({
      ...prev,
      [category]: prev[category] + 1
    }));
  };

  const updateAyahStatus = (ayahNumber, status) => {
    setAyahStatuses(prev => ({
      ...prev,
      [ayahNumber]: status
    }));
    setSelectedAyah(null);
  };

  const getAyahStatusColor = (status) => {
    switch (status) {
      case 'perfect':
        return 'bg-green-100 dark:bg-green-900 border-green-500 text-green-700 dark:text-green-300';
      case 'minor':
        return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500 text-yellow-700 dark:text-yellow-300';
      case 'revision':
        return 'bg-red-100 dark:bg-red-900 border-red-500 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 border-gray-300 text-gray-700 dark:text-gray-300';
    }
  };

  // Animate waveform
  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setWaveformData(prev => [
          ...prev.slice(1),
          Math.random() * 100
        ]);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Volume2 className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Recitation Tracking</h1>
              </div>
              <div className="flex items-center gap-6 text-emerald-100 text-lg">
                <span>{recitation.student}</span>
                <span>•</span>
                <span>Surah {recitation.surah} ({recitation.ayahRange})</span>
                <span>•</span>
                <span>{recitation.date}</span>
              </div>
            </div>
            <div className="text-right bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-lg">
              <div className="text-sm text-emerald-200 mb-1">Duration</div>
              <div className="text-3xl font-bold">{recitation.duration}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Waveform & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Waveform */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Audio Waveform (Live)
              </h2>
              <div className="relative h-32 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex items-end gap-1 p-2">
                {waveformData.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t transition-all duration-100"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
                    isPlaying
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 inline mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 inline mr-2" />
                      Start Recording
                    </>
                  )}
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg">
                  <Volume2 className="w-5 h-5 inline mr-2" />
                  Playback Attempt
                </button>
              </div>
            </div>

            {/* Mistake Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Mistake Tracking Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mistakeCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => incrementMistake(category.id)}
                    className={`p-5 rounded-xl border-2 ${category.bgColor} ${category.borderColor} hover:scale-105 transition-all cursor-pointer`}
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} text-white mb-3`}>
                      {category.icon}
                    </div>
                    <h3 className={`text-sm font-semibold ${category.textColor} mb-2`}>
                      {category.name}
                    </h3>
                    <div className={`text-3xl font-bold ${category.textColor}`}>
                      {mistakeCounts[category.id]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ayah Highlight System */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Ayah-by-Ayah Evaluation
              </h2>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {ayahs.map((ayah) => (
                  <div
                    key={ayah.number}
                    onClick={() => setSelectedAyah(ayah)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-102 ${getAyahStatusColor(ayah.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white bg-opacity-50 flex items-center justify-center font-bold">
                          {ayah.number}
                        </div>
                        <span className="font-arabic text-lg">{ayah.text}</span>
                      </div>
                      {ayah.status !== 'pending' && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-50">
                          {ayah.status.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Session Summary
              </h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {ayahs.filter(a => a.status === 'perfect').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Perfect Ayat</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {ayahs.filter(a => a.status === 'minor').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Minor Mistakes</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {ayahs.filter(a => a.status === 'revision').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Needs Revision</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {Object.values(mistakeCounts).reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Mistakes</div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                General Notes
              </h2>
              <textarea
                placeholder="Enter detailed notes about this recitation session..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                Save Evaluation
              </button>
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Send Feedback to Student
              </button>
              <button className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Reset Session
              </button>
            </div>
          </div>
        </div>

        {/* Ayah Detail Modal */}
        {selectedAyah && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Ayah {selectedAyah.number} Evaluation
                </h3>
                <button
                  onClick={() => setSelectedAyah(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <p className="font-arabic text-2xl text-center text-gray-900 dark:text-white">
                  {selectedAyah.text}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white">Mark this Ayah as:</h4>
                <button
                  onClick={() => updateAyahStatus(selectedAyah.number, 'perfect')}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Perfect
                </button>
                <button
                  onClick={() => updateAyahStatus(selectedAyah.number, 'minor')}
                  className="w-full px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  Minor Mistakes
                </button>
                <button
                  onClick={() => updateAyahStatus(selectedAyah.number, 'revision')}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Needs Revision
                </button>
              </div>

              <textarea
                placeholder="Specific notes for this Ayah..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
