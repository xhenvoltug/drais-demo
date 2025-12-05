'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Lock, Key, Eye, EyeOff, Users, UserCheck, UserX,
  Settings, AlertCircle, CheckCircle, X, Plus, Edit, Trash2,
  Search, Filter, History, Database, FileText, Award,
  Clock, Calendar, Activity, MoreVertical, ChevronRight
} from 'lucide-react';

export default function ExamSecurity() {
  const [activeTab, setActiveTab] = useState('roles');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAuditDetails, setShowAuditDetails] = useState(false);

  // Mock data - User roles
  const roles = [
    { id: 1, name: 'Super Admin', users: 2, color: 'red', permissions: ['all'], description: 'Full system access' },
    { id: 2, name: 'Exam Coordinator', users: 5, color: 'purple', permissions: ['create', 'edit', 'delete', 'publish', 'view_all'], description: 'Manage all exams' },
    { id: 3, name: 'Teacher', users: 45, color: 'blue', permissions: ['create', 'edit', 'view_own', 'grade'], description: 'Create and grade exams' },
    { id: 4, name: 'Assistant Teacher', users: 12, color: 'emerald', permissions: ['view_own', 'grade'], description: 'Grade assigned exams' },
    { id: 5, name: 'Viewer', users: 8, color: 'gray', permissions: ['view_own'], description: 'Read-only access' }
  ];

  // Mock data - Permissions
  const allPermissions = [
    { id: 'create', name: 'Create Exams', description: 'Create new exams and templates', category: 'Exam Management' },
    { id: 'edit', name: 'Edit Exams', description: 'Modify existing exams', category: 'Exam Management' },
    { id: 'delete', name: 'Delete Exams', description: 'Remove exams permanently', category: 'Exam Management' },
    { id: 'publish', name: 'Publish Exams', description: 'Make exams available to students', category: 'Exam Management' },
    { id: 'view_all', name: 'View All Exams', description: 'Access all exams in system', category: 'Viewing' },
    { id: 'view_own', name: 'View Own Exams', description: 'Access only assigned exams', category: 'Viewing' },
    { id: 'grade', name: 'Grade Exams', description: 'Grade student submissions', category: 'Grading' },
    { id: 'analytics', name: 'View Analytics', description: 'Access performance reports', category: 'Analytics' },
    { id: 'bulk_actions', name: 'Bulk Operations', description: 'Perform bulk actions', category: 'Advanced' },
    { id: 'settings', name: 'Manage Settings', description: 'Configure system settings', category: 'Administration' },
    { id: 'users', name: 'Manage Users', description: 'Add/remove user access', category: 'Administration' },
    { id: 'audit', name: 'View Audit Logs', description: 'Access security logs', category: 'Security' }
  ];

  // Mock data - User access list
  const userAccess = [
    { id: 1, name: 'Dr. Ahmed Hassan', email: 'ahmed@school.edu', role: 'Exam Coordinator', status: 'active', lastLogin: '2025-12-05 14:30', examsCreated: 15 },
    { id: 2, name: 'Ms. Fatima Ali', email: 'fatima@school.edu', role: 'Teacher', status: 'active', lastLogin: '2025-12-05 12:15', examsCreated: 8 },
    { id: 3, name: 'Mr. Omar Ibrahim', email: 'omar@school.edu', role: 'Teacher', status: 'active', lastLogin: '2025-12-04 16:45', examsCreated: 12 },
    { id: 4, name: 'Ms. Aisha Mohammed', email: 'aisha@school.edu', role: 'Assistant Teacher', status: 'suspended', lastLogin: '2025-11-28 10:20', examsCreated: 0 },
    { id: 5, name: 'Mr. Yusuf Abdullah', email: 'yusuf@school.edu', role: 'Viewer', status: 'active', lastLogin: '2025-12-05 09:00', examsCreated: 0 }
  ];

  // Mock data - Audit trail
  const auditLogs = [
    { id: 1, action: 'Exam Created', user: 'Dr. Ahmed Hassan', exam: 'Mathematics Mid-Term', timestamp: '2025-12-05 14:30:22', ip: '192.168.1.100', severity: 'info' },
    { id: 2, action: 'Exam Published', user: 'Ms. Fatima Ali', exam: 'English Quiz', timestamp: '2025-12-05 12:15:45', ip: '192.168.1.102', severity: 'info' },
    { id: 3, action: 'Exam Deleted', user: 'Dr. Ahmed Hassan', exam: 'Old Physics Test', timestamp: '2025-12-05 10:05:10', ip: '192.168.1.100', severity: 'warning' },
    { id: 4, action: 'Failed Login Attempt', user: 'Unknown', exam: 'N/A', timestamp: '2025-12-05 08:45:33', ip: '192.168.1.255', severity: 'critical' },
    { id: 5, action: 'Permission Changed', user: 'Super Admin', exam: 'N/A', timestamp: '2025-12-04 16:20:18', ip: '192.168.1.1', severity: 'warning' },
    { id: 6, action: 'Bulk Delete', user: 'Dr. Ahmed Hassan', exam: '5 exams', timestamp: '2025-12-04 14:10:55', ip: '192.168.1.100', severity: 'critical' },
    { id: 7, action: 'Exam Edited', user: 'Mr. Omar Ibrahim', exam: 'Chemistry Lab Test', timestamp: '2025-12-04 11:30:42', ip: '192.168.1.105', severity: 'info' },
    { id: 8, action: 'User Suspended', user: 'Super Admin', exam: 'N/A', timestamp: '2025-12-03 15:25:30', ip: '192.168.1.1', severity: 'warning' }
  ];

  const getRoleColor = (color) => {
    const colors = {
      red: 'from-red-500 to-pink-600',
      purple: 'from-purple-500 to-pink-600',
      blue: 'from-blue-500 to-indigo-600',
      emerald: 'from-emerald-500 to-teal-600',
      gray: 'from-gray-500 to-slate-600'
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Active', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      suspended: { label: 'Suspended', class: 'bg-red-500/20 text-red-400 border-red-500/30' },
      pending: { label: 'Pending', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' }
    };
    return badges[status];
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      info: { label: 'Info', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: CheckCircle },
      warning: { label: 'Warning', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: AlertCircle },
      critical: { label: 'Critical', class: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertCircle }
    };
    return badges[severity];
  };

  const tabs = [
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'users', label: 'User Access', icon: Users },
    { id: 'audit', label: 'Audit Trail', icon: History }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Security & Permissions</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage roles, access control, and audit logs</p>
            </div>
          </div>
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
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
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
          {/* Roles & Permissions Tab */}
          {activeTab === 'roles' && (
            <motion.div
              key="roles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Roles</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Role
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {roles.map((role, idx) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getRoleColor(role.color)} flex items-center justify-center shadow-lg`}>
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all">
                          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{role.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{role.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{role.users} users</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedRole(role);
                            setShowRoleModal(true);
                          }}
                          className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Permissions Matrix */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Permissions Overview</h2>
                <div className="space-y-6">
                  {['Exam Management', 'Viewing', 'Grading', 'Analytics', 'Advanced', 'Administration', 'Security'].map((category, idx) => (
                    <div key={category}>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {allPermissions.filter(p => p.category === category).map((permission) => (
                          <div key={permission.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{permission.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{permission.description}</p>
                              </div>
                              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-3" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* User Access Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Access Control</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add User
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">User</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Last Login</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Exams Created</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {userAccess.map((user, idx) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-semibold">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(user.status).class}`}>
                              {getStatusBadge(user.status).label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.lastLogin}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.examsCreated}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                {user.status === 'active' ? (
                                  <UserX className="w-4 h-4 text-red-600 dark:text-red-400" />
                                ) : (
                                  <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                )}
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

          {/* Audit Trail Tab */}
          {activeTab === 'audit' && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Audit Trail</h2>
                  <div className="flex items-center gap-3">
                    <select className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none">
                      <option>All Activities</option>
                      <option>Critical Only</option>
                      <option>Warnings</option>
                      <option>Info</option>
                    </select>
                    <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Logs
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {auditLogs.map((log, idx) => {
                    const badge = getSeverityBadge(log.severity);
                    const Icon = badge.icon;
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-5 bg-gradient-to-r from-gray-50 to-red-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all group cursor-pointer"
                        onClick={() => setShowAuditDetails(true)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${log.severity === 'critical' ? 'from-red-500 to-pink-600' : log.severity === 'warning' ? 'from-amber-500 to-orange-600' : 'from-blue-500 to-indigo-600'} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{log.action}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>{log.user}</span>
                                  </div>
                                  {log.exam !== 'N/A' && (
                                    <div className="flex items-center gap-1">
                                      <FileText className="w-4 h-4" />
                                      <span>{log.exam}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{log.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                              <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${badge.class}`}>
                                {badge.label}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>IP: {log.ip}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
