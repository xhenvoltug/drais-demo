'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  FileText, DollarSign, Image, Heart, Mail,
  ChevronDown, ChevronRight, Menu, X,
  Mic, Brain, Sparkles, History, Trophy, Award,
  Target, BarChart3, Settings, Clock, Calendar
} from 'lucide-react';

export default function TahfizSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['tahfiz']);

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      href: '/students',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'teacher',
      label: 'Teachers',
      icon: GraduationCap,
      href: '/teacher/dashboard',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'tahfiz',
      label: 'Tahfiz',
      icon: BookOpen,
      gradient: 'from-amber-500 to-orange-600',
      subItems: [
        {
          id: 'tahfiz-main',
          label: 'Dashboard',
          icon: LayoutDashboard,
          href: '/tahfiz/dashboard'
        },
        {
          id: 'tahfiz-practice',
          label: 'Recitation Practice',
          icon: Mic,
          href: '/tahfiz/practice'
        },
        {
          id: 'tahfiz-quiz',
          label: 'Interactive Quiz',
          icon: Brain,
          href: '/tahfiz/quiz'
        },
        {
          id: 'tahfiz-ai-feedback',
          label: 'AI Mock Feedback',
          icon: Sparkles,
          href: '/tahfiz/ai-feedback'
        },
        {
          id: 'tahfiz-history',
          label: 'Recitation History',
          icon: History,
          href: '/tahfiz/history'
        },
        {
          id: 'tahfiz-progress',
          label: 'Progress & Rewards',
          icon: Award,
          href: '/tahfiz/progress'
        },
        {
          id: 'tahfiz-leaderboards',
          label: 'Leaderboards',
          icon: Trophy,
          href: '/tahfiz/leaderboards'
        },
        {
          id: 'tahfiz-analytics',
          label: 'Analytics',
          icon: BarChart3,
          href: '/tahfiz/analytics'
        },
        {
          id: 'tahfiz-students',
          label: 'Students',
          icon: Users,
          href: '/tahfiz/students'
        },
        {
          id: 'tahfiz-halaqa',
          label: 'Halaqa Sessions',
          icon: Clock,
          href: '/tahfiz/halaqa'
        },
        {
          id: 'tahfiz-assessments',
          label: 'Assessments',
          icon: Target,
          href: '/tahfiz/assessments'
        },
        {
          id: 'tahfiz-settings',
          label: 'Settings',
          icon: Settings,
          href: '/tahfiz/settings'
        }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      href: '/reports',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: DollarSign,
      href: '/fees',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'media',
      label: 'Media',
      icon: Image,
      href: '/library',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'donate',
      label: 'Donate',
      icon: Heart,
      href: '/donate',
      gradient: 'from-red-500 to-rose-600'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Mail,
      href: '/contact',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const isActive = (href) => {
    if (!href) return false;
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-900 border-r border-slate-800 z-40 overflow-y-auto"
      >
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">DRAIS</div>
                <div className="text-xs text-slate-400">School Management</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedSections.includes(item.id);
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isItemActive = isActive(item.href);
              const hasActiveChild = item.subItems?.some(sub => isActive(sub.href));

              return (
                <div key={item.id}>
                  {/* Main Item */}
                  {hasSubItems ? (
                    <button
                      onClick={() => toggleSection(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        hasActiveChild
                          ? `bg-gradient-to-r ${item.gradient} text-white`
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </button>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isItemActive
                          ? `bg-gradient-to-r ${item.gradient} text-white`
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}

                  {/* Sub Items */}
                  <AnimatePresence>
                    {hasSubItems && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-4 mt-1 space-y-1 border-l-2 border-slate-800"
                      >
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = isActive(subItem.href);
                          return (
                            <Link
                              key={subItem.id}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                                isSubActive
                                  ? 'bg-slate-800 text-emerald-400 border-l-2 border-emerald-500'
                                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                              }`}
                            >
                              <SubIcon className="w-4 h-4" />
                              <span>{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Version Badge */}
        <div className="p-6 border-t border-slate-800">
          <div className="px-4 py-2 bg-slate-800 rounded-lg text-center">
            <div className="text-xs text-slate-400">Version</div>
            <div className="text-sm font-bold text-emerald-400">0.0.0033</div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
