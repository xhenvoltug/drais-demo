'use client';

import React, { useState } from 'react';
import {
  BookOpen, Search, Filter, ZoomIn, ZoomOut, Grid,
  CheckCircle, Clock, AlertTriangle, RotateCcw, Save,
  X, ChevronLeft, ChevronRight, Star, Award
} from 'lucide-react';

export default function MushafTracker() {
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mock page status data (604 pages)
  const generatePageStatuses = () => {
    const statuses = ['unread', 'in-progress', 'completed', 'needs-revision'];
    return Array.from({ length: 604 }, (_, i) => ({
      pageNumber: i + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      juz: Math.ceil((i + 1) / 20),
      surah: `Surah ${Math.floor(Math.random() * 114) + 1}`,
      notes: '',
      lastReviewed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));
  };

  const [pages, setPages] = useState(generatePageStatuses());

  const students = [
    { id: 'all', name: 'All Students' },
    { id: '1', name: 'Ahmed Hassan' },
    { id: '2', name: 'Fatima Ali' },
    { id: '3', name: 'Omar Khalil' },
    { id: '4', name: 'Aisha Mohammed' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-600 hover:bg-green-600';
      case 'in-progress':
        return 'bg-yellow-500 border-yellow-600 hover:bg-yellow-600';
      case 'needs-revision':
        return 'bg-red-500 border-red-600 hover:bg-red-600';
      default:
        return 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500 hover:bg-gray-400 dark:hover:bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'in-progress':
        return <Clock className="w-3 h-3" />;
      case 'needs-revision':
        return <RotateCcw className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const updatePageStatus = (pageNumber, newStatus, notes) => {
    setPages(prev => prev.map(page =>
      page.pageNumber === pageNumber
        ? { ...page, status: newStatus, notes, lastReviewed: new Date().toLocaleDateString() }
        : page
    ));
    setSelectedPage(null);
  };

  const filteredPages = pages.filter(page => {
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    const matchesSearch = searchTerm === '' ||
      page.pageNumber.toString().includes(searchTerm) ||
      page.surah.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    completed: pages.filter(p => p.status === 'completed').length,
    inProgress: pages.filter(p => p.status === 'in-progress').length,
    needsRevision: pages.filter(p => p.status === 'needs-revision').length,
    unread: pages.filter(p => p.status === 'unread').length
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
                <h1 className="text-4xl font-bold">Mushaf Page Tracker</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                604 Pages • 30 Juz • 114 Surahs
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-lg">
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-xs text-emerald-200">Completed</div>
              </div>
              <div className="text-center bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-lg">
                <div className="text-2xl font-bold">{stats.inProgress}</div>
                <div className="text-xs text-emerald-200">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search page or Surah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="needs-revision">Needs Revision</option>
              <option value="unread">Unread</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.1))}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <BookOpen className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.unread}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Unread</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">In Progress</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.needsRevision}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Needs Revision</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mushaf Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Qur'an Pages (1-604)
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <span>Unread</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Revision</span>
              </div>
            </div>
          </div>

          <div
            className="grid gap-2 transition-all duration-300"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(${40 * zoomLevel}px, 1fr))`,
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left'
            }}
          >
            {filteredPages.map((page) => (
              <button
                key={page.pageNumber}
                onClick={() => setSelectedPage(page)}
                className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-lg ${getStatusColor(page.status)}`}
                title={`Page ${page.pageNumber} - ${page.surah} (Juz ${page.juz})`}
              >
                <span className="text-xs font-bold text-white">{page.pageNumber}</span>
                {getStatusIcon(page.status) && (
                  <div className="text-white mt-1">
                    {getStatusIcon(page.status)}
                  </div>
                )}
              </button>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No pages match your filters</p>
            </div>
          )}
        </div>

        {/* Page Detail Modal */}
        {selectedPage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Page {selectedPage.pageNumber}</h2>
                    <div className="flex items-center gap-4 text-emerald-100">
                      <span>Juz {selectedPage.juz}</span>
                      <span>•</span>
                      <span>{selectedPage.surah}</span>
                      <span>•</span>
                      <span>Last reviewed: {selectedPage.lastReviewed}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Page Preview */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 border-4 border-amber-200 dark:border-amber-800">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-full font-bold mb-4">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                  </div>
                  <div className="font-arabic text-2xl leading-relaxed text-right text-gray-900 dark:text-white space-y-4">
                    <p>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</p>
                    <p>الرَّحْمَٰنِ الرَّحِيمِ</p>
                    <p>مَالِكِ يَوْمِ الدِّينِ</p>
                    <p>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</p>
                  </div>
                  <div className="text-center mt-6 text-amber-600 dark:text-amber-400 text-sm">
                    [Mushaf Page Preview - Page {selectedPage.pageNumber}]
                  </div>
                </div>

                {/* Mastery Status */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Update Mastery Status
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updatePageStatus(selectedPage.pageNumber, 'in-progress', selectedPage.notes)}
                      className={`px-6 py-4 rounded-lg font-semibold transition-all border-2 ${
                        selectedPage.status === 'in-progress'
                          ? 'bg-yellow-600 text-white border-yellow-700'
                          : 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900'
                      }`}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-2" />
                      In Progress
                    </button>
                    <button
                      onClick={() => updatePageStatus(selectedPage.pageNumber, 'completed', selectedPage.notes)}
                      className={`px-6 py-4 rounded-lg font-semibold transition-all border-2 ${
                        selectedPage.status === 'completed'
                          ? 'bg-green-600 text-white border-green-700'
                          : 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 mx-auto mb-2" />
                      Completed
                    </button>
                    <button
                      onClick={() => updatePageStatus(selectedPage.pageNumber, 'needs-revision', selectedPage.notes)}
                      className={`px-6 py-4 rounded-lg font-semibold transition-all border-2 ${
                        selectedPage.status === 'needs-revision'
                          ? 'bg-red-600 text-white border-red-700'
                          : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900'
                      }`}
                    >
                      <RotateCcw className="w-5 h-5 mx-auto mb-2" />
                      Needs Revision
                    </button>
                    <button
                      onClick={() => updatePageStatus(selectedPage.pageNumber, 'unread', selectedPage.notes)}
                      className={`px-6 py-4 rounded-lg font-semibold transition-all border-2 ${
                        selectedPage.status === 'unread'
                          ? 'bg-gray-600 text-white border-gray-700'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <BookOpen className="w-5 h-5 mx-auto mb-2" />
                      Unread
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Notes for this page
                  </label>
                  <textarea
                    placeholder="Enter notes about memorization progress, mistakes, or specific points to review..."
                    rows="4"
                    defaultValue={selectedPage.notes}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                  <button
                    onClick={() => {
                      const prevPage = pages.find(p => p.pageNumber === selectedPage.pageNumber - 1);
                      if (prevPage) setSelectedPage(prevPage);
                    }}
                    disabled={selectedPage.pageNumber === 1}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous Page
                  </button>
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="px-8 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save & Close
                  </button>
                  <button
                    onClick={() => {
                      const nextPage = pages.find(p => p.pageNumber === selectedPage.pageNumber + 1);
                      if (nextPage) setSelectedPage(nextPage);
                    }}
                    disabled={selectedPage.pageNumber === 604}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Next Page
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
