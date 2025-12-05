'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Shield, Clock, FileText, Award, AlertCircle,
  CheckCircle, Users, UserCheck, Lock, Key, Calculator,
  BookOpen, Info, Plus, Trash2, Edit, Save, X,
  ChevronDown, ChevronRight, Search, Filter
} from 'lucide-react';

export default function ExamSettings() {
  const [activeTab, setActiveTab] = useState('accessibility');
  const [expandedSections, setExpandedSections] = useState(['general']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Mock data - Students for accessibility settings
  const students = [
    { id: 1, name: 'Ahmed Hassan', class: 'Grade 9A', status: 'regular', specialAccess: false, timeExtension: 0 },
    { id: 2, name: 'Fatima Ali', class: 'Grade 9A', status: 'regular', specialAccess: false, timeExtension: 0 },
    { id: 3, name: 'Omar Ibrahim', class: 'Grade 9B', status: 'exempted', specialAccess: true, timeExtension: 30 },
    { id: 4, name: 'Aisha Mohammed', class: 'Grade 9A', status: 'makeup', specialAccess: true, timeExtension: 15 },
    { id: 5, name: 'Yusuf Abdullah', class: 'Grade 9B', status: 'regular', specialAccess: false, timeExtension: 0 }
  ];

  // Grading schemes
  const [gradingScheme, setGradingScheme] = useState({
    passingGrade: 50,
    bonusPoints: 5,
    latePenalty: 10,
    roundingRule: 'nearest',
    weightDistribution: [
      { component: 'Multiple Choice', weight: 40 },
      { component: 'Short Answer', weight: 30 },
      { component: 'Essay', weight: 30 }
    ]
  });

  // Exam instructions
  const [instructions, setInstructions] = useState({
    general: 'Read all questions carefully before answering.',
    formulas: 'Formula sheet provided on page 2.',
    resources: 'Calculator allowed for Section B only.',
    duration: '2 hours'
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const tabs = [
    { id: 'accessibility', label: 'Student Accessibility', icon: UserCheck },
    { id: 'instructions', label: 'Exam Instructions', icon: FileText },
    { id: 'grading', label: 'Grading Configuration', icon: Calculator },
    { id: 'security', label: 'Security Settings', icon: Shield }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      regular: { label: 'Regular', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      exempted: { label: 'Exempted', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      makeup: { label: 'Make-up', class: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
    };
    return badges[status];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Advanced Exam Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure accessibility, grading, instructions, and security</p>
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
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
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
          {/* Student Accessibility Tab */}
          {activeTab === 'accessibility' && (
            <motion.div
              key="accessibility"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Accessibility</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                  <Plus className="w-5 h-5" />
                  Add Exception
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Student</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Class</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Special Access</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Time Extension</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {students.map((student, idx) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                      >
                        <td className="px-6 py-4">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{student.class}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(student.status).class}`}>
                            {getStatusBadge(student.status).label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {student.specialAccess ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400" />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {student.timeExtension > 0 ? `+${student.timeExtension} min` : 'None'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Exam Instructions Tab */}
          {activeTab === 'instructions' && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Exam Instructions & Resources</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      General Instructions
                    </label>
                    <textarea
                      value={instructions.general}
                      onChange={(e) => setInstructions({...instructions, general: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Formulas & References
                    </label>
                    <textarea
                      value={instructions.formulas}
                      onChange={(e) => setInstructions({...instructions, formulas: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Allowed Resources
                    </label>
                    <input
                      type="text"
                      value={instructions.resources}
                      onChange={(e) => setInstructions({...instructions, resources: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Exam Duration
                    </label>
                    <input
                      type="text"
                      value={instructions.duration}
                      onChange={(e) => setInstructions({...instructions, duration: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                      <Save className="w-5 h-5" />
                      Save Instructions
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grading Configuration Tab */}
          {activeTab === 'grading' && (
            <motion.div
              key="grading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grading Configuration</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Passing Grade (%)
                    </label>
                    <input
                      type="number"
                      value={gradingScheme.passingGrade}
                      onChange={(e) => setGradingScheme({...gradingScheme, passingGrade: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Bonus Points
                    </label>
                    <input
                      type="number"
                      value={gradingScheme.bonusPoints}
                      onChange={(e) => setGradingScheme({...gradingScheme, bonusPoints: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Late Submission Penalty (%)
                    </label>
                    <input
                      type="number"
                      value={gradingScheme.latePenalty}
                      onChange={(e) => setGradingScheme({...gradingScheme, latePenalty: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Rounding Rule
                    </label>
                    <select
                      value={gradingScheme.roundingRule}
                      onChange={(e) => setGradingScheme({...gradingScheme, roundingRule: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="nearest">Round to Nearest</option>
                      <option value="up">Round Up</option>
                      <option value="down">Round Down</option>
                      <option value="none">No Rounding</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Weight Distribution</h3>
                  <div className="space-y-4">
                    {gradingScheme.weightDistribution.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={item.component}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                            readOnly
                          />
                        </div>
                        <div className="w-32">
                          <input
                            type="number"
                            value={item.weight}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                          />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Reset to Default
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
                    <Save className="w-5 h-5" />
                    Save Configuration
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Settings</h2>

              <div className="space-y-6">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">Security Notice</h3>
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        Changes to security settings will affect all users immediately. Ensure proper authorization before making changes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Require Authentication</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Students must authenticate before accessing exam</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Browser Lockdown</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Prevent tab switching and copy-paste during exam</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">IP Restriction</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Limit exam access to specific IP ranges</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
