'use client';

import React, { useState } from 'react';
import {
  Settings, Palette, Layout, Bell, Sliders, Save,
  Sun, Moon, Sparkles, Monitor, Grid, Maximize2,
  RotateCw, Download, Upload, Check, X, Move
} from 'lucide-react';

export default function TahfizCustomization() {
  const [theme, setTheme] = useState('gradient');
  const [blurIntensity, setBlurIntensity] = useState(50);
  const [borderRadius, setBorderRadius] = useState('lg');
  const [notificationSettings, setNotificationSettings] = useState({
    halaqaReminders: true,
    missedSessions: true,
    assessmentDue: true,
    studentMilestones: true,
    revisionAlerts: false,
    attendanceWarnings: true,
  });
  const [layoutPanels, setLayoutPanels] = useState([
    { id: 1, name: 'Overview Stats', position: 1, size: 'large', visible: true },
    { id: 2, name: 'Weekly Trends', position: 2, size: 'medium', visible: true },
    { id: 3, name: 'Notifications', position: 3, size: 'medium', visible: true },
    { id: 4, name: 'Quick Actions', position: 4, size: 'small', visible: false },
  ]);

  const themeOptions = [
    { id: 'light', name: 'Light', icon: Sun, gradient: 'from-white to-gray-100' },
    { id: 'dark', name: 'Dark', icon: Moon, gradient: 'from-gray-900 to-gray-800' },
    { id: 'gradient', name: 'Gradient', icon: Sparkles, gradient: 'from-emerald-500 to-teal-500' },
  ];

  const borderRadiusOptions = [
    { id: 'none', label: '0px', value: 'rounded-none' },
    { id: 'sm', label: '4px', value: 'rounded-sm' },
    { id: 'md', label: '8px', value: 'rounded-md' },
    { id: 'lg', label: '12px', value: 'rounded-lg' },
    { id: 'xl', label: '16px', value: 'rounded-xl' },
    { id: '2xl', label: '24px', value: 'rounded-2xl' },
  ];

  const notificationTypes = [
    { id: 'halaqaReminders', label: 'Halaqa Reminders', color: 'blue', icon: Bell },
    { id: 'missedSessions', label: 'Missed Sessions', color: 'red', icon: X },
    { id: 'assessmentDue', label: 'Assessment Due', color: 'amber', icon: Check },
    { id: 'studentMilestones', label: 'Student Milestones', color: 'green', icon: Sparkles },
    { id: 'revisionAlerts', label: 'Revision Alerts', color: 'purple', icon: RotateCw },
    { id: 'attendanceWarnings', label: 'Attendance Warnings', color: 'orange', icon: Bell },
  ];

  const toggleNotification = (id) => {
    setNotificationSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const togglePanelVisibility = (id) => {
    setLayoutPanels(prev =>
      prev.map(panel =>
        panel.id === id ? { ...panel, visible: !panel.visible } : panel
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Customization & Theming</h1>
              </div>
              <p className="text-emerald-100 text-lg">
                Personalize your Tahfiz dashboard experience
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-lg px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-all">
                <Upload className="w-5 h-5" />
                Import
              </button>
              <button className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Global Theme</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {themeOptions.map(option => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    theme === option.id
                      ? 'border-emerald-500 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} rounded-xl opacity-20`}></div>
                  <div className="relative flex flex-col items-center gap-3">
                    <Icon className="w-8 h-8 text-gray-900 dark:text-white" />
                    <span className="font-bold text-gray-900 dark:text-white">{option.name}</span>
                    {theme === option.id && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <div className={`p-8 rounded-xl bg-gradient-to-br ${
            theme === 'light' ? 'from-white to-gray-100' :
            theme === 'dark' ? 'from-gray-900 to-gray-800 text-white' :
            'from-emerald-500 to-teal-500 text-white'
          } border-2 border-gray-300 dark:border-gray-600`}>
            <h3 className="text-xl font-bold mb-2">Theme Preview</h3>
            <p className="mb-4 opacity-90">This is how your dashboard will look with the selected theme.</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-lg">
                <div className="text-2xl font-bold">168</div>
                <div className="text-sm opacity-80">Students</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-lg">
                <div className="text-2xl font-bold">14</div>
                <div className="text-sm opacity-80">Halaqas</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-lg">
                <div className="text-2xl font-bold">73%</div>
                <div className="text-sm opacity-80">Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Blur Intensity & Border Radius */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Sliders className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Background Blur</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Blur Intensity: {blurIntensity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={blurIntensity}
                  onChange={(e) => setBlurIntensity(e.target.value)}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              <div
                className="p-6 rounded-xl border-2 border-gray-300 dark:border-gray-600 relative overflow-hidden"
                style={{
                  backdropFilter: `blur(${blurIntensity / 10}px)`,
                  backgroundColor: `rgba(255, 255, 255, ${0.1 + blurIntensity / 200})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-30"></div>
                <div className="relative text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">Blur Preview</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Adjust the slider to see the effect</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Maximize2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Card Border Radius</h2>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {borderRadiusOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setBorderRadius(option.id)}
                  className={`p-3 border-2 transition-all ${option.value} ${
                    borderRadius === option.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                      : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400'
                  }`}
                >
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">{option.label}</div>
                </button>
              ))}
            </div>
            <div className={`p-6 border-2 border-gray-300 dark:border-gray-600 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 ${
              borderRadiusOptions.find(o => o.id === borderRadius)?.value
            }`}>
              <p className="font-semibold text-gray-900 dark:text-white text-center">Border Preview</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Selected: {borderRadiusOptions.find(o => o.id === borderRadius)?.label}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Layout Editor */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Layout className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Layout Editor</h2>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
              <Download className="w-4 h-4" />
              Save Layout Preset
            </button>
          </div>

          <div className="space-y-4">
            {layoutPanels.map(panel => (
              <div
                key={panel.id}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  panel.visible
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                    : 'border-gray-300 dark:border-gray-600 opacity-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Move className="w-5 h-5 text-gray-400 cursor-move" />
                  <Grid className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{panel.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Size: {panel.size} • Position: {panel.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={panel.size}
                    onChange={(e) => {
                      setLayoutPanels(prev =>
                        prev.map(p => p.id === panel.id ? { ...p, size: e.target.value } : p)
                      );
                    }}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                  <button
                    onClick={() => togglePanelVisibility(panel.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      panel.visible
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {panel.visible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Tip:</strong> Drag panels to reorder them, adjust sizes, and toggle visibility to customize your dashboard layout.
            </p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {notificationTypes.map(type => {
              const Icon = type.icon;
              const isEnabled = notificationSettings[type.id];
              return (
                <div
                  key={type.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    isEnabled
                      ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-950`
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isEnabled ? `bg-${type.color}-100 dark:bg-${type.color}-900` : 'bg-gray-100 dark:bg-gray-700'}`}>
                      <Icon className={`w-5 h-5 ${isEnabled ? `text-${type.color}-600 dark:text-${type.color}-400` : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{type.label}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {isEnabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(type.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      isEnabled ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        isEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Preview Alerts */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Preview Notifications</h3>
            <div className="space-y-3">
              {notificationTypes
                .filter(type => notificationSettings[type.id])
                .slice(0, 3)
                .map(type => (
                  <div
                    key={type.id}
                    className={`p-4 rounded-xl border-l-4 border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-950 animate-slideInRight`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-${type.color}-100 dark:bg-${type.color}-900 rounded-lg`}>
                        {React.createElement(type.icon, { className: `w-5 h-5 text-${type.color}-600 dark:text-${type.color}-400` })}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{type.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          This is a preview of the {type.label.toLowerCase()} notification.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
