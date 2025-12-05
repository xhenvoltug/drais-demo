'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Activity, Brain, Sparkles, Clock,
  Award, Target, BarChart3, Users, UserCheck,
  ClipboardList, Settings, ChevronRight, BookOpen
} from 'lucide-react';

export default function TahfizNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/tahfiz/dashboard', icon: LayoutDashboard },
    { name: 'Practice', href: '/tahfiz/practice', icon: Activity },
    { name: 'Quiz', href: '/tahfiz/quiz', icon: Brain },
    { name: 'AI Feedback', href: '/tahfiz/ai-feedback', icon: Sparkles },
    { name: 'History', href: '/tahfiz/history', icon: Clock },
    { name: 'Progress', href: '/tahfiz/progress', icon: Award },
    { name: 'Leaderboards', href: '/tahfiz/leaderboards', icon: Target },
    { name: 'Analytics', href: '/tahfiz/analytics', icon: BarChart3 },
    { name: 'Students', href: '/tahfiz/students', icon: Users },
    { name: 'Halaqa', href: '/tahfiz/halaqa', icon: UserCheck },
    { name: 'Assessments', href: '/tahfiz/assessments', icon: ClipboardList },
    { name: 'Settings', href: '/tahfiz/settings', icon: Settings },
  ];

  const isActive = (href) => {
    if (href === '/tahfiz/dashboard') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile: Horizontal scroll */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    active
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium hidden sm:inline">{item.name}</span>
                </motion.div>
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-t border-slate-700/30 bg-slate-900/30 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400">
          <BookOpen className="w-3 h-3" />
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/tahfiz/dashboard" className="hover:text-white transition-colors">
            Tahfiz
          </Link>
          {pathname !== '/tahfiz/dashboard' && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">
                {navItems.find(item => isActive(item.href))?.name || 'Page'}
              </span>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
