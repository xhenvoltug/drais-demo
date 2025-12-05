'use client';

import React, { useState } from 'react';
import TahfizNavBar from '@/components/tahfiz-navbar';
import {
  Settings as SettingsIcon, Target, Calendar, Bell, Award,
  BookOpen, Users, Clock, Save, RotateCcw, Shield,
  Database, Palette, Globe, MessageSquare, Zap, Star,
  CheckCircle, AlertTriangle
} from 'lucide-react';

export default function TahfizSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    programName: 'Tahfiz Al-Quran Program',
    academicYear: '2024-2025',
    termDuration: 12,
    weeklyTarget: 15,
    
    // Progress Targets
    dailyPagesTarget: 2,
    weeklyJuzTarget: 0.5,
    monthlyJuzTarget: 2,
    minAccuracyThreshold: 85,
    
    // Attendance Settings
    requiredAttendance: 90,
    lateThreshold: 15,
    absenceNotification: true,
    
    // Grading System
    gradeAMin: 90,
    gradeBMin: 80,
    gradeCMin: 70,
    passingGrade: 60,
    
    // Rewards
    badgesEnabled: true,
    pointsEnabled: true,
    leaderboardEnabled: true,
    certificatesEnabled: true,
    
    // Notifications
    dailyReminders: true,
    progressAlerts: true,
    examNotifications: true,
    achievementNotifications: true,
    
    // AI & Automation
    aiEvaluation: false,
    autoGrading: false,
    smartRecommendations: true,
    voiceRecognition: false,
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const saveSettings = () => {
    // Save logic here
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetSettings = () => {
    // Reset to defaults
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset logic here
      console.log('Resetting settings');
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 'targets', name: 'Targets & Goals', icon: <Target className="w-5 h-5" /> },
    { id: 'grading', name: 'Grading System', icon: <Award className="w-5 h-5" /> },
    { id: 'rewards', name: 'Rewards', icon: <Star className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'ai', name: 'AI & Automation', icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <SettingsIcon className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Tahfiz Settings</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Configure targets, templates, and AI feedback preferences
              </p>
            </div>
            {saved && (
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>Settings saved successfully!</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 space-y-2 sticky top-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  General Settings
                </h2>
                
                <SettingField
                  label="Program Name"
                  type="text"
                  value={settings.programName}
                  onChange={(value) => updateSetting('programName', value)}
                  description="The official name of your Tahfiz program"
                />
                
                <SettingField
                  label="Academic Year"
                  type="text"
                  value={settings.academicYear}
                  onChange={(value) => updateSetting('academicYear', value)}
                  description="Current academic year"
                />
                
                <SettingField
                  label="Term Duration (weeks)"
                  type="number"
                  value={settings.termDuration}
                  onChange={(value) => updateSetting('termDuration', parseInt(value))}
                  description="Length of each academic term"
                />
                
                <SettingField
                  label="Weekly Target (pages)"
                  type="number"
                  value={settings.weeklyTarget}
                  onChange={(value) => updateSetting('weeklyTarget', parseInt(value))}
                  description="Default weekly pages target for students"
                />
              </div>
            )}

            {/* Targets & Goals */}
            {activeTab === 'targets' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Progress Targets & Goals
                </h2>
                
                <SettingField
                  label="Daily Pages Target"
                  type="number"
                  value={settings.dailyPagesTarget}
                  onChange={(value) => updateSetting('dailyPagesTarget', parseInt(value))}
                  description="Recommended pages per day"
                  icon={<BookOpen className="w-5 h-5 text-emerald-600" />}
                />
                
                <SettingField
                  label="Weekly Juz Target"
                  type="number"
                  step="0.1"
                  value={settings.weeklyJuzTarget}
                  onChange={(value) => updateSetting('weeklyJuzTarget', parseFloat(value))}
                  description="Target Juz completion per week"
                  icon={<Target className="w-5 h-5 text-blue-600" />}
                />
                
                <SettingField
                  label="Monthly Juz Target"
                  type="number"
                  value={settings.monthlyJuzTarget}
                  onChange={(value) => updateSetting('monthlyJuzTarget', parseInt(value))}
                  description="Target Juz completion per month"
                  icon={<Calendar className="w-5 h-5 text-purple-600" />}
                />
                
                <SettingField
                  label="Minimum Accuracy Threshold (%)"
                  type="number"
                  value={settings.minAccuracyThreshold}
                  onChange={(value) => updateSetting('minAccuracyThreshold', parseInt(value))}
                  description="Required accuracy to proceed to next section"
                  icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                />
              </div>
            )}

            {/* Grading System */}
            {activeTab === 'grading' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Grading System Configuration
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <SettingField
                    label="Grade A (minimum %)"
                    type="number"
                    value={settings.gradeAMin}
                    onChange={(value) => updateSetting('gradeAMin', parseInt(value))}
                    description="90-100%"
                  />
                  
                  <SettingField
                    label="Grade B (minimum %)"
                    type="number"
                    value={settings.gradeBMin}
                    onChange={(value) => updateSetting('gradeBMin', parseInt(value))}
                    description="80-89%"
                  />
                  
                  <SettingField
                    label="Grade C (minimum %)"
                    type="number"
                    value={settings.gradeCMin}
                    onChange={(value) => updateSetting('gradeCMin', parseInt(value))}
                    description="70-79%"
                  />
                  
                  <SettingField
                    label="Passing Grade (minimum %)"
                    type="number"
                    value={settings.passingGrade}
                    onChange={(value) => updateSetting('passingGrade', parseInt(value))}
                    description="Minimum to pass"
                  />
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                    Grading Preview
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-300">Grade A:</span>
                      <span className="font-semibold">{settings.gradeAMin}% - 100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-300">Grade B:</span>
                      <span className="font-semibold">{settings.gradeBMin}% - {settings.gradeAMin - 1}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-300">Grade C:</span>
                      <span className="font-semibold">{settings.gradeCMin}% - {settings.gradeBMin - 1}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 dark:text-blue-300">Grade D:</span>
                      <span className="font-semibold">{settings.passingGrade}% - {settings.gradeCMin - 1}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-800 dark:text-red-300">Grade F:</span>
                      <span className="font-semibold">Below {settings.passingGrade}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rewards */}
            {activeTab === 'rewards' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Rewards & Motivation Settings
                </h2>
                
                <ToggleSetting
                  label="Enable Badges System"
                  description="Award badges for achievements and milestones"
                  checked={settings.badgesEnabled}
                  onChange={(value) => updateSetting('badgesEnabled', value)}
                  icon={<Award className="w-5 h-5 text-yellow-600" />}
                />
                
                <ToggleSetting
                  label="Enable Points System"
                  description="Students earn points for progress and participation"
                  checked={settings.pointsEnabled}
                  onChange={(value) => updateSetting('pointsEnabled', value)}
                  icon={<Star className="w-5 h-5 text-purple-600" />}
                />
                
                <ToggleSetting
                  label="Enable Leaderboard"
                  description="Display top performers and rankings"
                  checked={settings.leaderboardEnabled}
                  onChange={(value) => updateSetting('leaderboardEnabled', value)}
                  icon={<Users className="w-5 h-5 text-blue-600" />}
                />
                
                <ToggleSetting
                  label="Enable Certificates"
                  description="Generate certificates for Juz completion"
                  checked={settings.certificatesEnabled}
                  onChange={(value) => updateSetting('certificatesEnabled', value)}
                  icon={<Award className="w-5 h-5 text-emerald-600" />}
                />
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Notification Preferences
                </h2>
                
                <ToggleSetting
                  label="Daily Reminders"
                  description="Send daily memorization reminders to students"
                  checked={settings.dailyReminders}
                  onChange={(value) => updateSetting('dailyReminders', value)}
                  icon={<Clock className="w-5 h-5 text-blue-600" />}
                />
                
                <ToggleSetting
                  label="Progress Alerts"
                  description="Notify when students fall behind targets"
                  checked={settings.progressAlerts}
                  onChange={(value) => updateSetting('progressAlerts', value)}
                  icon={<AlertTriangle className="w-5 h-5 text-yellow-600" />}
                />
                
                <ToggleSetting
                  label="Exam Notifications"
                  description="Send reminders for upcoming exams"
                  checked={settings.examNotifications}
                  onChange={(value) => updateSetting('examNotifications', value)}
                  icon={<Calendar className="w-5 h-5 text-purple-600" />}
                />
                
                <ToggleSetting
                  label="Achievement Notifications"
                  description="Celebrate student achievements and milestones"
                  checked={settings.achievementNotifications}
                  onChange={(value) => updateSetting('achievementNotifications', value)}
                  icon={<Award className="w-5 h-5 text-green-600" />}
                />
              </div>
            )}

            {/* AI & Automation */}
            {activeTab === 'ai' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg mb-6">
                  <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-1">
                      AI-Powered Features
                    </h3>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Enhance your Tahfiz program with artificial intelligence and automation
                    </p>
                  </div>
                </div>

                <ToggleSetting
                  label="AI Recitation Evaluation"
                  description="Use AI to evaluate recitation quality and provide feedback"
                  checked={settings.aiEvaluation}
                  onChange={(value) => updateSetting('aiEvaluation', value)}
                  icon={<Zap className="w-5 h-5 text-purple-600" />}
                  badge="Premium"
                />
                
                <ToggleSetting
                  label="Automatic Grading"
                  description="Auto-grade exams based on predefined criteria"
                  checked={settings.autoGrading}
                  onChange={(value) => updateSetting('autoGrading', value)}
                  icon={<Award className="w-5 h-5 text-blue-600" />}
                />
                
                <ToggleSetting
                  label="Smart Recommendations"
                  description="AI-powered personalized learning recommendations"
                  checked={settings.smartRecommendations}
                  onChange={(value) => updateSetting('smartRecommendations', value)}
                  icon={<Star className="w-5 h-5 text-yellow-600" />}
                />
                
                <ToggleSetting
                  label="Voice Recognition"
                  description="Automated voice-to-text for recitation recording"
                  checked={settings.voiceRecognition}
                  onChange={(value) => updateSetting('voiceRecognition', value)}
                  icon={<MessageSquare className="w-5 h-5 text-emerald-600" />}
                  badge="Coming Soon"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex gap-4">
                <button
                  onClick={saveSettings}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  Save Settings
                </button>
                <button
                  onClick={resetSettings}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function SettingField({ label, type, value, onChange, description, icon, step }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </label>
      </div>
      <input
        type={type}
        value={value}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
      />
      {description && (
        <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}

function ToggleSetting({ label, description, checked, onChange, icon, badge }) {
  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-start gap-3 flex-1">
        {icon}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
            {badge && (
              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
          checked ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
