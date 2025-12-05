'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, DollarSign, Download, Filter, Calendar,
  FileText, PieChart, BarChart3, Activity, ArrowUp, ArrowDown,
  Eye, ChevronDown, Building, Users, Clock, Zap, CheckCircle
} from 'lucide-react';

export default function IncomeStatementPage() {
  const [period, setPeriod] = useState('monthly'); // monthly, quarterly, yearly
  const [dateRange, setDateRange] = useState({ start: '2025-01-01', end: '2025-12-05' });
  const [department, setDepartment] = useState('all');
  const [category, setCategory] = useState('all');
  const [viewMode, setViewMode] = useState('summary'); // summary, detailed
  const [chartType, setChartType] = useState('bar'); // bar, line, area
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load from localStorage or generate mock data
    const savedData = localStorage.getItem('income_statement_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      const mockData = {
        summary: {
          totalRevenue: 2847650000,
          totalExpenses: 2156380000,
          netProfit: 691270000,
          profitMargin: 24.3,
          revenueGrowth: 12.4,
          expenseGrowth: 8.7,
          comparison: {
            lastPeriod: { revenue: 2534200000, expenses: 1984500000, profit: 549700000 },
            yearAgo: { revenue: 2156800000, expenses: 1742300000, profit: 414500000 }
          }
        },
        revenues: [
          { 
            category: 'Tuition Fees', 
            amount: 1950000000, 
            percentage: 68.5, 
            growth: 8.2,
            subcategories: [
              { name: 'Day School', amount: 980000000, students: 850 },
              { name: 'Boarding', amount: 720000000, students: 420 },
              { name: 'Tahfiz Program', amount: 250000000, students: 180 }
            ]
          },
          { 
            category: 'Examination Fees', 
            amount: 385000000, 
            percentage: 13.5, 
            growth: 5.1,
            subcategories: [
              { name: 'Mid-Term Exams', amount: 165000000, students: 1450 },
              { name: 'Final Exams', amount: 180000000, students: 1450 },
              { name: 'Mock Exams', amount: 40000000, students: 450 }
            ]
          },
          { 
            category: 'Transport Fees', 
            amount: 285000000, 
            percentage: 10.0, 
            growth: 15.3,
            subcategories: [
              { name: 'Bus Routes', amount: 245000000, students: 680 },
              { name: 'Special Transport', amount: 40000000, students: 85 }
            ]
          },
          { 
            category: 'Library Fees', 
            amount: 82650000, 
            percentage: 2.9, 
            growth: 3.8,
            subcategories: [
              { name: 'Annual Membership', amount: 52650000, students: 1200 },
              { name: 'Late Fees', amount: 18000000, count: 450 },
              { name: 'Book Replacement', amount: 12000000, count: 120 }
            ]
          },
          { 
            category: 'Boarding Fees', 
            amount: 95000000, 
            percentage: 3.3, 
            growth: 6.7,
            subcategories: [
              { name: 'Accommodation', amount: 65000000, students: 420 },
              { name: 'Meals', amount: 30000000, students: 420 }
            ]
          },
          { 
            category: 'Other Income', 
            amount: 50000000, 
            percentage: 1.8, 
            growth: 22.5,
            subcategories: [
              { name: 'Events & Functions', amount: 25000000 },
              { name: 'Canteen Rent', amount: 15000000 },
              { name: 'Miscellaneous', amount: 10000000 }
            ]
          }
        ],
        expenses: [
          { 
            category: 'Salaries & Benefits', 
            amount: 1285000000, 
            percentage: 59.6, 
            growth: 9.5,
            subcategories: [
              { name: 'Teaching Staff', amount: 780000000, count: 87 },
              { name: 'Administrative Staff', amount: 320000000, count: 42 },
              { name: 'Support Staff', amount: 125000000, count: 65 },
              { name: 'Benefits & Allowances', amount: 60000000 }
            ]
          },
          { 
            category: 'Infrastructure & Utilities', 
            amount: 385000000, 
            percentage: 17.9, 
            growth: 12.3,
            subcategories: [
              { name: 'Electricity', amount: 145000000 },
              { name: 'Water & Sanitation', amount: 65000000 },
              { name: 'Building Maintenance', amount: 120000000 },
              { name: 'Grounds Keeping', amount: 55000000 }
            ]
          },
          { 
            category: 'Academic Resources', 
            amount: 245000000, 
            percentage: 11.4, 
            growth: 6.8,
            subcategories: [
              { name: 'Textbooks & Materials', amount: 125000000 },
              { name: 'Laboratory Equipment', amount: 65000000 },
              { name: 'Library Resources', amount: 35000000 },
              { name: 'Digital Resources', amount: 20000000 }
            ]
          },
          { 
            category: 'Transport Operations', 
            amount: 125380000, 
            percentage: 5.8, 
            growth: 8.2,
            subcategories: [
              { name: 'Fuel', amount: 65000000 },
              { name: 'Vehicle Maintenance', amount: 38380000 },
              { name: 'Driver Salaries', amount: 22000000 }
            ]
          },
          { 
            category: 'Administrative Expenses', 
            amount: 86000000, 
            percentage: 4.0, 
            growth: 5.5,
            subcategories: [
              { name: 'Office Supplies', amount: 28000000 },
              { name: 'Communication', amount: 22000000 },
              { name: 'Professional Services', amount: 36000000 }
            ]
          },
          { 
            category: 'Other Expenses', 
            amount: 30000000, 
            percentage: 1.4, 
            growth: 3.2,
            subcategories: [
              { name: 'Insurance', amount: 15000000 },
              { name: 'Marketing', amount: 8000000 },
              { name: 'Miscellaneous', amount: 7000000 }
            ]
          }
        ],
        monthlyTrends: [
          { month: 'Jan', revenue: 245000000, expenses: 198000000, profit: 47000000 },
          { month: 'Feb', revenue: 238000000, expenses: 192000000, profit: 46000000 },
          { month: 'Mar', revenue: 242000000, expenses: 195000000, profit: 47000000 },
          { month: 'Apr', revenue: 235000000, expenses: 188000000, profit: 47000000 },
          { month: 'May', revenue: 241000000, expenses: 191000000, profit: 50000000 },
          { month: 'Jun', revenue: 239000000, expenses: 189000000, profit: 50000000 },
          { month: 'Jul', revenue: 243000000, expenses: 194000000, profit: 49000000 },
          { month: 'Aug', revenue: 237000000, expenses: 187000000, profit: 50000000 },
          { month: 'Sep', revenue: 246000000, expenses: 196000000, profit: 50000000 },
          { month: 'Oct', revenue: 248000000, expenses: 199000000, profit: 49000000 },
          { month: 'Nov', revenue: 251000000, expenses: 203000000, profit: 48000000 },
          { month: 'Dec', revenue: 232650000, expenses: 224380000, profit: 8270000 }
        ],
        insights: [
          {
            type: 'positive',
            title: 'Revenue Growth',
            message: 'Total revenue increased by 12.4% compared to last period',
            impact: 'high'
          },
          {
            type: 'positive',
            title: 'Profit Margin Improvement',
            message: 'Net profit margin improved from 21.7% to 24.3%',
            impact: 'high'
          },
          {
            type: 'neutral',
            title: 'Transport Revenue Surge',
            message: 'Transport fees grew by 15.3% - highest growth category',
            impact: 'medium'
          },
          {
            type: 'attention',
            title: 'Infrastructure Costs Rising',
            message: 'Utilities and maintenance costs up 12.3% - review efficiency',
            impact: 'medium'
          }
        ]
      };
      setData(mockData);
      localStorage.setItem('income_statement_data', JSON.stringify(mockData));
    }
  }, [period, dateRange, department, category]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading financial data...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return `UGX ${(amount / 1000000).toFixed(2)}M`;
  };

  const exportReport = (format) => {
    alert(`Exporting Income Statement as ${format.toUpperCase()}...`);
    // Placeholder for actual export functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Income Statement</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Financial Performance Overview • {dateRange.start} to {dateRange.end}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="monthly">Monthly View</option>
                <option value="quarterly">Quarterly View</option>
                <option value="yearly">Yearly View</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => exportReport('pdf')}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  PDF
                </button>
                <button
                  onClick={() => exportReport('excel')}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Excel
                </button>
                <button
                  onClick={() => exportReport('csv')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-semibold">
                <ArrowUp className="w-3 h-3" />
                +{data.summary.revenueGrowth}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(data.summary.totalRevenue)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              vs Last Period: {formatCurrency(data.summary.comparison.lastPeriod.revenue)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-red-500/10 to-pink-600/10 border border-red-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-semibold">
                <ArrowUp className="w-3 h-3" />
                +{data.summary.expenseGrowth}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(data.summary.totalExpenses)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              vs Last Period: {formatCurrency(data.summary.comparison.lastPeriod.expenses)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-semibold">
                <ArrowUp className="w-3 h-3" />
                +25.8%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(data.summary.netProfit)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Net Profit</div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              vs Last Period: {formatCurrency(data.summary.comparison.lastPeriod.profit)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-semibold">
                Healthy
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {data.summary.profitMargin}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Profit Margin</div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              Industry Avg: 18-22%
            </div>
          </motion.div>
        </div>

        {/* Actionable Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Actionable Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.insights.map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-xl border-l-4 ${
                  insight.type === 'positive' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500' :
                  insight.type === 'attention' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500' :
                  'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  {insight.type === 'positive' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : insight.type === 'attention' ? (
                    <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{insight.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Revenue & Expense Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Revenue Breakdown</h2>
            <div className="space-y-4">
              {data.revenues.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{item.category}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.percentage}% of total revenue</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(item.amount)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <ArrowUp className="w-3 h-3" />
                        +{item.growth}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-emerald-200 dark:bg-emerald-900/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  {viewMode === 'detailed' && (
                    <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-800 space-y-2">
                      {item.subcategories.map((sub, subIdx) => (
                        <div key={subIdx} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{sub.name}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(sub.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Expense Breakdown</h2>
            <div className="space-y-4">
              {data.expenses.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{item.category}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.percentage}% of total expenses</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(item.amount)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <ArrowUp className="w-3 h-3" />
                        +{item.growth}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-red-200 dark:bg-red-900/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  {viewMode === 'detailed' && (
                    <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800 space-y-2">
                      {item.subcategories.map((sub, subIdx) => (
                        <div key={subIdx} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{sub.name}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(sub.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Monthly Trends</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'summary' ? 'detailed' : 'summary')}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all"
              >
                {viewMode === 'summary' ? 'Show Details' : 'Hide Details'}
              </button>
            </div>
          </div>
          <div className="h-96 flex items-end justify-between gap-2">
            {data.monthlyTrends.map((month, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-80 gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer relative group"
                    style={{ height: `${(month.revenue / 260000000) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Revenue: {formatCurrency(month.revenue)}
                    </div>
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg hover:from-red-600 hover:to-red-500 transition-all cursor-pointer relative group"
                    style={{ height: `${(month.expenses / 260000000) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Expenses: {formatCurrency(month.expenses)}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{month.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-400 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Expenses</span>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">All Departments</option>
                <option value="academics">Academics</option>
                <option value="boarding">Boarding</option>
                <option value="tahfiz">Tahfiz</option>
                <option value="transport">Transport</option>
                <option value="library">Library</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="revenue">Revenue Only</option>
                <option value="expenses">Expenses Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
