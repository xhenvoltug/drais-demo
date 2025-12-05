'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Plus, Edit3, Trash2, Save, X, Copy, Star,
  Tag, Clock, User, FileText, CheckCircle, Zap, Filter,
  Search, Download, Upload, FolderOpen, Grid, List
} from 'lucide-react';

export default function FeedbackTemplatesManager() {
  const [templates, setTemplates] = useState([
    { id: 1, title: 'Excellent Work', content: 'Excellent work! Your answer demonstrates a clear understanding of the concept and includes all required components.', category: 'positive', tags: ['excellent', 'complete'], useCount: 45, lastUsed: '2025-12-04', isDefault: true },
    { id: 2, title: 'Good Effort', content: 'Good effort! You\'re on the right track, but there are a few areas that need refinement.', category: 'constructive', tags: ['good', 'improvement'], useCount: 32, lastUsed: '2025-12-05', isDefault: true },
    { id: 3, title: 'Show Your Work', content: 'Your final answer is correct, but please show all your working steps to demonstrate your problem-solving process.', category: 'constructive', tags: ['working', 'process'], useCount: 28, lastUsed: '2025-12-03', isDefault: false },
    { id: 4, title: 'Needs Improvement', content: 'This answer needs significant improvement. Please review the relevant chapter and consult the study materials.', category: 'improvement', tags: ['review', 'study'], useCount: 15, lastUsed: '2025-12-02', isDefault: false },
    { id: 5, title: 'Partial Credit', content: 'Partial credit awarded. Your method is correct, but there is a computational error in the final step.', category: 'partial', tags: ['method', 'error'], useCount: 22, lastUsed: '2025-12-05', isDefault: false },
    { id: 6, title: 'Missing Components', content: 'Your answer is incomplete. You addressed [X] but missed [Y] and [Z]. Please ensure all parts of the question are answered.', category: 'improvement', tags: ['incomplete', 'missing'], useCount: 18, lastUsed: '2025-12-01', isDefault: false },
    { id: 7, title: 'Outstanding', content: 'Outstanding work! Your answer goes beyond expectations with excellent examples and clear explanations.', category: 'positive', tags: ['outstanding', 'exceptional'], useCount: 12, lastUsed: '2025-11-30', isDefault: true },
    { id: 8, title: 'Conceptual Error', content: 'There appears to be a conceptual misunderstanding. Please review the definition of [concept] and see me during office hours if you need clarification.', category: 'improvement', tags: ['concept', 'office hours'], useCount: 9, lastUsed: '2025-11-28', isDefault: false }
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    content: '',
    category: 'constructive',
    tags: []
  });

  const categories = [
    { value: 'positive', label: 'Positive', color: 'emerald' },
    { value: 'constructive', label: 'Constructive', color: 'blue' },
    { value: 'improvement', label: 'Needs Improvement', color: 'amber' },
    { value: 'partial', label: 'Partial Credit', color: 'purple' }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      positive: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
      constructive: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400',
      improvement: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400',
      partial: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-600 dark:text-purple-400'
    };
    return colors[category] || colors.constructive;
  };

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? { ...editingTemplate, ...newTemplate } : t));
      setEditingTemplate(null);
    } else {
      const template = {
        ...newTemplate,
        id: Date.now(),
        useCount: 0,
        lastUsed: new Date().toISOString().split('T')[0],
        isDefault: false
      };
      setTemplates(prev => [...prev, template]);
    }
    setNewTemplate({ title: '', content: '', category: 'constructive', tags: [] });
    setIsAddingTemplate(false);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setNewTemplate({
      title: template.title,
      content: template.content,
      category: template.category,
      tags: template.tags
    });
    setIsAddingTemplate(true);
  };

  const handleDeleteTemplate = (id) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Feedback Templates</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage predefined feedback comments for faster grading</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{templates.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Templates</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{templates.filter(t => t.isDefault).length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Default Templates</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {templates.reduce((sum, t) => sum + t.useCount, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Times Used</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {[...new Set(templates.flatMap(t => t.tags))].length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Unique Tags</div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>

              <div className="flex gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <List className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              <button
                onClick={() => setIsAddingTemplate(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Template
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Template Modal */}
        <AnimatePresence>
          {isAddingTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => {
                setIsAddingTemplate(false);
                setEditingTemplate(null);
                setNewTemplate({ title: '', content: '', category: 'constructive', tags: [] });
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingTemplate ? 'Edit Template' : 'New Template'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsAddingTemplate(false);
                      setEditingTemplate(null);
                      setNewTemplate({ title: '', content: '', category: 'constructive', tags: [] });
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Template Title
                    </label>
                    <input
                      type="text"
                      value={newTemplate.title}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="e.g., Excellent Work"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Feedback Content
                    </label>
                    <textarea
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                      placeholder="Enter the feedback text..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={newTemplate.tags.join(', ')}
                      onChange={(e) => setNewTemplate(prev => ({ 
                        ...prev, 
                        tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                      }))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="excellent, complete, well-written"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveTemplate}
                      disabled={!newTemplate.title || !newTemplate.content}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      {editingTemplate ? 'Update Template' : 'Create Template'}
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingTemplate(false);
                        setEditingTemplate(null);
                        setNewTemplate({ title: '', content: '', category: 'constructive', tags: [] });
                      }}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Templates Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-gradient-to-br ${getCategoryColor(template.category)} border rounded-2xl p-6 shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{template.title}</h3>
                    {template.isDefault && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg text-xs font-semibold">
                        <Star className="w-3 h-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="p-2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                    {!template.isDefault && (
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-2 bg-white/50 dark:bg-gray-900/50 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {template.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-1 bg-white/50 dark:bg-gray-900/50 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-300 dark:border-gray-600">
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {template.useCount} uses
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {template.lastUsed}
                    </span>
                  </div>
                  <button className="p-2 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 rounded-lg transition-colors">
                    <Copy className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Content</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Usage</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTemplates.map((template, idx) => (
                    <motion.tr
                      key={template.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{template.title}</span>
                          {template.isDefault && (
                            <Star className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border inline-flex ${getCategoryColor(template.category)}`}>
                          {categories.find(c => c.value === template.category)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 max-w-md">
                          {template.content}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div>{template.useCount} times</div>
                          <div className="text-xs">{template.lastUsed}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditTemplate(template)}
                            className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </button>
                          <button className="p-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg transition-colors">
                            <Copy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </button>
                          {!template.isDefault && (
                            <button
                              onClick={() => handleDeleteTemplate(template.id)}
                              className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
